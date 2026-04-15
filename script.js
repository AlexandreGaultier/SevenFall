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

function easeOutCubic(progress) {
    return 1 - Math.pow(1 - progress, 3);
}

function getNavbarOffset() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return 0;

    return navbar.offsetHeight + 8;
}

function smoothScrollToY(targetY, duration = 350) {
    const startY = window.scrollY;
    const distance = targetY - startY;

    if (Math.abs(distance) < 1) return;

    const startTime = performance.now();

    function animateScroll(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easeOutCubic(progress);

        window.scrollTo(0, startY + distance * easedProgress);

        if (progress < 1) {
            requestAnimationFrame(animateScroll);
        }
    }

    requestAnimationFrame(animateScroll);
}

function smoothScrollToElement(target, duration = 350) {
    if (!target) return;

    const targetPosition = window.scrollY + target.getBoundingClientRect().top - getNavbarOffset();
    const safeTarget = Math.max(targetPosition, 0);
    smoothScrollToY(safeTarget, duration);
}

function slugifyHeading(text) {
    const slug = text
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');

    if (!slug) return 'section';

    return slug;
}

function getQuickNavHeadings() {
    const page = window.location.pathname.toLowerCase();

    let selector = 'h2.section-title';

    if (page.includes('monstres.html')) {
        selector = 'h2.monster-title, h2.section-title';
    } else if (page.includes('lore.html')) {
        selector = 'h2.content-card-title, h2.section-title';
    } else if (page.includes('personnages.html')) {
        selector = 'h2.content-card-title, h2.section-title';
    } else if (page.includes('classes.html')) {
        selector = 'h2.section-title';
    } else if (page.includes('regles.html')) {
        selector = 'h2.section-title';
    } else {
        selector = 'h2.section-title, h2.monster-title, h2.content-card-title';
    }

    return Array.from(document.querySelectorAll(selector)).filter(heading => {
        const headingText = (heading.textContent || '').trim();
        return headingText.length > 0;
    });
}

// ============================================
// BOUTON RETOUR EN HAUT
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    const musicControl = document.querySelector('.music-control');
    if (!musicControl) return;

    const alreadyExists = document.getElementById('scroll-top-btn');
    if (alreadyExists) return;

    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.id = 'scroll-top-btn';
    scrollTopBtn.className = 'music-btn scroll-top-btn';
    scrollTopBtn.type = 'button';
    scrollTopBtn.setAttribute('aria-label', 'Remonter en haut de la page');
    scrollTopBtn.innerHTML = '<span class="scroll-top-icon" aria-hidden="true">↑</span>';

    musicControl.appendChild(scrollTopBtn);

    function toggleScrollTopVisibility() {
        if (window.scrollY > 280) {
            scrollTopBtn.classList.add('is-visible');
            return;
        }

        scrollTopBtn.classList.remove('is-visible');
    }

    scrollTopBtn.addEventListener('click', function() {
        smoothScrollToY(0, 320);
    });

    window.addEventListener('scroll', toggleScrollTopVisibility, { passive: true });
    toggleScrollTopVisibility();
});

// ============================================
// MENU FLOTTANT DES H2 (DESKTOP)
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    const headings = getQuickNavHeadings();
    if (headings.length === 0) return;

    const usedIds = new Set(
        Array.from(document.querySelectorAll('[id]'))
            .map(element => element.id)
            .filter(Boolean)
    );

    function getUniqueHeadingId(heading, index) {
        if (heading.id) return heading.id;

        const baseId = slugifyHeading(heading.textContent || `section-${index + 1}`);
        let candidateId = baseId;
        let suffix = 2;

        while (usedIds.has(candidateId)) {
            candidateId = `${baseId}-${suffix}`;
            suffix += 1;
        }

        heading.id = candidateId;
        usedIds.add(candidateId);
        return candidateId;
    }

    const floatingNav = document.createElement('nav');
    floatingNav.className = 'floating-h2-nav';
    floatingNav.setAttribute('aria-label', 'Navigation rapide des sections');

    const title = document.createElement('p');
    title.className = 'floating-h2-nav-title';
    title.textContent = 'Navigation rapide';
    floatingNav.appendChild(title);

    const list = document.createElement('ul');
    list.className = 'floating-h2-nav-list';
    floatingNav.appendChild(list);

    headings.forEach((heading, index) => {
        const headingId = getUniqueHeadingId(heading, index);
        const headingText = heading.textContent ? heading.textContent.trim() : `Section ${index + 1}`;

        const listItem = document.createElement('li');
        const link = document.createElement('a');
        link.className = 'floating-h2-nav-link';
        link.href = `#${headingId}`;
        link.textContent = headingText;

        listItem.appendChild(link);
        list.appendChild(listItem);
    });

    document.body.appendChild(floatingNav);

    const navLinks = Array.from(floatingNav.querySelectorAll('.floating-h2-nav-link'));

    function setActiveLink(activeId) {
        navLinks.forEach(link => {
            const isCurrent = link.getAttribute('href') === `#${activeId}`;
            link.classList.toggle('is-active', isCurrent);
        });
    }

    const headingObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setActiveLink(entry.target.id);
            }
        });
    }, {
        root: null,
        threshold: 0.05,
        rootMargin: '-35% 0px -55% 0px'
    });

    headings.forEach(heading => headingObserver.observe(heading));
    setActiveLink(headings[0].id);
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
                    smoothScrollToElement(target, 350);
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
