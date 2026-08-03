const fs = require('fs');
const path = require('path');

const imgDir = path.join(__dirname, 'assets', 'images');

const mapping = {
    'etape1.webp': 'vlcsnap-2025-05-03-16h15m58s867-scaled-r5d6gshn615mbv1xu5wc4tj19huxks6lkuvss7yen4.webp',
    'etape2.webp': 'depot-300x300.webp',
    'etape3.webp': '00-191x300.webp',
    'etape4.webp': 'vlcsnap-2025-04-30-15h50m21s967-2-300x221.webp'
};

for (const [newName, oldName] of Object.entries(mapping)) {
    const src = path.join(imgDir, oldName);
    const dest = path.join(imgDir, newName);
    if (fs.existsSync(src)) {
        fs.copyFileSync(src, dest);
        console.log(`Copied ${oldName} -> ${newName}`);
    } else {
        console.log(`Error: ${oldName} not found!`);
    }
}
