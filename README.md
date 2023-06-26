# Aplikasi pembantu pencatatan data dan jadwal hewan peliharaan

## My-Pets
**MyPets** merupakan sebuah website yang dapat membantu para pemilik hewan peliharaan agar lebih teratur dalam memberi makan, membuat jadwal vaksinasi pada hewan mereka.

## Fitur
- Registrasi Account
- Login
- Memasukkan Data Hewan Peliharaan
- Mengubah Data Hewan Peliharaan
- Menghapus Data Hewan Peliharaan
- Membuat Jadwal Makan untuk Setiap Hewan Peliharaan
- Membuat Jadwal Vaksin bagi Hewan Peliharaan yang Belum Melakukan Vaksinisasi

## Instalasi
- Download/Clone repository ini
- Jalankan perintah `npm install` untuk menginstall semua dependency yang digunakan
- Jalankan perintah `npm run start-dev` untuk memulai menggunakannya
- Terdapat *Example app listening on port 5000* pada terminal
- Click link berikut [localhost:5000](http://localhost:5000/) atau dapat juga mengetikan *http://localhost:5000/* pada web browser
- Mengganti connection pada file db.js dengan
  ```javascript
mongoose.connect('mongodb://127.0.0.1:27017/<nama_database>');
  ```

## Library atau External Repository/API yang digunakan
- [Bootsrap5](https://getbootstrap.com/)
- [ExpressJS](https://expressjs.com/)
- [NodeJS](https://nodejs.org/en)
- [MongoDB](https://www.mongodb.com/)
