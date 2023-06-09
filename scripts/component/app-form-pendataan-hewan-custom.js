class FormPendataanHewanCustom extends HTMLElement {
  connectedCallback() {
    this.render()
  }

  render() {
    this.innerHTML = `
     <div class="container-fluid">
      <form action=""
        class="form__pendataan-hewan border-black border border-dark-subtle p-5 rounded-2 shadow-lg  mx-auto">
        <h1 class="mb-3 fs-1 text-center fw-bold">Pendataan Hewan Peliharaan</h1>
        <div class="mb-3">
          <label for="namaHewan" class="form-label fw-bold">Nama Hewan</label>
          <input type="text" class="form-control p-3" id="namaHewan" placeholder="Masukkan nama hewan peliharaan Anda">
        </div>

        <div class="mb-3">
          <label for="jenisHewan" class="form-label fw-bold">Jenis Hewan</label>
          <input type="text" class="form-control p-3" id="jenisHewan"
            placeholder="Masukkan jenis hewan peliharaan Anda">
        </div>

        <div class="mb-3">
          <label for="umurHewan" class="form-label fw-bold">Umur Hewan</label>
          <div class="input-group">
            <input type="number" class="form-control p-3" id="umurHewan"
              placeholder="Masukkan umur hewan peliharaan Anda" aria-label="Recipient's age"
              aria-describedby="basic-addon2">
            <span class="input-group-text" id="basic-addon2">Tahun</span>
          </div>
        </div>

        <div class="mb-4">
          <label for="beratBadanHewan" class="form-label fw-bold">Berat Badan Hewan</label>
          <div class="input-group">
            <input type="number" class="form-control p-3" id="beratBadanHewan"
              placeholder="Masukkan berat badan hewan peliharaan Anda" aria-label="Recipient's berat badan"
              aria-describedby="basic-addon3">
            <span class="input-group-text" id="basic-addon3">Kg</span>
          </div>
        </div>

        <button type="submit" class="btn__form rounded-3 shadow-sm p-3 mb-3">Submit</button>
      </form>
    </div>
    `
  };
};

customElements.define('app-form-pendataan-hewan-custom', FormPendataanHewanCustom);