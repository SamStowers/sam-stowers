/**
 * Sam Stowers - Personal Academic Website & SAGE Deep Dive
 * Interactive features: Theme toggle, Benchmark visualizer, CV modal, Copy utilities
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initCvModal();
  initCopyButtons();
  initBenchmarkWidget();
  initMobileMenu();
  initScrollSpy();
});

/* ==========================================================================
   1. Theme Toggle (Dark / Light Mode)
   ========================================================================== */
function initThemeToggle() {
  const toggleBtn = document.getElementById('themeToggleBtn');
  if (!toggleBtn) return;

  const sunIcon = toggleBtn.querySelector('.sun-icon');
  const moonIcon = toggleBtn.querySelector('.moon-icon');
  
  // Check stored theme or system preference
  const savedTheme = localStorage.getItem('sam_stowers_theme');
  const systemPrefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
  
  const initialTheme = savedTheme || (systemPrefersLight ? 'light' : 'dark');
  applyTheme(initialTheme);

  toggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
    localStorage.setItem('sam_stowers_theme', newTheme);
  });

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    if (theme === 'light') {
      if (sunIcon) sunIcon.style.display = 'none';
      if (moonIcon) moonIcon.style.display = 'block';
    } else {
      if (sunIcon) sunIcon.style.display = 'block';
      if (moonIcon) moonIcon.style.display = 'none';
    }
  }
}

/* ==========================================================================
   2. CV Modal Preview
   ========================================================================== */
function initCvModal() {
  const modal = document.getElementById('cvModal');
  const openBtn = document.getElementById('openCvModalBtn');
  const closeBtn = document.getElementById('closeCvModalBtn');

  if (!modal) return;

  if (openBtn) {
    openBtn.addEventListener('click', () => {
      modal.classList.add('active');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });

  function closeModal() {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
}

/* ==========================================================================
   3. Copy to Clipboard with Toast Notification
   ========================================================================== */
function initCopyButtons() {
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toastMessage');

  // Email copy buttons
  const emailButtons = document.querySelectorAll('.copy-email-btn');
  emailButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const email = btn.getAttribute('data-email') || 'samuelstowers04@gmail.com';
      copyTextToClipboard(email, 'Email copied to clipboard!');
    });
  });

  // Code & BibTeX copy buttons
  const codeCopyButtons = document.querySelectorAll('.code-copy-btn');
  codeCopyButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-copy-target');
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        copyTextToClipboard(targetEl.innerText, 'Copied snippet to clipboard!');
      }
    });
  });

  function copyTextToClipboard(text, successMsg) {
    navigator.clipboard.writeText(text).then(() => {
      showToast(successMsg || 'Copied to clipboard!');
    }).catch(err => {
      console.error('Copy failed', err);
      // Fallback
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        showToast(successMsg || 'Copied to clipboard!');
      } catch (e) {
        showToast('Failed to copy');
      }
      document.body.removeChild(textArea);
    });
  }

  function showToast(message) {
    if (!toast) return;
    if (toastMessage) toastMessage.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  }
}

/* ==========================================================================
   4. Interactive Benchmark Visualizer (SAGE Deep Dive)
   ========================================================================== */
function initBenchmarkWidget() {
  const tabs = document.querySelectorAll('.benchmark-tab-btn');
  if (!tabs.length) return;

  const benchmarkData = {
    '2x': {
      speedup: '+108% (2.08× Speedup)',
      vanillaWidth: '48%',
      vanillaLabel: '1.0× (Baseline)',
      sageWidth: '100%',
      sageLabel: '2.08×',
      wastedBadge: '-64% Cycles',
      vanillaCyclesWidth: '95%',
      vanillaCyclesLabel: '100% (High Waste)',
      sageCyclesWidth: '36%',
      sageCyclesLabel: '36% (Reduced Waste)'
    },
    '4x': {
      speedup: '+142% (2.42× Speedup)',
      vanillaWidth: '41%',
      vanillaLabel: '1.0× (Baseline)',
      sageWidth: '100%',
      sageLabel: '2.42×',
      wastedBadge: '-73% Cycles',
      vanillaCyclesWidth: '100%',
      vanillaCyclesLabel: '100% (Severe Waste)',
      sageCyclesWidth: '27%',
      sageCyclesLabel: '27% (Minimized Waste)'
    },
    '8x': {
      speedup: '+165% (2.65× Speedup)',
      vanillaWidth: '37%',
      vanillaLabel: '1.0× (Baseline)',
      sageWidth: '100%',
      sageLabel: '2.65×',
      wastedBadge: '-79% Cycles',
      vanillaCyclesWidth: '100%',
      vanillaCyclesLabel: '100% (Pathological)',
      sageCyclesWidth: '21%',
      sageCyclesLabel: '21% (Stabilized)'
    }
  };

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const ratio = tab.getAttribute('data-ratio');
      const data = benchmarkData[ratio];
      if (!data) return;

      const speedupBadge = document.getElementById('speedup-badge');
      const barVanilla = document.getElementById('bar-vanilla-throughput');
      const barSage = document.getElementById('bar-sage-throughput');
      const wastedBadge = document.getElementById('wasted-badge');
      const barVanillaCycles = document.getElementById('bar-vanilla-cycles');
      const barSageCycles = document.getElementById('bar-sage-cycles');

      if (speedupBadge) speedupBadge.textContent = data.speedup;
      if (barVanilla) {
        barVanilla.style.width = data.vanillaWidth;
        barVanilla.textContent = data.vanillaLabel;
      }
      if (barSage) {
        barSage.style.width = data.sageWidth;
        barSage.textContent = data.sageLabel;
      }
      if (wastedBadge) wastedBadge.textContent = data.wastedBadge;
      if (barVanillaCycles) {
        barVanillaCycles.style.width = data.vanillaCyclesWidth;
        barVanillaCycles.textContent = data.vanillaCyclesLabel;
      }
      if (barSageCycles) {
        barSageCycles.style.width = data.sageCyclesWidth;
        barSageCycles.textContent = data.sageCyclesLabel;
      }
    });
  });
}

/* ==========================================================================
   5. Mobile Menu Toggle
   ========================================================================== */
function initMobileMenu() {
  const menuBtn = document.getElementById('mobileMenuBtn');
  const navLinks = document.getElementById('navLinks');

  if (!menuBtn || !navLinks) return;

  menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('mobile-open');
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('mobile-open');
    });
  });
}

/* ==========================================================================
   6. Active Scroll Spy
   ========================================================================== */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

  if (!sections.length || !navLinks.length) return;

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPos = window.scrollY + 120;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}
