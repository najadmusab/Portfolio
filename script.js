// ==========================================
// NAJAD MUSAB VK - PORTFOLIO JAVASCRIPT
// Premium Interactive Functionality
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ========== NAVIGATION ==========
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });
        
        // Close mobile menu on link click
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }
    
    // Active nav link on scroll
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
    
    // ========== THEME TOGGLE ==========
    const themeToggle = document.getElementById('themeToggle');
    const htmlElement = document.documentElement;
    
    // Load saved theme
    const currentTheme = localStorage.getItem('theme') || 'dark';
    htmlElement.setAttribute('data-theme', currentTheme);
    
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const theme = htmlElement.getAttribute('data-theme');
            const newTheme = theme === 'dark' ? 'light' : 'dark';
            
            htmlElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            
            // Animate toggle
            themeToggle.style.transform = 'rotate(360deg)';
            setTimeout(() => {
                themeToggle.style.transform = 'rotate(0deg)';
            }, 300);
        });
    }
    
    // ========== SMOOTH SCROLL ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const offsetTop = target.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // ========== AOS (ANIMATE ON SCROLL) ==========
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
            }
        });
    }, observerOptions);
    
    // Observe all elements with data-aos attribute
    document.querySelectorAll('[data-aos]').forEach(el => {
        observer.observe(el);
    });
    
    // ========== TYPEWRITER EFFECT ==========
    const typewriterElement = document.getElementById('typewriter');
    
    if (typewriterElement) {
        const roles = [
            'Web Developer',
            'MERN Stack Developer',
            'UI/UX Designer',
            'Frontend Developer',
            'Full Stack Developer'
        ];
        
        let roleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let currentText = '';
        
        function type() {
            const fullRole = roles[roleIndex];
            
            if (isDeleting) {
                currentText = fullRole.substring(0, charIndex - 1);
                charIndex--;
            } else {
                currentText = fullRole.substring(0, charIndex + 1);
                charIndex++;
            }
            
            typewriterElement.textContent = currentText;
            
            let typeSpeed = isDeleting ? 50 : 100;
            
            if (!isDeleting && charIndex === fullRole.length) {
                typeSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                typeSpeed = 500;
            }
            
            setTimeout(type, typeSpeed);
        }
        
        // Uncomment to enable typewriter effect
        // setTimeout(type, 1000);
    }
    
    // ========== CONTACT FORM ==========
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            
            // Validate
            if (!data.name || !data.email || !data.subject || !data.message) {
                showMessage('Please fill in all required fields.', 'error');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) {
                showMessage('Please enter a valid email address.', 'error');
                return;
            }
            
            // Submit button
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<span>Sending...</span>';
            submitBtn.disabled = true;
            
            // Simulate submission (replace with actual backend)
            setTimeout(() => {
                showMessage('Thank you! Your message has been sent successfully. I\'ll get back to you soon.', 'success');
                contactForm.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                
                console.log('Form data:', data);
                
                // In production, send to backend:
                /*
                fetch('/api/contact', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                })
                .then(response => response.json())
                .then(result => {
                    showMessage('Thank you! Your message has been sent.', 'success');
                    contactForm.reset();
                })
                .catch(error => {
                    showMessage('Error sending message. Please try again.', 'error');
                })
                .finally(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                });
                */// WhatsApp Send
const whatsappMessage =
`Hello Najad Musab,

Name: ${data.name}
Email: ${data.email}
Subject: ${data.subject}

Message:
${data.message}`;

const phoneNumber = "9526226011"; // ✅ Your WhatsApp number

const whatsappURL =
`https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`;

// Open WhatsApp
window.open(whatsappURL, "_blank");

// Success UI
showMessage('Opening WhatsApp...', 'success');

contactForm.reset();
submitBtn.innerHTML = originalText;
submitBtn.disabled = false;
            }, 1500);
        });
    }
    
    function showMessage(message, type) {
        if (formMessage) {
            formMessage.textContent = message;
            formMessage.className = `form-message ${type}`;
            
            setTimeout(() => {
                formMessage.className = 'form-message';
            }, 5000);
        }
    }
    
    // ========== DOWNLOAD RESUME ==========
    const downloadBtn = document.getElementById('downloadResume');
    
    if (downloadBtn) {
        downloadBtn.addEventListener('click', (e) => {
            e.preventDefault();
            
            alert('Resume download will be implemented with your actual resume file.\n\nYou can add your resume PDF and link it here.');
            
            // In production:
            /*
            const link = document.createElement('a');
            link.href = '/assets/Najad_Musab_Resume.pdf';
            link.download = 'Najad_Musab_Resume.pdf';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            */
        });
    }
    
    // ========== CURSOR TRAIL (Optional) ==========
    let cursorTrail = [];
    const maxTrailLength = 10;
    
    document.addEventListener('mousemove', (e) => {
        cursorTrail.push({ x: e.clientX, y: e.clientY, time: Date.now() });
        
        if (cursorTrail.length > maxTrailLength) {
            cursorTrail.shift();
        }
        
        // Clean up old trails
        cursorTrail = cursorTrail.filter(point => {
            return Date.now() - point.time < 500;
        });
    });
    
    // ========== PARALLAX EFFECT ==========
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.gradient-orb');
        
        parallaxElements.forEach((el, index) => {
            const speed = (index + 1) * 0.1;
            el.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
    
    // ========== PROJECT VIEW BUTTONS ==========
    const viewBtns = document.querySelectorAll('.view-btn');
    
    viewBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            alert('Project detail page will open here.\n\nYou can link to dedicated project pages or modals.');
        });
    });
    
    // ========== STATISTICS COUNTER ANIMATION ==========
