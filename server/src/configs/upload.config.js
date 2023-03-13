import multer from "multer";

const storage = multer.diskStorage({
    destination: (request, file, callback) => {
        callback(null, "public");
    },
    filename: function (request, file, callback) {
        callback(null, Date.now() + "-" + file.originalname);
    },
});

const upload = multer({
    storage: storage,
}).single("image");

export default upload;
