const sharp = require('./node_modules/sharp');
const fs = require('fs');

async function inspectImages() {
    const files = [
        'vlcsnap-2025-05-03-16h15m58s867-scaled-r5d6gshn615mbv1xu5wc4tj19huxks6lkuvss7yen4.webp',
        'vlcsnap-2025-04-30-15h52m06s3444-268x300.webp',
        'vlcsnap-2025-04-30-15h50m21s967-2-300x221.webp',
        'depot-300x300.webp',
        '00-191x300.webp',
        'IMG_80933-298x300.webp',
        '9567b792-5ab5-441c-aefc-14668eaf5bc77-300x289.webp',
        'Capture-decran-2025-05-23-104612-268x300.webp',
        '06ee86b3-8ac7-4e4a-81ca-de198c4df80b.webp',
        '18cf8cc9-ba29-4697-95d5-103828e4f01d.webp',
        '6ab933dc-2c84-47cc-89f1-0a552257fa0b.webp',
        '71ba20e5-bc9c-48d8-bc13-ed19a57ba78c.webp',
        'maman1-237x300.webp',
        'MOHAMED_ROSSI_2-272x300.webp',
        'ayaa-300x258.webp'
    ];

    for (const f of files) {
        if (!fs.existsSync('assets/images/' + f)) continue;
        const meta = await sharp('assets/images/' + f).metadata();
        const stats = await sharp('assets/images/' + f).stats();
        console.log(`${f}: ${meta.width}x${meta.height}, channels: ${meta.channels}, dominant color: r=${Math.round(stats.channels[0].mean)}, g=${Math.round(stats.channels[1].mean)}, b=${Math.round(stats.channels[2].mean)}`);
    }
}

inspectImages();
