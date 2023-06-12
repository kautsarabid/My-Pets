class AppNavCustom extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <nav class="navbar navbar-expand-sm p-3 shadow-sm fixed-top">
      <div class="container-fluid">
        <a class="navbar-brand text-white fs-3 fw-bold" href="/">MyPets<span>!</span></a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavDropdown">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item text-center fs-6 ">
              <a class="nav-link text-white p-3" aria-current="page" href="../../templates/data-hewan.html">Data Hewan</a>
            </li>
            <li class="nav-item text-center fs-6">
              <a class="nav-link text-white p-3" href="../../templates/layanan.html">Layanan</a>
            </li>
            <li class="nav-item text-center fs-6">
              <a class="nav-link text-white p-3" href="../../templates/form-masuk.html">Masuk</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    `
  };
};

customElements.define('app-nav-custom', AppNavCustom);