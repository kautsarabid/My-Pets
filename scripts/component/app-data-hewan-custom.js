class AppDataHewanCustom extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
    <div class="container">
      <h1 class="text-center fw-bold mb-3">Data Hewan</h1>
      <div class="w-100 justify-content-center align-items-center row row-cols-1 gap-4">
        <div class="card col" style="width: 18rem;">
          <div class="card-body">
            <h5 class="card-title fs-2 fw-bold">Kucing</h5>
            <h6 class="card-subtitle mb-2">Ben</h6>
            <h6>20 Tahun</h6>
            <h6>15 Kg</h6>
            <a href="#" class="card-link">Detail</a>
          </div>
        </div>

        <div class="card col" style="width: 18rem;">
          <div class="card-body">
            <h5 class="card-title fs-2 fw-bold">Kucing</h5>
            <h6 class="card-subtitle mb-2">Ben</h6>
            <h6>20 Tahun</h6>
            <h6>15 Kg</h6>
            <a href="#" class="card-link">Detail</a>
          </div>
        </div>

        <div class="card col" style="width: 18rem;">
          <div class="card-body">
            <h5 class="card-title fs-2 fw-bold">Kucing</h5>
            <h6 class="card-subtitle mb-2">Ben</h6>
            <h6>20 Tahun</h6>
            <h6>15 Kg</h6>
            <a href="#" class="card-link">Detail</a>
          </div>
        </div>

        <div class="card col" style="width: 18rem;">
          <div class="card-body">
            <h5 class="card-title fs-2 fw-bold">Kucing</h5>
            <h6 class="card-subtitle mb-2">Ben</h6>
            <h6>20 Tahun</h6>
            <h6>15 Kg</h6>
            <a href="#" class="card-link">Detail</a>
          </div>
        </div>

        <div class="card col" style="width: 18rem;">
          <div class="card-body">
            <h5 class="card-title fs-2 fw-bold">Kucing</h5>
            <h6 class="card-subtitle mb-2">Ben</h6>
            <h6>20 Tahun</h6>
            <h6>15 Kg</h6>
            <a href="#" class="card-link">Detail</a>
          </div>
        </div>

      </div>
    </div>
    `
  };
};

customElements.define('app-data-hewan-custom', AppDataHewanCustom);