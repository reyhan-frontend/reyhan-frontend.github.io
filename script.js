const hamburgerBtn = document.getElementById('hamburgerBtn');
const navLinks = document.getElementById('navLinks');
hamburgerBtn.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    hamburgerBtn.querySelector('i').classList.toggle('fa-xmark');
});
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        hamburgerBtn.querySelector('i').classList.remove('fa-xmark');
    });
});

const themeToggle = document.getElementById('themeToggle');
themeToggle.addEventListener('click', () => {
    const html = document.documentElement;
    html.setAttribute('data-theme', html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
    themeToggle.querySelector('i').classList.toggle('fa-sun');
    themeToggle.querySelector('i').classList.toggle('fa-moon');
});

const revealElements = document.querySelectorAll('.reveal');
const typewriters = document.querySelectorAll('.typewriter-scroll');

const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (entry.target.classList.contains('reveal')) {
                entry.target.classList.add('active');
            }
            if (entry.target.classList.contains('typewriter-scroll') && !entry.target.classList.contains('typed')) {
                entry.target.classList.add('typed', 'typing-cursor');
                const text = entry.target.getAttribute('data-text');
                entry.target.textContent = '';
                let i = 0;
                const typeInterval = setInterval(() => {
                    if (i < text.length) {
                        entry.target.textContent += text.charAt(i);
                        i++;
                    } else {
                        clearInterval(typeInterval);
                        entry.target.classList.remove('typing-cursor');
                    }
                }, 25);
            }
        }
    });
}, { threshold: 0.3 });

revealElements.forEach(el => scrollObserver.observe(el));
typewriters.forEach(tw => scrollObserver.observe(tw));

const track = document.getElementById('portfolioTrack');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const wrapper = document.getElementById('portfolioWrapper');

let isSliding = false;
const cardWidth = 360;

function slideNext() {
    if (isSliding) return;
    isSliding = true;
    track.style.transition = "transform 0.5s ease-in-out";
    track.style.transform = `translateX(${cardWidth}px)`;
    setTimeout(() => {
        track.style.transition = "none";
        track.appendChild(track.firstElementChild);
        track.style.transform = "translateX(0)";
        isSliding = false;
    }, 500);
}

function slidePrev() {
    if (isSliding) return;
    isSliding = true;
    track.style.transition = "none";
    track.prepend(track.lastElementChild);
    track.style.transform = `translateX(${cardWidth}px)`;
    void track.offsetWidth;
    track.style.transition = "transform 0.5s ease-in-out";
    track.style.transform = "translateX(0)";
    setTimeout(() => { isSliding = false; }, 500);
}

nextBtn.addEventListener('click', slideNext);
prevBtn.addEventListener('click', slidePrev);

let autoSlideTimer = setInterval(slideNext, 3500);
wrapper.addEventListener('mouseenter', () => clearInterval(autoSlideTimer));
wrapper.addEventListener('mouseleave', () => { autoSlideTimer = setInterval(slideNext, 3500); });
