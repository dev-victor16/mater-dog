/**
 * MATER DOG — LIGHTBOX INTERATIVO PARA FOTOS REAIS DA CLÍNICA
 */

document.addEventListener('DOMContentLoaded', () => {
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightboxModal = document.getElementById('gallery-lightbox');
  const lightboxImg = lightboxModal ? lightboxModal.querySelector('.lightbox-img') : null;
  const lightboxCaption = lightboxModal ? lightboxModal.querySelector('.lightbox-caption') : null;
  const lightboxClose = lightboxModal ? lightboxModal.querySelector('.lightbox-close') : null;

  if (!lightboxModal || !lightboxImg) return;

  function openLightbox(src, caption) {
    lightboxImg.src = src;
    lightboxImg.alt = caption || 'Fotografia da Clínica Mater Dog';
    if (lightboxCaption) {
      lightboxCaption.textContent = caption || '';
    }
    lightboxModal.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightboxModal.classList.remove('is-open');
    document.body.style.overflow = '';
    setTimeout(() => {
      lightboxImg.src = '';
    }, 200);
  }

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      const title = item.querySelector('.gallery-title');
      const subtitle = item.querySelector('.gallery-subtitle');
      const captionText = title ? `${title.textContent} — ${subtitle ? subtitle.textContent : ''}` : '';

      if (img) {
        openLightbox(img.src, captionText);
      }
    });
  });

  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
  }

  lightboxModal.addEventListener('click', (e) => {
    if (e.target === lightboxModal) {
      closeLightbox();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightboxModal.classList.contains('is-open')) {
      closeLightbox();
    }
  });
});
