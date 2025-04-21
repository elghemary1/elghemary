// Custom cursor
document.addEventListener('DOMContentLoaded', () => {
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        setTimeout(() => {
            cursorFollower.style.left = e.clientX + 'px';
            cursorFollower.style.top = e.clientY + 'px';
        }, 100);
    });
    
    // Add hover effect to links and buttons
    const links = document.querySelectorAll('a, button, .btn, .project-card, .art-item, .notebook-card');
    
    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursorFollower.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursorFollower.style.borderColor = 'transparent';
        });
        
        link.addEventListener('mouseleave', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorFollower.style.borderColor = 'var(--primary)';
        });
    });
});

// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        }
    });
});

// Scroll animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Add animation classes to elements
document.querySelectorAll('.project-card, .art-item, .notebook-card, .section-title').forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    .fade-in {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .fade-in.animate {
        opacity: 1;
        transform: translateY(0);
    }
    
    .nav-links {
        transition: transform 0.3s ease, opacity 0.3s ease;
    }
    
    @media (max-width: 768px) {
        .nav-links {
            position: fixed;
            top: 80px;
            left: 0;
            width: 100%;
            background-color: var(--light);
            padding: 20px;
            flex-direction: column;
            align-items: center;
            transform: translateY(-100%);
            opacity: 0;
            pointer-events: none;
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
        }
        
        .nav-links.active {
            transform: translateY(0);
            opacity: 1;
            pointer-events: auto;
        }
        
        .menu-toggle.active i::before {
            content: "\\f00d";
        }
    }
`;
document.head.appendChild(style);

// Form submission handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const formValues = Object.fromEntries(formData.entries());
        
        // Here you would typically send the form data to a server
        console.log('Form submitted:', formValues);
        
        // Show success message
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.textContent = 'Thank you for your message! I will get back to you soon.';
        
        contactForm.innerHTML = '';
        contactForm.appendChild(successMessage);
        
        // Add CSS for success message
        const successStyle = document.createElement('style');
        successStyle.textContent = `
            .success-message {
                background-color: var(--accent);
                color: white;
                padding: 20px;
                border-radius: 10px;
                text-align: center;
                font-weight: 600;
            }
        `;
        document.head.appendChild(successStyle);
    });
}

// Robot animation on scroll
const robot = document.querySelector('.robot');
if (robot) {
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        const robotContainer = document.querySelector('.robot-container');
        
        if (robotContainer) {
            const robotRect = robotContainer.getBoundingClientRect();
            const isVisible = robotRect.top < window.innerHeight && robotRect.bottom > 0;
            
            if (isVisible) {
                // Add some movement to the robot based on scroll position
                const moveX = (scrollPosition * 0.05) % 20;
                const moveY = (scrollPosition * 0.03) % 15;
                
                robot.style.transform = `translate(${moveX}px, ${moveY}px)`;
            }
        }
    });
} 