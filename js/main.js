/**
 * Loom & Luxe by Stephanie
 * Main JavaScript File
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize navigation
    initNavigation();
    
    // Initialize product grid
    initProductGrid();
    
    // Initialize testimonials
    initTestimonials();
    
    // Initialize contact form
    initContactForm();
    
    // Initialize scroll reveal animations
    initScrollReveal();
});

/**
 * Navigation functionality
 */
function initNavigation() {
    const header = document.getElementById('header');
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    // Handle scroll event for sticky header
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Handle mobile menu toggle
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
            
            // Toggle aria-expanded attribute for accessibility
            const expanded = menuToggle.getAttribute('aria-expanded') === 'true' || false;
            menuToggle.setAttribute('aria-expanded', !expanded);
        });
        
        // Add aria attributes for accessibility
        menuToggle.setAttribute('aria-controls', 'nav-links');
        menuToggle.setAttribute('aria-expanded', 'false');
        navLinks.id = 'nav-links';
    }
    
    // Close mobile menu when clicking a link
    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        });
    });
    
    // Initialize smooth scroll functionality
    initSmoothScroll();
}

// Smooth scroll with header offset
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (window.innerWidth <= 768) {
                    const menuToggle = document.querySelector('.menu-toggle');
                    const navLinks = document.querySelector('.nav-links');
                    if (menuToggle && navLinks) {
                        menuToggle.classList.remove('active');
                        navLinks.classList.remove('active');
                        menuToggle.setAttribute('aria-expanded', 'false');
                    }
                }
            }
        });
    });
}

/**
 * Product Grid functionality - dynamically populate with fabric images
 */
function initProductGrid() {
    const productsGrid = document.querySelector('.products-grid');
    if (!productsGrid) return;
    
    // Featured fabric images to display
    const featuredFabrics = [
        { name: 'Premium Ankara Print', price: '$24.99', image: 'assets/fabric A1.jpg' },
        { name: 'Luxury Kente Design', price: '$29.99', image: 'assets/fabric B2.jpg' },
        { name: 'Traditional Wax Print', price: '$19.99', image: 'assets/fabric C1.jpg' },
        { name: 'Modern African Pattern', price: '$27.99', image: 'assets/fabric D5.jpg' },
        { name: 'Classic Ankara Collection', price: '$22.99', image: 'assets/fabric E6.jpg' },
        { name: 'Contemporary Wax Print', price: '$25.99', image: 'assets/fabric F3.jpg' },
        { name: 'Elegant Kente Pattern', price: '$32.99', image: 'assets/fabric G2.jpg' },
        { name: 'Vibrant African Wax', price: '$26.99', image: 'assets/fabric H5.jpg' },
        { name: 'Royal Ankara Fabric', price: '$29.99', image: 'assets/fabric D9.jpg' },
        { name: 'Heritage Collection', price: '$34.99', image: 'assets/fabric I2.jpg' },
        { name: 'Modern Fusion Print', price: '$27.99', image: 'assets/fabric G6.jpg' },
        { name: 'Premium Wax Collection', price: '$31.99', image: 'assets/fabric F6.jpg' }
    ];
    
    // Create and append product cards
    featuredFabrics.forEach(fabric => {
        const card = document.createElement('div');
        card.className = 'product-card';
        
        const imageDiv = document.createElement('div');
        imageDiv.className = 'product-image';
        
        const img = document.createElement('img');
        img.src = fabric.image;
        img.alt = fabric.name;
        img.loading = 'lazy'; // Lazy load images for performance
        
        const infoDiv = document.createElement('div');
        infoDiv.className = 'product-info';
        
        const nameElem = document.createElement('h3');
        nameElem.className = 'product-name';
        nameElem.textContent = fabric.name;
        
        const priceElem = document.createElement('p');
        priceElem.className = 'product-price';
        priceElem.textContent = fabric.price;
        
        // Append all elements
        imageDiv.appendChild(img);
        infoDiv.appendChild(nameElem);
        infoDiv.appendChild(priceElem);
        
        card.appendChild(imageDiv);
        card.appendChild(infoDiv);
        
        productsGrid.appendChild(card);
    });
    
    // Add click feedback to product cards
    document.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('click', function(e) {
            // Quick scale feedback
            this.style.transform = 'scale(0.98) translateY(-5px)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
}

/**
 * Testimonials functionality
 */
function initTestimonials() {
    const testimonialsGrid = document.querySelector('.testimonials-grid');
    if (!testimonialsGrid) return;
    
    // Testimonial data
    const testimonials = [
        {
            text: "Honestly wasn't expecting this quality. The ankara print I ordered feels thicker and more vibrant than anything I've gotten from other sellers. Worth every penny.",
            author: "Amara, Toronto",
            rating: 5
        },
        {
            text: "I've been buying fabric online for years and Stephanie's shop is the only one I trust now. She replies fast, ships faster, and the fabrics always look exactly like the photos.",
            author: "David, Vancouver",
            rating: 5
        },
        {
            text: "Got the kente fabric for my daughter's graduation outfit. The detail is incredible. My tailor even asked where I sourced it from because she was impressed.",
            author: "Grace, Calgary",
            rating: 5
        }
    ];
    
    // Create and append testimonial cards
    testimonials.forEach(testimonial => {
        const card = document.createElement('div');
        card.className = 'testimonial-card';
        
        const starsDiv = document.createElement('div');
        starsDiv.className = 'stars';
        
        // Create star rating
        for (let i = 0; i < 5; i++) {
            const star = document.createElement('span');
            star.textContent = i < testimonial.rating ? '★' : '☆';
            starsDiv.appendChild(star);
        }
        
        const textElem = document.createElement('p');
        textElem.className = 'testimonial-text';
        textElem.textContent = testimonial.text;
        
        const authorElem = document.createElement('p');
        authorElem.className = 'testimonial-author';
        authorElem.textContent = testimonial.author;
        
        // Append all elements
        card.appendChild(starsDiv);
        card.appendChild(textElem);
        card.appendChild(authorElem);
        
        testimonialsGrid.appendChild(card);
    });
}

/**
 * Contact form functionality
 */
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        
        // Validate all fields
        const nameField = document.getElementById('name');
        const emailField = document.getElementById('email');
        const messageField = document.getElementById('message');
        
        const isNameValid = validateField(nameField);
        const isEmailValid = validateField(emailField);
        const isMessageValid = validateField(messageField);
        
        if (!isNameValid || !isEmailValid || !isMessageValid) {
            showNotification('Please fill in all required fields correctly.', 'error');
            return;
        }
        
        // Add loading state
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Sending...';
        submitButton.classList.add('loading');
        submitButton.disabled = true;
        
        // Prepare form data for Formspree
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('message', message);
        
        // Submit to Formspree
        fetch('https://formspree.io/f/xgvnobrz', {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                // Show success message
                showNotification(`Thank you for your message, ${name}! We'll get back to you at ${email} as soon as possible.`, 'success');
                
                // Reset form
                contactForm.reset();
            } else {
                throw new Error('Form submission failed');
            }
        })
        .catch(error => {
            console.error('Form submission error:', error);
            showNotification('Sorry, there was an error sending your message. Please try again or contact us directly.', 'error');
        })
        .finally(() => {
            // Reset button
            submitButton.textContent = originalText;
            submitButton.classList.remove('loading');
            submitButton.disabled = false;
        });
    });
    
    // Add real-time validation
    const inputs = contactForm.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            if (this.classList.contains('error')) {
                validateField(this);
            }
        });
    });
}

