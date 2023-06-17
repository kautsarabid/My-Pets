const express = require('express');
const expressLayout = require('express-ejs-layouts');
const methodOverride = require('method-override');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');

require('./src/scripts/data/db')
const DataHewan = require('./src/scripts/model/data-hewan')

const app = express();
const port = 3000;

// Menggunakan EJS
app.set('views', './src/scripts/views');
app.set('view engine', 'ejs');

// Setup method override
app.use(methodOverride('_method'));

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


app.get('/data-hewan', async (req, res) => {
  const dataHewan = await DataHewan.find();

  res.render('templates/data-hewan', {
    layout: 'layouts/main',
    title: 'Data Hewan',
    dataHewan,
    msg: req.flash('msg')
  });
});

app.get('/data-hewan/:nama/form-jadwal-makan', async (req, res) => {
  const dataHewan = await DataHewan.findOne({ nama: req.params.nama })
  res.render('templates/form-jadwal-makan', {
    layout: 'layouts/main',
    title: 'Form Jadwal Makan',
    dataHewan,
  });
});

// Halaman List jadwal makan
app.get('/data-hewan/:nama/list-jadwal-makan', async (req, res) => {
  const { nama } = req.params;
  const dataHewan = await DataHewan.findOne({ nama: nama });

  if (!dataHewan) {
    req.flash('msg', 'Data hewan tidak ditemukan');
    res.redirect('/data-hewan');
    return;
  }

  res.render('templates/list-jadwal-makan', {
    layout: 'layouts/main',
    title: 'List Jadwal Makan',
    dataHewan,
    msg: req.flash('msg')
  });
});



// proses memasukan jadwal makanan hewan
app.post('/data-hewan/:nama/jadwal-makan', async (req, res) => {
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
app.get('/data-hewan/:nama/form-jadwal-vaksin', async (req, res) => {
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
    msg: req.flash('msg')
  });
});

// Halaman tiket vaksin
app.get('/data-hewan/:nama/kartu-vaksin', async (req, res) => {
  const dataHewan = await DataHewan.findOne({ nama: req.params.nama })
  res.render('templates/kartu-vaksin', {
    layout: 'layouts/main',
    title: 'Tiket Vaksin',
    dataHewan,
    msg: req.flash('msg'),
    waktuVaksin: dataHewan.tiketVaksin[0].waktuVaksin,
    tanggalVaksin: dataHewan.tiketVaksin[0].tanggalVaksin
  });
});

// Proses Jadwal Vaksin
app.post('/data-hewan/:nama/kartu-vaksin', async (req, res) => {
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
app.post('/data-hewan', async (req, res) => {
  await DataHewan.insertMany(req.body);
  req.flash('msg', 'Data Berhasil ditambahkan!');
  res.redirect('/data-hewan');
});

// Menghapus detail data hewan
app.delete('/data-hewan', (req, res) => {
  DataHewan.deleteOne({ nama: req.body.nama }).then((result) => {
    req.flash('msg', 'Data Berhasil dihapus!');
    res.redirect('/data-hewan');
  })
});

// Mengubah data hewan
app.get('/data-hewan/edit/:nama', async (req, res) => {
  const dataHewan = await DataHewan.findOne({ nama: req.params.nama })

  res.render('templates/form-ubah-pendataan-hewan', {
    layout: 'layouts/main',
    title: 'Mengubah Pendataan Hewan Peliharaan',
    dataHewan
  });
});

// Proses mengubah data
app.put('/data-hewan', (req, res) => {
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
    req.flash('msg', 'Data Berhasil diubah!')
    res.redirect('/data-hewan')
    // res.send(req.body)
  })
})

// Halaman detail data hewan
app.get('/data-hewan/:nama', async (req, res) => {
  const dataHewan = await DataHewan.findOne({ nama: req.params.nama });
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