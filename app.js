// Wait for DOM to be ready before running any scripts
document.addEventListener('DOMContentLoaded', function() {
    // SimpleIcons handling with better error handling
    if (typeof SimpleIcons !== 'undefined') {
      const iconContainers = document.querySelectorAll('.icon-container');
      
      iconContainers.forEach(container => {
        const iconName = container.getAttribute('data-icon');
        if (iconName && SimpleIcons[iconName]) {
          container.innerHTML = SimpleIcons[iconName].svg;
          
          // Make the icon white
          const svgElement = container.querySelector('svg');
          if (svgElement) {
            svgElement.setAttribute('fill', 'white');
            svgElement.setAttribute('width', '60');
            svgElement.setAttribute('height', '60');
          }
        } else {
          console.log('Icon not found or SimpleIcons not available:', iconName);
        }
      });
    } else {
      console.log('SimpleIcons library not loaded');
    }
  
    // Remove preload class and setup animations
    setupAnimations();
  
    // Setup work section hover effects
    setupWorkSection();
  
    // Setup tooltip hover effects
    setupTooltips();
  
    // Setup mobile menu
    setupMobileMenu();
  });
  
  // Add preload class to body immediately (only if body exists)
  if (document.body) {
    document.body.classList.add('preload');
  
    // Create and append loader if it doesn't exist
    if (!document.getElementById('page-loader')) {
      const loader = document.createElement('div');
      loader.id = 'page-loader';
      loader.innerHTML = '<div class="loader-spinner"></div>';
      loader.style.display = 'none'; // Keep loader hidden by default
      document.body.prepend(loader);
    }
  }
  
  // Keep scroll to top on reload but don't show loader
  window.onbeforeunload = function() {
    // Just scroll to top without showing the loader
    window.scrollTo(0, 0);
    return null;
  };
  
  // Mousemove effect for shapes and tracker
  document.addEventListener('mousemove', function(e) {
    const shapes = document.querySelectorAll('.shape');
    const tracker = document.querySelector('.tracker');
  
    if (tracker) {
      tracker.style.top = `${e.clientY}px`;
      tracker.style.left = `${e.clientX}px`;
      tracker.style.opacity = 1;
    }
  
    if (shapes.length > 0) {
      shapes.forEach((shape) => {
        const shapeOffset = shape.getAttribute('data-offset');
        if (shapeOffset) {
          let offsetX = (window.innerWidth - e.clientX) * shapeOffset;
          let offsetY = (window.innerHeight - e.clientY) * shapeOffset;
          shape.style.translate = `${offsetX}px ${offsetY}px`;
        }
      });
    }
  });
  
  // Parallax scrolling effect for tabs
  window.addEventListener('scroll', function() {
    const listTab = document.querySelectorAll('.tab');
    if (listTab.length > 0) {
      let top = window.scrollY;
      listTab.forEach((tab) => {
        if (tab.offsetTop - top < 550) {
          tab.classList.add('active');
        } else {
          tab.classList.remove('active');
        }
      });
    }
  });
  
  // Function to handle animation setup
  function setupAnimations() {
    // First ensure we're at the top
    window.scrollTo(0, 0);
    
    const opener = document.querySelector('.opener');
    const logoSpan = document.querySelectorAll('.logo');
    
    // Reset animation states without waiting
    const animationElements = document.querySelectorAll('.animation-show');
    if (animationElements.length > 0) {
      animationElements.forEach(el => {
        el.classList.remove('animate');
      });
    }
    
    if (logoSpan.length > 0) {
      logoSpan.forEach(span => {
        span.classList.remove('active', 'fade');
      });
    }
    
    // Force a reflow to ensure clean animation state
    if (document.body) {
      void document.body.offsetHeight;
      
      // Allow transitions to work
      document.body.classList.remove('preload');
    }
    
    // Make opener visible if it exists
    if (opener) {
      opener.style.visibility = 'visible';
      
      // Start the logo animation sequence
      setTimeout(() => {
        if (logoSpan.length > 0) {
          logoSpan.forEach((span, idx) => {
            setTimeout(() => {
              span.classList.add('active');
            }, (idx + 1) * 400);
          });
  
          setTimeout(() => {
            logoSpan.forEach((span, idx) => {
              setTimeout(() => {
                span.classList.remove('active');
                span.classList.add('fade');
              }, (idx + 1) * 50);
            });
          }, 2000);
        }
  
        setTimeout(() => {
          if (opener) {
            opener.style.top = '-100vh';
          }
        }, 2300);
      }, 100);
    }
    
    // Trigger animation-show elements with original timing
    setTimeout(() => {
      if (animationElements.length > 0) {
        animationElements.forEach((element, index) => {
          setTimeout(() => {
            element.classList.add('animate');
          }, index * 300);
        });
      }
    }, 100);
  }
  
  // Function to handle work section
  function setupWorkSection() {
    const card = document.getElementById('project-card');
    if (card) {
      const cardHeader = card.querySelector('.card-header');
      const cardBody = card.querySelector('.card-body');
    }
    
    // Work section hover effect
    const workItems = document.querySelectorAll('.work-item');
    const work = document.querySelector('.work');
    const overlay = document.querySelector('.overlay');
    const prevElements = document.querySelectorAll('.prev');
  
    if (overlay) {
      overlay.style.top = '0%';
      overlay.style.left = '13.25%';
    }
  
    const prev2 = document.querySelector('#prev-2');
    if (prev2) {
      prev2.classList.add('active');
    }
  
    function removeActiveClass() {
      if (prevElements.length > 0) {
        prevElements.forEach((prev) => {
          prev.classList.remove('active');
        });
      }
    }
  
    if (workItems.length > 0 && work && overlay) {
      workItems.forEach((item, index) => {
        item.addEventListener('mouseover', function() {
          removeActiveClass();
          const activePrev = document.querySelector(`#prev-${index + 1}`);
  
          if (activePrev) {
            activePrev.classList.add('active');
          }
  
          work.classList.add('hovered');
  
          switch (index) {
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
  
        item.addEventListener('mouseout', function() {
          work.classList.remove('hovered');
          work.className = 'work';
  
          overlay.style.top = '0%';
          overlay.style.left = '13.25%';
  
          removeActiveClass();
          const prev2 = document.querySelector('#prev-2');
          if (prev2) {
            prev2.classList.add('active');
          }
        });
      });
    }
  }
  
  // Function to handle tooltips
  function setupTooltips() {
    const hoverBlocks = document.querySelectorAll('.hover-block');
    const tooltip = document.getElementById('tooltip');
  
    if (hoverBlocks.length > 0 && tooltip) {
      hoverBlocks.forEach((hoverBlock) => {
        hoverBlock.addEventListener('mousemove', (e) => {
          const mouseX = e.clientX;
          const mouseY = e.clientY;
          const tooltipMessage = hoverBlock.getAttribute('data-tooltip');
  
          tooltip.innerHTML = tooltipMessage || '';
          tooltip.style.left = `${mouseX + 30}px`;
          tooltip.style.top = `${mouseY + 50}px`;
          tooltip.classList.add('visible');
        });
  
        hoverBlock.addEventListener('mouseleave', () => {
          tooltip.classList.remove('visible');
        });
      });
    }
  }
  
  // Function to handle mobile menu
  function setupMobileMenu() {
    const mobileMenuIcon = document.querySelector('.mobile-menu-icon');
    const navbar = document.querySelector('.navbar');
  
    if (mobileMenuIcon && navbar) {
      mobileMenuIcon.addEventListener('click', function() {
        navbar.classList.toggle('active');
      });
    }
  }