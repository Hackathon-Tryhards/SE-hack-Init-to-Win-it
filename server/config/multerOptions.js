import multer from 'multer';

// Create multer storage for storing file in memory
const storage = multer.memoryStorage();

export default storage;
