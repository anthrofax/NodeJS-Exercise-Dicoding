/**
 * TODO:
 * Buatlah program untuk membaca teks input.txt dan menuliskannya ulang pada berkas output.txt
 * menggunakan teknik readable stream dan writable stream.
 */
const fs = require('fs');
const path = require('path');

const txtPath = path.resolve(__dirname, 'input.txt');

const readStream = fs.createReadStream(txtPath, {
    highWaterMark: 15,
})
const writeStream = fs.createWriteStream('output.txt');

readStream.on('readable', function() {
    try {
       writeStream.write(readStream.read() + "\n");
    } catch(err) {
        console.log(err.message);
    }
})

readStream.on('end', function() {
    console.log('end');
})
