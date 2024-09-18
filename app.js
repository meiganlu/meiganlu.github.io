window.onbeforeunload = function () {
    window.scrollTo(0, 0);
}

let opener = document.querySelector('.opener');
let logo = document.querySelector('.logo-header');
let logoSpan = document.querySelectorAll('.logo');

window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        logoSpan.forEach((span, idx) => {
            setTimeout(() => {
                span.classList.add('active');
            }, (idx + 1) * 400)
        });

        setTimeout(() => {
            logoSpan.forEach((span, idx) => {
                setTimeout(() => {
                    span.classList.remove('active');
                    span.classList.add('fade');
                }, (idx + 1) * 50)
            });
        }, 2000);

        setTimeout(() => {
            opener.style.top = '-100vh';
        }, 2300);
    });
})


const moveElements = (e) => {
    const shapes = document.querySelectorAll(".shape");
    const tracker = document.querySelector(".tracker");

    tracker.style.top = `${e.clientY}px`;
    tracker.style.left = `${e.clientX}px`;
    tracker.style.opacity = 1;

    shapes.forEach((shape) => {
        const shapeOffset = shape.getAttribute("data-offset");

        let offsetX = (window.innerWidth - e.clientX) * shapeOffset;
        let offsetY = (window.innerHeight - e.clientY) * shapeOffset;

        shape.style.translate = `${offsetX}px ${offsetY}px`;
    });
};

document.addEventListener("mousemove", moveElements);

let listTab = document.querySelectorAll('.tab');
let titleBanner = document.querySelector('.banner h1');
window.addEventListener("scroll", (event) => {
    /*scrollY is the web scrollbar position (pixel)*/
    let top = window.scrollY;
    /* parallax scroll in tab
    when tab's position is less than 550 px
    from scrollbar position add active class to animate 
    and vice versa
    */
    listTab.forEach(tab =>{
        if(tab.offsetTop - top < 550){
            tab.classList.add('active');
        }else{
            tab.classList.remove('active');
        }
    })
});  

/*
let next = document.getElementById('next');
let prev = document.getElementById('prev');
let carousel = document.querySelector('.carousel');
let items = document.querySelectorAll('.carousel .item');
let countItem = items.length;
let active = 1;
let other_1 = null;
let other_2 = null;
next.onclick = () => {
    carousel.classList.remove('prev');
    carousel.classList.add('next');
    active =active + 1 >= countItem ? 0 : active + 1;
    other_1 =active - 1 < 0 ? countItem -1 : active - 1;
    other_2 = active + 1 >= countItem ? 0 : active + 1;
    changeSlider();
}
prev.onclick = () => {
    carousel.classList.remove('next');
    carousel.classList.add('prev');
    active = active - 1 < 0 ? countItem - 1 : active - 1;
    other_1 = active + 1 >= countItem ? 0 : active + 1;
    other_2 = other_1 + 1 >= countItem ? 0 : other_1 + 1;
    changeSlider();
}
const changeSlider = () => {
    let itemOldActive = document.querySelector('.carousel .item.active');
    if(itemOldActive) itemOldActive.classList.remove('active');

    let itemOldOther_1 = document.querySelector('.carousel .item.other_1');
    if(itemOldOther_1) itemOldOther_1.classList.remove('other_1');

    let itemOldOther_2 = document.querySelector('.carousel .item.other_2');
    if(itemOldOther_2) itemOldOther_2.classList.remove('other_2');

    items.forEach(e => {
        e.querySelector('.image img').style.animation = 'none';
        e.querySelector('.image figcaption').style.animation = 'none';
        void e.offsetWidth;
        e.querySelector('.image img').style.animation = '';
        e.querySelector('.image figcaption').style.animation = '';
    })

    items[active].classList.add('active');
    items[other_1].classList.add('other_1');
    items[other_2].classList.add('other_2');

    clearInterval(autoPlay);
    autoPlay = setInterval(() => {
        next.click();
    }, 10000);
}
let autoPlay = setInterval(() => {
    next.click();
}, 10000);
*/


document.addEventListener("DOMContentLoaded", function () {
    const workItems = document.querySelectorAll(".work-item");
    const work = document.querySelector(".work");
    const overlay = document.querySelector(".overlay");
    const prevElements = document.querySelectorAll(".prev");

    overlay.style.top = "0%";
    overlay.style.left = "13.25%";
    document.querySelector("#prev-2").classList.add("active");

    function removeActiveClass() {
        prevElements.forEach(function (prev) {
            prev.classList.remove("active");
        });
    }

    workItems.forEach((item, index) => {
        item.addEventListener("mouseover", function () {
            removeActiveClass();
            const activePrev = document.querySelector("#prev-" + (index + 1));
            if (activePrev) {
                activePrev.classList.add("active");
            }

            work.classList.add("hovered");
            switch (index) {
                case 0:
                    overlay.style.top = "50%";
                    overlay.style.left = "50%";
                    work.className = "work bg-color-red hovered";
                    break;
                case 1:
                    overlay.style.top = "0%";
                    overlay.style.left = "13.25%";
                    work.className = "work bg-color-blue hovered";
                    break;
                case 2:
                    overlay.style.top = "-50%";
                    overlay.style.left = "-23.5%";
                    work.className = "work bg-color-green hovered";
                    break;
            }
        });

        item.addEventListener("mouseout", function () {
            work.classList.remove("hovered");
            work.className = "work";
            overlay.style.top = "0%";
            overlay.style.left = "13.25%";
            removeActiveClass();
            document.querySelector("#prev-2").classList.add("active");
        });
    });
});



const hoverBlock = document.querySelector('.hover-block');
const tooltip = document.getElementById('tooltip');

hoverBlock.addEventListener('mousemove', (e) => {
    // Get the mouse cursor's position
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    // Position the tooltip near the cursor
    tooltip.style.left = `${mouseX + 10}px`;
    tooltip.style.top = `${mouseY + 10}px`;  // Adjust top to move the tooltip above the cursor

    // Make the tooltip visible
    tooltip.classList.add('visible');
});

hoverBlock.addEventListener('mouseleave', () => {
    // Hide the tooltip when the mouse leaves the block
    tooltip.classList.remove('visible');
});