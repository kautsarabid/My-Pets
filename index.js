const express = require('express');
const path = require('path');
const expressLayout = require('express-ejs-layouts');
const methodOverride = require('method-override');
const session = require('cookie-session');
// const MemoryStore = require('memorystore')(session);
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const bcrypt = require('bcrypt');

const dotenv = require('dotenv');
const connectDB = require('./src/scripts/data/db');
const User = require('./src/scripts/model/user');
const DataHewan = require('./src/scripts/model/data-hewan');

dotenv.config();
const app = express();
const port = process.env.PORT || 9001;
// const mode = process.env.NODE_ENV;

connectDB();


// Setup method override
app.use(methodOverride('_method'));

// Built-in middleware
app.use(expressLayout);
app.use(express.static(path.join(__dirname, './src/public')));
app.use(express.urlencoded({ extended: true }));

// Menggunakan EJS
app.set('views', path.join(__dirname, 'src/scripts/views'));
app.set('view engine', 'ejs');

// konfigurasi flash
app.use(cookieParser('secret'));
app.use(session({
  cookie: { maxAge: 24 * 60 * 60 * 1000 },
  // store: new MemoryStore({
  //   checkPeriod: 86400000 // prune expired entries every 24h
  // }),
  secret: 'secret',
  resave: false,
  saveUninitialized: true
})
);

// Middleware untuk memeriksa status login
const isAuthenticated = (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    res.redirect('/form-masuk');
  }
};

app.use(flash());
app.use((req, res, next) => {
  if (!req.session.user && req.cookies.session) {
    req.session.user = req.cookies.session;
  }
  next();
});

/**
 * KONFIGURASI HALAMAN
 */

// Landing Page
app.get('/', (req, res) => {
  res.render('landing-page', {
    layout: 'landing-page',
    title: 'Home',
    user: req.session.user,
    currentPage: 'landing'
  });
});

// Halaman Daftar
app.get('/form-daftar', (req, res) => {
  res.render('templates/form-daftar', {
    layout: 'layouts/main',
    title: 'Daftar',
    message: req.flash('message'),
    currentPage: 'userLogin'
  });
});

// Proses daftar akun
app.post('/form-daftar', async (req, res) => {
  const { namaLengkap, username, email, password, confirmPassword, noHp, jenisKelamin, alamatRumah } = req.body;

  try {
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      req.flash('message', 'email sudah digunakan');
      res.redirect('/form-daftar');
      return;
    }

    if (password !== confirmPassword) {
      req.flash('message', 'Password tidak cocok');
      res.redirect('/form-daftar');
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      namaLengkap: namaLengkap,
      username: username,
      email: email,
      password: hashedPassword,
      noHp: noHp,
      jenisKelamin: jenisKelamin,
      alamatRumah: alamatRumah,
    });
    await newUser.save();

    req.flash('message', 'Registrasi berhasil');
    res.redirect('/form-masuk');
  } catch (error) {
    console.error(error);
    req.flash('message', 'Terjadi kesalahan');
    res.redirect('/form-daftar');
  }
});

// Halaman Masuk
app.get('/form-masuk', (req, res) => {
  res.render('templates/form-masuk', {
    layout: 'layouts/main',
    title: 'Masuk',
    message: req.flash('message'),
    currentPage: 'userLogin'
  });
});

// Proses Masuk
app.post('/form-masuk', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      req.flash('message', 'email atau password salah');
      res.redirect('/form-masuk');
      return;
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      req.flash('message', 'email atau password salah');
      res.redirect('/form-masuk');
      return;
    }

    req.session.user = user._id;
    res.redirect('/layanan');
  } catch (error) {
    console.error(error);
    req.flash('message', 'Terjadi kesalahan');
    res.redirect('/form-masuk');
  }
});

// Logout
app.get('/logout', (req, res) => {
  req.session.destroy();
  res.clearCookie('session');
  res.redirect('/form-masuk');
});

// Halaman Layanan
app.get('/layanan', isAuthenticated, (req, res) => {
  if (req.session.user) {
    res.render('templates/layanan', {
      layout: 'layouts/main',
      title: 'Layanan',
      user: req.session.user,
      currentPage: 'userLogin'
    });
  } else {
    res.redirect('/form-masuk');
    req.flash('message', 'Silahkan Lakukan Login Terlebih Dahulu');
  }
});

