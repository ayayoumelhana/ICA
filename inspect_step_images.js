const sharp = require('./node_modules/sharp');
const path = require('path');

async function inspectStepImages() {
    const images = ['etape1.webp', 'etape2.webp', 'etape3.webp', 'etape4.webp'];
    for (const img of images) {
        const p = path.join(__dirname, 'assets', 'images', img);
        try {
            const meta = await sharp(p).metadata();
            console.log(`${img}: ${meta.width}x${meta.height}`);
        } catch (e) {
            console.log(`${img}: error ${e.message}`);
        }
    }
}

inspectStepImages();
