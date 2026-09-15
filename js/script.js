// 1. Preloader & Reveal Logic
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    
    setTimeout(() => {
        preloader.classList.add('fade-out');
        
        setTimeout(() => {
            document.querySelectorAll('.editorial-nav, .hero-container').forEach(el => {
                el.classList.add('active');
            });
            document.querySelectorAll('.hero-minimal .reveal-up').forEach(el => {
                el.classList.add('active');
            });
        }, 300);
        
    }, 1000);
});

// 2. Dynamic Theme Option (System / Light / Dark)
const themeButtons = document.querySelectorAll('.theme-btn');
const htmlEl = document.documentElement;

function getSystemTheme() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function setTheme(theme) {
    themeButtons.forEach(btn => {
        if (btn.getAttribute('data-theme-val') === theme) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    if (theme === 'system') {
        const sysTheme = getSystemTheme();
        htmlEl.setAttribute('data-theme', sysTheme);
    } else {
        htmlEl.setAttribute('data-theme', theme);
    }
    localStorage.setItem('ahr_theme_pref', theme);
}

// Load saved preference
const savedTheme = localStorage.getItem('ahr_theme_pref') || 'system';
setTheme(savedTheme);

themeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const selectedTheme = btn.getAttribute('data-theme-val');
        setTheme(selectedTheme);
    });
});

// Listen for system changes if 'system' is active
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    if (localStorage.getItem('ahr_theme_pref') === 'system') {
        setTheme('system');
    }
});

// 3. Contact Action (Direct to Gmail Compose)
const letsTalkBtn = document.getElementById('letsTalkBtn');
if (letsTalkBtn) {
    letsTalkBtn.addEventListener('click', () => {
        const recipient = "alihabibproductions@gmail.com";
        const subject = encodeURIComponent("Request for Services");
        const body = encodeURIComponent("Hey Ali,\n\nI am reaching out regarding a collaboration project. Please let me know your availability so we can proceed further.");
        const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${recipient}&su=${subject}&body=${body}`;
        letsTalkBtn.setAttribute('href', gmailUrl);
    });
}

// 4. Custom Cursor Logic
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

window.addEventListener('mousemove', (e) => {
    const posX = e.clientX;
    const posY = e.clientY;

    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;

    cursorOutline.animate({
        left: `${posX}px`,
        top: `${posY}px`
    }, { duration: 350, fill: "forwards" }); 
});

const hoverElements = document.querySelectorAll('[data-hover], button, input');

hoverElements.forEach(elem => {
    elem.addEventListener('mouseenter', (e) => {
        const hoverType = e.target.getAttribute('data-hover');
        
        if (hoverType === 'link' || hoverType === 'text' || e.target.tagName === 'INPUT' || e.target.tagName === 'BUTTON') {
            cursorOutline.style.width = '50px';
            cursorOutline.style.height = '50px';
            cursorOutline.style.backgroundColor = 'rgba(16, 185, 129, 0.12)';
            cursorOutline.style.borderColor = 'transparent';
        } else if (hoverType === 'project' || hoverType === 'card') {
            cursorOutline.style.width = '70px';
            cursorOutline.style.height = '70px';
            cursorOutline.style.backgroundColor = 'rgba(255, 255, 255, 0.04)';
            cursorOutline.style.borderColor = 'transparent';
            cursorDot.style.transform = 'translate(-50%, -50%) scale(1.4)';
        }
    });

    elem.addEventListener('mouseleave', () => {
        cursorOutline.style.width = '36px';
        cursorOutline.style.height = '36px';
        cursorOutline.style.backgroundColor = 'transparent';
        cursorOutline.style.borderColor = 'var(--text-light)';
        cursorOutline.style.opacity = '0.25';
        cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
    });
});

// 5. Scroll Reveal Intersection Observer
const revealElements = document.querySelectorAll('.reveal-up:not(.hero-minimal .reveal-up)');

const revealOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -40px 0px"
};

const scrollObserver = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        } else {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        }
    });
}, revealOptions);

revealElements.forEach(el => {
    scrollObserver.observe(el);
});
