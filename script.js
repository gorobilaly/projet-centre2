/* =========================================================
   ANIMATIONS ACCUEIL — Faladie AS
========================================================= */

document.addEventListener('DOMContentLoaded', function () {

    /* ---------- Révélation au défilement (scroll reveal) ---------- */
    const revealElements = document.querySelectorAll('.reveal');

// Applique un délai échelonné aux cartes de la grille
    document.querySelectorAll('.feat-card').forEach(function (card, i) {
        card.style.setProperty('--i', (i + 1));
    });

    // Délai échelonné pour les cartes de la page Centre
    document.querySelectorAll('.centre-card').forEach(function (card, i) {
        card.style.setProperty('--i', (i + 1));
    });

    const revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    revealElements.forEach(function (el) {
        revealObserver.observe(el);
    });

    /* ---------- Compteurs animés (section chiffres) ---------- */
    const counters = document.querySelectorAll('.stat-number');

    const counterObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.getAttribute('data-count'), 10);
                const duration = 2000;
                const startTime = performance.now();

                function updateCounter(currentTime) {
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    // easeOutCubic pour un effet fluide
                    const eased = 1 - Math.pow(1 - progress, 3);
                    el.textContent = Math.floor(eased * target);
                    if (progress < 1) {
                        requestAnimationFrame(updateCounter);
                    } else {
                        el.textContent = target;
                    }
                }
                requestAnimationFrame(updateCounter);
                counterObserver.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(function (counter) {
        counterObserver.observe(counter);
    });

/* ---------- Navbar : rétrécit au défilement ---------- */
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 60) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    /* ---------- Formulaire de contact ---------- */
    const form = document.querySelector('form.label');
    if (form) {
        const naissance = document.getElementById('naissance');
        const ageInput = document.getElementById('age');
        const msg = document.getElementById('formMsg');

        // Auto-calcul de l'âge à partir de la date de naissance
        if (naissance && ageInput) {
            naissance.addEventListener('change', function () {
                const dob = new Date(this.value);
                if (isNaN(dob.getTime())) {
                    ageInput.value = '';
                    return;
                }
                const today = new Date();
                let age = today.getFullYear() - dob.getFullYear();
                const m = today.getMonth() - dob.getMonth();
                if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
                    age--;
                }
                ageInput.value = age >= 0 ? age : '';
            });
        }

        // Soumission du formulaire
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            const prenom = document.getElementById('prenom').value.trim();
            const nom = document.getElementById('nom').value.trim();
            const tel = document.getElementById('tel').value.trim();
            const categorie = document.getElementById('categorie').value;

            if (!prenom || !nom || !tel || !categorie) {
                msg.className = 'form-msg error';
                msg.textContent = 'Veuillez remplir tous les champs obligatoires.';
                return;
            }
            msg.className = 'form-msg success';
            msg.textContent = 'Merci ' + prenom + ' ' + nom + ' ! Votre candidature a bien été envoyée. Notre cellule vous contactera sous 48h.';
            form.reset();
            if (ageInput) ageInput.value = '';
            setTimeout(function () {
                msg.textContent = '';
                msg.className = 'form-msg';
            }, 6000);
        });
    }
});
