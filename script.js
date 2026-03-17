// ============================================
// INITIALIZATION
// ============================================

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    initLoader();
    initSmoothScroll();
    initCursor();
    initNavigation();
    initAnimations();
    initMagneticButtons();
    initContactForm();
    initNoiseCanvas();
});

// ============================================
// LOADING SCREEN
// ============================================

function initLoader() {
    const loadingScreen = document.querySelector('.loading-screen');
    const loadingCounter = document.querySelector('.loading-counter');
    let count = 0;
    
    const counter = setInterval(() => {
        count += Math.floor(Math.random() * 10) + 1;
        if (count >= 100) {
            count = 100;
            clearInterval(counter);
            
            // Fade out loading screen
            gsap.to(loadingScreen, {
                opacity: 0,
                duration: 0.8,
                delay: 0.3,
                ease: 'power2.inOut',
                onComplete: () => {
                    loadingScreen.style.display = 'none';
                    document.body.style.overflow = 'visible';
                    initHeroAnimation();
                }
            });
        }
        loadingCounter.textContent = count;
    }, 50);
}

// ============================================
// SMOOTH SCROLL (Lenis)
// ============================================

function initSmoothScroll() {
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smooth: true,
        mouseMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
        infinite: false
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Update ScrollTrigger on Lenis scroll
    lenis.on('scroll', () => {
        ScrollTrigger.update();
    });

    // Smooth scroll to sections
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                lenis.scrollTo(target, {
                    offset: 0,
                    duration: 1.5
                });
            }
        });
    });

    // Store lenis instance globally
    window.lenis = lenis;
}

// ============================================
// CUSTOM CURSOR
// ============================================

function initCursor() {
    if (window.innerWidth <= 1024) return;

    const cursor = document.querySelector('.cursor');
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorCircle = document.querySelector('.cursor-circle');

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animate() {
        const speed = 0.15;
        cursorX += (mouseX - cursorX) * speed;
        cursorY += (mouseY - cursorY) * speed;

        cursorDot.style.left = cursorX + 'px';
        cursorDot.style.top = cursorY + 'px';
        cursorCircle.style.left = cursorX + 'px';
        cursorCircle.style.top = cursorY + 'px';

        requestAnimationFrame(animate);
    }
    animate();

    // Cursor interactions
    const hoverElements = document.querySelectorAll('a, button, .project-card');
    
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorCircle.classList.add('cursor-hover');
            cursorDot.style.width = '12px';
            cursorDot.style.height = '12px';
        });
        
        el.addEventListener('mouseleave', () => {
            cursorCircle.classList.remove('cursor-hover');
            cursorDot.style.width = '8px';
            cursorDot.style.height = '8px';
        });
    });
}

// ============================================
// NAVIGATION
// ============================================

function initNavigation() {
    const menuToggle = document.querySelector('.menu-toggle');
    const menuOverlay = document.querySelector('.menu-overlay');
    const menuLinks = document.querySelectorAll('.menu-link');
    let menuOpen = false;

    menuToggle.addEventListener('click', () => {
        menuOpen = !menuOpen;
        menuToggle.classList.toggle('active');
        menuOverlay.classList.toggle('active');

        if (menuOpen) {
            // Animate menu links in
            gsap.fromTo(menuLinks,
                { y: 100, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: 'power3.out'
                }
            );
        }
    });

    // Close menu when clicking a link
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuOpen = false;
            menuToggle.classList.remove('active');
            menuOverlay.classList.remove('active');
        });
    });

    // Back to top
    document.querySelector('.back-to-top').addEventListener('click', () => {
        window.lenis.scrollTo(0, { duration: 2 });
    });
}

// ============================================
// HERO ANIMATION
// ============================================

function initHeroAnimation() {
    const heroTitle = document.querySelector('.hero-title');
    const titleLines = heroTitle.querySelectorAll('.title-line');
    
    // Split text into characters for animation
    titleLines.forEach(line => {
        const text = line.textContent;
        line.innerHTML = '';
        
        text.split('').forEach(char => {
            const span = document.createElement('span');
            span.textContent = char === ' ' ? '\u00A0' : char;
            span.style.display = 'inline-block';
            line.appendChild(span);
        });
    });

    // Animate hero elements
    const tl = gsap.timeline();
    
    tl.from('.hero-badge', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
    })
    .from('.title-line:nth-child(1) span', {
        y: 100,
        opacity: 0,
        rotationX: -90,
        duration: 1,
        stagger: 0.03,
        ease: 'power4.out'
    }, '-=0.3')
    .from('.title-line:nth-child(2) span', {
        y: 100,
        opacity: 0,
        rotationX: -90,
        duration: 1,
        stagger: 0.03,
        ease: 'power4.out'
    }, '-=0.7')
    .from('.title-line:nth-child(3) span', {
        y: 100,
        opacity: 0,
        rotationX: -90,
        duration: 1,
        stagger: 0.03,
        ease: 'power4.out'
    }, '-=0.7')
    .from('.hero-subtitle', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
    }, '-=0.5')
    .from('.hero-stats', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
    }, '-=0.5')
    .from('.hero-cta', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
    }, '-=0.5')
    .from('.scroll-indicator', {
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
    }, '-=0.3');
}

