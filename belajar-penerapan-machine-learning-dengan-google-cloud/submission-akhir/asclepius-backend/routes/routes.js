const express = require("express");
const multer = require("multer");
const { v4: uuid } = require("uuid");
require("dotenv").config();

const predictImage = require("../helpers/inferenceService");
const addData = require("../helpers/addData");

// Initialize Express Router
const router = express.Router();

// Configure Multer storage and file size limit (1MB)
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 }, // 1MB
}).single("image");

// POST endpoint for prediction
router.post("/predict", upload, async (req, res) => {
  const image = req.file;

  // Check if the image is present
  if (!image) {
    return res.status(400).json({
      status: "fail",
      message: "No image file provided",
    });
  }

  // If file size exceeds the limit
  if (image.size > 1000000) {
    return res.status(413).json({
      status: "fail",
      message: "Payload content length greater than maximum allowed: 1000000",
    });
  }

  try {
    const model = req.app.model;
    const result = await predictImage(model, image);

    // Menentukan saran berdasarkan hasil prediksi
    const suggestion =
      result === "Cancer"
        ? "Segera periksa ke dokter!"
        : "Penyakit kanker tidak terdeteksi.";

    const id = uuid();
    const data = {
      id,
      result,
      suggestion,
      createdAt: Date.now().toString(),
    };

    const responseData = addData(id, data);

    return res.status(200).json({
      status: "success",
      message: "Model is predicted successfully",
      data: responseData,
    });
  // eslint-disable-next-line no-unused-vars
  } catch (err) {
    // If prediction or any other error occurs
    return res.status(400).json({
      status: "fail",
      message: "Terjadi kesalahan dalam melakukan prediksi",
    });
  }
});
