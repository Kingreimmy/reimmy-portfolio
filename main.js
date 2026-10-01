const hamburger = document.querySelector('.hamburger');
const navList = document.querySelector('.nav-links');

if (hamburger && navList) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navList.classList.toggle('active');
    });
}

const typedText = document.querySelector('.multiple');
const phrases = ['Web Designer', 'Graphics Designer', 'Report Editor'];
let phraseIndex = 0;
let charIndex = 0;
let deleting = false;

function typeLoop() {
    const currentText = phrases[phraseIndex];

    if (!typedText) {
        return;
    }

    if (!deleting) {
        charIndex += 1;
        typedText.textContent = currentText.slice(0, charIndex);

        if (charIndex === currentText.length) {
            deleting = true;
            setTimeout(typeLoop, 1200);
            return;
        }
    } else {
        charIndex -= 1;
        typedText.textContent = currentText.slice(0, charIndex);

        if (charIndex === 0) {
            deleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
        }
    }

    setTimeout(typeLoop, deleting ? 60 : 100);
}

typeLoop();

const navLinks = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('section');

function showSection(id) {
    sections.forEach((section) => {
        section.classList.toggle('active', section.id === id.replace('#', ''));
    });

    navLinks.forEach((link) => {
        const isActive = link.getAttribute('href') === id;
        link.classList.toggle('active', isActive);
    });
}

navLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
        event.preventDefault();
        const anchor = link.getAttribute('href');
        if (!anchor || !anchor.startsWith('#')) return;
        showSection(anchor);
        if (hamburger && navList) {
            hamburger.classList.remove('active');
            navList.classList.remove('active');
        }
    });
});

showSection('#home');

const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
        filterBtns.forEach((button) => button.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        portfolioItems.forEach((item) => {
            const category = item.getAttribute('data-category');
            const shouldShow = filter === 'all' || category === filter;
            item.style.display = shouldShow ? 'block' : 'none';
        });
    });
});