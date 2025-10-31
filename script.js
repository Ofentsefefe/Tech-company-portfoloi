// Portfolio Website JavaScript
class PortfolioWebsite {
    constructor() {
        this.init();
    }

    init() {
        this.setupMobileMenu();
        this.setupScrollEffects();
        this.setupVideoInteractions();
        this.setupFormHandling();
        this.setupAnimations();
    }

    // Mobile Menu Toggle
    setupMobileMenu() {
        const menuIcon = document.querySelector('.menu-icon');
        const closeIcon = document.querySelector('.close-icon');
        const sidebar = document.querySelector('.sidebar');

        menuIcon.addEventListener('click', () => {
            sidebar.classList.add('open');
            document.body.style.overflow = 'hidden';
        });

        closeIcon.addEventListener('click', () => {
            sidebar.classList.remove('open');
            document.body.style.overflow = '';
        });

        // Close sidebar when clicking on links
        sidebar.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                sidebar.classList.remove('open');
                document.body.style.overflow = '';
            });
        });
    }

    // Scroll Effects
    setupScrollEffects() {
        const header = document.querySelector('header');

        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });

        // Smooth scrolling for anchor links
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
            });
        });
    }

    // Video Interactions
    setupVideoInteractions() {
        // Project video hover effects
        document.querySelectorAll('.project-media video').forEach(video => {
            video.addEventListener('mouseenter', () => {
                video.play();
            });

            video.addEventListener('mouseleave', () => {
                video.pause();
                video.currentTime = 0;
            });
        });

        // Lazy load videos
        const videoObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.play();
                } else {
                    entry.target.pause();
                }
            });
        }, { threshold: 0.5 });

        document.querySelectorAll('video').forEach(video => {
            videoObserver.observe(video);
        });
    }

    // Form Handling
    setupFormHandling() {
        const contactForm = document.getElementById('contactForm');

        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleFormSubmission(contactForm);
            });
        }
    }

    handleFormSubmission(form) {
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;

        // Simulate form submission
        submitButton.innerHTML = '<i class="bx bx-loader-alt bx-spin"></i> Sending...';
        submitButton.disabled = true;

        setTimeout(() => {
            // Success state
            submitButton.innerHTML = '<i class="bx bx-check"></i> Message Sent!';
            submitButton.style.background = 'linear-gradient(135deg, #00ff88, #00ccff)';

            // Reset form
            setTimeout(() => {
                form.reset();
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
                submitButton.style.background = '';

                // Show success message
                this.showNotification('Message sent successfully! We\'ll get back to you soon.');
            }, 2000);
        }, 1500);
    }

    showNotification(message) {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #00ff88, #00ccff);
            color: white;
            padding: 1rem 2rem;
            border-radius: 8px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;
        notification.textContent = message;

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Animate out and remove
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    // Animations
    setupAnimations() {
        // Intersection Observer for scroll animations
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

        // Observe elements for animation
        document.querySelectorAll('.service-card, .project-item, .about-content, .contact-content').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });

        // Add animation class
        const style = document.createElement('style');
        style.textContent = `
            .animate-in {
                opacity: 1 !important;
                transform: translateY(0) !important;
            }
        `;
        document.head.appendChild(style);
    }
}

// Initialize the website when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PortfolioWebsite();
});

// Add loading animation for videos
window.addEventListener('load', () => {
    // Ensure all videos are properly loaded and playing
    document.querySelectorAll('video').forEach(video => {
        video.addEventListener('loadeddata', () => {
            video.play().catch(e => {
                console.log('Video autoplay prevented:', e);
            });
        });
    });
});