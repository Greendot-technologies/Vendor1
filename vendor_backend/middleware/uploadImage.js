// middleware/uploadImage.js

const multer = require("multer");
const fs = require("fs");
const path = require("path");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
require("dotenv").config();

// 1. Setup S3 client
const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  },
});

// 2. Multer setup for temporary local storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, "../temp");
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath);
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}_${file.originalname}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

// 3. Upload file to S3 and return public URL
const uploadFileToS3 = async (file) => {
  const fileStream = fs.createReadStream(file.path);
  const key = `products/${Date.now()}_${file.originalname}`;

  const uploadParams = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: key,
    Body: fileStream,
    ContentType: file.mimetype, // Optional but recommended
    // ❌ Don't use ACL if your bucket has Object Ownership: Bucket owner enforced
    // ACL: "public-read", ← REMOVE THIS LINE
  };

  await s3.send(new PutObjectCommand(uploadParams));

  // Remove local file from temp after upload
  fs.unlinkSync(file.path);

  // Return public S3 URL
  return `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
};

// 4. Middleware to attach uploaded S3 URLs to request
const processUploads = async (req, res, next) => {
  try {
    if (!req.files || req.files.length === 0) {
      return next();
    }

    req.s3ImageUrls = [];

    for (const file of req.files) {
      const imageUrl = await uploadFileToS3(file);
      req.s3ImageUrls.push(imageUrl);
    }

    next();
  } catch (err) {
    console.error("S3 Upload Error:", err);
    res.status(500).json({ message: "Failed to upload image(s) to S3" });
  }
};

module.exports = {
  upload,        // multer: file parsing
  processUploads // upload to S3 and return URLs
};
