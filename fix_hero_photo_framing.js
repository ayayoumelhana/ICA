const fs = require('fs');
const path = require('path');

// 1. Update style.css base rules for .hero-backdrop-layer
let css = fs.readFileSync(path.join(__dirname, 'style.css'), 'utf8');

const heroBackdropFix = `
/* Hero Backdrop Layers Perfect Subject Framing */
.hero-backdrop-layer.bg-study {
    background-position: right 20% center !important;
}

.hero-backdrop-layer.bg-immigration {
    background-position: right 22% center !important;
}

.hero-backdrop-layer.bg-training {
    background-position: right 18% center !important;
}

.hero-backdrop-layer.bg-default {
    background-position: right 20% center !important;
}
`;

css += '\n' + heroBackdropFix;
fs.writeFileSync(path.join(__dirname, 'style.css'), css, 'utf8');
console.log('Updated style.css hero backdrop framing');

// 2. Update etudes.html hero banner style
let etudes = fs.readFileSync(path.join(__dirname, 'etudes.html'), 'utf8');
etudes = etudes.replace(
    /background:\s*linear-gradient\([^)]+\),\s*url\([^)]+\)[^;]+/gi,
    "background: linear-gradient(90deg, rgba(7, 43, 73, 0.88) 0%, rgba(7, 43, 73, 0.6) 50%, rgba(7, 43, 73, 0.15) 100%), url('assets/images/pdf-student-banner.webp') right 20% center / cover no-repeat"
);
fs.writeFileSync(path.join(__dirname, 'etudes.html'), etudes, 'utf8');
console.log('Updated etudes.html hero photo framing');

// 3. Update immigration.html hero banner style
let immigration = fs.readFileSync(path.join(__dirname, 'immigration.html'), 'utf8');
immigration = immigration.replace(
    /background:\s*linear-gradient\([^)]+\),\s*url\([^)]+\)[^;]+/gi,
    "background: linear-gradient(90deg, rgba(7, 43, 73, 0.88) 0%, rgba(7, 43, 73, 0.6) 50%, rgba(7, 43, 73, 0.15) 100%), url('assets/images/pdf-express-banner.webp') right 22% center / cover no-repeat"
);
fs.writeFileSync(path.join(__dirname, 'immigration.html'), immigration, 'utf8');
console.log('Updated immigration.html hero photo framing');

// 4. Update formations.html hero banner style
let formations = fs.readFileSync(path.join(__dirname, 'formations.html'), 'utf8');
formations = formations.replace(
    /background:\s*linear-gradient\([^)]+\),\s*url\([^)]+\)[^;]+/gi,
    "background: linear-gradient(90deg, rgba(7, 43, 73, 0.88) 0%, rgba(7, 43, 73, 0.6) 50%, rgba(7, 43, 73, 0.15) 100%), url('assets/images/pdf-rocket-banner.webp') right 18% center / cover no-repeat"
);
fs.writeFileSync(path.join(__dirname, 'formations.html'), formations, 'utf8');
console.log('Updated formations.html hero photo framing');
