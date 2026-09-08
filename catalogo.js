document.addEventListener('DOMContentLoaded', () => {
 
  const WHATSAPP_NUMBER = '18093260233';
 
  const cards = document.querySelectorAll('.catalog-card');
  const filterButtons = document.querySelectorAll('.filter-pill');
 
  // ---------- Revelado al hacer scroll (las tarjetas ya están en el HTML) ----------
  if ('IntersectionObserver' in window) {
    const cardObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          cardObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
 
    cards.forEach(card => cardObserver.observe(card));
  } else {
    cards.forEach(card => card.classList.add('is-visible'));
  } 
 
  
  const overlay = document.getElementById('modalOverlay');
  const modalImg = document.getElementById('modalImg');
  const modalCategory = document.getElementById('modalCategory');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDesc');
  const modalMaterial = document.getElementById('modalMaterial');
  const modalWhatsapp = document.getElementById('modalWhatsapp');
  let lastFocused = null;
 
  function openModal(card) {
    const { name, category, material, img, description } = card.dataset;
 
    modalImg.style.setProperty('--img', `url('${img}')`);
    modalCategory.textContent = category;
    modalTitle.textContent = name;
    modalDesc.textContent = description;
    modalMaterial.textContent = material;
 
    const message = `Hola, me interesa esta pieza del catálogo: "${name}". ¿Podrían darme precio y disponibilidad?`;
    modalWhatsapp.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
 
    lastFocused = document.activeElement;
    overlay.classList.add('is-active');
    document.body.classList.add('modal-open');
    document.getElementById('modalClose').focus();
  }
 
  function closeModal() {
    overlay.classList.remove('is-active');
    document.body.classList.remove('modal-open');
    if (lastFocused) lastFocused.focus();
  }
 
  cards.forEach(card => {
    card.addEventListener('click', () => openModal(card));
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openModal(card);
      }
    });
  });
 
  document.getElementById('modalClose').addEventListener('click', closeModal);
  document.getElementById('modalCloseBtn').addEventListener('click', closeModal);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('is-active')) closeModal();
  });
 
});