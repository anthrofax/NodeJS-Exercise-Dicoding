const tf = require("@tensorflow/tfjs-node");

// Fungsi untuk memproses dan memprediksi gambar menggunakan model
async function predictImage(model, image) {
  // Decode image yang diterima dan resize menjadi 224x224 (untuk input model)
  const tensor = tf.node
    .decodeImage(image.buffer)  // Menggunakan buffer karena file di-memory
    .resizeNearestNeighbor([224, 224])  // Resize menjadi 224x224
    .toFloat()  // Mengubah tipe data menjadi float32
    .div(tf.scalar(255.0));  // Normalisasi piksel ke rentang [0, 1]
  
  // Pastikan tensor memiliki 3 saluran warna (RGB)
  if (tensor.shape[2] !== 3) {
    throw new Error("Image must have 3 channels (RGB).");
  }

  // Menambah dimensi batch (1, 224, 224, 3) karena TensorFlow membutuhkan batch size
  const inputTensor = tensor.expandDims(0);

  // Prediksi hasil dengan model
  const prediction = model.predict(inputTensor);

  // Mengambil hasil prediksi
  const probability = prediction.dataSync(); // Mengambil hasil prediksi dalam bentuk array
  const result = probability[0] > 0.5 ? "Cancer" : "Non-cancer"; // Menentukan hasil berdasarkan threshold

  return result;
}

module.exports = predictImage;