// ============================================
// SCROLL ANIMATIONS
// ============================================

function initAnimations() {
    // Register ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Animate section titles
    const sectionTitles = document.querySelectorAll('.section-title');
    sectionTitles.forEach(title => {
        const words = title.querySelectorAll('.title-word');
        
        words.forEach((word, i) => {
            const text = word.textContent;
            word.innerHTML = '';
            
            text.split('').forEach(char => {
                const span = document.createElement('span');
                span.textContent = char === ' ' ? '\u00A0' : char;
                span.style.display = 'inline-block';
                word.appendChild(span);
            });
        });

        gsap.from(words, {
            scrollTrigger: {
                trigger: title,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            y: 100,
            opacity: 0,
            rotationX: -90,
            stagger: {
                each: 0.05,
                from: 'start'
            },
            duration: 1,
            ease: 'power4.out'
        });
    });

    // Animate project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            },
            y: 100,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        });

        // Parallax on project images
        const image = card.querySelector('.project-image');
        gsap.to(image, {
            scrollTrigger: {
                trigger: card,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true
            },
            y: -50,
            ease: 'none'
        });
    });

    // Animate paragraphs
    const paragraphs = document.querySelectorAll('.about-para');
    paragraphs.forEach((para, i) => {
        gsap.from(para, {
            scrollTrigger: {
                trigger: para,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            delay: i * 0.1,
            ease: 'power3.out'
        });
    });

    // Animate detail blocks
    const detailBlocks = document.querySelectorAll('.detail-block');
    detailBlocks.forEach((block, i) => {
        gsap.from(block, {
            scrollTrigger: {
                trigger: block,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            delay: i * 0.15,
            ease: 'power3.out'
        });
    });

    // Animate form groups
    const formGroups = document.querySelectorAll('.form-group');
    formGroups.forEach((group, i) => {
        gsap.from(group, {
            scrollTrigger: {
                trigger: group,
                start: 'top 90%',
                toggleActions: 'play none none reverse'
            },
            x: -50,
            opacity: 0,
            duration: 0.8,
            delay: i * 0.1,
            ease: 'power3.out'
        });
    });

    // Parallax on scroll indicator
    gsap.to('.scroll-line', {
        scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: true
        },
        scaleY: 0,
        transformOrigin: 'top',
        ease: 'none'
    });
}

// ============================================
// MAGNETIC BUTTONS
// ============================================

function initMagneticButtons() {
    if (window.innerWidth <= 1024) return;

    const magneticButtons = document.querySelectorAll('.magnetic-btn');
    
    magneticButtons.forEach(button => {
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            gsap.to(button, {
                x: x * 0.3,
                y: y * 0.3,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        
        button.addEventListener('mouseleave', () => {
            gsap.to(button, {
                x: 0,
                y: 0,
                duration: 0.5,
                ease: 'elastic.out(1, 0.3)'
            });
        });
    });
}

// ============================================
// CONTACT FORM
// ============================================

function initContactForm() {
    const form = document.getElementById('contactForm');
    const inputs = form.querySelectorAll('input, textarea');
    
    // Auto-resize textarea
    const textarea = form.querySelector('textarea');
    textarea.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = this.scrollHeight + 'px';
    });
    
    // Add placeholder attribute for CSS :placeholder-shown selector
    inputs.forEach(input => {
        input.setAttribute('placeholder', ' ');
    });
    
    // Form submission
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = form.querySelector('.submit-btn');
        const originalText = submitBtn.querySelector('span').textContent;
        
        // Disable button and show loading state
        submitBtn.disabled = true;
        submitBtn.querySelector('span').textContent = 'Sending...';
        
        // Simulate form submission (replace with your actual form handling)
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Success feedback
        submitBtn.querySelector('span').textContent = 'Message Sent!';
        
        // Reset form after delay
        setTimeout(() => {
            form.reset();
            submitBtn.disabled = false;
            submitBtn.querySelector('span').textContent = originalText;
            
            // Reset textarea height
            textarea.style.height = 'auto';
        }, 3000);
    });
}

// ============================================
// NOISE CANVAS
// ============================================

function initNoiseCanvas() {
    const canvas = document.querySelector('.noise-canvas');
    const ctx = canvas.getContext('2d');
    
    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);
    
    function noise() {
        const imageData = ctx.createImageData(canvas.width, canvas.height);
        const buffer32 = new Uint32Array(imageData.data.buffer);
        const len = buffer32.length;
        
        for (let i = 0; i < len; i++) {
            if (Math.random() < 0.5) {
                buffer32[i] = 0xff000000;
            }
        }
        
        ctx.putImageData(imageData, 0, 0);
    }
    
    function animate() {
        noise();
        requestAnimationFrame(animate);
    }
    animate();
}

// ============================================
// HERO CTA CLICK
// ============================================

document.querySelector('.hero-cta')?.addEventListener('click', () => {
    const workSection = document.getElementById('work');
    window.lenis.scrollTo(workSection, {
        offset: 0,
        duration: 1.5
    });
});
