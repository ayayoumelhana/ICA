const fs = require('fs');
const path = require('path');

// 1. Update etudes.html hero
let etudes = fs.readFileSync(path.join(__dirname, 'etudes.html'), 'utf8');

etudes = etudes.replace(
    /\.service-landing-hero\s*\{[^}]*\}/g,
    `.service-landing-hero {
            background: linear-gradient(90deg, rgba(7, 43, 73, 0.8) 0%, rgba(7, 43, 73, 0.5) 55%, rgba(7, 43, 73, 0.15) 100%), url('assets/images/pdf-student-banner.webp') center 30%/cover no-repeat;
            color: #FFFFFF;
            padding: 100px 0 70px 0;
            text-align: left;
        }`
);

etudes = etudes.replace(
    /<section class="service-landing-hero">[\s\S]*?<\/section>/g,
    `<section class="service-landing-hero">
        <div class="container" style="text-align: left;">
            <span class="section-badge-pill" style="display: inline-block; margin-bottom: 12px;">🇨🇦 PÔLE ÉTUDES INTERNATIONALES</span>
            <h1 class="hero-title-serif" style="text-align: left;">Étudier au Canada</h1>
            <p style="font-size: 1.2rem; max-width: 650px; margin: 0 0 25px 0; line-height: 1.6; color: #FFFFFF; font-weight: 600; text-align: left;">
                Votre projet d'études universitaires ou collégiales au Canada encadré de A à Z par nos conseillers d'élite à Casablanca.
            </p>
            <a href="contact.html" class="btn btn-cyan" style="display: inline-block;">Demander une Consultation d'Admission</a>
        </div>
    </section>`
);

fs.writeFileSync(path.join(__dirname, 'etudes.html'), etudes, 'utf8');
console.log('Updated hero to left-aligned brand blue on etudes.html');

// 2. Update immigration.html hero
let immigration = fs.readFileSync(path.join(__dirname, 'immigration.html'), 'utf8');
immigration = immigration.replace(
    /\.service-landing-hero\s*\{[^}]*\}/g,
    `.service-landing-hero {
            background: linear-gradient(90deg, rgba(7, 43, 73, 0.8) 0%, rgba(7, 43, 73, 0.5) 55%, rgba(7, 43, 73, 0.15) 100%), url('assets/images/pdf-express-banner.webp') center 30%/cover no-repeat;
            color: #FFFFFF;
            padding: 100px 0 70px 0;
            text-align: left;
        }`
);
immigration = immigration.replace(
    /<section class="service-landing-hero">[\s\S]*?<\/section>/g,
    `<section class="service-landing-hero">
        <div class="container" style="text-align: left;">
            <span class="section-badge-pill" style="display: inline-block; margin-bottom: 12px;">🇨🇦 PÔLE IMMIGRATION & RÉSIDENCE</span>
            <h1 class="hero-title-serif" style="text-align: left;">Immigration au Canada</h1>
            <p style="font-size: 1.2rem; max-width: 650px; margin: 0 0 25px 0; line-height: 1.6; color: #FFFFFF; font-weight: 600; text-align: left;">
                Accompagnement stratégique sur-mesure pour Entrée Express, Arrima, Résidence Permanente et Parrainage.
            </p>
            <a href="contact.html" class="btn btn-red" style="display: inline-block;">Évaluer mon Éligibilité</a>
        </div>
    </section>`
);
fs.writeFileSync(path.join(__dirname, 'immigration.html'), immigration, 'utf8');
console.log('Updated hero to left-aligned brand blue on immigration.html');

// 3. Update formations.html hero
let formations = fs.readFileSync(path.join(__dirname, 'formations.html'), 'utf8');
formations = formations.replace(
    /\.service-landing-hero\s*\{[^}]*\}/g,
    `.service-landing-hero {
            background: linear-gradient(90deg, rgba(7, 43, 73, 0.8) 0%, rgba(7, 43, 73, 0.5) 55%, rgba(7, 43, 73, 0.15) 100%), url('assets/images/pdf-rocket-banner.webp') center 30%/cover no-repeat;
            color: #FFFFFF;
            padding: 100px 0 70px 0;
            text-align: left;
        }`
);
formations = formations.replace(
    /<section class="service-landing-hero">[\s\S]*?<\/section>/g,
    `<section class="service-landing-hero">
        <div class="container" style="text-align: left;">
            <span class="section-badge-pill" style="display: inline-block; margin-bottom: 12px;">🚀 PÔLE FORMATION & DIPLÔMES</span>
            <h1 class="hero-title-serif" style="text-align: left;">Formations Certifiantes</h1>
            <p style="font-size: 1.2rem; max-width: 650px; margin: 0 0 25px 0; line-height: 1.6; color: #FFFFFF; font-weight: 600; text-align: left;">
                Cycles intensifs de préparation aux concours d'expertise comptable (CEC), diplômes DSCG et séminaires professionnels.
            </p>
            <a href="contact.html" class="btn btn-purple" style="display: inline-block;">Découvrir nos Formations</a>
        </div>
    </section>`
);
fs.writeFileSync(path.join(__dirname, 'formations.html'), formations, 'utf8');
console.log('Updated hero to left-aligned brand blue on formations.html');
