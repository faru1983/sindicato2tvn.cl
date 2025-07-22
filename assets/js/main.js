/**
 * Main JavaScript file for Sindicato N°2 TVN Website
 *
 * Author: Felipe Andres Ramirez Urrutiaguer (Refactored by Gemini)
 * Version: 2.0.0
 *
 * Table of Contents:
 * 1.  Global Initializers (AOS)
 * 2.  Header & Navigation Logic
 * 3.  Active Menu Link on Scroll (Scrollspy)
 * 4.  Generic Modal Handler
 * 5.  Contact Form to WhatsApp Logic
 * 6.  Utility Functions (Copyright Year)
 */

document.addEventListener('DOMContentLoaded', () => {

    // 1. --- Global Initializers (AOS) ---
    AOS.init({
        duration: 800,
        once: true,
        easing: 'ease-out-quad',
        offset: 100,
    });

    // 2. --- Header & Navigation Logic ---
    const header = document.querySelector('.main-header');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    if (header) {
        window.addEventListener('scroll', () => {
            header.classList.toggle('scrolled', window.scrollY > 50);
        });
    }

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('is-active');
            document.body.classList.toggle('no-scroll');
        });

        // Close menu when a link is clicked
        navMenu.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                hamburger.classList.remove('is-active');
                document.body.classList.remove('no-scroll');
            });
        });
    }

    // 3. --- Active Menu Link on Scroll (Scrollspy) ---
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a.nav-link');
    
    const updateActiveLink = () => {
        let currentSectionId = '';
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            if (scrollY >= sectionTop) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(currentSectionId)) {
                link.classList.add('active');
            }
        });
    };
    
    window.addEventListener('scroll', updateActiveLink);
    updateActiveLink(); // Set initial state on load

    // 4. --- Generic Modal Handler ---
    const openModal = (modalId) => {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    };

    const closeModal = (modal) => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    };

    document.querySelectorAll('[data-modal-trigger]').forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            const modalId = trigger.getAttribute('data-modal-trigger');
            openModal(modalId);
        });
    });

    document.querySelectorAll('.modal-overlay').forEach(modal => {
        const closeButton = modal.querySelector('[data-modal-close]');
        if (closeButton) {
            closeButton.addEventListener('click', () => closeModal(modal));
        }
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal(modal);
            }
        });
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.key === "Escape") {
            const activeModal = document.querySelector('.modal-overlay.active');
            if (activeModal) {
                closeModal(activeModal);
            }
        }
    });

    // 5. --- Contact Form to WhatsApp Logic ---
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const getVal = (id) => document.getElementById(id).value.trim();
            const nombre = getVal('nombre');
            const apellido = getVal('apellido');
            const email = getVal('email');
            const celular = getVal('celular');
            const mensaje = getVal('mensaje');
            const whatsappNumber = "56997405350"; // Reemplazar con el número correcto
            
            const messageBody = `*Contacto desde la Web Sindicato2TVN*\n\n` +
                                `*Nombre:* ${nombre} ${apellido}\n` +
                                `*Email:* ${email}\n` +
                                `*Celular:* ${celular}\n\n` +
                                `*Mensaje:*\n${mensaje}`;
            
            const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(messageBody)}`;
            
            window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
            contactForm.reset();
        });
    }

    // 6. --- Utility Functions (Copyright Year) ---
    const copyrightYear = document.getElementById('copyright-year');
    if (copyrightYear) {
        copyrightYear.textContent = new Date().getFullYear();
    }
});