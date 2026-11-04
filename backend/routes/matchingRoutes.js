
const express = require("express");
const router = express.Router();

const {
  matchJobs,
  getRecommendations,
  matchJobsByLocation
} = require("../controllers/matchingController");

const { protect, authorize } = require("../middleware/authMiddleware");

router.post(
  "/match",
  protect,
  authorize("student"),
  matchJobs
);

router.post(
  "/recommendations",
  protect,
  authorize("student"),
  getRecommendations
);

router.get(
  "/location",
  protect,
  authorize("student"),
  matchJobsByLocation
);

module.exports = router;
