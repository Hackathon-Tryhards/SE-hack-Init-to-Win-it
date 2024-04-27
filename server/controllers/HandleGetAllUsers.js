import User from "../model/User.js";

const HandleGetAllUsers = async (req, res) => {
    try {
        const users = await User.find({}, { _id: 0, password: 0, __v: 0 });
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export default HandleGetAllUsers;
