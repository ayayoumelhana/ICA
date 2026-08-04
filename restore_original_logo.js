const fs = require('fs');
const path = require('path');

const files = fs.readdirSync(__dirname).filter(f => f.endsWith('.html'));

files.forEach(f => {
    const filePath = path.join(__dirname, f);
    let html = fs.readFileSync(filePath, 'utf8');

    // Replace ica-logo-red-leaf.webp and ica-hero-logo.webp with original logo-ICA-en-blanc-500x500-px.webp
    html = html.replace(/assets\/images\/ica-logo-red-leaf\.webp/g, 'assets/images/logo-ICA-en-blanc-500x500-px.webp');
    html = html.replace(/assets\/images\/ica-hero-logo\.webp/g, 'assets/images/logo-ICA-en-blanc-500x500-px.webp');
    html = html.replace(/assets\/images\/ica-logo-red-leaf\.png/g, 'assets/images/logo-ICA-en-blanc-500x500-px.webp');

    fs.writeFileSync(filePath, html, 'utf8');
    console.log(`Updated logo on ${f}`);
});
