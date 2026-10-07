// ===============================
// MOBILE MENU
// ===============================

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", function () {
        navLinks.classList.toggle("show");
    });
}


// ===============================
// SCROLL REVEAL
// ===============================

const revealElements = document.querySelectorAll(
    ".section, .activity-card, .info-card, .benefit-item, .join-content"
);

revealElements.forEach(function (element) {
    element.classList.add("reveal");
});

const observer = new IntersectionObserver(
    function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }
        });
    },
    {
        threshold: 0.12
    }
);

revealElements.forEach(function (element) {
    observer.observe(element);
});


// ===============================
// NAVBAR BACKGROUND
// ===============================

const navbar = document.querySelector(".navbar-extravia");

window.addEventListener("scroll", function () {
    if (!navbar) return;

    if (window.scrollY > 50) {
        navbar.style.background = "rgba(6, 11, 20, 0.96)";
        navbar.style.boxShadow =
            "0 10px 40px rgba(0,0,0,0.25)";
    } else {
        navbar.style.background =
            "rgba(8, 13, 23, 0.80)";
        navbar.style.boxShadow = "none";
    }
});


// ===============================
// MOUSE PARALLAX HERO
// ===============================

const heroImage = document.querySelector(".image-frame");

document.addEventListener("mousemove", function (event) {
    if (window.innerWidth < 900 || !heroImage) return;

    const x =
        (event.clientX / window.innerWidth - 0.5) * 8;

    const y =
        (event.clientY / window.innerHeight - 0.5) * 8;

    heroImage.style.transform =
        `rotate(1deg) translate(${x}px, ${y}px)`;
});


// ===============================
// ACTIVE NAVIGATION
// ===============================

const sections = document.querySelectorAll("section[id]");

const navigationLinks = document.querySelectorAll(
    ".navbar-extravia nav a"
);

window.addEventListener("scroll", function () {
    let current = "";

    sections.forEach(function (section) {
        const sectionTop = section.offsetTop - 150;

        if (window.scrollY >= sectionTop) {
            current = section.getAttribute("id");
        }
    });

    navigationLinks.forEach(function (link) {
        link.style.color = "#8491a6";

        if (
            link.getAttribute("href") === "#" + current
        ) {
            link.style.color = "#4edcff";
        }
    });
});


// ===============================
// HERO VIDEO
// ===============================

const heroVideo = document.getElementById("heroVideo");

if (heroVideo) {
    heroVideo.playbackRate = 0.7;

    heroVideo.addEventListener("loadedmetadata", function () {
        heroVideo.playbackRate = 0.7;
    });
}