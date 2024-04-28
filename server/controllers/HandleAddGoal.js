import User from "../model/User.js";
import schedule from "node-schedule";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  port: 465,
  host: "smtp.gmail.com",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // generated from the App Passwords
  },
  secure: true,
});

const sendReminderEmail = (email, goal) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Goal Reminder",
    text: `Hi there!\n\nJust a friendly reminder that your goal "${goal}" is about to expire in 10 minutes.\n\nBest regards,\nYour Reminder Bot`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error sending reminder email:", error);
    } else {
      console.log("Reminder email sent:", info.response);
    }
  });
};

const sendGoalIncompleteMessage = (email, goal) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Goal Incomplete",
    text: `Hi there!\n\nUnfortunately, your goal "${goal}" was not completed on time.\n\nBest regards,\nYour Reminder Bot`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error sending goal incomplete message:", error);
    } else {
      console.log("Goal incomplete message sent:", info.response);
    }
  });
};

const HandleAddGoal = async (req, res) => {
  try {
    const { username, goal, time } = req.body;
    // Find user by username
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Append goal to user's goals
    user.goals.push({ goal, time });

    // Save user with new goal
    await user.save();

    // Schedule a reminder
    const reminderTime = new Date(Date.now() + time * 60000 - 10 * 60 * 1000); // Convert minutes to milliseconds
    console.log(reminderTime);
    schedule.scheduleJob(reminderTime, () => {
      console.log(`Reminder: Your goal "${goal}" is about to expire in 10 minutes.`);
      sendReminderEmail(user.email, goal);
    });

    // Schedule goal incomplete message and remove goal
    const deadline = new Date(Date.now() + time * 60000); // Convert minutes to milliseconds
    schedule.scheduleJob(deadline, async () => {
      console.log(`Deadline exceeded: Your goal "${goal}" was not completed on time.`);
      sendGoalIncompleteMessage(user.email, goal);
      // Find user by username again to get the latest document
      const updatedUser = await User.findOne({ username });
      // Remove goal from user's goals array
      updatedUser.goals = updatedUser.goals.filter((g) => g.goal !== goal);
      await updatedUser.save();
    });

    res.status(200).json({ message: "Goal added successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default HandleAddGoal;
