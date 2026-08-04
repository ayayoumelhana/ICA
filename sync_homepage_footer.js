const fs = require('fs');
const path = require('path');

const homepageFooterMarkup = `    <!-- Footer -->
    <footer class="site-footer">
        <div class="container">
            <div class="footer-grid">
                <div class="footer-logo-col">
                    <img src="assets/images/logo-ICA-en-blanc-500x500-px.webp" alt="ICA Logo" class="footer-logo" width="140" height="140" loading="lazy" decoding="async">
                </div>
                
                <div class="footer-contact-col">
                    <h3>Nos coordonnées</h3>
                    <ul class="footer-contact-list">
                        <li><i class="fas fa-phone-alt"></i> +212 6 28 41 42 42</li>
                        <li><i class="fas fa-phone-alt"></i> +212 522 36 31 31</li>
                        <li><i class="fas fa-phone-alt"></i> +212 522 36 40 40</li>
                        <li><i class="fas fa-phone-alt"></i> +1 (514) 619-7534</li>
                        <li><i class="fas fa-envelope"></i> contact@intelliquestcanada.ca</li>
                        <li><i class="fas fa-map-marker-alt"></i> 156, Bd Anfa, etage 3, Casablanca, Maroc</li>
                    </ul>
                </div>
                
                <div class="footer-social-col">
                    <h3>Restons connectés !</h3>
                    <p>Connectez-vous avec des entrepreneurs, développez votre réseau, faites de belles affaires.</p>
                    <div class="footer-social-links">
                        <a href="https://www.facebook.com/intelliquestca/" target="_blank" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
                        <a href="https://www.youtube.com/@IntelliQuestCanadaAcadem-iw8tp/featured" target="_blank" aria-label="Youtube"><i class="fab fa-youtube"></i></a>
                        <a href="https://www.linkedin.com/company/intelliquest-canada-academy/" target="_blank" aria-label="Linkedin"><i class="fab fa-linkedin-in"></i></a>
                        <a href="https://www.instagram.com/intelliquestca/" target="_blank" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
                    </div>
                </div>
            </div>
        </div>
        <div class="footer-bottom">
            <div class="container">
                <p class="copyright-text-main">Copyright &copy; 2025 Intelliquest Canada Academy</p>
                <p class="developed-text">Développé par Intelliquest Canada Academy</p>
            </div>
        </div>
    </footer>`;

const files = fs.readdirSync(__dirname).filter(f => f.endsWith('.html') && f !== 'index.html');

files.forEach(f => {
    const filePath = path.join(__dirname, f);
    let html = fs.readFileSync(filePath, 'utf8');

    // Replace any existing <footer ... </footer> with homepageFooterMarkup
    const footerRegex = /<!-- Footer -->[\s\S]*?<footer[\s\S]*?<\/footer>/gi;
    if (footerRegex.test(html)) {
        html = html.replace(footerRegex, homepageFooterMarkup);
    } else {
        const simpleFooterRegex = /<footer[\s\S]*?<\/footer>/gi;
        html = html.replace(simpleFooterRegex, homepageFooterMarkup);
    }

    fs.writeFileSync(filePath, html, 'utf8');
    console.log(`Updated footer on ${f}`);
});
