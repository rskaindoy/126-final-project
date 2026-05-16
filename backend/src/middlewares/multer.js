//DESCRIPTION: handles the files like images since normal parsing makes all the fields invalid or smth sabi ni google

const multer = require('multer');
const path = require('path');

//Define storage of files and what to name them
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // store in uploads folder
        cb(null, path.join(__dirname, '../uploads')); 
    },
    filename: (req, file, cb) =>{
        //format: 'image - timestamp' (avoid duplicates)
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-'+ uniqueSuffix +path.extname(file.originalname));
    }
});

// allow only the ff formats: png, jpg, jpeg
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true); // get file
    } else {
        cb(new Error('Invalid file format. Please only upload image'), false); 
    }
};

// limit: 5MB
const upload = multer({ 
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize:5*1024* 1024 } 
});

module.exports = upload;