function animateCounter(element, target, duration = 2000) {

    const numericTarget = parseInt(target);

    // Safety check
    if (isNaN(numericTarget)) {
        element.textContent = "0";
        return;
    }

    let start = 0;
    const increment = numericTarget / (duration / 16);
    const isPlus = target.includes('+');

    const timer = setInterval(() => {
        start += increment;

        if (start >= numericTarget) {
            element.textContent = numericTarget + (isPlus ? '+' : '');
            clearInterval(timer);
        } else {
            element.textContent =
                Math.floor(start) + (isPlus ? '+' : '');
        }

    }, 16);
}
    
    // Trigger counter animation when stats come into view
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                const value = entry.target.querySelector('.stat-value');
                if (value) {
                    const target = value.textContent;
                    animateCounter(value, target);
                    entry.target.classList.add('counted');
                }
            }
        });
    }, { threshold: 0.5 });
    
    document.querySelectorAll('.stat-box').forEach(stat => {
        statsObserver.observe(stat);
    });
    
    // ========== CONSOLE MESSAGE ==========
    console.log(
        '%c👋 Hello, Developer!',
        'color: #2563eb; font-size: 20px; font-weight: bold;'
    );
    console.log(
        '%cPortfolio crafted with ❤️ by Najad Musab VK',
        'color: #06b6d4; font-size: 14px;'
    );
    console.log(
        '%cLooking to hire? Let\'s connect!',
        'color: #8b5cf6; font-size: 14px;'
    );
    console.log(
        '%c📧 najadmusab@gmail.com',
        'color: #f59e0b; font-size: 14px; font-weight: bold;'
    );
    
    // ========== PAGE LOAD ANIMATION ==========
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
    });
    
    // ========== PREVENT FOUC (Flash of Unstyled Content) ==========
    document.documentElement.style.visibility = 'visible';
    
});

// ========== SERVICE WORKER (PWA - Optional) ==========
/*
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(reg => console.log('ServiceWorker registered'))
            .catch(err => console.log('ServiceWorker registration failed'));
    });
}
*/

// ========== PERFORMANCE MONITORING ==========
window.addEventListener('load', () => {
    if ('performance' in window) {
        const perfData = performance.timing;
        const loadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log(`Page load time: ${loadTime}ms`);
    }
});
