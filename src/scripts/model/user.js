const mongoose = require('mongoose');
const DataHewan = require('./data-hewan');
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const userSchema = new Schema({
  namaLengkap: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true
  },
  noHp: {
    type: String,
    required: true
  },
  jenisKelamin: {
    type: String,
    required: true
  },
  alamatRumah: {
    type: String,
    required: true
  },
  dataHewan: [{
    type: ObjectId,
    ref: 'DataHewan'
  }]
});

const User = mongoose.model('User', userSchema);

module.exports = User;