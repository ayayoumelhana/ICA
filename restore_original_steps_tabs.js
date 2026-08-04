const fs = require('fs');
const path = require('path');

let etudes = fs.readFileSync(path.join(__dirname, 'etudes.html'), 'utf8');

const originalStepsSection = `    <!-- Section Étapes d'Accompagnement (Services Dédiés pour les Études au Canada) -->
    <section class="section bg-light" id="block-etudes" style="border-top: 1px solid #E2E8F0; padding: 50px 0;">
        <div class="container">
            <div class="text-center" style="margin-bottom: 35px;">
                <h2 style="font-family: 'Minion Pro', Georgia, serif; font-size: 2.2rem; color: #072B49; margin-bottom: 10px; text-transform: uppercase; letter-spacing: 0.5px;">SERVICES DÉDIÉS POUR LES ÉTUDES AU CANADA</h2>
                <div style="width: 80px; height: 3px; background-color: #072B49; margin: 12px auto 0;"></div>
            </div>

            <div class="service-block-section">
                <!-- Step Pills Row -->
                <div class="pdf-steps-row">
                    <button class="pdf-step-pill active-red active" data-step-target="step-etudes-1" type="button">
                        Étape 1 : Orientation
                    </button>
                    <button class="pdf-step-pill border-blue" data-step-target="step-etudes-2" type="button">
                        Étape 2 : Admission
                    </button>
                    <button class="pdf-step-pill border-blue" data-step-target="step-etudes-3" type="button">
                        Étape 3 : Autorisations
                    </button>
                    <button class="pdf-step-pill border-blue" data-step-target="step-etudes-4" type="button">
                        Étape 4 : Après l'arrivée
                    </button>
                </div>

                <!-- Step Panels Container -->
                <div class="pdf-step-panels-wrapper">
                    <!-- Step 1 Panel: Orientation -->
                    <div class="pdf-service-content-grid step-panel active" id="step-etudes-1">
                        <div class="pdf-step-img-box">
                            <img src="assets/images/etape1.webp" alt="Orientation Scolaire et académique" class="pdf-step-large-img" width="240" height="240" loading="lazy" decoding="async" style="border-radius: 20px; object-fit: cover; width: 100%; height: 100%;">
                        </div>
                        <div class="pdf-service-text-box">
                            <h3 class="pdf-service-title" style="font-size: 1.8rem; color: #072B49; margin: 0 0 14px; font-weight: 700;">Orientation Scolaire et académique</h3>
                            <p class="pdf-service-desc" style="color: #164371; font-weight: 500; font-size: 1rem; line-height: 1.65; margin-bottom: 20px;">
                                Notre équipe vous accompagne avec des conseils personnalisés pour faire les bons choix d'études, découvrir les meilleures opportunités académiques et bâtir un parcours cohérent vers la réussite.
                            </p>
                            <a href="contact.html" class="btn btn-cyan" style="padding: 10px 24px; font-size: 0.9rem;">Prendre Rendez-vous <i class="fas fa-arrow-right" style="margin-left: 6px;"></i></a>
                        </div>
                    </div>

                    <!-- Step 2 Panel: Admission -->
                    <div class="pdf-service-content-grid step-panel" id="step-etudes-2" style="display: none;">
                        <div class="pdf-step-img-box">
                            <img src="assets/images/etape2.webp" alt="Démarches d’admission" class="pdf-step-large-img" width="240" height="240" loading="lazy" decoding="async" style="border-radius: 20px; object-fit: cover; width: 100%; height: 100%;">
                        </div>
                        <div class="pdf-service-text-box">
                            <h3 class="pdf-service-title" style="font-size: 1.8rem; color: #072B49; margin: 0 0 14px; font-weight: 700;">Démarches d’admission</h3>
                            <p class="pdf-service-desc" style="color: #164371; font-weight: 500; font-size: 1rem; line-height: 1.65; margin-bottom: 20px;">
                                Nos conseillers prennent en charge l’ensemble de vos démarches d’admission, du montage du dossier à la soumission de la candidature, pour vous aider à intégrer l’établissement scolaire, professionnel, collégial ou universitaire de votre choix.
                            </p>
                            <a href="contact.html" class="btn btn-cyan" style="padding: 10px 24px; font-size: 0.9rem;">Déposer mon Dossier <i class="fas fa-arrow-right" style="margin-left: 6px;"></i></a>
                        </div>
                    </div>

                    <!-- Step 3 Panel: Autorisations -->
                    <div class="pdf-service-content-grid step-panel" id="step-etudes-3" style="display: none;">
                        <div class="pdf-step-img-box">
                            <img src="assets/images/etape3.webp" alt="Démarches pour les autorisations" class="pdf-step-large-img" width="240" height="240" loading="lazy" decoding="async" style="border-radius: 20px; object-fit: cover; width: 100%; height: 100%;">
                        </div>
                        <div class="pdf-service-text-box">
                            <h3 class="pdf-service-title" style="font-size: 1.8rem; color: #072B49; margin: 0 0 14px; font-weight: 700;">Démarches pour les autorisations</h3>
                            <p class="pdf-service-desc" style="color: #164371; font-weight: 500; font-size: 1rem; line-height: 1.65; margin-bottom: 20px;">
                                Nous vous accompagnons dans l’obtention des autorisations nécessaires (CAQ / LAP , permis d’études, etc.) en assurant un suivi rigoureux et une préparation soignée de votre dossier, pour maximiser vos chances de succès.
                            </p>
                            <a href="contact.html" class="btn btn-cyan" style="padding: 10px 24px; font-size: 0.9rem;">Demander mon Permis <i class="fas fa-arrow-right" style="margin-left: 6px;"></i></a>
                        </div>
                    </div>

                    <!-- Step 4 Panel: Après l'arrivée -->
                    <div class="pdf-service-content-grid step-panel" id="step-etudes-4" style="display: none;">
                        <div class="pdf-step-img-box">
                            <img src="assets/images/etape4.webp" alt="Accompagnement après l'arrivée" class="pdf-step-large-img" width="240" height="240" loading="lazy" decoding="async" style="border-radius: 20px; object-fit: cover; width: 100%; height: 100%;">
                        </div>
                        <div class="pdf-service-text-box">
                            <h3 class="pdf-service-title" style="font-size: 1.8rem; color: #072B49; margin: 0 0 14px; font-weight: 700;">Accompagnement après l'arrivée</h3>
                            <p class="pdf-service-desc" style="color: #164371; font-weight: 500; font-size: 1rem; line-height: 1.65; margin-bottom: 20px;">
                                De la recherche et réservation de votre logement étudiant à l’accueil personnalisé à l’aéroport et aux démarches administratives sur place, nous veillons à votre parfaite intégration.
                            </p>
                            <a href="contact.html" class="btn btn-cyan" style="padding: 10px 24px; font-size: 0.9rem;">Organiser mon Arrivée <i class="fas fa-arrow-right" style="margin-left: 6px;"></i></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>`;

const gridSectionRegex = /<!-- Section Étapes d'Accompagnement[\s\S]*?<\/section>/gi;
etudes = etudes.replace(gridSectionRegex, originalStepsSection);

fs.writeFileSync(path.join(__dirname, 'etudes.html'), etudes, 'utf8');
console.log('Restored exact original steps tabbed design on etudes.html');
