const fs = require('fs');
const path = require('path');

function minifyCSS(css) {
    return css
        .replace(/\/\*[\s\S]*?\*\//g, '')
        .replace(/\s+/g, ' ')
        .replace(/\s*([{}:;,])\s*/g, '$1')
        .replace(/;\}/g, '}')
        .trim();
}

function minifyJS(js) {
    return js
        .replace(/\/\*[\s\S]*?\*\//g, '')
        .replace(/\/\/.*/g, '')
        .replace(/\s+/g, ' ')
        .replace(/\s*([{}:;,=()+-><])\s*/g, '$1')
        .trim();
}

const cssPath = path.join(__dirname, 'style.css');
const minCssPath = path.join(__dirname, 'style.min.css');
if (fs.existsSync(cssPath)) {
    const cssContent = fs.readFileSync(cssPath, 'utf8');
    const minCss = minifyCSS(cssContent);
    fs.writeFileSync(minCssPath, minCss, 'utf8');
    console.log(`Original CSS: ${Math.round(cssContent.length/1024)}KB -> Minified CSS: ${Math.round(minCss.length/1024)}KB`);
}

const jsPath = path.join(__dirname, 'script.js');
const minJsPath = path.join(__dirname, 'script.min.js');
if (fs.existsSync(jsPath)) {
    const jsContent = fs.readFileSync(jsPath, 'utf8');
    const minJs = minifyJS(jsContent);
    fs.writeFileSync(minJsPath, minJs, 'utf8');
    console.log(`Original JS: ${Math.round(jsContent.length/1024)}KB -> Minified JS: ${Math.round(minJs.length/1024)}KB`);
}
