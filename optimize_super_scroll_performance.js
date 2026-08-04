const fs = require('fs');
const path = require('path');

// 1. Add Invisible CSS Scroll Acceleration Rules to style.css
let css = fs.readFileSync(path.join(__dirname, 'style.css'), 'utf8');

const invisiblePerfCss = `
/* Invisible High-Performance GPU Acceleration & Offscreen Rendering Optimization */
html {
    scroll-behavior: smooth;
    -webkit-overflow-scrolling: touch;
}

body {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
}

/* Offscreen Content Visibility Optimization for 144Hz Smooth Scrolling */
.partners-pdf-section,
.testimonial-pdf-section,
.site-footer,
.faq-accordion-item,
.service-landing-hero + section {
    content-visibility: auto;
    contain-intrinsic-size: 1px 600px;
}

/* Composite Layer Hardware Offloading */
.site-header,
.interactive-service-card,
.expanding-card,
.feature-card,
.pdf-step-pill,
.pdf-service-content-grid,
.google-reviews-marquee-track,
.hero-backdrop-layer {
    transform: translate3d(0, 0, 0);
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
}
`;

if (!css.includes('Offscreen Content Visibility Optimization')) {
    css += '\n' + invisiblePerfCss;
    fs.writeFileSync(path.join(__dirname, 'style.css'), css, 'utf8');
    console.log('Added invisible GPU acceleration and content-visibility rules to style.css');
}

// 2. Ensure all JS scroll listeners in script.js are 100% passive and non-blocking
let js = fs.readFileSync(path.join(__dirname, 'script.js'), 'utf8');

// Ensure passive scroll listener
js = js.replace(/addEventListener\('scroll',\s*([^,{]+)(\);?)/g, "addEventListener('scroll', $1, { passive: true });");
js = js.replace(/addEventListener\('wheel',\s*([^,{]+)(\);?)/g, "addEventListener('wheel', $1, { passive: true });");
js = js.replace(/addEventListener\('touchmove',\s*([^,{]+)(\);?)/g, "addEventListener('touchmove', $1, { passive: true });");

fs.writeFileSync(path.join(__dirname, 'script.js'), js, 'utf8');
console.log('Optimized script.js event listeners for passive non-blocking execution');
