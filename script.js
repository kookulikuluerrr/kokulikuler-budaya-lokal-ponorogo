// Mobile menu toggle
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.querySelector('#navbar ul');

if (mobileMenu && navLinks) {
    mobileMenu.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenu.classList.toggle('active');
    });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
        // Close mobile menu after clicking a link
        if (navLinks) {
            navLinks.classList.remove('active');
        }
        if (mobileMenu) {
            mobileMenu.classList.remove('active');
        }
    });
});

// Animation on scroll using IntersectionObserver
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe all sections for animation
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Add hover effects for interactive elements
document.querySelectorAll('.budaya-item, .kuliner-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'scale(1.02)';
    });
    item.addEventListener('mouseleave', () => {
        item.style.transform = 'scale(1)';
    });
});

// Typing animation for the main heading (if not already handled by CSS)
const heading = document.querySelector('#home h1');
if (heading) {
    const text = heading.textContent;
    heading.textContent = '';
    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            heading.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    };
    // Start typing animation after a short delay
    setTimeout(typeWriter, 500);
}

// Parallax effect for the hero section (optional enhancement)
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.getElementById('home');
    if (hero) {
        hero.style.backgroundPositionY = -(scrolled * 0.5) + 'px';
    }
});

// Dynamically set background image for homepage
function setHomeBackgroundImage() {
    const homeSection = document.getElementById('home');
    if (homeSection) {
        const imageUrl = 'reog-traveloka/OIP (1).webp';
        // Preload the image
        const img = new Image();
        img.onload = function() {
            homeSection.style.backgroundImage = `linear-gradient(135deg, rgba(102, 126, 234, 0.7) 0%, rgba(118, 75, 162, 0.7) 100%), url('${imageUrl}')`;
        };
        img.src = imageUrl;
    }
}

// Call the function when the page loads
document.addEventListener('DOMContentLoaded', setHomeBackgroundImage);

// Gallery modal functionality
const galleryImages = document.querySelectorAll('.gallery-grid img');
const modal = document.createElement('div');
modal.id = 'gallery-modal';
modal.innerHTML = `
    <div class="modal-content">
        <span class="close">&times;</span>
        <img id="modal-image" src="" alt="">
    </div>
`;
document.body.appendChild(modal);

const modalImage = document.getElementById('modal-image');
const closeBtn = document.querySelector('.close');

galleryImages.forEach(img => {
    img.addEventListener('click', () => {
        modal.style.display = 'block';
        modalImage.src = img.src;
        modalImage.alt = img.alt;
    });
});

closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});
