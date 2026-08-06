const fs = require('fs');
const path = require('path');

// 1. Define the official 2-tier Partners Section HTML
const partnersSectionHtml = `    <!-- Section Logos Universités Canadiennes & Partenaires -->
    <section class="partners-pdf-section section bg-white" style="padding: 50px 0; border-top: 1px solid #E2E8F0;">
        <div class="container">
            <!-- Red Horizontal Line Divider 1 -->
            <div class="pdf-red-divider">
                <span>Accès aux grandes écoles et universités canadiennes</span>
            </div>

            <div class="swiper partners-swiper" style="margin-top: 25px; padding-bottom: 45px;">
                <div class="swiper-wrapper">
                    <div class="swiper-slide"><img src="assets/images/Artboard-12-3-300x241.webp" alt="Concordia University" class="partner-pdf-img" width="160" height="80" loading="lazy" decoding="async"></div>
                    <div class="swiper-slide"><img src="assets/images/Artboard-14-3-300x159.webp" alt="uOttawa" class="partner-pdf-img" width="160" height="80" loading="lazy" decoding="async"></div>
                    <div class="swiper-slide"><img src="assets/images/Artboard-15-3-300x216.webp" alt="LCI Education" class="partner-pdf-img" width="160" height="80" loading="lazy" decoding="async"></div>
                    <div class="swiper-slide"><img src="assets/images/Artboard-17-2-300x246.webp" alt="Université Partenaire 4" class="partner-pdf-img" width="160" height="80" loading="lazy" decoding="async"></div>
                    <div class="swiper-slide"><img src="assets/images/Artboard-19-2-300x246.webp" alt="Université Partenaire 5" class="partner-pdf-img" width="160" height="80" loading="lazy" decoding="async"></div>
                    <div class="swiper-slide"><img src="assets/images/Artboard-20-2-300x203.webp" alt="Université Partenaire 6" class="partner-pdf-img" width="160" height="80" loading="lazy" decoding="async"></div>
                    <div class="swiper-slide"><img src="assets/images/Artboard-21-3-300x198.webp" alt="Université Partenaire 7" class="partner-pdf-img" width="160" height="80" loading="lazy" decoding="async"></div>
                    <div class="swiper-slide"><img src="assets/images/Artboard-22-3-300x186.webp" alt="Université Partenaire 8" class="partner-pdf-img" width="160" height="80" loading="lazy" decoding="async"></div>
                    <div class="swiper-slide"><img src="assets/images/Artboard-23-3-300x201.webp" alt="Université Partenaire 9" class="partner-pdf-img" width="160" height="80" loading="lazy" decoding="async"></div>
                </div>
                <div class="swiper-pagination"></div>
                <div class="swiper-button-prev"></div>
                <div class="swiper-button-next"></div>
            </div>

            <!-- Red Horizontal Line Divider 2 -->
            <div class="pdf-red-divider" style="margin-top: 45px;">
                <span>Nos autres partenaires</span>
            </div>

            <div class="swiper partners-swiper" style="margin-top: 25px; padding-bottom: 45px;">
                <div class="swiper-wrapper">
                    <div class="swiper-slide"><img src="assets/images/Artboard-24-3-300x190.webp" alt="Allianz" class="partner-pdf-img" width="160" height="80" loading="lazy" decoding="async"></div>
                    <div class="swiper-slide"><img src="assets/images/Artboard-25-3-259x300.webp" alt="TuGo" class="partner-pdf-img" width="160" height="80" loading="lazy" decoding="async"></div>
                    <div class="swiper-slide"><img src="assets/images/Artboard-13-3-300x189.webp" alt="Desjardins Bank" class="partner-pdf-img" width="160" height="80" loading="lazy" decoding="async"></div>
                    <div class="swiper-slide"><img src="assets/images/Artboard-16-3-300x224.webp" alt="Partenaire Financier 4" class="partner-pdf-img" width="160" height="80" loading="lazy" decoding="async"></div>
                    <div class="swiper-slide"><img src="assets/images/Artboard-18-2-300x300.webp" alt="Partenaire Assurance 5" class="partner-pdf-img" width="160" height="80" loading="lazy" decoding="async"></div>
                </div>
                <div class="swiper-pagination"></div>
                <div class="swiper-button-prev"></div>
                <div class="swiper-button-next"></div>
            </div>
        </div>
    </section>`;

// Replace or insert on etudes.html
let etudes = fs.readFileSync(path.join(__dirname, 'etudes.html'), 'utf8');
etudes = etudes.replace(
    /(<!-- Établissements Partenaires -->|<!-- Section Logos Universités Canadiennes & Partenaires -->)[\s\S]*?<\/section>/gi,
    partnersSectionHtml
);
fs.writeFileSync(path.join(__dirname, 'etudes.html'), etudes, 'utf8');
console.log('Updated etudes.html with 2-tier partners section');

// Replace or insert on index.html
let index = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
index = index.replace(
    /<!-- Section Logos Universités Canadiennes & Partenaires -->[\s\S]*?<\/section>/gi,
    partnersSectionHtml
);
fs.writeFileSync(path.join(__dirname, 'index.html'), index, 'utf8');
console.log('Updated index.html with 2-tier partners section');

// Replace or insert on immigration.html before FAQ or Contact CTA
let immigration = fs.readFileSync(path.join(__dirname, 'immigration.html'), 'utf8');
if (!immigration.includes('partners-pdf-section')) {
    immigration = immigration.replace(
        '<!-- FAQ Section -->',
        partnersSectionHtml + '\n\n    <!-- FAQ Section -->'
    );
    fs.writeFileSync(path.join(__dirname, 'immigration.html'), immigration, 'utf8');
    console.log('Added partners section to immigration.html');
}

// Replace or insert on formations.html before FAQ or Contact CTA
let formations = fs.readFileSync(path.join(__dirname, 'formations.html'), 'utf8');
if (!formations.includes('partners-pdf-section')) {
    formations = formations.replace(
        '<!-- FAQ Section -->',
        partnersSectionHtml + '\n\n    <!-- FAQ Section -->'
    );
    fs.writeFileSync(path.join(__dirname, 'formations.html'), formations, 'utf8');
    console.log('Added partners section to formations.html');
}

// 2. Enable infinite looping & smooth autoplay in script.js for .partners-swiper
let js = fs.readFileSync(path.join(__dirname, 'script.js'), 'utf8');
js = js.replace(
    /loop:\s*false/g,
    'loop: true'
);
js = js.replace(
    /delay:\s*4000/g,
    'delay: 2500'
);
fs.writeFileSync(path.join(__dirname, 'script.js'), js, 'utf8');
console.log('Updated script.js for infinite smooth partner carousel looping');

// 3. Add slide flex alignment in style.css
let css = fs.readFileSync(path.join(__dirname, 'style.css'), 'utf8');
const partnerCssFix = `
/* Partner Swiper Slide Alignment */
.partners-swiper .swiper-slide {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 120px;
    padding: 10px;
}
.pdf-red-divider span {
    color: #F20D0D !important;
}
`;
if (!css.includes('Partner Swiper Slide Alignment')) {
    css += '\n' + partnerCssFix;
    fs.writeFileSync(path.join(__dirname, 'style.css'), css, 'utf8');
    console.log('Added slide flex alignment in style.css');
}