/**
 * Validate individual form field
 */
function validateField(field) {
    const value = field.value.trim();
    const fieldType = field.type;
    const fieldName = field.name;
    
    // Remove existing error styling
    field.classList.remove('error');
    const existingError = field.parentNode.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    let isValid = true;
    let errorMessage = '';
    
    // Required field validation
    if (!value) {
        isValid = false;
        errorMessage = `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required.`;
    }
    // Email validation
    else if (fieldType === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address.';
        }
    }
    // Message length validation
    else if (fieldName === 'message' && value.length < 10) {
        isValid = false;
        errorMessage = 'Message must be at least 10 characters long.';
    }
    
    if (!isValid) {
        field.classList.add('error');
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = errorMessage;
        errorDiv.style.color = 'var(--color-accent)';
        errorDiv.style.fontSize = 'var(--fs-small)';
        errorDiv.style.marginTop = '0.25rem';
        field.parentNode.appendChild(errorDiv);
    }
    
    return isValid;
}

/**
 * Show notification message
 */
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Determine background color based on type
    let backgroundColor;
    switch(type) {
        case 'success':
            backgroundColor = 'var(--color-accent)';
            break;
        case 'error':
            backgroundColor = '#e74c3c';
            break;
        default:
            backgroundColor = '#333';
    }
    
    // Style the notification
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '1rem 1.5rem',
        borderRadius: 'var(--border-radius-sm)',
        color: 'white',
        fontWeight: 'var(--font-weight-medium)',
        zIndex: '1000',
        transform: 'translateX(100%)',
        transition: 'transform 0.3s ease',
        backgroundColor: backgroundColor,
        boxShadow: 'var(--shadow-md)',
        maxWidth: '400px',
        wordWrap: 'break-word'
    });
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

/**
 * Scroll reveal animation
 */
function initScrollReveal() {
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    // Target elements to animate
    document.querySelectorAll('.product-card, .testimonial-card, .about-content').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(el);
    });
}