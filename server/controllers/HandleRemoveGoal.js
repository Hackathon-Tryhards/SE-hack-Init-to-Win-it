import User from "../model/User.js";

const HandleRemoveGoal = async (req, res) => {
  try {
    const { username, goal } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.goals = user.goals.filter((g) => g.goal !== goal);

    await user.save();

    res.status(200).json({ message: "Goal removed successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default HandleRemoveGoal;
