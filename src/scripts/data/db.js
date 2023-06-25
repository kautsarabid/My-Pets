const { connect, connection } = require('mongoose');
const { config } = require('dotenv');
// require('dotenv').config()
// console.log(process.env)

module.exports = () => {
  config();
  const uri = process.env.DB_URI;

  connect(uri, {
    dbName: process.env.DB_NAME,
    user: process.env.DB_USER,
    pass: process.env.DB_PASSWORD,
  })
    .then(() => {
      console.log('Connection estabislished with MongoDB');
    })
    .catch(error => console.error(error.message));
}