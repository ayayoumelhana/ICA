const fs = require('fs');
const path = require('path');

const htmlFiles = [
    'index.html',
    'etudes.html',
    'a-propos.html',
    'immigration.html',
    'formations.html',
    'contact.html'
];

htmlFiles.forEach(file => {
    const filePath = path.join(__dirname, file);
    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf8');
        // Replace logo src with ica-logo-red-leaf.webp
        content = content.replace(/assets\/images\/logo-ICA-en-blanc[^\s"']+/g, 'assets/images/ica-logo-red-leaf.webp');
        content = content.replace(/assets\/images\/ica_logo_high_res[^\s"']+/g, 'assets/images/ica-logo-red-leaf.webp');
        content = content.replace(/assets\/images\/logo-ICA[^\s"']+/g, 'assets/images/ica-logo-red-leaf.webp');
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated logo in ${file}`);
    }
});
