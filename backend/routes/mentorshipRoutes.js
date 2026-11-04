
const express = require("express");
const router = express.Router();

const {
  registerMentor,
  getMentors,
  matchMentors,
  bookSession,
  getMySessions,
  updateSessionStatus
} = require("../controllers/mentorshipController");

const { protect, authorize } = require("../middleware/authMiddleware");

// Mentor registration and listing
router.post(
  "/register",
  protect,
  authorize("mentor"),
  registerMentor
);

router.get("/mentors", protect, getMentors);

// Mentor matching
router.post(
  "/match",
  protect,
  authorize("student"),
  matchMentors
);

// Session scheduling
router.post(
  "/book",
  protect,
  authorize("student"),
  bookSession
);

router.get(
  "/sessions",
  protect,
  getMySessions
);

router.put(
  "/sessions/:id/status",
  protect,
  authorize("mentor"),
  updateSessionStatus
);

module.exports = router;
