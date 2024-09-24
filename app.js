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



const hoverBlocks = document.querySelectorAll('.hover-block');
const tooltip = document.getElementById('tooltip');

hoverBlocks.forEach((hoverBlock) => {
    hoverBlock.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX;
        const mouseY = e.clientY;

        // Set tooltip content based on data-tooltip attribute
        const tooltipMessage = hoverBlock.getAttribute('data-tooltip');
        tooltip.innerHTML = tooltipMessage;

        tooltip.style.left = `${mouseX + 30}px`;
        tooltip.style.top = `${mouseY + 50}px`; 

        tooltip.classList.add('visible');
    });

    hoverBlock.addEventListener('mouseleave', () => {
        tooltip.classList.remove('visible');
    });
});

document.querySelector('.mobile-menu-icon').addEventListener('click', function() {
    document.querySelector('.navbar').classList.toggle('active');
});