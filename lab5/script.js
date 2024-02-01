// LAB5.2:
const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");
btnScrollTo.addEventListener("click", () => {
    section1.scrollIntoView({ behavior: "smooth" });
});

// LAB5.3:
const randomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

const randomColor = () => {
    return `rgb(${randomInt(100, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`;
};

document.querySelector(".nav__link").addEventListener("click", function (e) {
    this.style.backgroundColor = randomColor();
    console.log(e.target, e.currentTarget);
    console.log(e.target === this);
});

document.querySelector(".nav__links").addEventListener("click", function (e) {
    this.style.backgroundColor = randomColor();
    console.log(e.target, e.currentTarget);
});

document.querySelector(".nav").addEventListener("click", function (e) {
    this.style.backgroundColor = randomColor();
    console.log(e.target, e.currentTarget);
});

// LAB5.4:

document.querySelector(".nav__links").addEventListener("click", function (e) {
    e.preventDefault();
    if (e.target.classList.contains("nav__link")) {
        const id = e.target.getAttribute("href");
        console.log(id);
        document.querySelector(id).scrollIntoView({ behavior: "smooth" });
    }
});

const h1 = document.querySelector("h1");
console.log(h1.querySelectorAll(".highlight"));
console.log(h1.childNodes);
console.log(h1.children);
h1.firstElementChild.style.color = "white";
h1.lastElementChild.style.color = "black";

// Going upwards: parents
console.log(h1.parentNode);
console.log(h1.parentElement);

h1.closest(".header").style.backgroundColor = "var(--color-secondary-darker)";
h1.closest("h1").style.backgroundColor = "var(--color-primary-darker)";

// Going sideways: siblings
console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);
console.log(h1.previousSibling);
console.log(h1.nextSibling);
console.log(h1.parentElement.children);
[...h1.parentElement.children].forEach(function (e) {
    if (e !== h1) {
        e.style.transform = "scale(0.5)";
    }
});

const tabs = document.querySelectorAll(".operations__tab");
const tabsContainer = document.querySelector(".operations__tab-container");
const tabsContent = document.querySelectorAll(".operations__contents");

tabsContainer.addEventListener("click", function (e) {
    const clicked = e.target.closest(".operations__tab");

    if (!clicked) return;

    // remove active classes
    tabs.forEach((t) => t.classList.remove("operations__tab--active"));
    tabsContent.forEach((c) => c.classList.remove("operations__tab--active"));

    // Active tab
    clicked.classList.add("operations__tab--active");

    // Active content area
    document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add("operations__tab--active");
});
