class FromMasuk extends HTMLElement {
  connectedCallback() {
    this.render();
  };

  render() {
    this.innerHTML = `
      <div class="container">
      <form class="form__masuk mx-5 border-black border border-dark-subtle p-5 rounded-2 shadow-lg w-75 mx-auto">
        <h1 class="text-center fw-bold fs-1">Masuk</h1>
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label fw-bold">Alamat Email</label>
          <input type="email" class="form-control p-3" id="exampleInputEmail1" aria-describedby="emailHelp"
            placeholder="Masukkan Alamat Email">
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label fw-bold">Kata Sandi</label>
          <input type="password" class="form-control p-3" id="exampleInputPassword1" placeholder="Masukkan Kata Sandi">
        </div>

        <button type="submit" class="btn__form rounded-3 shadow-sm p-3 mb-3">Submit</button>

        <div class="optional text-center">
          <p class="lead fw-bold mb-0">Lupa Kata Sandi? <span><a href="">Ganti</a></span></p>
          <p class="lead fw-bold mb-0">atau</p>
          <p class="lead fw-bold mb-0">Belum punya akun? <span><a href="../../templates/form-daftar.html">Daftar</a></span></p>
        </div>
      </form>
    </div>
    `
  };
};

customElements.define('app-form-masuk-custom', FromMasuk);