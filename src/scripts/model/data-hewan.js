const mongoose = require('mongoose');

// Membuat Schema
const dataHewanSchema = new mongoose.Schema({
  nama: {
    type: String,
  },
  jenis: {
    type: String,
  },
  umur: {
    type: String,
  },
  beratBadan: {
    type: String,
  },
  vaksin: {
    type: String,
  },
  jadwalMakan: [{
    hariMakan: {
      type: String
    },
    waktuMakan: {
      type: String
    },
    tanggalMakan: {
      type: String
    },
  }],
  tiketVaksin: [{
    waktuVaksin: {
      type: String,
    },
    tanggalVaksin: {
      type: String,
    },
  }],
});

const DataHewan = mongoose.model('DataHewan', dataHewanSchema)



// Menambah 1 data
// const dataHewan1 = new DataHewan({
//   nama: 'Ben',
//   jenis: 'Kucing',
//   umur: '3 Tahun',
//   beratBadan: '23 Kg',
//   vaksin: false,
//   jadwalMakan: {
//     hari: 'pagi',
//     waktu: '04.00',
//     tanggal: '06-06-2023',
//   }
// });

// Simpan ke collection
// dataHewan1.save().then((dataHewan) => console.log(dataHewan));

module.exports = DataHewan;