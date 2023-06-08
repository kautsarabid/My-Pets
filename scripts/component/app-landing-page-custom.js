class LandingPageCustom extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <div class="container">
        <div class="halaman__utama d-xl-flex justify-content-xl-evenly align-items-xl-center">
          <div class="deskripsi__section">
            <h1 class="title__section fw-bold"><span>Pastikan</span> Kesehatan Hewanmu</h1>
            <p class="fs-6">Atur jadwal makan, jaga pola makan, cek kesehatan berkala dan selalu pastikan kondisinya</p>
            <a href="../../templates/form-daftar.html" type="button" class="btn__daftar w-50">Daftar</a>
          </div>

          <img src="./images/dog.png" alt="foto anjing bertopi">
        </div>
      </div>
    `
  };
};

customElements.define('app-landing-page-custom', LandingPageCustom);