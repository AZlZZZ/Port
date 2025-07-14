// Matrix Rain Background
class MatrixRain {
    constructor() {
        this.canvas = document.getElementById('matrix');
        this.ctx = this.canvas.getContext('2d');
        this.characters = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
        this.fontSize = 14;
        this.columns = 0;
        this.drops = [];
        
        this.init();
    }
    
    init() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.columns = Math.floor(this.canvas.width / this.fontSize);
        this.drops = new Array(this.columns).fill(1);
        
        window.addEventListener('resize', () => {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
            this.columns = Math.floor(this.canvas.width / this.fontSize);
            this.drops = new Array(this.columns).fill(1);
        });
        
        this.animate();
    }
    
    animate() {
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.ctx.fillStyle = '#00ff41';
        this.ctx.font = `${this.fontSize}px monospace`;
        
        for (let i = 0; i < this.drops.length; i++) {
            const text = this.characters.charAt(Math.floor(Math.random() * this.characters.length));
            this.ctx.fillText(text, i * this.fontSize, this.drops[i] * this.fontSize);
            
            if (this.drops[i] * this.fontSize > this.canvas.height && Math.random() > 0.975) {
                this.drops[i] = 0;
            }
            this.drops[i]++;
        }
        
        requestAnimationFrame(() => this.animate());
    }
}

// Typing Effect
class TypingEffect {
    constructor(element, texts, speed = 100) {
        this.element = element;
        this.texts = texts;
        this.speed = speed;
        this.currentTextIndex = 0;
        this.currentCharIndex = 0;
        this.isDeleting = false;
        
        this.type();
    }
    
    type() {
        const currentText = this.texts[this.currentTextIndex];
        
        if (this.isDeleting) {
            this.element.textContent = currentText.substring(0, this.currentCharIndex - 1);
            this.currentCharIndex--;
        } else {
            this.element.textContent = currentText.substring(0, this.currentCharIndex + 1);
            this.currentCharIndex++;
        }
        
        let typeSpeed = this.speed;
        
        if (this.isDeleting) {
            typeSpeed /= 2;
        }
        
        if (!this.isDeleting && this.currentCharIndex === currentText.length) {
            typeSpeed = 2000; // Pause at end
            this.isDeleting = true;
        } else if (this.isDeleting && this.currentCharIndex === 0) {
            this.isDeleting = false;
            this.currentTextIndex = (this.currentTextIndex + 1) % this.texts.length;
            typeSpeed = 500; // Pause before next word
        }
        
        setTimeout(() => this.type(), typeSpeed);
    }
}

// Navigation System
class Navigation {
    constructor() {
        this.navLinks = document.querySelectorAll('.nav-link');
        this.sections = document.querySelectorAll('section');
        this.currentSection = 'home';
        
        this.init();
    }
    
