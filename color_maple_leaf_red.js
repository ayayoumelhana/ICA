const sharp = require('./node_modules/sharp');
const path = require('path');
const fs = require('fs');

async function analyzeLogoPixels() {
    const userUploadedDir = 'C:\\Users\\Ash\\.gemini\\antigravity\\brain\\90cbd978-d769-4703-bcd2-ccc0144d7a62\\.user_uploaded';
    const inputPath = path.join(userUploadedDir, 'media__1785837096345.png');

    const image = sharp(inputPath);
    const { width, height } = await image.metadata();
    const { data, info } = await image.raw().toBuffer({ resolveWithObject: true });

    console.log(`Image size: ${width}x${height}, channels: ${info.channels}`);

    // Create an edited buffer where top-left maple leaf (x: 0..300, y: 0..300) with non-transparent white pixels is colored vivid red (#F20D0D)
    // Red color RGBA: 242, 13, 13, alpha
    const outBuffer = Buffer.from(data);

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const idx = (y * width + x) * info.channels;
            const r = outBuffer[idx];
            const g = outBuffer[idx + 1];
            const b = outBuffer[idx + 2];
            const a = info.channels === 4 ? outBuffer[idx + 3] : 255;

            // Detect maple leaf region in top left (x < 280, y < 250)
            if (x < 280 && y < 250 && a > 30) {
                // If pixel is light/whiteish or gray
                if (r > 150 && g > 150 && b > 150) {
                    outBuffer[idx] = 242;     // Red
                    outBuffer[idx + 1] = 13;  // Green
                    outBuffer[idx + 2] = 13;  // Blue
                }
            }
        }
    }

    const outputPng = path.join(__dirname, 'assets', 'images', 'ica-logo-red-leaf.png');
    const outputWebp = path.join(__dirname, 'assets', 'images', 'ica-logo-red-leaf.webp');

    await sharp(outBuffer, {
        raw: {
            width,
            height,
            channels: info.channels
        }
    }).png().toFile(outputPng);

    await sharp(outBuffer, {
        raw: {
            width,
            height,
            channels: info.channels
        }
    }).webp({ quality: 98 }).toFile(outputWebp);

    console.log('Successfully created ica-logo-red-leaf.png and ica-logo-red-leaf.webp with vivid red maple leaf!');
}

analyzeLogoPixels().catch(err => console.error(err));
