/**
 * Image Lazy Loading and Optimization
 */
document.addEventListener('DOMContentLoaded', () => {
    // Add loading="lazy" to all images that don't have it
    const images = document.querySelectorAll('img:not([loading])');
    images.forEach(img => {
        img.setAttribute('loading', 'lazy');
        
        // Ensure all images have alt text
        if (!img.getAttribute('alt')) {
            img.setAttribute('alt', 'Loom & Luxe fabric product image');
        }
        
        // Add error handling for broken images
        img.addEventListener('error', function() {
            this.style.display = 'none';
            console.warn('Failed to load image:', this.src);
        });
        
        // Add loading state
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        // Set initial opacity for smooth loading
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';
    });
    
    // Preload hero image for better performance
    const heroImage = document.querySelector('#hero img');
    if (heroImage) {
        const preloadLink = document.createElement('link');
        preloadLink.rel = 'preload';
        preloadLink.as = 'image';
        preloadLink.href = heroImage.getAttribute('src');
        document.head.appendChild(preloadLink);
        heroImage.setAttribute('loading', 'eager'); // Load hero image immediately
    }
    
    // Intersection Observer for lazy loading with better performance
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        observer.unobserve(img);
                    }
                }
            });
        }, {
            rootMargin: '50px 0px',
            threshold: 0.01
        });
        
        // Observe all lazy images
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // Add responsive image handling
    const productImages = document.querySelectorAll('.product-image img');
    productImages.forEach(img => {
        // Add loading placeholder
        const placeholder = document.createElement('div');
        placeholder.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
            background-size: 200% 100%;
            animation: loading 1.5s infinite;
        `;
        
        img.parentNode.style.position = 'relative';
        img.parentNode.appendChild(placeholder);
        
        img.addEventListener('load', () => {
            placeholder.remove();
        });
    });
});

// Add loading animation CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes loading {
        0% { background-position: 200% 0; }
        100% { background-position: -200% 0; }
    }
`;
document.head.appendChild(style);