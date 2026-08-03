const fs = require('fs');
const path = require('path');
const sharp = require('./node_modules/sharp');

const imgDir = path.join(__dirname, 'assets', 'images');

async function listImages() {
    const files = fs.readdirSync(imgDir);
    console.log(`Total files in assets/images: ${files.length}`);
    
    for (const f of files) {
        if (!f.endsWith('.webp') && !f.endsWith('.png') && !f.endsWith('.jpg')) continue;
        try {
            const m = await sharp(path.join(imgDir, f)).metadata();
            console.log(`${f} | ${m.width}x${m.height} | ${m.format}`);
        } catch (e) {
            console.log(`Error reading ${f}: ${e.message}`);
        }
    }
}

listImages();
