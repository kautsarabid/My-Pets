class AppLayananCustom extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
    <div class="container">
      <div class="layanan__section row row-cols-1 justify-content-lg-evenly align-items-lg-center">
        <section class="col col-lg-7 gambar mb-md-5 mb-sm-5 text-center">
          <img src="../images/kucing.png" alt="kucing" class="mx-auto d-block">

          <a href="#"
            class="btn__daftar__hewan__baru d-block text-center w-50 p-2 fs-6 fw-bold my-3 mx-auto rounded-5">Daftar
            Hewan
            Baru</a>
        </section>

        <section class="col col-lg deskripsi__layanan">
          <h1 class="fw-bold">Halo, Selamat Datang di Website <span class="title__mypets">Mypets</span><span
              class="tanda__seru">!</span></h1>

          <p class="fw-medium mb-3">Kami hadir dengan fitur menarik untuk membantu kamu buat lebih memperhatikan hewan
            peliharaanmu</p>


          <a href="#" class="d-inline-block text-center btn__cek__hewan p-4 fs-4 fw-bold mt-3 rounded-5">Cek Hewan
            Anda</a>

        </section>
      </div>

      <div class="col layanan__section__tentang">
        <section class="mt-5">
          <h2 class="fw-bold text-center">Tentang <span class="title__mypets">MyPets</span><span
              class="tanda__seru">!</span></h2>

          <article class="text-center">
            <p><span class="title__mypets fw-medium">MyPets</span><span class="tanda__seru fw-medium">!</span> merupakan
              sebuah
              website yang
              dapat membantu para pemilik hewan peliharaan agar lebih teratur
              dalam memberi
              makan, melakukan cek kesehatan dan rutin memberikan vaksinasi pada hewan mereka, selain itu juga dapat
              memberikan
              catatan riwayat penyakit yang di derita agar kedepannya tidak terjadi kesalahan penanganan.</p>

            <p><span class="title__mypets fw-medium">MyPets</span><span class="tanda__seru fw-medium">!</span> hadir
              karena banyak
              kasus pemilik hewan yang tidak terlalu memperhatikan hewan peliharaanya akibat dari memilih untuk
              memelihara hanya
              karena mengikuti trend</p>
          </article>
        </section>

        <section class="team__pengembang mt-lg-5">
          <h2 class="text-center fw-bold mb-lg-3">Team Pengembang</h2>
          <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 justify-content-center row-cols-xl-4">
            <div class="col">
              <img src="../images/sample-foto.png" alt="" class="mx-auto mb-3 d-block">
              <p class="text-center">Ferdinand Jery Wilkinson Sitorus</p>
            </div>
            <div class="col">
              <img src="../images/sample-foto.png" alt="" class="mx-auto mb-3 d-block">
              <p class="text-center">Irsan Efendi Rangkuti</p>
            </div>
            <div class="col">
              <img src="../images/sample-foto.png" alt="" class="mx-auto mb-3 d-block">
              <p class="text-center">Kautsar Abid Muttaqin</p>
            </div>
            <div class="col">
              <img src="../images/sample-foto.png" alt="" class="mx-auto mb-3 d-block">
              <p class="text-center">Alfian Rachmad Dianto</p>
            </div>
          </div>

        </section>
      </div>
    </div>
    `
  };
};

customElements.define('app-layanan-custom', AppLayananCustom);