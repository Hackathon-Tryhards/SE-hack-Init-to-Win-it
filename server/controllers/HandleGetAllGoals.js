import User from "../model/User.js";

const   HandleGetAllGoals = async (req, res) => {
  try {
    const { username } = req.query;

    // Find user by username
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ goals: user.goals });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default HandleGetAllGoals;
