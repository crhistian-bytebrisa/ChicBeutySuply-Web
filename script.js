const productos = [
    {
      category: "Collares",
      name: "Collar Corazón Rubí",
      material: "Acero Inoxidable",
      img: "images/collares-de-corazon.jpeg",
      description: "Hermoso collar con dije en forma de corazón color rubí."
    },
    {
      category: "Collares",
      name: "Collar Cadena Fina",
      material: "Acero Inoxidable",
      img: "images/collar.jpeg",
      description: "Cadena delicada y minimalista ideal para uso diario."
    },
    {
      category: "Collares",
      name: "Collar República Dominicana",
      material: "Acero Inoxidable",
      img: "images/collar-rd-y-luna.jpeg",
      description: "Diseño especial con dije silueta mapa RD y luna."
    },
    {
      category: "Sets",
      name: "Set Argollas y Cadena",
      material: "Acero Inoxidable",
      img: "images/aretes-y-collar.jpeg",
      description: "Juego combinado de aretes tipo argolla y cadena a juego."
    },
    {
      category: "Pulseras",
      name: "Pulsera Piedras Naturales",
      material: "Piedra",
      img: "images/pulseras.jpeg",
      description: "Pulsera elaborada con cuentas de piedra."
    },
    {
      category: "Pulseras",
      name: "Pulseras Gladiador",
      material: "Piedra Mate y Acero",
      img: "images/pulseras-gladiador.jpeg",
      description: "Pulseras de cuentas mate estilo masculino."
    },
    {
      category: "Collares",
      name: "Collar Multicapa Cereza",
      material: "Acero Inoxidable",
      img: "images/collar-multicapa-cereza.jpeg",
      description: "Un collar de acero inoxidable de doble capa, con una cuenta de cereza."
    },
    {
      category: "Collares",
      name: "Collares Solares",
      material: "Acero Inoxidable",
      img: "images/collar-sol.jpeg",
      description: "Collares hermosos con forma de soles de acero inoxidable."
    },
    {
      category: "Collares",
      name: "Collares De Rosas",
      material: "Acero Inoxidable",
      img: "images/collar-rosa.jpeg",
      description: "Collares en forma de Rosa, hermosos y delicados."
    },
    {
      category: "Collares",
      name: "Collar Trebol Dorado",
      material: "Acero Inoxidable",
      img: "images/collar-trebol.jpeg",
      description: "Collar dorado y blanco en forma de trebol, para que tengas suerte en tu vida."
    },
    {
      category: "Pulsesa",
      name: "Pulseras Bola 8",
      material: "Piedra",
      img: "images/pulseras-bola8.jpeg",
      description: "Pulseras con una bola 8, para que te vaya bien en tus partidas de billar."
    },
  ];

  //Funcion para renderizar el catalogo dentro de la web
function renderizarCatalogo(lista) {
    const container = document.getElementById('catalogGrid');
    if (!container) return;

    container.innerHTML = lista.map(p => `
      <article class="product catalog-card reveal"
        data-category="${p.category}"
        data-name="${p.name}"
        data-material="${p.material}"
        data-img="${p.img}"
        data-description="${p.description}"
        tabindex="0" role="button" aria-label="Ver detalles de ${p.name}">
        <div class="product-img" style="--img:url('${p.img}')"></div>
        <div class="product-info">
          <p class="eyebrow catalog-card-eyebrow">${p.category}</p>
          <h3>${p.name}</h3>
          <p>${p.description}</p>
        </div>
      </article>
    `).join('');
  }

document.addEventListener('DOMContentLoaded', () => {

  // Año dinámico en el footer
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Nav: fondo sólido al hacer scroll
  const nav = document.getElementById('nav');
  const onScroll = () => {
    if (window.scrollY > 40) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // Revelado suave al hacer scroll
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('is-visible'));
  }

  // Scroll suave para enlaces internos (fallback en navegadores sin scroll-behavior)
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId.length > 1) {
        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

  renderizarCatalogo(productos);

});

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