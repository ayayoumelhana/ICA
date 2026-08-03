const fs = require('fs');
const path = require('path');
const sharp = require('./node_modules/sharp');

const imgDir = path.join(__dirname, 'assets', 'images');

async function createGallery() {
    const files = fs.readdirSync(imgDir);
    let html = `<!DOCTYPE html><html><head><title>Image Gallery</title><style>
    body { font-family: sans-serif; display: flex; flex-wrap: wrap; gap: 20px; padding: 20px; background: #f0f4f8; }
    .card { background: white; border-radius: 8px; padding: 10px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); width: 250px; text-align: center; }
    img { max-width: 100%; max-height: 200px; object-fit: contain; border-radius: 6px; }
    p { font-size: 12px; word-break: break-all; margin: 8px 0 0 0; color: #333; }
    </style></head><body>`;

    for (const f of files) {
        if (!f.endsWith('.webp') && !f.endsWith('.png') && !f.endsWith('.jpg')) continue;
        html += `<div class="card"><img src="assets/images/${f}" alt="${f}"><p>${f}</p></div>`;
    }

    html += `</body></html>`;
    fs.writeFileSync(path.join(__dirname, 'gallery.html'), html);
    console.log('Gallery written to gallery.html');
}

createGallery();
