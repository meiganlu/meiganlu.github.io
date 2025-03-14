
document.addEventListener('DOMContentLoaded', function() {
    // Check if SimpleIcons loaded
    if (typeof SimpleIcons === 'undefined') {
      console.error('SimpleIcons library not loaded');
      return;
    }
    
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
        console.error('Icon not found:', iconName);
      }
    });
  });

// Add preload class to body immediately
document.body.classList.add('preload');

// Create and append loader if it doesn't exist
if (!document.getElementById('page-loader')) {
    const loader = document.createElement('div');
    loader.id = 'page-loader';
    loader.innerHTML = '<div class="loader-spinner"></div>';
    loader.style.display = 'none'; // Keep loader hidden by default
    document.body.prepend(loader);
}

// Keep scroll to top on reload but don't show loader
window.onbeforeunload = function() {
    // Just scroll to top without showing the loader
    window.scrollTo(0, 0);
    return null;
};

// Opener animation
let opener = document.querySelector('.opener');
let logoSpan = document.querySelectorAll('.logo');

// Remove preload class when DOM is ready, before animations
document.addEventListener('DOMContentLoaded', function() {
    // First ensure we're at the top
    window.scrollTo(0, 0);
    
    // Reset animation states without waiting
    document.querySelectorAll('.animation-show').forEach(el => {
        el.classList.remove('animate');
    });
    
    logoSpan.forEach(span => {
        span.classList.remove('active', 'fade');
    });
    
    // Force a reflow to ensure clean animation state
    void document.body.offsetHeight;
    
    // Allow transitions to work
    document.body.classList.remove('preload');
    
    // Make opener visible if it exists
    if (opener) {
        opener.style.visibility = 'visible';
        
        // Start the logo animation sequence
        setTimeout(() => {
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

            setTimeout(() => {
                if (opener) {
                    opener.style.top = '-100vh';
                }
            }, 2300);
        }, 100);
    }
    
    // Trigger animation-show elements with original timing
    setTimeout(() => {
        document.querySelectorAll('.animation-show').forEach((element, index) => {
            setTimeout(() => {
                element.classList.add('animate');
            }, index * 300);
        });
    }, 100);
});

// Mousemove effect for shapes and tracker
const moveElements = (e) => {
    const shapes = document.querySelectorAll('.shape');
    const tracker = document.querySelector('.tracker');

    if (tracker) {
        tracker.style.top = `${e.clientY}px`;
        tracker.style.left = `${e.clientX}px`;
        tracker.style.opacity = 1;
    }

    shapes.forEach((shape) => {
        const shapeOffset = shape.getAttribute('data-offset');

        let offsetX = (window.innerWidth - e.clientX) * shapeOffset;
        let offsetY = (window.innerHeight - e.clientY) * shapeOffset;

        shape.style.translate = `${offsetX}px ${offsetY}px`;
    });
};

document.addEventListener('mousemove', moveElements);

// Parallax scrolling effect for tabs
let listTab = document.querySelectorAll('.tab');

window.addEventListener('scroll', () => {
    let top = window.scrollY;

    listTab.forEach((tab) => {
        if (tab.offsetTop - top < 550) {
            tab.classList.add('active');
        } else {
            tab.classList.remove('active');
        }
    });
});

// Work section hover effect
document.addEventListener('DOMContentLoaded', function() {
    const card = document.getElementById('project-card');
    const cardHeader = card.querySelector('.card-header');
    const cardBody = card.querySelector('.card-body');
    
    // Work section hover effect from the provided code
    const workItems = document.querySelectorAll('.work-item');
    const work = document.querySelector('.work');
    const overlay = document.querySelector('.overlay');
    const prevElements = document.querySelectorAll('.prev');

    if (overlay) {
        overlay.style.top = '0%';
        overlay.style.left = '13.25%';
    }

    document.querySelector('#prev-2')?.classList.add('active');

    function removeActiveClass() {
        prevElements.forEach((prev) => {
            prev.classList.remove('active');
        });
    }

    if (workItems.length > 0) {
        workItems.forEach((item, index) => {
            item.addEventListener('mouseover', function() {
                removeActiveClass();
                const activePrev = document.querySelector(`#prev-${index + 1}`);

                if (activePrev) {
                    activePrev.classList.add('active');
                }

                if (work) {
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
                }
            });

            item.addEventListener('mouseout', function() {
                if (work) {
                    work.classList.remove('hovered');
                    work.className = 'work';
                }

                if (overlay) {
                    overlay.style.top = '0%';
                    overlay.style.left = '13.25%';
                }

                removeActiveClass();
                document.querySelector('#prev-2')?.classList.add('active');
            });
        });
    }
});

// Tooltip hover effect
const hoverBlocks = document.querySelectorAll('.hover-block');
const tooltip = document.getElementById('tooltip');

hoverBlocks.forEach((hoverBlock) => {
    hoverBlock.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        const tooltipMessage = hoverBlock.getAttribute('data-tooltip');

        if (tooltip) {
            tooltip.innerHTML = tooltipMessage;
            tooltip.style.left = `${mouseX + 30}px`;
            tooltip.style.top = `${mouseY + 50}px`;
            tooltip.classList.add('visible');
        }
    });

    hoverBlock.addEventListener('mouseleave', () => {
        tooltip?.classList.remove('visible');
    });
});

// Mobile menu toggle
const mobileMenuIcon = document.querySelector('.mobile-menu-icon');
const navbar = document.querySelector('.navbar');

if (mobileMenuIcon && navbar) {
    mobileMenuIcon.addEventListener('click', function() {
        navbar.classList.toggle('active');
    });
}