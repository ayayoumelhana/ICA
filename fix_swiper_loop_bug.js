const fs = require('fs');
const path = require('path');

const files = ['index.html', 'etudes.html', 'immigration.html', 'formations.html'];

for (const file of files) {
    const p = path.join(__dirname, file);
    if (!fs.existsSync(p)) continue;
    let html = fs.readFileSync(p, 'utf8');

    // Look for Swiper 2 (Nos autres partenaires) and ensure it has 10 slides (2x 5 slides) for seamless Swiper loop
    const swiper2Pattern = /(<!-- Red Horizontal Line Divider 2 -->[\s\S]*?Nos autres partenaires[\s\S]*?<div class="swiper-wrapper">)([\s\S]*?)(<\/div>\s*<div class="swiper-pagination">)/gi;

    html = html.replace(swiper2Pattern, (match, prefix, slides, suffix) => {
        // Count existing slides
        const slideMatches = slides.match(/<div class="swiper-slide">[\s\S]*?<\/div>/g) || [];
        if (slideMatches.length < 10) {
            // Duplicate slides so total is 10 (fulfilling Swiper loop requirement for 4 slides per view)
            const duplicatedSlides = slides.trim() + '\n' + slides.trim();
            return prefix + '\n' + duplicatedSlides + '\n' + suffix;
        }
        return match;
    });

    fs.writeFileSync(p, html, 'utf8');
    console.log(`Updated slides count in ${file} for Swiper loop compatibility`);
}

// Update script.js Swiper options
let js = fs.readFileSync(path.join(__dirname, 'script.js'), 'utf8');

const updatedSwiperJs = `    /* ==========================================================================
       Swiper.js Carousel for Partners (Infinite Loop & Auto-Play Fixed)
       ========================================================================== */
    const partnersSwipers = document.querySelectorAll('.partners-swiper');
    partnersSwipers.forEach((el) => {
        new Swiper(el, {
            slidesPerView: 4,
            spaceBetween: 30,
            loop: true,
            loopAdditionalSlides: 4,
            grabCursor: true,
            speed: 800,
            autoplay: {
                delay: 2000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
            },
            pagination: {
                el: el.querySelector('.swiper-pagination'),
                clickable: true,
            },
            navigation: {
                nextEl: el.querySelector('.swiper-button-next'),
                prevEl: el.querySelector('.swiper-button-prev'),
            },
            breakpoints: {
                320: {
                    slidesPerView: 2,
                    spaceBetween: 15,
                },
                576: {
                    slidesPerView: 3,
                    spaceBetween: 20,
                },
                768: {
                    slidesPerView: 3,
                    spaceBetween: 25,
                },
                1024: {
                    slidesPerView: 4,
                    spaceBetween: 30,
                }
            }
        });
    });`;

js = js.replace(/\/\* =+ *\r?\n *Swiper\.js Carousel for Partners[\s\S]*?\}\);\s*\}\);/g, updatedSwiperJs.trim());
fs.writeFileSync(path.join(__dirname, 'script.js'), js, 'utf8');
console.log('Updated Swiper options in script.js with loopAdditionalSlides: 4, speed: 800, pauseOnMouseEnter: true');
