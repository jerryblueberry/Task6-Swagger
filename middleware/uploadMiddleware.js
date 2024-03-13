const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'files/'); // desired destination folder
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  // check if the file type is allowed
  const allowedMimeTypes = ['image/jpg', 'image/jpeg', 'image/png', 'image/gif'];
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file Type. Allowed types: JPEG, JPG, PNG, GIF'));
  }
};

const limits = {
  fileSize: 5 * 1024 * 1024, // 5 MB limit
};

const singleUpload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: limits,
}).single('profileimage'); 
//  for the store
const singleUploadStore= multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: limits,
}).single('logo'); 
// for products multiple upload
const multipleUpload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: limits,
}).array('images', 5);
module.exports = { singleUpload,multipleUpload,singleUploadStore};
