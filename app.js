document.addEventListener('DOMContentLoaded', () => {
  if (typeof SimpleIcons !== 'undefined') {
    document.querySelectorAll('.icon-container').forEach(c => {
      const name = c.getAttribute('data-icon');
      if (name && SimpleIcons[name]) {
        c.innerHTML = SimpleIcons[name].svg;
        const svg = c.querySelector('svg');
        if (svg) {
          svg.setAttribute('fill', 'white');
          svg.setAttribute('width', '60');
          svg.setAttribute('height', '60');
        }
      }
    });
  }
  setupAnimations();
  setupWorkSection();
  setupTooltips();
  setupMobileMenu();
  setupGlowingBlob();
  setupParallaxTabs();
});

if (document.body) {
  document.body.classList.add('preload');

  if (!document.getElementById('page-loader')) {
    const loader = document.createElement('div');
    loader.id = 'page-loader';
    loader.innerHTML = '<div class="loader-spinner"></div>';
    loader.style.display = 'none';
    document.body.prepend(loader);
  }
}

window.onbeforeunload = () => {
  window.scrollTo(0, 0);
  return null;
};


/*  FUNCTIONS */

function setupAnimations () {
  window.scrollTo(0, 0);

  const opener = document.querySelector('.opener');
  const logoSpan = document.querySelectorAll('.logo');
  const animEls = document.querySelectorAll('.animation-show');

  animEls.forEach(el => el.classList.remove('animate'));
  logoSpan.forEach(span => span.classList.remove('active', 'fade'));

  void document.body.offsetHeight;     
  document.body.classList.remove('preload');

  if (opener) {
    opener.style.visibility = 'visible';
    setTimeout(() => {
      logoSpan.forEach((span, i) =>
        setTimeout(() => span.classList.add('active'), (i + 1) * 400)
      );
      setTimeout(() => {
        logoSpan.forEach((span, i) =>
          setTimeout(() => {
            span.classList.remove('active');
            span.classList.add('fade');
          }, (i + 1) * 50)
        );
      }, 2000);
      setTimeout(() => opener.style.top = '-100vh', 2300);
    }, 100);
  }

  setTimeout(() => {
    animEls.forEach((el, i) =>
      setTimeout(() => el.classList.add('animate'), i * 300)
    );
  }, 100);
}

function setupWorkSection () {
  const card = document.getElementById('project-card');
  if (!card) return;

  const workItems = document.querySelectorAll('.work-item');
  const work = document.querySelector('.work');
  const overlay = document.querySelector('.overlay');
  const prevEls = document.querySelectorAll('.prev');

  function clearPrev () {
    prevEls.forEach(p => p.classList.remove('active')); 
  }

  if (overlay) {
    overlay.style.top = '0%';
    overlay.style.left = '13.25%';
  }
  const prev2 = document.querySelector('#prev-2');
  if (prev2) prev2.classList.add('active');

  if (workItems.length && work && overlay) {
    workItems.forEach((item, idx) => {

      item.addEventListener('mouseover', () => {
        clearPrev();
        const activePrev = document.querySelector(`#prev-${idx + 1}`);
        if (activePrev) activePrev.classList.add('active');
        work.classList.add('hovered');

        switch (idx) {
          case 0: 
            overlay.style.top = '50%';
            overlay.style.left = '50%';
            work.className = 'work bg-color-red hovered';
            break;
          case 1: 
            overlay.style.top = '0%';
            overlay.style.left = '13.25%';
            work.className = 'work bg-color-blue hovered';
            break;
          case 2: 
            overlay.style.top = '-50%';
            overlay.style.left = '-23.5%';
            work.className = 'work bg-color-green hovered';
            break;
        }
      });

      item.addEventListener('mouseout', () => {
        work.classList.remove('hovered');
        work.className = 'work';
        overlay.style.top = '0%';
        overlay.style.left = '13.25%';
        clearPrev();
        if (prev2) prev2.classList.add('active');
      });
    });
  }
}

function setupTooltips () {
  const hovers = document.querySelectorAll('.hover-block');
  const tooltip = document.getElementById('tooltip');
  if (!hovers.length || !tooltip) return;

  hovers.forEach(block => {
    block.addEventListener('mousemove', e => {
      tooltip.textContent = block.getAttribute('data-tooltip') || '';
      tooltip.style.left = `${e.clientX + 30}px`;
      tooltip.style.top = `${e.clientY + 50}px`;
      tooltip.classList.add('visible');
    });
    block.addEventListener('mouseleave', () => tooltip.classList.remove('visible'));
  });
}

function setupMobileMenu () {
  const burger = document.querySelector('.mobile-menu-icon');
  const nav = document.querySelector('.navbar');
  if (burger && nav) burger.addEventListener('click', () => nav.classList.toggle('active'));
}

function setupGlowingBlob() {
  const blobs = document.querySelectorAll('.blob-effect');
  const techWrappers = document.querySelectorAll('.tech-wrapper');
  
  if (!blobs.length || !techWrappers.length) return;
  
  techWrappers.forEach((wrapper, index) => {
    const blob = blobs[index];
    if (!blob) return;
    
    const rect = wrapper.getBoundingClientRect();
    blob.style.left = `${rect.width / 2}px`;
    blob.style.top = `${rect.height / 2}px`;
    
    wrapper.addEventListener('mousemove', (e) => {
      const wrapperRect = wrapper.getBoundingClientRect();
      const relativeX = e.clientX - wrapperRect.left;
      const relativeY = e.clientY - wrapperRect.top;
      
      requestAnimationFrame(() => {
        blob.style.left = `${relativeX}px`;
        blob.style.top = `${relativeY}px`;
      });
    });
    
    wrapper.addEventListener('mouseleave', () => {
      const rect = wrapper.getBoundingClientRect();
      blob.style.left = `${rect.width / 2}px`;
      blob.style.top = `${rect.height / 2}px`;
    });
  });
  
  if (window.matchMedia('(max-width: 768px)').matches) {
    techWrappers.forEach((wrapper, index) => {
      const blob = blobs[index];
      if (!blob) return;
      
      let angle = 0;
      const animate = () => {
        const rect = wrapper.getBoundingClientRect();
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const radius = Math.min(centerX, centerY) / 2;
        
        angle += 0.01;
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;
        
        blob.style.left = `${x}px`;
        blob.style.top = `${y}px`;
        
        requestAnimationFrame(animate);
      };
      
      animate();
    });
  }
}

function setupParallaxTabs() {
  window.addEventListener('scroll', () => {
    const listTab = document.querySelectorAll('.tab');
    if (!listTab.length) return;
    const top = window.scrollY;
    listTab.forEach(tab => {
      tab.classList.toggle('active', tab.offsetTop - top < 550);
    });
  });
}