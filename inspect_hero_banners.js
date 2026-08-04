const sharp = require('./node_modules/sharp');
const path = require('path');

async function inspectHeroBanners() {
    const banners = ['pdf-student-banner.webp', 'pdf-express-banner.webp', 'pdf-rocket-banner.webp'];
    const imgDir = path.join(__dirname, 'assets', 'images');

    for (const b of banners) {
        const p = path.join(imgDir, b);
        try {
            const meta = await sharp(p).metadata();
            console.log(`${b}: ${meta.width}x${meta.height}`);
        } catch(e) {
            console.log(`${b}: error ${e.message}`);
        }
    }
}

inspectHeroBanners();
