const checkbox = document.getElementByName('jadwalMakan');

checkbox.addEventListener('change', (event) => {
  if (event.target.checked) {
    checkbox.disabled = true;
    // Lakukan logika penjadwalan makan
    console.log('Makan telah dijadwalkan');
  }
});