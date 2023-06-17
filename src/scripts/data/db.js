const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/mypets')
  .then(() => console.log('Connected!'));

// Menambah 1 data
// const dataHewan1 = new DataHewan({
//   nama: 'Ben',
//   jenis: 'Kucing',
//   umur: '3 Tahun',
//   beratBadan: '23 Kg',
//   vaksin: false
// });

// Simpan ke collection
// dataHewan1.save().then((dataHewan) => console.log(dataHewan));