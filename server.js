const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const PUBLIC_DIR = __dirname;

const MIME_TYPES = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
    let reqUrl = req.url.split('?')[0];

    // Handle API Endpoint /api/google_reviews.php
    if (reqUrl === '/api/google_reviews.php' || reqUrl === '/api/google_reviews') {
        res.writeHead(200, {
            'Content-Type': 'application/json; charset=utf-8',
            'Access-Control-Allow-Origin': '*'
        });

        const mapsUrl = 'https://www.google.com/maps/search/?api=1&query=IntelliQuest+Canada+Academy+Casablanca';

        const apiResponse = {
            success: true,
            rating: 4.8,
            total_reviews: 106,
            place_name: 'ICA Intelliquest Canada Academy',
            google_maps_link: mapsUrl,
            reviews: [
                {
                    author_name: 'Wissal Malk',
                    profile_photo_url: '',
                    rating: 5,
                    relative_time_description: 'il y a une semaine',
                    text: 'Je bénéficie d\'une excellente formation à l\'ICA pour le DSCG UE4. L\'organisation est irréprochable et les intervenants sont très compétents, pédagogues et de grande qualité. Je recommande vivement cette académie !',
                    review_url: mapsUrl
                }
            ]
        };

        res.end(JSON.stringify(apiResponse, null, 2));
        return;
    }

    // Serve Static Files
    let filePath = path.join(PUBLIC_DIR, reqUrl === '/' ? 'index.html' : reqUrl);
    let extname = path.extname(filePath).toLowerCase();
    let contentType = MIME_TYPES[extname] || 'application/octet-stream';

    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
                res.end('<h1>404 Not Found</h1>');
            } else {
                res.writeHead(500);
                res.end(`Server Error: ${err.code}`);
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});
