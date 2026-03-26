// ============================================
// NAVBAR MOBILE TOGGLE
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    function closeNav() {
        if (!navMenu || !navToggle) return;
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        document.documentElement.classList.remove('nav-open');
    }

    function toggleNav() {
        if (!navMenu || !navToggle) return;
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
        document.documentElement.classList.toggle('nav-open', navMenu.classList.contains('active'));
    }

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleNav();
        });
    }

    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', closeNav);
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') closeNav();
    });

    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) closeNav();
    });
});

// ============================================
// ANNÉE DYNAMIQUE DANS LE FOOTER
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
});

// ============================================
// CONTRÔLE DE LA MUSIQUE
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    const musicToggle = document.getElementById('music-toggle');
    const backgroundMusic = document.getElementById('background-music');
    
    if (musicToggle && backgroundMusic) {
        let isPlaying = false;
        
        musicToggle.addEventListener('click', function() {
            if (isPlaying) {
                backgroundMusic.pause();
                musicToggle.classList.remove('playing');
                isPlaying = false;
            } else {
                backgroundMusic.play().catch(error => {
                    console.log('La musique ne peut pas être jouée:', error);
                });
                musicToggle.classList.add('playing');
                isPlaying = true;
                backgroundMusic.volume = 0.2;
            }
        });
        
        // Gérer la fin de la musique (ne devrait pas arriver avec loop, mais au cas où)
        backgroundMusic.addEventListener('ended', function() {
            musicToggle.classList.remove('playing');
            isPlaying = false;
        });
    }
});

// ============================================
// ANIMATIONS AU SCROLL
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    /* threshold: 0 — une carte très haute (ex. toute la page Lore) ne dépassera jamais 10 % de
       surface visible à l’écran ; avec 0.1 l’animation ne se déclenchait pas. */
    const observerOptions = {
        threshold: 0,
        rootMargin: '0px 0px -40px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observer les cartes de features
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
    
    // Observer les content cards
    const contentCards = document.querySelectorAll('.content-card');
    contentCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});

// ============================================
// SMOOTH SCROLL POUR LES ANCRES
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
});

// ============================================
// GESTION DU FORMULAIRE DE SCÉNARIO
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    const scenarioForm = document.getElementById('scenario-form');
    
    if (scenarioForm) {
        scenarioForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Récupérer les données du formulaire
            const formData = new FormData(scenarioForm);
            const scenarioData = {
                title: formData.get('title'),
                author: formData.get('author'),
                description: formData.get('description'),
                content: formData.get('content'),
                date: new Date().toLocaleDateString('fr-FR')
            };
            
            // Afficher un message de confirmation
            alert('Merci pour votre scénario ! Il sera examiné et ajouté prochainement.');
            
            // Réinitialiser le formulaire
            scenarioForm.reset();
            
            // Dans une vraie application, on enverrait les données au serveur
            console.log('Scénario soumis:', scenarioData);
        });
    }
});
