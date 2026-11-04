
const Job = require("./models/Job");

// AI JOB MATCHING (RULE-BASED SKILL SCORING)
exports.matchJobs = async (req, res) => {
  try {
    const skills = req.body.skills;

    if (!Array.isArray(skills) || skills.length === 0) {
      return res.status(400).json({
        message: "Please provide your skills as an array."
      });
    }

    const studentSkills = skills.map(s => s.trim().toLowerCase());

    const jobs = await Job.find({ status: "Open" });

    const results = jobs.map(job => {
      const required = job.skills.map(s => s.toLowerCase());

      const matched = required.filter(skill =>
        studentSkills.includes(skill)
      );

      const score = required.length
        ? Math.round((matched.length / required.length) * 100)
        : 0;

      return {
        job,
        matchPercentage: score,
        matchedSkills: matched
      };
    });

    results.sort((a, b) => b.matchPercentage - a.matchPercentage);

    res.json({ results });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// PERSONALIZED JOB RECOMMENDATIONS
exports.getRecommendations = async (req, res) => {
  try {
    const { skills, qualification } = req.body;

    if (!Array.isArray(skills)) {
      return res.status(400).json({
        message: "Skills must be provided as an array."
      });
    }

    const studentSkills = skills.map(s => s.toLowerCase().trim());

    const jobs = await Job.find({ status: "Open" });

    const results = jobs.map(job => {
      const required = job.skills.map(s => s.toLowerCase());

      const matched = required.filter(s =>
        studentSkills.includes(s)
      );

      const skillScore = required.length
        ? (matched.length / required.length) * 70
        : 0;

      const qualificationMatch =
        qualification &&
        job.qualification.toLowerCase().includes(
          qualification.toLowerCase()
        );

      const score = Math.round(
        skillScore + (qualificationMatch ? 30 : 0)
      );

      return { job, score, matchedSkills: matched };
    });

    const recommendations = results
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score);

    res.json({ recommendations });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// LOCATION MATCHING
exports.matchJobsByLocation = async (req, res) => {
  try {
    const { location, remoteOnly } = req.query;

    const jobs = await Job.find({ status: "Open" });

    const results = jobs.filter(job => {
      if (remoteOnly === "true") {
        return job.location.toLowerCase().includes("remote");
      }

      return location &&
        job.location.toLowerCase().includes(location.toLowerCase());
    });

    res.json({
      count: results.length,
      jobs: results
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
