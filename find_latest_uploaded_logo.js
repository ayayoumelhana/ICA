const fs = require('fs');
const path = require('path');

const userUploadedDir = `C:\\Users\\Ash\\.gemini\\antigravity\\brain\\90cbd978-d769-4703-bcd2-ccc0144d7a62\\.user_uploaded`;
if (fs.existsSync(userUploadedDir)) {
    const files = fs.readdirSync(userUploadedDir).map(f => {
        const fullPath = path.join(userUploadedDir, f);
        return { name: f, path: fullPath, mtime: fs.statSync(fullPath).mtimeMs };
    }).sort((a, b) => b.mtime - a.mtime);

    console.log('Latest uploaded files:');
    files.slice(0, 5).forEach(f => console.log(`${new Date(f.mtime).toISOString()} -> ${f.path}`));
}
