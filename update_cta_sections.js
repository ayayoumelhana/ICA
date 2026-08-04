const fs = require('fs');
const path = require('path');

// 1. etudes.html CTA
let etudes = fs.readFileSync(path.join(__dirname, 'etudes.html'), 'utf8');
const etudesCtaOld = /<!-- Contact CTA -->[\s\S]*?<\/section>/gi;
const etudesCtaNew = `<!-- Contact CTA -->
    <section style="padding: 20px 0 40px 0; background: #FFFFFF;">
        <div class="container">
            <div style="background: linear-gradient(135deg, #F0F9FF 0%, #E0F2FE 100%); border: 1px solid #BAE6FD; border-radius: 24px; padding: 35px 30px; text-align: center; max-width: 920px; margin: 0 auto; box-shadow: 0 10px 30px rgba(0, 174, 239, 0.08);">
                <h2 style="font-family: 'Minion Pro', 'Playfair Display', Georgia, serif; font-size: 1.85rem; color: #072B49; margin-bottom: 10px; font-weight: 700;">Prêt à Réaliser vos Études au Canada ?</h2>
                <p style="font-size: 1rem; color: #164371; max-width: 580px; margin: 0 auto 20px; line-height: 1.55; font-weight: 500;">
                    Prenez rendez-vous dès aujourd'hui avec nos experts à Casablanca pour évaluer votre dossier d'admission.
                </p>
                <a href="contact.html" class="btn btn-cyan" style="padding: 10px 24px; font-size: 0.92rem; border-radius: 30px;">Commencer mes démarches <i class="fas fa-arrow-right" style="margin-left: 6px;"></i></a>
            </div>
        </div>
    </section>`;

etudes = etudes.replace(etudesCtaOld, etudesCtaNew);
fs.writeFileSync(path.join(__dirname, 'etudes.html'), etudes, 'utf8');
console.log('Updated CTA on etudes.html');

// 2. immigration.html CTA
let immigration = fs.readFileSync(path.join(__dirname, 'immigration.html'), 'utf8');
const immigrationCtaOld = /<!-- Contact CTA -->[\s\S]*?<\/section>/gi;
const immigrationCtaNew = `<!-- Contact CTA -->
    <section style="padding: 20px 0 40px 0; background: #FFFFFF;">
        <div class="container">
            <div style="background: linear-gradient(135deg, #FFF5F5 0%, #FFE3E3 100%); border: 1px solid #FFC9C9; border-radius: 24px; padding: 35px 30px; text-align: center; max-width: 920px; margin: 0 auto; box-shadow: 0 10px 30px rgba(242, 13, 13, 0.08);">
                <h2 style="font-family: 'Minion Pro', 'Playfair Display', Georgia, serif; font-size: 1.85rem; color: #072B49; margin-bottom: 10px; font-weight: 700;">Prêt à Lancer Votre Projet d'Immigration ?</h2>
                <p style="font-size: 1rem; color: #164371; max-width: 580px; margin: 0 auto 20px; line-height: 1.55; font-weight: 500;">
                    Évaluez gratuitement vos chances pour l'Entrée Express, Arrima et les permis de travail au Canada.
                </p>
                <a href="contact.html" class="btn btn-red" style="padding: 10px 24px; font-size: 0.92rem; border-radius: 30px;">Évaluer mon Éligibilité <i class="fas fa-arrow-right" style="margin-left: 6px;"></i></a>
            </div>
        </div>
    </section>`;

immigration = immigration.replace(immigrationCtaOld, immigrationCtaNew);
fs.writeFileSync(path.join(__dirname, 'immigration.html'), immigration, 'utf8');
console.log('Updated CTA on immigration.html');

// 3. formations.html CTA
let formations = fs.readFileSync(path.join(__dirname, 'formations.html'), 'utf8');
const formationsCtaOld = /<!-- Contact CTA -->[\s\S]*?<\/section>/gi;
const formationsCtaNew = `<!-- Contact CTA -->
    <section style="padding: 20px 0 40px 0; background: #FFFFFF;">
        <div class="container">
            <div style="background: linear-gradient(135deg, #FBF5FF 0%, #F3E8FF 100%); border: 1px solid #E9D5FF; border-radius: 24px; padding: 35px 30px; text-align: center; max-width: 920px; margin: 0 auto; box-shadow: 0 10px 30px rgba(123, 31, 162, 0.08);">
                <h2 style="font-family: 'Minion Pro', 'Playfair Display', Georgia, serif; font-size: 1.85rem; color: #072B49; margin-bottom: 10px; font-weight: 700;">Prêt à Développer vos Compétences ?</h2>
                <p style="font-size: 1rem; color: #164371; max-width: 580px; margin: 0 auto 20px; line-height: 1.55; font-weight: 500;">
                    Inscrivez-vous dès aujourd'hui à nos cycles intensifs certifiants (CEC, DSCG) et donnez un élan à votre carrière.
                </p>
                <a href="contact.html" class="btn btn-purple" style="padding: 10px 24px; font-size: 0.92rem; border-radius: 30px;">S'inscrire à une Session <i class="fas fa-arrow-right" style="margin-left: 6px;"></i></a>
            </div>
        </div>
    </section>`;

formations = formations.replace(formationsCtaOld, formationsCtaNew);
fs.writeFileSync(path.join(__dirname, 'formations.html'), formations, 'utf8');
console.log('Updated CTA on formations.html');
