const express = require('express');
const expressLayout = require('express-ejs-layouts');
const { loadDataHewan, findHewan, addHewan, deleteDataHewan, updateDataHewans } = require('./src/scripts/utils/data-hewan')
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');

const app = express();
const port = 3000;

// Menggunakan EJS
app.set('views', './src/scripts/views');
app.set('view engine', 'ejs');

// Built-in middleware
app.use(expressLayout);
app.use(express.static('src'));
app.use(express.urlencoded({ extended: true }));

// konfigurasi flash
app.use(cookieParser('secret'));
app.use(session({
  cookie: { maxAge: 6000 },
  secret: 'secret',
  resave: true,
  saveUninitialized: true
})
);
app.use(flash())

app.get('/', (req, res) => {
  res.render('landing-page', {
    layout: 'landing-page',
    title: 'Home'
  });
});

app.get('/form-daftar', (req, res) => {
  res.render('templates/form-daftar', {
    layout: 'layouts/main',
    title: 'Daftar'
  });
});

app.get('/form-masuk', (req, res) => {
  res.render('templates/form-masuk', {
    layout: 'layouts/main',
    title: 'Masuk'
  });
});

app.get('/layanan', (req, res) => {
  res.render('templates/layanan', {
    layout: 'layouts/main',
    title: 'Layanan'
  });
});


app.get('/form-pendataan-hewan', (req, res) => {
  res.render('templates/form-pendataan-hewan', {
    layout: 'layouts/main',
    title: 'Pendataan Hewan Peliharaan'
  });
});


app.get('/data-hewan', (req, res) => {
  const dataHewans = loadDataHewan();
  res.render('templates/data-hewan', {
    layout: 'layouts/main',
    title: 'Data Hewan',
    dataHewans,
    msg: req.flash('msg')
  });
});

// Proses data hewan
app.post('/data-hewan', (req, res) => {
  addHewan(req.body);
  req.flash('msg', 'Data Berhasil ditambahkan!')
  res.redirect('/data-hewan')
  // res.send(req.body);
});

// Menghapus detail data hewan
app.get('/data-hewan/delete/:nama', (req, res) => {
  const dataHewan = findHewan(req.params.nama);

  //Jika data tidak ada
  if (!dataHewan) {
    res.status(404);
    res.send('<h1>Not Found</h1>')
  } else {
    req.flash('msg', 'Data Berhasil dihapus!')
    deleteDataHewan(req.params.nama);
    res.redirect('/data-hewan')
  }
});

// Mengubah data hewan
app.get('/data-hewan/edit/:nama', (req, res) => {
  const dataHewan = findHewan(req.params.nama);

  res.render('templates/form-ubah-pendataan-hewan', {
    layout: 'layouts/main',
    title: 'Mengubah Pendataan Hewan Peliharaan',
    dataHewan
  });
});

// Proses Mengubah data hewan
app.post('/data-hewan/update', (req, res) => {
  updateDataHewans(req.body);
  req.flash('msg', 'Data Berhasil diubah!')
  res.redirect('/data-hewan')
})

// Halaman detail data hewan
app.get('/data-hewan/:nama', (req, res) => {
  const dataHewan = findHewan(req.params.nama);
  res.render('templates/detail', {
    layout: 'layouts/main',
    title: 'Detail Hewan',
    dataHewan
  });
});

app.use('/', (req, res) => {
  res.status(404);
  res.send('not found');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});