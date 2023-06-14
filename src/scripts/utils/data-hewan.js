const fs = require('fs');
const Module = require('module');

// Membuat folder data jika belum terdapat foldernya
const dirPath = './src/scripts/data';
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath);
}

// Membuat file data-hewan.js jika belum terdapat file tersebut
const dataPath = './src/scripts/data/data-hewan.json';
if (!fs.existsSync(dataPath)) {
  fs.writeFileSync(dataPath, '[]', 'utf-8');
}

// Mengambil semua data-hewan.json
const loadDataHewan = () => {
  const fileBuffer = fs.readFileSync('./src/scripts/data/data-hewan.json', 'utf-8');
  const dataHewan = JSON.parse(fileBuffer);
  return dataHewan;
}

// Mencari data hewan
const findHewan = (nama) => {
  const dataHewans = loadDataHewan();
  const dataHewan = dataHewans.find((dataHewan) => dataHewan.nama.toLowerCase() === nama.toLowerCase());
  return dataHewan;
}

// Menuliskan file data-hewan.json dengan data baru
const saveDataHewans = (dataHewans) => {
  fs.writeFileSync('./src/scripts/data/data-hewan.json', JSON.stringify(dataHewans))
}

// Menambahkan data hewan baru kedalam array
const addHewan = (dataHewan) => {
  const dataHewans = loadDataHewan();
  dataHewans.push(dataHewan);
  saveDataHewans(dataHewans);
}

// Menghapus Data Hewan
const deleteDataHewan = (nama) => {
  const dataHewans = loadDataHewan();
  const filteredDataHewans = dataHewans.filter((dataHewan) => dataHewan.nama !== nama);

  saveDataHewans(filteredDataHewans);
}

const updateDataHewans = (dataHewanBaru) => {
  const dataHewans = loadDataHewan();
  // Menghilangkan data hewan lama
  const filteredDataHewans = dataHewans.filter((dataHewan) => dataHewan.nama !== dataHewanBaru.oldNama);
  delete dataHewanBaru.oldNama;
  filteredDataHewans.push(dataHewanBaru);
  saveDataHewans(filteredDataHewans);
}

module.exports = { loadDataHewan, findHewan, addHewan, deleteDataHewan, updateDataHewans };