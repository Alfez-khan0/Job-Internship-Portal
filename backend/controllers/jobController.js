
const mongoose = require("mongoose");
const Job = require("../models/Job");
const Application = require("../models/Application");

const jobFields = [
    "title",
    "company",
    "location",
    "salary",
    "skills",
    "qualification",
    "description",
    "jobType",
    "status"
];

const getErrorStatus = (error) => {
    if (error.name === "ValidationError" || error.name === "CastError") {
        return 400;
    }

    if (error.code === 11000) {
        return 409;
    }

    return 500;
};

const getJobData = (body) =>
    Object.fromEntries(
        jobFields
            .filter(field => body[field] !== undefined)
            .map(field => [field, body[field]])
    );

exports.createJob = async (req, res) => {
    try {
        const jobData = getJobData(req.body);
        jobData.company = jobData.company || req.user.profile?.companyName;
        jobData.postedBy = req.user._id;

        const job = await Job.create(jobData);
        res.status(201).json({ message: "Job posted successfully.", job });
    } catch (error) {
        res.status(getErrorStatus(error)).json({ message: error.message });
    }
};

exports.getJobs = async (req, res) => {
    try {
        const jobs = await Job.find({ status: "Open" }).sort({ createdAt: -1 });
        res.json({ count: jobs.length, jobs });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getJobById = async (req, res) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).json({ message: "Invalid job ID." });
        }

        const job = await Job.findById(req.params.id);
        if (!job) {
            return res.status(404).json({ message: "Job not found." });
        }

        res.json({ job });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateJob = async (req, res) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).json({ message: "Invalid job ID." });
        }

        const job = await Job.findOne({
            _id: req.params.id,
            postedBy: req.user._id
        });

        if (!job) {
            return res.status(404).json({ message: "Job not found." });
        }

        Object.assign(job, getJobData(req.body));
        await job.save();
        res.json({ message: "Job updated successfully.", job });
    } catch (error) {
        res.status(getErrorStatus(error)).json({ message: error.message });
    }
};

exports.deleteJob = async (req, res) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).json({ message: "Invalid job ID." });
        }

        const job = await Job.findOneAndDelete({
            _id: req.params.id,
            postedBy: req.user._id
        });

        if (!job) {
            return res.status(404).json({ message: "Job not found." });
        }

        await Application.deleteMany({ job: job._id });
        res.json({ message: "Job deleted successfully." });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.applyForJob = async (req, res) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).json({ message: "Invalid job ID." });
        }

        const job = await Job.findOne({ _id: req.params.id, status: "Open" });
        if (!job) {
            return res.status(404).json({ message: "Open job not found." });
        }

        const application = await Application.create({
            job: job._id,
            student: req.user._id
        });

        res.status(201).json({ message: "Application submitted.", application });
    } catch (error) {
        res.status(getErrorStatus(error)).json({ message: error.message });
    }
};

exports.getApplicants = async (req, res) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).json({ message: "Invalid job ID." });
        }

        const job = await Job.findOne({
            _id: req.params.id,
            postedBy: req.user._id
        });

        if (!job) {
            return res.status(404).json({ message: "Job not found." });
        }

        const applicants = await Application.find({ job: job._id })
            .populate("student", "fullName email profile.skills profile.resume")
            .sort({ createdAt: -1 });

        res.json({ count: applicants.length, applicants });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateApplicationStatus = async (req, res) => {
    try {
        if (!mongoose.isValidObjectId(req.params.applicationId)) {
            return res.status(400).json({ message: "Invalid application ID." });
        }

        const application = await Application.findById(req.params.applicationId)
            .populate("job", "postedBy");

        if (!application || !application.job) {
            return res.status(404).json({ message: "Application not found." });
        }

        if (application.job.postedBy.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "You cannot update this application." });
        }

        application.status = req.body.status;
        await application.save();
        res.json({ message: "Application status updated.", application });
    } catch (error) {
        res.status(getErrorStatus(error)).json({ message: error.message });
    }
};

exports.getMyApplications = async (req, res) => {
    try {
        const applications = await Application.find({ student: req.user._id })
            .populate("job")
            .sort({ createdAt: -1 });

        res.json({ count: applications.length, applications });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
