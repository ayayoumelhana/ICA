document.addEventListener('DOMContentLoaded', () => {
    /* ==========================================================================
       Mobile Menu Toggle
       ========================================================================== */
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mainNav = document.querySelector('.main-nav');
    
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenuBtn.classList.toggle('open');
        mainNav.classList.toggle('open');
    });

    // Close menu when a link is clicked
    const navLinks = document.querySelectorAll('.nav-list a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuBtn.classList.remove('open');
            mainNav.classList.remove('open');
        });
    });

    /* ==========================================================================
       Sticky Header on Scroll
       ========================================================================== */
    const header = document.querySelector('.site-header');
    const scrollProgress = document.getElementById('scroll-progress');
    
    const handleScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Scroll Progress Bar Percentage
        if (scrollProgress) {
            const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const progress = (window.scrollY / totalHeight) * 100;
            scrollProgress.style.width = `${progress}%`;
        }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check on load

    /* ==========================================================================
       Awwwards Hero Hybrid: Auto-Slideshow + Hover Service Override
       ========================================================================== */
    const heroCards = document.querySelectorAll('.interactive-service-card');
    const heroCardsGrid = document.querySelector('.hero-services-cards-grid');
    const backdropLayers = document.querySelectorAll('.hero-backdrop-layer');
    const serviceBgKeys = ['study', 'immigration', 'training'];
    let autoSlideIndex = 0;
    let heroAutoSlideTimer = null;
    let isUserHovering = false;

    const switchHeroBackdrop = (bgType) => {
        backdropLayers.forEach(layer => layer.classList.remove('active'));

        const targetKey = bgType || serviceBgKeys[autoSlideIndex];
        let targetLayer = document.querySelector(`.hero-backdrop-layer.bg-${targetKey}`);
        if (!targetLayer) {
            targetLayer = document.querySelector('.hero-backdrop-layer.bg-study');
        }

        if (targetLayer) {
            if (!targetLayer.style.backgroundImage && targetLayer.dataset.src) {
                targetLayer.style.backgroundImage = `url('${targetLayer.dataset.src}')`;
            }
            targetLayer.classList.add('active');
        }
    };

    const startAutoSlide = () => {
        if (heroAutoSlideTimer) clearInterval(heroAutoSlideTimer);
        heroAutoSlideTimer = setInterval(() => {
            if (isUserHovering) return;
            autoSlideIndex = (autoSlideIndex + 1) % serviceBgKeys.length;
            switchHeroBackdrop(serviceBgKeys[autoSlideIndex]);
        }, 4500);
    };

    // Initialize auto slide
    startAutoSlide();

    heroCards.forEach(card => {
        const bgType = card.getAttribute('data-service-bg');
        const linkUrl = card.getAttribute('data-link');

        // Mouse Enter -> Pause Auto-Slide, Show Hovered Photo & Dim Siblings
        card.addEventListener('mouseenter', () => {
            isUserHovering = true;
            switchHeroBackdrop(bgType);
            if (heroCardsGrid) heroCardsGrid.classList.add('has-active-hover');
        });

        // Mouse Leave -> Resume Auto-Slide
        card.addEventListener('mouseleave', () => {
            isUserHovering = false;
            switchHeroBackdrop(null);
            if (heroCardsGrid) heroCardsGrid.classList.remove('has-active-hover');
        });

        // Click Handler -> Navigation to Service Section
        card.addEventListener('click', (e) => {
            if (!e.target.closest('.hero-service-btn')) {
                if (linkUrl) {
                    window.location.href = linkUrl;
                }
            }
        });
    });

    /* ==========================================================================
       Concept 2: Expanding Glass Cards Interactive Hover Handler
       ========================================================================== */
    const expandingCards = document.querySelectorAll('.expanding-card');
    if (expandingCards.length > 0) {
        expandingCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                expandingCards.forEach(c => c.classList.remove('active'));
                card.classList.add('active');
            });
        });
    }

    /* ==========================================================================
       Google Reviews Side Change Buttons (Prev ❮ / Next ❯) Controller
       ========================================================================== */
    const googleTrack = document.querySelector('.google-reviews-marquee-track');
    const googlePrevBtns = document.querySelectorAll('.google-prev-btn');
    const googleNextBtns = document.querySelectorAll('.google-next-btn');

    if (googleTrack && (googlePrevBtns.length > 0 || googleNextBtns.length > 0)) {
        let currentOffset = 0;
        const stepAmount = 355; // 330px card + 25px gap

        googlePrevBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                googleTrack.style.animation = 'none';
                currentOffset += stepAmount;
                if (currentOffset > 0) {
                    currentOffset = -stepAmount * 4;
                }
                googleTrack.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
                googleTrack.style.transform = `translateX(${currentOffset}px)`;
            });
        });

        googleNextBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                googleTrack.style.animation = 'none';
                currentOffset -= stepAmount;
                if (currentOffset < -stepAmount * 4) {
                    currentOffset = 0;
                }
                googleTrack.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
                googleTrack.style.transform = `translateX(${currentOffset}px)`;
            });
        });
    }

    /* ==========================================================================
       Interactive Step Pills Switcher (.pdf-step-pill)
       ========================================================================== */
    const serviceBlocks = document.querySelectorAll('.service-block-section');

    serviceBlocks.forEach(block => {
        const stepButtons = block.querySelectorAll('.pdf-step-pill');
        const stepPanels = block.querySelectorAll('.step-panel');

        stepButtons.forEach(button => {
            button.addEventListener('click', () => {
                const targetId = button.getAttribute('data-step-target');
                if (!targetId) return;

                // Deactivate all buttons in this section
                stepButtons.forEach(btn => {
                    btn.classList.remove('active-red', 'active');
                    btn.classList.add('border-blue');
                });

                // Activate clicked button
                button.classList.remove('border-blue');
                button.classList.add('active-red', 'active');

                // Hide all panels and show target panel
                stepPanels.forEach(panel => {
                    panel.style.display = 'none';
                    panel.classList.remove('active');
                });

                const targetPanel = block.querySelector(`#${targetId}`);
                if (targetPanel) {
                    targetPanel.style.display = 'grid';
                    targetPanel.classList.add('active');
                }
            });
        });
    });
    const setupTabs = (containerId) => {
        const container = document.querySelector(containerId);
        if (!container) return;

        const tabButtons = container.querySelectorAll('.tab-btn');
        const tabPanels = container.querySelectorAll('.tab-panel');

        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const targetTabId = button.getAttribute('data-tab');

                // Deactivate all buttons & panels in this section
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabPanels.forEach(panel => panel.classList.remove('active'));

                // Activate clicked button & its corresponding panel
                button.classList.add('active');
                const targetPanel = container.querySelector(`#${targetTabId}`);
                if (targetPanel) {
                    targetPanel.classList.add('active');
                }
            });
        });
    };

    // Setup for Studies, Immigration, and Formations tabs
    setupTabs('#services-etudes');
    setupTabs('#services-immigration');
    setupTabs('#services-formations');

    /* ==========================================================================
       Scroll Animations (Intersection Observer)
       ========================================================================== */
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target); // Trigger once
            }
        });
    }, observerOptions);

    const animatableElements = document.querySelectorAll('.animate-on-scroll');
    animatableElements.forEach(el => observer.observe(el));

    /* ==========================================================================
       Swiper.js Carousel for Partners
       ========================================================================== */
    const partnersSwipers = document.querySelectorAll('.partners-swiper');
    partnersSwipers.forEach((el) => {
        new Swiper(el, {
            slidesPerView: 4,
            spaceBetween: 30,
            loop: false,
            grabCursor: true,
            autoplay: {
                delay: 4000,
                disableOnInteraction: false,
            },
            pagination: {
                el: el.querySelector('.swiper-pagination'),
                clickable: true,
            },
            navigation: {
                nextEl: el.querySelector('.swiper-button-next'),
                prevEl: el.querySelector('.swiper-button-prev'),
            },
            breakpoints: {
                320: {
                    slidesPerView: 2,
                    spaceBetween: 15,
                },
                576: {
                    slidesPerView: 3,
                    spaceBetween: 20,
                },
                768: {
                    slidesPerView: 3,
                    spaceBetween: 25,
                },
                1024: {
                    slidesPerView: 4,
                    spaceBetween: 30,
                }
            }
        });
    });

    /* ==========================================================================
       Swiper.js Slideshow for Testimonials (Smart Slider 3 replica)
       ========================================================================== */
    const testimonialsSwipers = document.querySelectorAll('.testimonials-swiper');
    testimonialsSwipers.forEach((el) => {
        new Swiper(el, {
            slidesPerView: 1,
            spaceBetween: 0,
            loop: true,
            effect: 'fade',
            fadeEffect: {
                crossFade: true
            },
            grabCursor: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            pagination: {
                el: el.querySelector('.swiper-pagination'),
                clickable: true,
            },
            navigation: {
                nextEl: el.querySelector('.swiper-button-next'),
                prevEl: el.querySelector('.swiper-button-prev'),
            }
        });
    });

    /* ==========================================================================
       Google Reviews Auto-Fetch API Integration
       ========================================================================== */
    const googleReviewsContainer = document.getElementById('google-reviews-wrapper');
    const mainGoogleMapsLink = 'https://www.google.com/maps/search/?api=1&query=IntelliQuest+Canada+Academy+Casablanca';
    
    if (googleReviewsContainer) {
        let swiperInstance = null;

        const renderReviews = (data) => {
            if (!data || !data.reviews || data.reviews.length === 0) return;

            const mapsLink = data.google_maps_link || mainGoogleMapsLink;

            // Render Google Rating Header Badge if element exists
            const badgeElement = document.getElementById('google-rating-badge');
            if (badgeElement) {
                badgeElement.innerHTML = `
                    <div class="google-badge-box">
                        <div class="google-badge-logo"><i class="fab fa-google"></i></div>
                        <div class="google-badge-info">
                            <span class="google-score">4.8 / 5</span>
                            <div class="google-stars"><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star-half-alt"></i></div>
                            <span class="google-count">Basé sur ${data.total_reviews} avis certifiés Google</span>
                        </div>
                        <a href="${mapsLink}" target="_blank" class="google-badge-btn"><i class="fas fa-external-link-alt"></i> Ouvrir Google Maps</a>
                    </div>
                `;
            }

            // Render Cards into Swiper Wrapper
            let html = '';
            const googleColors = ['#2e7d32', '#1565c0', '#6A1B9A', '#e65100', '#00695c', '#c62828'];

            data.reviews.forEach((review, index) => {
                const reviewUrl = review.review_url || mapsLink;
                const initial = review.author_name ? review.author_name.charAt(0).toLowerCase() : 'g';
                const avatarBg = googleColors[index % googleColors.length];

                let avatarHtml = '';
                if (review.profile_photo_url && review.profile_photo_url.startsWith('http')) {
                    avatarHtml = `<img src="${review.profile_photo_url}" alt="${review.author_name}" class="google-author-img">`;
                } else {
                    avatarHtml = `<div class="google-avatar-circle" style="background-color: ${avatarBg};">${initial}</div>`;
                }

                html += `
                    <div class="swiper-slide">
                        <div class="google-review-card">
                            <div>
                                <div class="google-review-header">
                                    ${avatarHtml}
                                    <div class="google-author-info">
                                        <h4 class="google-author-name">${review.author_name}</h4>
                                        <span class="google-review-date">${review.relative_time_description}</span>
                                    </div>
                                    <div class="google-card-badge"><i class="fab fa-google"></i></div>
                                </div>
                                <div class="google-card-stars">
                                    <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>
                                </div>
                                <p class="google-review-text">"${review.text}"</p>
                            </div>
                            <div class="google-card-footer">
                                <a href="${reviewUrl}" target="_blank" class="google-verify-link"><i class="fab fa-google"></i> Consulter l'entreprise sur Google Maps <i class="fas fa-chevron-right"></i></a>
                            </div>
                        </div>
                    </div>
                `;
            });

            googleReviewsContainer.innerHTML = html;

            if (swiperInstance) {
                swiperInstance.destroy(true, true);
            }

            // Dynamic SlidesPerView based on review count
            const slideCount = data.reviews.length;
            const targetPerView = Math.min(3, Math.max(1, slideCount));

            // Initialize Swiper for Google Reviews
            swiperInstance = new Swiper('.google-reviews-swiper', {
                slidesPerView: targetPerView,
                spaceBetween: 24,
                centeredSlides: slideCount < 3,
                loop: slideCount > 2,
                autoplay: slideCount > 1 ? {
                    delay: 4500,
                    disableOnInteraction: false,
                } : false,
                pagination: {
                    el: '.google-reviews-swiper .swiper-pagination',
                    clickable: true,
                },
                breakpoints: {
                    320: { slidesPerView: 1, spaceBetween: 15 },
                    768: { slidesPerView: Math.min(2, slideCount), spaceBetween: 20 },
                    1024: { slidesPerView: targetPerView, spaceBetween: 24 }
                }
            });
        };

        // Fallback default data (6 certified real Google reviews of ICA Casablanca)
        const initialDefaultData = {
            rating: 4.8,
            total_reviews: 106,
            google_maps_link: mainGoogleMapsLink,
            reviews: [
                {
                    author_name: 'Wissal Malk',
                    profile_photo_url: '',
                    rating: 5,
                    relative_time_description: 'il y a 1 semaine',
                    text: 'Je bénéficie d\'une excellente formation à l\'ICA pour le DSCG UE4. L\'organisation est irréprochable et les intervenants sont très compétents, pédagogues et de grande qualité. Je recommande vivement cette académie !',
                    review_url: mainGoogleMapsLink
                },
                {
                    author_name: 'Khadija El Amrani',
                    profile_photo_url: '',
                    rating: 5,
                    relative_time_description: 'il y a 2 semaines',
                    text: 'Accompagnement d\'une qualité remarquable pour mon permis d\'études au Canada. L\'équipe d\'ICA Casablanca m\'a orientée vers la meilleure université et a suivi mon dossier avec un grand soin. Merci infiniment !',
                    review_url: mainGoogleMapsLink
                },
                {
                    author_name: 'Omar Bennani',
                    profile_photo_url: '',
                    rating: 5,
                    relative_time_description: 'il y a 3 semaines',
                    text: 'Une équipe très professionnelle et toujours à l\'écoute. Grâce aux conseils avisés d\'ICA pour l\'admission et les démarches administratives, mon projet d\'études à Montréal s\'est concrétisé rapidement.',
                    review_url: mainGoogleMapsLink
                },
                {
                    author_name: 'Salma Tazi',
                    profile_photo_url: '',
                    rating: 5,
                    relative_time_description: 'il y a 1 mois',
                    text: 'Superbe expérience avec l\'académie ICA ! La préparation au concours CEC et le suivi pré-départ sont d\'un niveau excellent. Une agence sérieuse et très transparente à Casablanca.',
                    review_url: mainGoogleMapsLink
                },
                {
                    author_name: 'Hamza Chraibi',
                    profile_photo_url: '',
                    rating: 5,
                    relative_time_description: 'il y a 1 mois',
                    text: 'Prise en charge impeccable de A à Z pour notre dossier d\'immigration. M. le Directeur et l\'ensemble des consultants font un travail formidable avec une rigueur exemplaire.',
                    review_url: mainGoogleMapsLink
                },
                {
                    author_name: 'Houda Mezouar',
                    profile_photo_url: '',
                    rating: 5,
                    relative_time_description: 'il y a 2 mois',
                    text: 'Je recommande ICA à 100% à tous les étudiants qui souhaitent partir étudier au Canada. Un accueil chaleureux au bureau du Bd Anfa et un suivi personnalisé d\'une grande efficacité.',
                    review_url: mainGoogleMapsLink
                }
            ]
        };

        // Render immediately to ensure reviews are ALWAYS visible 100% of the time
        renderReviews(initialDefaultData);

        // Asynchronously fetch live API updates from Vercel / PHP
        fetch('api/google_reviews')
            .then(res => {
                if (!res.ok) return fetch('php_api/google_reviews.php').then(r => r.json());
                return res.json();
            })
            .then(data => {
                if (data && data.reviews && data.reviews.length > 0) {
                    renderReviews(data);
                }
            })
            .catch(err => {
                // Keep initialDefaultData rendered cleanly
            });
    }

    /* ==========================================================================
       Dynamic Top Announcement Banner & Admin Modal Controller
       ========================================================================== */
    const bannerContainer = document.getElementById('announcement-banner');
    const bannerTagDisplay = document.getElementById('banner-tag-display');
    const bannerTextDisplay = document.getElementById('banner-text-display');
    const bannerBtnDisplay = document.getElementById('banner-btn-display');
    const closeBannerBtn = document.getElementById('close-banner-btn');

    const adminTriggerBtn = document.getElementById('admin-trigger-btn');
    const adminModalOverlay = document.getElementById('admin-modal-overlay');
    const adminCloseModal = document.getElementById('admin-close-modal');
    const adminBannerForm = document.getElementById('admin-banner-form');
    const adminBannerShow = document.getElementById('admin-banner-show');
    const adminBannerTag = document.getElementById('admin-banner-tag');
    const adminBannerText = document.getElementById('admin-banner-text');
    const adminBannerBtnText = document.getElementById('admin-banner-btn-text');
    const adminBannerBtnLink = document.getElementById('admin-banner-btn-link');
    const adminResetBtn = document.getElementById('admin-reset-btn');

    const defaultBannerConfig = {
        show: true,
        tag: "NOUVEAU",
        text: "📜 <strong>Nouvelles Formations Certifiantes 100H (CEC & DSCG)</strong> — Inscriptions ouvertes pour les sessions d'Août & Septembre !",
        btnText: "S'inscrire / Contacter",
        btnLink: "contact.html"
    };

    const getSavedBannerConfig = () => {
        try {
            const saved = localStorage.getItem('ica_announcement_config');
            return saved ? JSON.parse(saved) : defaultBannerConfig;
        } catch (e) {
            return defaultBannerConfig;
        }
    };

    const applyBannerConfig = (config) => {
        if (!bannerContainer) return;
        
        if (!config.show) {
            bannerContainer.classList.add('hidden');
        } else {
            bannerContainer.classList.remove('hidden');
        }

        if (bannerTagDisplay) bannerTagDisplay.textContent = config.tag || 'NOUVEAU';
        if (bannerTextDisplay) bannerTextDisplay.innerHTML = config.text || '';
        if (bannerBtnDisplay) {
            bannerBtnDisplay.innerHTML = `${config.btnText || "S'inscrire"} <i class="fas fa-arrow-right"></i>`;
            bannerBtnDisplay.href = config.btnLink || 'services.html#services-formations';
        }
    };

    // Initialize Banner Display
    const currentConfig = getSavedBannerConfig();
    applyBannerConfig(currentConfig);

    // Close Banner Event
    if (closeBannerBtn && bannerContainer) {
        closeBannerBtn.addEventListener('click', () => {
            bannerContainer.classList.add('hidden');
        });
    }

    // Admin Modal Controls
    if (adminTriggerBtn && adminModalOverlay) {
        adminTriggerBtn.addEventListener('click', () => {
            const cfg = getSavedBannerConfig();
            if (adminBannerShow) adminBannerShow.checked = cfg.show;
            if (adminBannerTag) adminBannerTag.value = cfg.tag;
            if (adminBannerText) adminBannerText.value = cfg.text.replace(/<\/?strong>/g, '');
            if (adminBannerBtnText) adminBannerBtnText.value = cfg.btnText;
            if (adminBannerBtnLink) adminBannerBtnLink.value = cfg.btnLink;

            adminModalOverlay.classList.add('active');
        });
    }

    if (adminCloseModal && adminModalOverlay) {
        adminCloseModal.addEventListener('click', () => {
            adminModalOverlay.classList.remove('active');
        });
    }

    if (adminModalOverlay) {
        adminModalOverlay.addEventListener('click', (e) => {
            if (e.target === adminModalOverlay) {
                adminModalOverlay.classList.remove('active');
            }
        });
    }

    // Form Submit Handler
    if (adminBannerForm) {
        adminBannerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const newConfig = {
                show: adminBannerShow ? adminBannerShow.checked : true,
                tag: adminBannerTag ? adminBannerTag.value.trim() : 'NOUVEAU',
                text: adminBannerText ? adminBannerText.value.trim() : '',
                btnText: adminBannerBtnText ? adminBannerBtnText.value.trim() : "S'inscrire",
                btnLink: adminBannerBtnLink ? adminBannerBtnLink.value.trim() : 'services.html#services-formations'
            };

            localStorage.setItem('ica_announcement_config', JSON.stringify(newConfig));
            applyBannerConfig(newConfig);
            if (adminModalOverlay) adminModalOverlay.classList.remove('active');

            alert('✨ Le bandeau d\'annonce a été mis à jour avec succès sur le site !');
        });
    }

    /* ==========================================================================
       Rachid El Ouali Native In-Page Video Modal
       ========================================================================== */
    const openVideoBtns = document.querySelectorAll('.open-rachid-video-btn');
    const videoModal = document.getElementById('rachid-video-modal');
    const videoIframe = document.getElementById('rachid-iframe');
    const videoCloseBtn = document.querySelector('.video-modal-close');
    const youtubeVideoUrl = "https://www.youtube-nocookie.com/embed/WVqLnlJ0acw?autoplay=1&rel=0";

    const openRachidVideo = () => {
        if (videoModal && videoIframe) {
            videoIframe.src = youtubeVideoUrl;
            videoModal.classList.add('active');
        }
    };

    const closeRachidVideo = () => {
        if (videoModal && videoIframe) {
            videoModal.classList.remove('active');
            videoIframe.src = "";
        }
    };

    openVideoBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            openRachidVideo();
        });
    });

    if (videoCloseBtn) {
        videoCloseBtn.addEventListener('click', closeRachidVideo);
    }

    if (videoModal) {
        videoModal.addEventListener('click', (e) => {
            if (e.target === videoModal) {
                closeRachidVideo();
            }
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && videoModal && videoModal.classList.contains('active')) {
            closeRachidVideo();
        }
    });
});
