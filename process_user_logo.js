const sharp = require('./node_modules/sharp');
const path = require('path');
const fs = require('fs');

async function processUploadedLogo() {
    const userUploadedDir = 'C:\\Users\\Ash\\.gemini\\antigravity\\brain\\90cbd978-d769-4703-bcd2-ccc0144d7a62\\.user_uploaded';
    const uploadedFiles = fs.readdirSync(userUploadedDir).sort();
    const latestFile = uploadedFiles[uploadedFiles.length - 1];
    const fullPath = path.join(userUploadedDir, latestFile);

    console.log(`Latest uploaded file: ${latestFile}`);
    const meta = await sharp(fullPath).metadata();
    console.log(`Dimensions: ${meta.width}x${meta.height}, format: ${meta.format}`);

    // Copy raw uploaded logo to assets/images/ica-hero-logo.png and WebP
    const targetPng = path.join(__dirname, 'assets', 'images', 'ica-hero-logo.png');
    const targetWebp = path.join(__dirname, 'assets', 'images', 'ica-hero-logo.webp');

    await sharp(fullPath).png().toFile(targetPng);
    await sharp(fullPath).webp({ quality: 95 }).toFile(targetWebp);
    console.log('Saved ica-hero-logo.png and ica-hero-logo.webp to assets/images/');
}

processUploadedLogo().catch(err => console.error(err));