    init() {
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetSection = link.getAttribute('data-section');
                this.navigateToSection(targetSection);
            });
        });
        
        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    }
    
    navigateToSection(sectionName) {
        // Hide all sections
        this.sections.forEach(section => {
            section.classList.remove('active');
        });
        
        // Remove active class from all nav links
        this.navLinks.forEach(link => {
            link.classList.remove('active');
        });
        
        // Show target section
        const targetSection = document.getElementById(sectionName);
        if (targetSection) {
            targetSection.classList.add('active');
        }
        
        // Add active class to nav link
        const activeLink = document.querySelector(`[data-section="${sectionName}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
        
        this.currentSection = sectionName;
    }
}

// Skill Animation
class SkillAnimation {
    constructor() {
        this.skillBars = document.querySelectorAll('.skill-fill');
        this.init();
    }
    
    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateSkillBar(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        this.skillBars.forEach(bar => {
            observer.observe(bar);
        });
    }
    
    animateSkillBar(bar) {
        const percent = bar.getAttribute('data-percent');
        bar.style.width = percent + '%';
    }
}

// Counter Animation
class CounterAnimation {
    constructor() {
        this.counters = document.querySelectorAll('.stat-number');
        this.init();
    }
    
    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        this.counters.forEach(counter => {
            observer.observe(counter);
        });
    }
    
    animateCounter(counter) {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const step = target / (duration / 16); // 60fps
        let current = 0;
        
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            counter.textContent = Math.floor(current);
        }, 16);
    }
}

// Service Card Interactions
class ServiceCardInteractions {
    constructor() {
        this.cards = document.querySelectorAll('.service-card');
        this.init();
    }
    
    init() {
        this.cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                this.addGlowEffect(card);
            });
            
            card.addEventListener('mouseleave', () => {
                this.removeGlowEffect(card);
            });
            
            // Add click effect
            card.addEventListener('click', () => {
                this.addClickEffect(card);
            });
        });
    }
    
    addGlowEffect(card) {
        card.style.transform = 'translateY(-10px) scale(1.02)';
        card.style.boxShadow = '0 20px 40px rgba(0, 255, 65, 0.3)';
    }
    
    removeGlowEffect(card) {
        card.style.transform = 'translateY(0) scale(1)';
        card.style.boxShadow = 'none';
    }
    
    addClickEffect(card) {
        card.style.transform = 'translateY(-5px) scale(0.98)';
        setTimeout(() => {
            this.removeGlowEffect(card);
        }, 150);
    }
}

// Form Handling
class FormHandler {
    constructor() {
        this.form = document.querySelector('.cyber-form');
        this.init();
    }
    
    init() {
        if (this.form) {
            this.form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleSubmit();
            });
        }
    }
    
    handleSubmit() {
        const formData = new FormData(this.form);
        const submitBtn = this.form.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.innerHTML = '<i class="bx bx-loader-alt bx-spin"></i> SENDING...';
        submitBtn.disabled = true;
        
        // Simulate form submission
        setTimeout(() => {
            submitBtn.innerHTML = '<i class="bx bx-check"></i> MESSAGE SENT!';
            submitBtn.style.background = 'linear-gradient(45deg, #00ff41, #00ff88)';
            
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                submitBtn.style.background = 'linear-gradient(45deg, #ff0000, #00ff41)';
                this.form.reset();
            }, 2000);
        }, 1500);
    }
}

// Parallax Effect
class ParallaxEffect {
    constructor() {
        this.init();
    }
    
    init() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.hologram, .terminal-window');
            
            parallaxElements.forEach(element => {
                const speed = 0.5;
                element.style.transform = `translateY(${scrolled * speed}px)`;
            });
        });
    }
}

// Glitch Effect
class GlitchEffect {
    constructor() {
        this.titles = document.querySelectorAll('.hero-title, .section-title');
        this.init();
    }
    
    init() {
        this.titles.forEach(title => {
            setInterval(() => {
                if (Math.random() > 0.95) {
                    this.addGlitch(title);
                }
            }, 3000);
        });
    }
    
    addGlitch(element) {
        const originalText = element.textContent;
        const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
        
        element.style.textShadow = '2px 0 #ff0000, -2px 0 #00ff41';
        
        setTimeout(() => {
            element.textContent = originalText.split('').map(char => 
                Math.random() > 0.8 ? glitchChars[Math.floor(Math.random() * glitchChars.length)] : char
            ).join('');
        }, 100);
        
        setTimeout(() => {
            element.textContent = originalText;
            element.style.textShadow = '';
        }, 200);
    }
}

// Particle System
class ParticleSystem {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.particleCount = 50;
        
        this.init();
    }
    
    init() {
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.pointerEvents = 'none';
        this.canvas.style.zIndex = '-1';
        this.canvas.style.opacity = '0.3';
        
        document.body.appendChild(this.canvas);
        
        this.resize();
        this.createParticles();
        this.animate();
        
        window.addEventListener('resize', () => this.resize());
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    createParticles() {
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 2,
                vy: (Math.random() - 0.5) * 2,
                size: Math.random() * 3 + 1,
                color: Math.random() > 0.5 ? '#ff0000' : '#00ff41'
            });
        }
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;
            
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = particle.color;
            this.ctx.fill();
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize Matrix Rain
    new MatrixRain();
    
    // Initialize Typing Effect
    const typingElement = document.getElementById('typing-text');
    if (typingElement) {
        new TypingEffect(typingElement, [
            'ls -la',
            'cat portfolio.txt',
            'npm install creativity',
            'git commit -m "awesome portfolio"',
            'sudo make me a sandwich'
        ], 80);
    }
    
    // Initialize Navigation
    new Navigation();
    
    // Initialize Skill Animation
    new SkillAnimation();
    
    // Initialize Counter Animation
    new CounterAnimation();
    
    // Initialize Service Card Interactions
    new ServiceCardInteractions();
    
    // Initialize Form Handler
    new FormHandler();
    
    // Initialize Parallax Effect
    new ParallaxEffect();
    
    // Initialize Glitch Effect
    new GlitchEffect();
    
    // Initialize Particle System
    new ParticleSystem();
    
    // Add some fun interactive elements
    addInteractiveElements();
});

// Additional Interactive Elements
function addInteractiveElements() {
    // Add click sound effect to buttons
    const buttons = document.querySelectorAll('button, .card-btn, .submit-btn');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            // Create a ripple effect
            const ripple = document.createElement('span');
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(0, 255, 65, 0.3)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s linear';
            ripple.style.left = '50%';
            ripple.style.top = '50%';
            ripple.style.width = '100px';
            ripple.style.height = '100px';
            ripple.style.marginLeft = '-50px';
            ripple.style.marginTop = '-50px';
            
            button.style.position = 'relative';
            button.style.overflow = 'hidden';
            button.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add CSS for ripple animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Add hover sound effect (visual feedback)
    const interactiveElements = document.querySelectorAll('.nav-link, .service-card, .contact-item');
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            element.style.filter = 'brightness(1.2)';
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.filter = 'brightness(1)';
        });
    });
    
    // Add keyboard navigation
    document.addEventListener('keydown', (e) => {
        switch(e.key) {
            case 'ArrowUp':
                e.preventDefault();
                scrollToSection('home');
                break;
            case 'ArrowDown':
                e.preventDefault();
                scrollToSection('services');
                break;
            case '1':
                e.preventDefault();
                scrollToSection('home');
                break;
            case '2':
                e.preventDefault();
                scrollToSection('services');
                break;
            case '3':
                e.preventDefault();
                scrollToSection('about');
                break;
            case '4':
                e.preventDefault();
                scrollToSection('contact');
                break;
        }
    });
}

function scrollToSection(sectionName) {
    const section = document.getElementById(sectionName);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Add loading screen
window.addEventListener('load', () => {
    const loadingScreen = document.createElement('div');
    loadingScreen.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #000000 0%, #111111 50%, #000000 100%);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        transition: opacity 0.8s ease;
        font-family: 'Orbitron', monospace;
    `;
    
    loadingScreen.innerHTML = `
        <div style="text-align: center; color: #00ff41; position: relative;">
            <div style="font-size: 3rem; margin-bottom: 2rem; text-shadow: 0 0 20px #00ff41; animation: pulse 2s infinite;">
                <span style="color: #ff0000;">AZZA</span><span style="color: #00ff41;">WEB</span>
            </div>
            
            <div style="font-size: 1.2rem; margin-bottom: 1rem; color: #666;">
                <span id="loading-text">INITIALIZING SYSTEM</span>
                <span id="loading-dots">...</span>
            </div>
            
            <div style="margin-top: 2rem; width: 300px; height: 6px; background: #333; border-radius: 3px; overflow: hidden; border: 1px solid #00ff41;">
                <div id="progress-bar" style="width: 0%; height: 100%; background: linear-gradient(90deg, #ff0000, #00ff41); transition: width 0.3s ease; position: relative;">
                    <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent); animation: shimmer 1.5s infinite;"></div>
                </div>
            </div>
            
            <div style="margin-top: 1rem; font-size: 0.9rem; color: #666;">
                <span id="loading-status">Establishing connection...</span>
            </div>
            
            <div style="position: absolute; top: -50px; left: -50px; width: 100px; height: 100px; border: 2px solid #00ff41; border-radius: 50%; animation: rotate 3s linear infinite;"></div>
            <div style="position: absolute; top: -30px; left: -30px; width: 60px; height: 60px; border: 2px solid #ff0000; border-radius: 50%; animation: rotate 2s linear infinite reverse;"></div>
            <div style="position: absolute; top: -10px; left: -10px; width: 20px; height: 20px; border: 2px solid #00ff88; border-radius: 50%; animation: rotate 1s linear infinite;"></div>
        </div>
    `;
    
    // Add CSS animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.7; }
        }
        @keyframes shimmer {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
        }
        @keyframes rotate {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        @keyframes blink {
            0%, 50% { opacity: 1; }
            51%, 100% { opacity: 0; }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(loadingScreen);
    
    // Loading messages
    const loadingMessages = [
        'Establishing connection...',
        'Loading modules...',
        'Initializing security protocols...',
        'Bypassing firewalls...',
        'Accessing mainframe...',
        'Downloading creativity...',
        'Installing awesomeness...',
        'Finalizing setup...',
        'System ready!'
    ];
    
    const loadingText = document.getElementById('loading-text');
    const loadingDots = document.getElementById('loading-dots');
    const loadingStatus = document.getElementById('loading-status');
    const progressBar = document.getElementById('progress-bar');
    
    let progress = 0;
    let messageIndex = 0;
    let dotCount = 0;
    
    // Animate dots
    const dotInterval = setInterval(() => {
        dotCount = (dotCount + 1) % 4;
        loadingDots.textContent = '.'.repeat(dotCount);
    }, 300);
    
    // Animate progress and messages
    const progressInterval = setInterval(() => {
        progress += Math.random() * 3 + 1;
        
        if (progress > 100) progress = 100;
        
        progressBar.style.width = progress + '%';
        
        // Update status message
        if (progress > (messageIndex + 1) * 11) {
            messageIndex = Math.min(messageIndex + 1, loadingMessages.length - 1);
            loadingStatus.textContent = loadingMessages[messageIndex];
        }
        
        if (progress >= 100) {
            clearInterval(progressInterval);
            clearInterval(dotInterval);
            
            loadingText.textContent = 'SYSTEM ONLINE';
            loadingDots.textContent = '';
            loadingStatus.textContent = 'Welcome to the future...';
            
            setTimeout(() => {
                loadingScreen.style.opacity = '0';
                setTimeout(() => {
                    loadingScreen.remove();
                    // Add entrance animation to main content
                    document.querySelector('.main-content').style.opacity = '0';
                    document.querySelector('.main-content').style.transform = 'translateY(50px)';
                    setTimeout(() => {
                        document.querySelector('.main-content').style.transition = 'all 1s ease';
                        document.querySelector('.main-content').style.opacity = '1';
                        document.querySelector('.main-content').style.transform = 'translateY(0)';
                    }, 100);
                }, 800);
            }, 1000);
        }
    }, 50);
});

