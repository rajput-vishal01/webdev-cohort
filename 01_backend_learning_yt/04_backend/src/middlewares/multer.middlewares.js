import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Set destination to save uploaded files in ./public/temp directory
        cb(null, './public/temp');
    },
    filename: function (req, file, cb) {
        // To modify the filename, you could use a unique identifier
        // Example: const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        // cb(null, file.fieldname + '-' + uniqueSuffix);

        // Keep original filename as specified
        cb(null, file.originalname);
    }
});



const upload = multer({ storage });

export { upload };
