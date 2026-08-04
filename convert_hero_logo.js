const sharp = require('./node_modules/sharp');
const path = require('path');

async function processHeroLogo() {
    const srcPath = `C:\\Users\\Ash\\.gemini\\antigravity\\brain\\90cbd978-d769-4703-bcd2-ccc0144d7a62\\.user_uploaded\\media__1785836925982.png`;
    const destPath = path.join(__dirname, 'assets', 'images', 'hero-watermark-logo.webp');

    const meta = await sharp(srcPath).metadata();
    console.log(`Original logo dimensions: ${meta.width}x${meta.height}`);

    await sharp(srcPath)
        .webp({ quality: 95 })
        .toFile(destPath);

    console.log(`Saved hero logo to ${destPath}`);
}

processHeroLogo();
