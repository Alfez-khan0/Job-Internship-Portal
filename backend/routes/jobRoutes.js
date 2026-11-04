
const express = require("express");
const router = express.Router();

const {
  createJob,
  getJobs,
  getJobById,
  updateJob,
  deleteJob,
  applyForJob,
  getApplicants,
  updateApplicationStatus,
  getMyApplications
} = require("../controllers/jobController");

const { protect, authorize } = require("../middleware/authMiddleware");

// Public job listings
router.get("/", getJobs);
router.get("/:id", getJobById);

// Employer operations
router.post("/", protect, authorize("employer"), createJob);
router.put("/:id", protect, authorize("employer"), updateJob);
router.delete("/:id", protect, authorize("employer"), deleteJob);

router.get("/:id/applicants", protect, authorize("employer"), getApplicants);

router.put(
  "/applications/:applicationId/status",
  protect,
  authorize("employer"),
  updateApplicationStatus
);

// Student operations
router.post("/:id/apply", protect, authorize("student"), applyForJob);
router.get("/student/my-applications", protect, authorize("student"), getMyApplications);

module.exports = router;
