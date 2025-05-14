document.addEventListener('DOMContentLoaded', function () {
    // ======================
    // Mobile Navigation
    // ======================
    const menuBtn = document.querySelector('.menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links li a');

    menuBtn.addEventListener('click', function () {
        navLinks.classList.toggle('active');
        this.classList.toggle('open');
    });

    navItems.forEach(item => {
        item.addEventListener('click', function () {
            navLinks.classList.remove('active');
            menuBtn.classList.remove('open');

            navItems.forEach(navItem => navItem.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // ======================
    // Smooth Scrolling
    // ======================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ======================
    // Sticky Header
    // ======================
    const header = document.querySelector('header');
    const heroSection = document.querySelector('.hero-section');

    window.addEventListener('scroll', function () {
        if (window.scrollY > heroSection.offsetHeight - 100) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }

        highlightActiveSection();
    });

    // ======================
    // Active Section Highlight
    // ======================
    function highlightActiveSection() {
        const scrollPosition = window.scrollY + 100;

        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navItems.forEach(item => {
                    item.classList.remove('active');
                    if (item.getAttribute('href') === `#${sectionId}`) {
                        item.classList.add('active');
                    }
                });
            }
        });
    }

    // ======================
    // Portfolio Filtering
    // ======================
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            filterBtns.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            const filter = this.getAttribute('data-filter');

            portfolioItems.forEach(item => {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';

                setTimeout(() => {
                    if (filter === 'all' || item.classList.contains(filter)) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }

                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                        item.style.transition = 'all 0.3s ease';
                    }, 50);
                }, 300);
            });
        });
    });

    // ======================
    // Portfolio Item Modal
    // ======================
    const portfolioGrid = document.querySelector('.portfolio-grid');

    portfolioGrid.addEventListener('click', function (e) {
        if (e.target.closest('.portfolio-item')) {
            const clickedItem = e.target.closest('.portfolio-item');
            const imgSrc = clickedItem.querySelector('img').src;
            const category = Array.from(clickedItem.classList)
                .find(cls => cls !== 'portfolio-item');

            const modal = document.createElement('div');
            modal.className = 'portfolio-modal';
            modal.innerHTML = `
                <div class="modal-content">
                    <span class="close-modal">&times;</span>
                    <img src="${imgSrc}" alt="${category} project">
                    <div class="modal-caption">${category.toUpperCase()} Project</div>
                </div>
            `;

            document.body.appendChild(modal);
            document.body.style.overflow = 'hidden';

            modal.querySelector('.close-modal').addEventListener('click', function () {
                modal.style.opacity = '0';
                setTimeout(() => {
                    modal.remove();
                    document.body.style.overflow = 'auto';
                }, 300);
            });

            modal.addEventListener('click', function (e) {
                if (e.target === modal) {
                    modal.style.opacity = '0';
                    setTimeout(() => {
                        modal.remove();
                        document.body.style.overflow = 'auto';
                    }, 300);
                }
            });
        }
    });

    // ======================
    // Testimonial Carousel
    // ======================
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    let currentTestimonial = 0;

    function showTestimonial(index) {
        testimonialCards.forEach((card, i) => {
            card.style.display = i === index ? 'block' : 'none';
            card.style.opacity = i === index ? '1' : '0';
            card.style.transform = i === index ? 'translateY(0)' : 'translateY(20px)';
            card.style.transition = 'all 0.5s ease';
        });
    }

    function rotateTestimonials() {
        currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
        showTestimonial(currentTestimonial);
    }

    showTestimonial(0);
    if (testimonialCards.length > 1) {
        setInterval(rotateTestimonials, 5000);
    }

    // ======================
    // Form Validation
    // ======================
    const contactForm = document.querySelector('.contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const name = this.querySelector('input[type="text"]').value.trim();
            const email = this.querySelector('input[type="email"]').value.trim();
            const message = this.querySelector('textarea').value.trim();

            if (!name || !email || !message) {
                alert('Please fill in all required fields');
                return;
            }

            if (!validateEmail(email)) {
                alert('Please enter a valid email address');
                return;
            }

            this.querySelector('.btn-submit').textContent = 'Sending...';

            setTimeout(() => {
                this.reset();
                this.querySelector('.btn-submit').textContent = 'Message Sent!';

                setTimeout(() => {
                    this.querySelector('.btn-submit').textContent = 'Send Message';
                }, 2000);

                const successMsg = document.createElement('div');
                successMsg.className = 'form-success';
                successMsg.textContent = 'Thank you! Your message has been sent. I will get back to you soon.';
                this.appendChild(successMsg);

                setTimeout(() => {
                    successMsg.remove();
                }, 5000);
            }, 1500);
        });
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // ======================
    // Animation on Scroll
    // ======================
    const animateOnScroll = function () {
        const elements = document.querySelectorAll('.animate-on-scroll');

        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (elementPosition < windowHeight - 100) {
                element.classList.add('animated');
            }
        });
    };

    document.querySelectorAll('section').forEach(section => {
        section.classList.add('animate-on-scroll');
    });

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll();

    // ======================
    // Download CV Button
    // ======================
    const downloadBtn = document.querySelector('.btn-download');

    if (downloadBtn) {
        downloadBtn.addEventListener('click', function (e) {
            e.preventDefault();

            this.textContent = 'Preparing CV...';

            setTimeout(() => {
                this.textContent = 'Download CV';
                alert('CV download would start now. In a real implementation, this would download your CV file.');
            }, 1000);
        });
    }

    // ======================
    // Dynamic Year in Footer
    // ======================
    const yearSpan = document.querySelector('footer p');
    if (yearSpan) {
        const currentYear = new Date().getFullYear();
        yearSpan.textContent = yearSpan.textContent.replace('2025', currentYear);
    }
});