// Halaman Pendataan Hewan
app.get('/form-pendataan-hewan', isAuthenticated, (req, res) => {
  if (req.session.user) {
    res.render('templates/form-pendataan-hewan', {
      layout: 'layouts/main',
      title: 'Pendataan Hewan Peliharaan',
      currentPage: 'userLogin',
      user: req.session.user,
    });
  } else {
    res.redirect('/form-masuk');
    req.flash('message', 'Silahkan Lakukan Login Terlebih Dahulu');
  }
});

// Halaman Data Hewan Peliharaan
app.get('/data-hewan', isAuthenticated, async (req, res) => {
  if (req.session.user) {
    const userId = req.session.user;
    const dataHewan = await DataHewan.find({ userId: userId });
    res.render('templates/data-hewan', {
      layout: 'layouts/main',
      title: 'Data Hewan',
      dataHewan,
      user: req.session.user,
      msg: req.flash('msg'),
      currentPage: 'userLogin'
    });
  } else {
    res.redirect('/form-masuk');
    req.flash('message', 'Silahkan Lakukan Login Terlebih Dahulu');
  }
});

// Halaman pengisian jadwal makan
app.get('/data-hewan/:nama/form-jadwal-makan', isAuthenticated, async (req, res) => {
  if (req.session.user) {
    const dataHewan = await DataHewan.findOne({ nama: req.params.nama });
    res.render('templates/form-jadwal-makan', {
      layout: 'layouts/main',
      title: 'Form Jadwal Makan',
      dataHewan,
      user: req.session.user,
      currentPage: 'userLogin'
    });
  } else {
    res.redirect('/form-masuk');
    req.flash('message', 'Silahkan Lakukan Login Terlebih Dahulu');
  }
});

// Halaman List jadwal makan
app.get('/data-hewan/:nama/list-jadwal-makan', isAuthenticated, async (req, res) => {
  try {
    const { nama } = req.params;
    const userId = req.session.user; // Ambil ID pengguna dari sesi

    const dataHewan = await DataHewan.findOne({ nama: nama, userId: userId });

    if (!dataHewan) {
      req.flash('msg', 'Data hewan tidak ditemukan');
      res.redirect('/data-hewan');
      return;
    }

    res.render('templates/list-jadwal-makan', {
      layout: 'layouts/main',
      title: 'List Jadwal Makan',
      dataHewan,
      user: req.session.user,
      msg: req.flash('msg'),
      currentPage: 'userLogin'
    });
  } catch (error) {
    console.error(error);
    req.flash('msg', 'Terjadi kesalahan saat mengambil data hewan');
    res.redirect('/data-hewan');
  }
})


// proses memasukan jadwal makanan hewan
app.post('/data-hewan/:nama/jadwal-makan', isAuthenticated, async (req, res) => {
  const { nama } = req.params;
  const { hariMakan, waktuMakan, tanggalMakan } = req.body;

  try {
    const dataHewan = await DataHewan.findOne({ nama: nama });

    if (!dataHewan) {
      throw new Error('Data hewan tidak ditemukan');
    }

    dataHewan.jadwalMakan.push({ hariMakan: hariMakan, waktuMakan: waktuMakan, tanggalMakan: tanggalMakan, });
    await dataHewan.save();

    req.flash('msg', `Hewan Peliharaan Anda sudah makan ${hariMakan}`);
    res.redirect(`/data-hewan/${nama}/list-jadwal-makan`);
  } catch (error) {
    console.error(error);
    req.flash('msg', 'Terjadi kesalahan saat menambahkan jadwal makan');
    res.redirect(`/data-hewan/${nama}/list-jadwal-makan`);
  }
});


// Form jadwal vaksin
app.get('/data-hewan/:nama/form-jadwal-vaksin', isAuthenticated, async (req, res) => {
  if (req.session.user) {
    const { nama } = req.params;
    const dataHewan = await DataHewan.findOne({ nama: nama });

    if (!dataHewan) {
      req.flash('msg', 'Data hewan tidak ditemukan');
      res.redirect('/data-hewan');
      return;
    }

    res.render('templates/form-jadwal-vaksin', {
      layout: 'layouts/main',
      title: 'Form Jadwal Vaksin',
      dataHewan,
      user: req.session.user,
      msg: req.flash('msg'),
      currentPage: 'userLogin'
    });
  } else {
    res.redirect('/form-masuk');
    req.flash('message', 'Silahkan Lakukan Login Terlebih Dahulu');
  }
});

