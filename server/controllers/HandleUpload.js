// Import necessary modules
import User from '../model/User.js';

// Update your handleUpload function
async function handleUpload(req, res) {
    try {
        // Check if a file was uploaded
        if (!req.file) return res.status(400).send('No file uploaded.');

        // Find the user by username
        const username = req.body.username;
        const user = await User.findOne({ username });

        // If user not found
        if (!user) return res.status(404).send('User not found.');

        // Update user's photo
        user.photo = {
            data: req.file.buffer, // Image buffer data
            contentType: req.file.mimetype // Image MIME type
        };

        // Save the updated user to the database
        await user.save();

        res.status(200).send('Photo added successfully.');
    } catch (error) {
        console.error('Error processing file: ', error);
        res.status(500).send('Error processing file.');
    }
}

export default handleUpload;
