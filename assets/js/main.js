/**
 * MATER DOG — SCRIPT PRINCIPAL
 * Menu responsivo, FAQ interativo, âncoras suaves e status em tempo real
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Menu Mobile (Drawer)
  const mobileToggle = document.querySelector('.mobile-toggle');
  const mobileDrawer = document.querySelector('.mobile-drawer');
  const drawerBackdrop = document.querySelector('.drawer-backdrop');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  function openDrawer() {
    if (mobileToggle) mobileToggle.classList.add('is-active');
    if (mobileDrawer) mobileDrawer.classList.add('is-open');
    if (drawerBackdrop) drawerBackdrop.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    if (mobileToggle) mobileToggle.classList.remove('is-active');
    if (mobileDrawer) mobileDrawer.classList.remove('is-open');
    if (drawerBackdrop) drawerBackdrop.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileDrawer && mobileDrawer.classList.contains('is-open');
      if (isOpen) {
        closeDrawer();
      } else {
        openDrawer();
      }
    });
  }

  if (drawerBackdrop) {
    drawerBackdrop.addEventListener('click', closeDrawer);
  }

  mobileNavLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  // 2. FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (questionBtn) {
      questionBtn.addEventListener('click', () => {
        const isActive = item.classList.contains('is-active');

        // Fecha outros itens para manter elegância editorial
        faqItems.forEach(otherItem => {
          if (otherItem !== item) {
            otherItem.classList.remove('is-active');
            const otherBtn = otherItem.querySelector('.faq-question');
            if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
          }
        });

        // Alterna o item clicado
        if (isActive) {
          item.classList.remove('is-active');
          questionBtn.setAttribute('aria-expanded', 'false');
        } else {
          item.classList.add('is-active');
          questionBtn.setAttribute('aria-expanded', 'true');
        }
      });
    }
  });

  // 3. Scroll suave compensando a altura do header
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerHeight = document.querySelector('.site-header')?.offsetHeight || 70;
        const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight - 16;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // 4. Indicador Dinâmico de Plantão 24h
  const updateLiveStatus = () => {
    const statusBadges = document.querySelectorAll('.live-time-status');
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');

    statusBadges.forEach(badge => {
      badge.textContent = `Plantão 24h Ativo • Aberto agora (${hours}:${minutes})`;
    });
  };

  updateLiveStatus();
  setInterval(updateLiveStatus, 60000); // Atualiza o relógio a cada minuto
});
