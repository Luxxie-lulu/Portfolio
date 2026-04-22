// main.js - Lumina Portfolio Interactivity

document.addEventListener('DOMContentLoaded', () => {
    // 1. Header Scroll Effect
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 2. Reveal on Scroll Animation
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealOnScroll = () => {
        const triggerBottom = window.innerHeight * 0.85;
        
        revealElements.forEach(el => {
            const elTop = el.getBoundingClientRect().top;
            
            if (elTop < triggerBottom) {
                el.classList.add('active');
                
                // Animate skill bars if the element is a skill item
                if (el.classList.contains('skill-item')) {
                    const progress = el.querySelector('.skill-progress');
                    if (progress) {
                        progress.style.width = progress.getAttribute('data-width');
                    }
                }
            }
        });
    };

    // Initial check and scroll listener
    revealOnScroll();
    window.addEventListener('scroll', revealOnScroll);

    // 3. Smooth Scroll for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 4. Form Submission Handling
    // (Handled by @formspree/ajax via data attributes and CDN script)

    // 5. Card Tilt Effect (Subtle)
    const cards = document.querySelectorAll('.project-card, .skill-item');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)`;
        });
    });

    // 6. Dynamic Background Interaction (Optional/Subtle)
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        const mesh = document.querySelector('.bg-mesh');
        if (mesh) {
            mesh.style.transform = `translate(${mouseX * 20}px, ${mouseY * 20}px)`;
        }
    });

    // 7. Back to Top Button
    const backToTop = document.getElementById('back-to-top');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTop.style.display = 'flex';
            setTimeout(() => backToTop.style.opacity = '1', 10);
        } else {
            backToTop.style.opacity = '0';
            setTimeout(() => {
                if (window.scrollY <= 500) backToTop.style.display = 'none';
            }, 400);
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});
