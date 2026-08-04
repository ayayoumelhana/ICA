const sharp = require('./node_modules/sharp');
const path = require('path');

async function checkLogos() {
    const files = [
        'logo-ICA-en-blanc-500x500-px.webp',
        'logo-ICA-officiel-couleurs.webp',
        'ica-logo-red-leaf.webp',
        'ica-hero-logo.webp'
    ];

    for (const f of files) {
        const p = path.join(__dirname, 'assets', 'images', f);
        try {
            const meta = await sharp(p).metadata();
            console.log(`${f}: ${meta.width}x${meta.height}, format: ${meta.format}`);
        } catch(e) {
            console.log(`${f}: error ${e.message}`);
        }
    }
}

checkLogos();
