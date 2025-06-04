document.addEventListener('DOMContentLoaded', () => {
  // Existing navigation functions
  window.openExamPassForm = function () {
    window.location.href = 'ExamPassForm.html';
  };
  window.openGatePassForm = function () {
    window.location.href = 'GatePassForm.html';
  };

  // Show success message if form submitted
  const successFlag = localStorage.getItem('formSubmissionSuccess');
  if (successFlag === 'true') {
    const msgDiv = document.getElementById('success-message');
    if (msgDiv) {
      msgDiv.textContent = 'Your form has been submitted successfully and is awaiting finance approval. You may view or edit your submission if needed.';
      msgDiv.style.display = 'block';
    } else {
      alert('Your form has been submitted successfully and is awaiting finance approval.');
    }
    localStorage.removeItem('formSubmissionSuccess');
  }

  // Translation dictionary for all translatable elements
  const translations = {
    en: {
      'hero-title': 'ICT University Pass Portal',
      'hero-subtitle': 'Your Gateway to Seamless Academic Services',
      'services-title': 'Student Services',
      'welcome-message': 'Welcome to the Pass Portal Platform — Where student are eligible to request their End-Of-Semester passes online on completion of tuition and Student Union Government fee payments.',
      'gate-pass-title': 'Gate Pass',
      'gate-pass-desc': 'Request temporary campus access passes',
      'gate-pass-btn': 'Get Pass',
      'semester-pass-title': 'Semester Pass',
      'semester-pass-desc': 'Apply for end-of-semester examination pass',
      'semester-pass-btn': 'Apply Now',
      'nav-home': 'Home',
      'nav-services': 'Student Services',
      'nav-about': 'About',
      'footer-locations-title': 'Locations',
      'footer-location-text': 'ICT-U Foundation USA<br />(Office of International Linkages)',
      'footer-location-address': '17669 Willow Trail Drive,<br />Baton Rouge, LA 70817, USA.',
      'footer-location-phones': '+1 (225) 288-8883<br />+237 678 76 40 37<br />+234 901 579-1014',
      'footer-quick-links-title': 'Quick Links',
      'footer-student-portal-link': 'Student Portal',
      'footer-copy': 'Copyright &copy; All Rights Reserved 2023,',
      'footer-copy-org': 'The ICT University'
    },
    fr: {
      'hero-title': 'Portail de Pass de l\'Université ICT',
      'hero-subtitle': 'Votre passerelle vers des services académiques fluides',
      'services-title': 'Services aux étudiants',
      'welcome-message': 'Bienvenue sur la plateforme Pass Portal — Où les étudiants peuvent demander leurs passes de fin de semestre en ligne après paiement des frais de scolarité et du gouvernement étudiant.',
      'gate-pass-title': 'Pass d\'accès',
      'gate-pass-desc': 'Demandez des passes d\'accès temporaires au campus',
      'gate-pass-btn': 'Obtenir le pass',
      'semester-pass-title': 'Pass semestriel',
      'semester-pass-desc': 'Postulez pour le pass d\'examen de fin de semestre',
      'semester-pass-btn': 'Postuler maintenant',
      'nav-home': 'Accueil',
      'nav-services': 'Services aux étudiants',
      'nav-about': 'À propos',
      'footer-locations-title': 'Emplacements',
      'footer-location-text': 'Fondation ICT-U USA<br />(Bureau des relations internationales)',
      'footer-location-address': '17669 Willow Trail Drive,<br />Baton Rouge, LA 70817, USA.',
      'footer-location-phones': '+1 (225) 288-8883<br />+237 678 76 40 37<br />+234 901 579-1014',
      'footer-quick-links-title': 'Liens rapides',
      'footer-student-portal-link': 'Portail étudiant',
      'footer-copy': 'Droits d\'auteur &copy; Tous droits réservés 2023,',
      'footer-copy-org': 'L\'Université ICT'
    },
    es: {
      'hero-title': 'Portal de Pases de la Universidad ICT',
      'hero-subtitle': 'Su puerta a servicios académicos sin problemas',
      'services-title': 'Servicios para Estudiantes',
      'welcome-message': 'Bienvenido a la plataforma Pass Portal — Donde los estudiantes pueden solicitar sus pases de fin de semestre en línea tras el pago de matrícula y la cuota del gobierno estudiantil.',
      'gate-pass-title': 'Pase de acceso',
      'gate-pass-desc': 'Solicite pases temporales de acceso al campus',
      'gate-pass-btn': 'Obtener pase',
      'semester-pass-title': 'Pase semestral',
      'semester-pass-desc': 'Solicite el pase de examen de fin de semestre',
      'semester-pass-btn': 'Aplicar ahora',
      'nav-home': 'Inicio',
      'nav-services': 'Servicios para Estudiantes',
      'nav-about': 'Acerca de',
      'footer-locations-title': 'Ubicaciones',
      'footer-location-text': 'Fundación ICT-U USA<br />(Oficina de Enlaces Internacionales)',
      'footer-location-address': '17669 Willow Trail Drive,<br />Baton Rouge, LA 70817, USA.',
      'footer-location-phones': '+1 (225) 288-8883<br />+237 678 76 40 37<br />+234 901 579-1014',
      'footer-quick-links-title': 'Enlaces rápidos',
      'footer-student-portal-link': 'Portal del estudiante',
      'footer-copy': 'Derechos de autor &copy; Todos los derechos reservados 2023,',
      'footer-copy-org': 'La Universidad ICT'
    }
  };

  // Attach click event listeners to language flags
  const langFlags = document.querySelectorAll('#language-switcher .lang-flag');

  langFlags.forEach(flag => {
    flag.addEventListener('click', (e) => {
      e.preventDefault();

      const selectedLang = flag.getAttribute('data-lang');
      if (!translations[selectedLang]) return;

      // Update html lang attribute for accessibility & SEO
      document.documentElement.lang = selectedLang;

      // Update all translatable elements on the page
      Object.entries(translations[selectedLang]).forEach(([id, text]) => {
        const el = document.getElementById(id);
        if (el) {
          // Use innerHTML if text contains HTML tags (like <br />)
          if (text.includes('<br')) {
            el.innerHTML = text;
          } else {
            el.textContent = text;
          }
        }
      });
    });
  });
});
