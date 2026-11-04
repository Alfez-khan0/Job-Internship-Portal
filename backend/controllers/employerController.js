
const User = require("../models/User");

// CREATE OR UPDATE EMPLOYER PROFILE
exports.updateEmployerProfile = async (req, res) => {
  try {
    const {
      companyName,
      companyDescription,
      website,
      location
    } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        $set: {
          "profile.companyName": companyName,
          "profile.companyDescription": companyDescription,
          "profile.website": website,
          "profile.location": location
        }
      },
      { new: true, runValidators: true }
    );

    res.json({
      message: "Employer profile updated successfully.",
      profile: user.profile
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET EMPLOYER PROFILE
exports.getEmployerProfile = async (req, res) => {
  try {
    res.json({
      profile: req.user.profile
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
