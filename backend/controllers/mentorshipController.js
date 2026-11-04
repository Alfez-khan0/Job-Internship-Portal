
const Mentor = require("./models/Mentor");
const MentorshipSession = require("../models/MentorshipSession");

// MENTOR REGISTRATION
exports.registerMentor = async (req, res) => {
  try {
    const { name, expertise, experience, skills, availability } = req.body;

    if (!name || !expertise || !skills) {
      return res.status(400).json({
        message: "Name, expertise and skills are required."
      });
    }

    const existingMentor = await Mentor.findOne({
      user: req.user._id
    });

    if (existingMentor) {
      return res.status(409).json({
        message: "You are already registered as a mentor."
      });
    }

    const mentor = await Mentor.create({
      user: req.user._id,
      name,
      email: req.user.email,
      expertise,
      experience,
      skills: Array.isArray(skills)
        ? skills
        : skills.split(",").map(s => s.trim()).filter(Boolean),
      availability
    });

    res.status(201).json({
      message: "Mentor registered successfully.",
      mentor
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL MENTORS
exports.getMentors = async (req, res) => {
  try {
    const mentors = await Mentor.find()
      .populate("user", "fullName email");

    res.json({
      count: mentors.length,
      mentors
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// MATCH MENTORS BY SKILLS
exports.matchMentors = async (req, res) => {
  try {
    const { skills } = req.body;

    if (!Array.isArray(skills) || skills.length === 0) {
      return res.status(400).json({
        message: "Please provide your skills as an array."
      });
    }

    const studentSkills = skills.map(s => s.toLowerCase().trim());

    const mentors = await Mentor.find();

    const results = mentors.map(mentor => {
      const mentorSkills = mentor.skills.map(s => s.toLowerCase());

      const matchedSkills = studentSkills.filter(skill =>
        mentorSkills.includes(skill)
      );

      const score = Math.round(
        (matchedSkills.length / studentSkills.length) * 100
      );

      return {
        mentor,
        matchedSkills,
        matchPercentage: score
      };
    });

    results.sort((a, b) => b.matchPercentage - a.matchPercentage);

    res.json({ results });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// BOOK MENTORSHIP SESSION
exports.bookSession = async (req, res) => {
  try {
    const { mentorId, date, time, topic } = req.body;

    if (!mentorId || !date || !time || !topic) {
      return res.status(400).json({
        message: "Please provide mentor, date, time and topic."
      });
    }

    const mentor = await Mentor.findById(mentorId);

    if (!mentor) {
      return res.status(404).json({
        message: "Mentor not found."
      });
    }

    if (mentor.user.toString() === req.user._id.toString()) {
      return res.status(400).json({
        message: "You cannot book a session with yourself."
      });
    }

    const sessionDate = new Date(date);

    if (Number.isNaN(sessionDate.getTime()) || sessionDate <= new Date()) {
      return res.status(400).json({
        message: "Please choose a future session date."
      });
    }

    const session = await MentorshipSession.create({
      mentor: mentor._id,
      student: req.user._id,
      date: sessionDate,
      time,
      topic
    });

    res.status(201).json({
      message: "Mentorship session requested successfully.",
      session
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET MY MENTORSHIP SESSIONS
exports.getMySessions = async (req, res) => {
  try {
    const filter = req.user.role === "mentor"
      ? { mentor: { $in: await Mentor.find({ user: req.user._id }).distinct("_id") } }
      : { student: req.user._id };

    const sessions = await MentorshipSession.find(filter)
      .populate("mentor")
      .populate("student", "fullName email")
      .sort({ date: 1 });

    res.json({ sessions });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// APPROVE OR REJECT SESSION
exports.updateSessionStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!["Approved", "Rejected", "Completed"].includes(status)) {
      return res.status(400).json({
        message: "Invalid session status."
      });
    }

    const session = await MentorshipSession.findById(req.params.id)
      .populate("mentor");

    if (!session) {
      return res.status(404).json({
        message: "Session not found."
      });
    }

    if (
      !session.mentor ||
      session.mentor.user.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        message: "Only the assigned mentor can update this session."
      });
    }

    session.status = status;
    await session.save();

    res.json({
      message: "Session status updated successfully.",
      session
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
