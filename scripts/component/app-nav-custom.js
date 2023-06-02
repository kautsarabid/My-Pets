class AppNavCustom extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <nav class="navbar navbar-expand-lg p-3 shadow-sm fixed-top">
      <div class="container-fluid">
        <a class="navbar-brand text-white fs-3 fw-bold" href="/">MyPets<span>!</span></a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavDropdown">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <a class="nav-link text-white" aria-current="page" href="#">Bantuan</a>
            </li>
            <li class="nav-item">
              <a class="nav-link text-white" href="#">Layanan</a>
            </li>
            <li class="nav-item">
              <a class="nav-link text-white" href="../../templates/form-masuk.html">Masuk</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    `
  };
};

customElements.define('app-nav-custom', AppNavCustom);