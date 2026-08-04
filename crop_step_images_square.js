const sharp = require('./node_modules/sharp');
const path = require('path');
const fs = require('fs');

async function processSquareStepImages() {
    const images = ['etape1.webp', 'etape2.webp', 'etape3.webp', 'etape4.webp'];
    const imgDir = path.join(__dirname, 'assets', 'images');

    for (const imgName of images) {
        const inputPath = path.join(imgDir, imgName);
        const inputBuffer = fs.readFileSync(inputPath);

        const outputBuffer = await sharp(inputBuffer)
            .resize(400, 400, {
                fit: 'cover',
                position: 'center'
            })
            .webp({ quality: 95 })
            .toBuffer();

        fs.writeFileSync(inputPath, outputBuffer);
        console.log(`Processed ${imgName} into 100% perfect 400x400 1:1 square WebP`);
    }
}

processSquareStepImages();
