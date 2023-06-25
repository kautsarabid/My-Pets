const mongoose = require('mongoose');
// const { config } = require('dotenv');
// require('dotenv').config()
// console.log(process.env)


const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      //must add in order to not get any error masseges:
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    console.log(`mongo database is connected!!! ${conn.connection.host} `)
  } catch (error) {
    console.error(`Error: ${error} `)
    process.exit(1) //passing 1 - will exit the proccess with error
  }
}

module.exports = connectDB;

// module.exports = () => {
//   config();
//   const uri = process.env.DB_URI;

//   connect(uri, {
//     dbName: process.env.DB_NAME,
//     user: process.env.DB_USER,
//     pass: process.env.DB_PASSWORD,
//   })
//     .then(() => {
//       console.log('Connection estabislished with MongoDB');
//     })
//     .catch(error => console.error(error.message));
// }