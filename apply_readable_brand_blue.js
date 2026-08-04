const fs = require('fs');
const path = require('path');

const files = ['etudes.html', 'immigration.html', 'formations.html', 'index.html', 'a-propos.html', 'contact.html'];

files.forEach(f => {
    const p = path.join(__dirname, f);
    if (fs.existsSync(p)) {
        let html = fs.readFileSync(p, 'utf8');

        // Replace black / charcoal inline styles with elegant readable ICA navy blue (#164371)
        html = html.replace(/color:\s*#1E293B;?/gi, 'color: #164371; font-weight: 500;');
        html = html.replace(/color:\s*#0F172A;?/gi, 'color: #164371; font-weight: 500;');

        fs.writeFileSync(p, html, 'utf8');
        console.log(`Updated text color to readable navy blue (#164371) on ${f}`);
    }
});

// Also update CSS variables in style.css
const cssPath = path.join(__dirname, 'style.css');
if (fs.existsSync(cssPath)) {
    let css = fs.readFileSync(cssPath, 'utf8');
    css = css.replace(/--text-color:\s*#0F172A;?/gi, '--text-color: #072B49;');
    css = css.replace(/--text-muted:\s*#1E293B;?/gi, '--text-muted: #164371;');
    fs.writeFileSync(cssPath, css, 'utf8');
    console.log('Updated style.css variables to brand navy blue');
}
