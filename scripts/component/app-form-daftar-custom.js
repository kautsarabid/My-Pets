class FormDaftarCustom extends HTMLElement {
  connectedCallback() {
    this.render()
  }

  render() {
    this.innerHTML = `
     <div class="container">
      <form class="form__daftar mx-5 border-black border border-dark-subtle p-5 rounded-2 shadow-lg w-75 mx-auto">
        <h1 class="text-center fw-bold fs-1">Daftar</h1>

        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label fw-bold">Nama Lengkap</label>
          <input type="email" class="form-control p-3" id="exampleInputEmail1" aria-describedby="emailHelp"
            placeholder="Masukkan Nama Lengkap Anda">
        </div>

        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label fw-bold">Username</label>
          <input type="email" class="form-control p-3" id="exampleInputEmail1" aria-describedby="emailHelp"
            placeholder="Masukkan Username Anda">
        </div>

        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label fw-bold">Alamat Email</label>
          <input type="email" class="form-control p-3" id="exampleInputEmail1" aria-describedby="emailHelp"
            placeholder="Masukkan Alamat Email Anda">
        </div>

        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label fw-bold">Password</label>
          <input type="password" class="form-control p-3" id="exampleInputPassword1" placeholder="Masukkan Password">
        </div>

        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label fw-bold">No. WhatsApp</label>
          <input type="email" class="form-control p-3" id="exampleInputEmail1" aria-describedby="emailHelp"
            placeholder="Masukkan Nomor WhatsApp Anda">
        </div>

        <div class="mb-3">
          <label for="jenisKelamin" class="form-label fw-bold">Jenis Kelamin</label>
          <select class="form-select p-3" aria-label="Default select example" id="jenisKelamin">
            <option selected>Pilih Jenis Kelamin Anda</option>
            <option value="1">Laki-Laki</option>
            <option value="2">Perempuan</option>
          </select>
        </div>

        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label fw-bold">Alamat Rumah</label>
          <input type="email" class="form-control p-3" id="exampleInputEmail1" aria-describedby="emailHelp"
            placeholder="Masukkan Alamat Rumah Anda">
        </div>

        <button type="submit" class="btn__form rounded-3 shadow-sm p-3 mb-3">Daftar</button>

        <div class="optional text-center">
          <p class="lead fw-bold mb-0">Sudah punya akun? <span><a href="./form-masuk.html">Masuk</a></span></p>
        </div>
      </form>
    </div>
    `
  };
};

customElements.define('app-form-daftar-custom', FormDaftarCustom);