// Halaman tiket vaksin
app.get('/data-hewan/:nama/kartu-vaksin', isAuthenticated, async (req, res) => {
  const dataHewan = await DataHewan.findOne({ nama: req.params.nama });
  if (req.session.user) {
    res.render('templates/kartu-vaksin', {
      layout: 'layouts/main',
      title: 'Tiket Vaksin',
      dataHewan,
      msg: req.flash('msg'),
      user: req.session.user,
      waktuVaksin: dataHewan.tiketVaksin[0].waktuVaksin,
      tanggalVaksin: dataHewan.tiketVaksin[0].tanggalVaksin,
      currentPage: 'userLogin'
    });
  } else {
    res.redirect('/form-masuk');
    req.flash('message', 'Silahkan Lakukan Login Terlebih Dahulu');
  }
});

// Proses Jadwal Vaksin
app.post('/data-hewan/:nama/kartu-vaksin', isAuthenticated, async (req, res) => {
  const { nama } = req.params;
  const { waktuVaksin, tanggalVaksin } = req.body;

  try {
    const dataHewan = await DataHewan.findOne({ nama: nama });

    if (!dataHewan) {
      throw new Error('Data hewan tidak ditemukan');
    }
    dataHewan.tiketVaksin.push({ waktuVaksin: waktuVaksin, tanggalVaksin: tanggalVaksin, });
    await dataHewan.save();

    req.flash('msg', `Kartu Vaksin ${nama} Berhasil dibuat`);
    res.redirect(`/data-hewan/${nama}/kartu-vaksin`);
  } catch (error) {
    console.error(error);
    req.flash('msg', 'Terjadi kesalahan saat membuat tiket vaksin');
    res.redirect(`/data-hewan/${nama}/kartu-vaksin`);
  }
});;



// Proses data hewan
app.post('/data-hewan', isAuthenticated, async (req, res) => {
  try {
    const { nama, jenis, umur, beratBadan, vaksin } = req.body;
    const userId = req.session.user; // Ambil ID pengguna dari sesi

    const newDataHewan = new DataHewan({
      nama: nama,
      jenis: jenis,
      umur: umur,
      beratBadan: beratBadan,
      vaksin: vaksin,
      userId: userId // Simpan ID pengguna terkait
    });

    await newDataHewan.save();

    req.flash('msg', 'Data Berhasil ditambahkan!');
    res.redirect('/data-hewan');
  } catch (error) {
    console.error(error);
    req.flash('msg', 'Terjadi kesalahan saat menambahkan data hewan');
    res.redirect('/data-hewan');
  }
});

// Menghapus detail data hewan
app.delete('/data-hewan', isAuthenticated, (req, res) => {
  DataHewan.deleteOne({ nama: req.body.nama }).then((result) => {
    req.flash('msg', 'Data Berhasil dihapus!');
    res.redirect('/data-hewan');
  });
});

// Mengubah data hewan
app.get('/data-hewan/edit/:nama', isAuthenticated, async (req, res) => {
  const dataHewan = await DataHewan.findOne({ nama: req.params.nama })
  if (req.session.user) {
    res.render('templates/form-ubah-pendataan-hewan', {
      layout: 'layouts/main',
      title: 'Mengubah Pendataan Hewan Peliharaan',
      dataHewan,
      user: req.session.user,
      currentPage: 'userLogin'
    });
  } else {
    res.redirect('/form-masuk');
    req.flash('message', 'Silahkan Lakukan Login Terlebih Dahulu');
  }
});

// Proses mengubah data
app.put('/data-hewan', isAuthenticated, (req, res) => {
  DataHewan.updateOne(
    { _id: req.body._id },
    {
      $set: {
        nama: req.body.nama,
        jenis: req.body.jenis,
        umur: req.body.umur,
        beratBadan: req.body.beratBadan,
      },
    }
  ).then((result) => {
    req.flash('msg', 'Data Berhasil diubah!');
    res.redirect('/data-hewan');
    // res.send(req.body)
  })
})

// Halaman detail data hewan
app.get('/data-hewan/:nama', isAuthenticated, async (req, res) => {
  const dataHewan = await DataHewan.findOne({ nama: req.params.nama });
  if (req.session.user) {
    res.render('templates/detail', {
      layout: 'layouts/main',
      title: 'Detail Hewan',
      dataHewan,
      user: req.session.user,
      currentPage: 'userLogin'
    });
  } else {
    res.redirect('/form-masuk');
    req.flash('message', 'Silahkan Lakukan Login Terlebih Dahulu');
  }
});

app.use('/', (req, res) => {
  res.status(404);
  res.send('not found');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});