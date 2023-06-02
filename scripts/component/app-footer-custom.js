class AppFooterCustom extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
          <div class="deskripsi__footer mb-0 mt-5 text-white p-3">
      <div class="container text-center">
        <div class="row align-items-center">

          <div class="col-lg brand__name">
            <h1 class="fw-bold">MP<span>!</span></h1>
          </div>

          <div class="col-lg navigasi">
            <ul>
              <h2 class="title__footer">Navigasi</h2>
              <li><a href="">Beranda</a></li>
              <li><a href="">Masuk</a></li>
              <li><a href="">Daftar</a></li>
            </ul>
          </div>

          <div class="col-lg pengembang">
            <ul>
              <h2 class="title__footer">Pengembang</h2>
              <li><a href="">Ferdinand Jery Wilkinson Sitorus</a></li>
              <li><a href="">Irsan Efendi Rangkuti</a></li>
              <li><a href="">Kautsar Abid Muttaqin</a></li>
              <li><a href="">Alfian Rachmad Dianto</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div class="copyright__footer p-2 text-center text-white fw-bold ">
      <p>Copyright 2023: Dicoding Team C23-R4114</p>
    </div>
    `
  };
};

customElements.define('app-footer-custom', AppFooterCustom);