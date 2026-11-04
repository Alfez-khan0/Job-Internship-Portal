
const express = require("express");
const router = express.Router();

const {
  updateEmployerProfile,
  getEmployerProfile
} = require("../controllers/employerController");

const { protect, authorize } = require("../middleware/authMiddleware");

router.get("/profile", protect, authorize("employer"), getEmployerProfile);
router.put("/profile", protect, authorize("employer"), updateEmployerProfile);

module.exports = router;
