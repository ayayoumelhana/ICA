const fs = require('fs');
const path = require('path');

const files = fs.readdirSync(__dirname).filter(f => f.endsWith('.html'));
files.forEach(f => {
    const html = fs.readFileSync(path.join(__dirname, f), 'utf8');
    const matches = html.match(/src=["'][^"']*logo[^"']*["']/gi);
    console.log(`${f}:`, matches ? matches : 'no matches');
});
