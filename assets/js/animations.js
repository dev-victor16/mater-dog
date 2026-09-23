/**
 * MATER DOG — ANIMAÇÕES E TRANSIÇÕES REFINADAS
 * Observador de interseção para revelação suave ao rolar a página
 */

document.addEventListener('DOMContentLoaded', () => {
  // Configuração do IntersectionObserver para revelar elementos suavemente
  const revealElements = document.querySelectorAll('[data-reveal]');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const delay = entry.target.getAttribute('data-reveal-delay') || '0';
          setTimeout(() => {
            entry.target.classList.add('is-revealed');
          }, parseInt(delay, 10));
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => {
      el.classList.add('reveal-pending');
      revealObserver.observe(el);
    });
  } else {
    // Fallback caso o navegador não suporte
    revealElements.forEach(el => el.classList.add('is-revealed'));
  }

  // Header scroll transition
  const siteHeader = document.querySelector('.site-header');
  if (siteHeader) {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > 40) {
        siteHeader.classList.add('is-scrolled');
      } else {
        siteHeader.classList.remove('is-scrolled');
      }
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }
});
