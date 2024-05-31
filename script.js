window.addEventListener('load', function() {
    const header = document.querySelector('.fade-in-header');
    header.classList.add('fade-in');
});

// Smooth scrolling for navigation links
document.querySelectorAll('.nav_menu a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Enhanced typing effect
const texts = ["Software Developer."];
let count = 0;
let index = 0;
let currentText = '';
let letter = '';

(function type() {
    if (count === texts.length) {
        count = 0;
    }
    currentText = texts[count];
    letter = currentText.slice(0, ++index);

    document.querySelector('.fstyping').textContent = letter;
    if (letter.length === currentText.length) {
        count++;
        index = 0;
        setTimeout(type, 2000); // Pause before repeating
    } else {
        setTimeout(type, 200);
    }
}());

// Function to add 'show' class to elements when they are in view
const scrollElements = document.querySelectorAll(".scroll-element");

const elementInView = (el, dividend = 1) => {
    const elementTop = el.getBoundingClientRect().top;

    return (
        elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend
    );
};

const displayScrollElement = (element) => {
    element.classList.add("scrolled");
};

const hideScrollElement = (element) => {
    element.classList.remove("scrolled");
};

const handleScrollAnimation = () => {
    scrollElements.forEach((el) => {
        if (elementInView(el, 1.25)) {
            displayScrollElement(el);
        } else {
            hideScrollElement(el);
        }
    })
}

window.addEventListener("scroll", () => {
    handleScrollAnimation();
});
