const fs = require('fs');
const path = require('path');

const files = ['etudes.html', 'immigration.html', 'formations.html', 'index.html', 'a-propos.html', 'contact.html'];

files.forEach(f => {
    const p = path.join(__dirname, f);
    if (fs.existsSync(p)) {
        let html = fs.readFileSync(p, 'utf8');

        // Replace muted gray inline styles with rich high-contrast dark blue / charcoal
        html = html.replace(/color:\s*#64748B;?/gi, 'color: #1E293B; font-weight: 500;');
        html = html.replace(/color:\s*#475569;?/gi, 'color: #1E293B; font-weight: 500;');
        html = html.replace(/color:\s*#334155;?/gi, 'color: #072B49; font-weight: 500;');

        // Hero subtitle opacity
        html = html.replace(/opacity:\s*0\.95;?/gi, 'opacity: 1; font-weight: 600;');
        html = html.replace(/opacity:\s*0\.9;?/gi, 'opacity: 1; font-weight: 600;');

        fs.writeFileSync(p, html, 'utf8');
        console.log(`Enhanced text contrast on ${f}`);
    }
});
