// TODO: tampilkan teks pada notes.txt pada console.
const fs = require('fs');
const path = require('path');

const readFileHandler = function(err, data) {
    if(err) {
        console.log("Menampilkan teks gagal.")
        return;
    }

    console.log(data);
}

// Synchronus Call
const syncRead = fs.readFileSync('notes.txt', 'utf-8');
console.log(syncRead);

console.log("\n");

// Asynchronus Call
fs.readFile('notes.txt', 'utf-8', readFileHandler);

console.log("\n");

// Menampilkan lokasi dari suatu file secara lengkap & dinamis
const pathFile = path.resolve(__dirname, 'notes.txt');
console.log(pathFile)
