
    const translations = {
    pl: {
    selectService: "Wybierz usługę"
},
    en: {
    selectService: "Select service"
},
    ru: {
    selectService: "Выберите услугу"
}
};

    let currentLang = 'pl';

    // Cookie Functions
    function checkCookieConsent() {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
    document.getElementById('cookieBanner').classList.add('show');
}
}

    function acceptCookies() {
    localStorage.setItem('cookieConsent', 'accepted');
    document.getElementById('cookieBanner').classList.remove('show');
}

    function declineCookies() {
    localStorage.setItem('cookieConsent', 'declined');
    document.getElementById('cookieBanner').classList.remove('show');
}

    // Language Change Function
    function changeLanguage(lang) {
    currentLang = lang;
    document.querySelectorAll('.lang-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    document.querySelectorAll('[data-' + lang + ']').forEach(el => {
    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
    el.placeholder = el.getAttribute('data-' + lang);
} else {
    el.innerHTML = el.getAttribute('data-' + lang);
}
});

    const serviceSelect = document.getElementById('service');
    if (serviceSelect) {
    serviceSelect.options[0].text = translations[lang].selectService;
}

    localStorage.setItem('preferredLanguage', lang);
}

    // Load Saved Language
    window.addEventListener('load', () => {
    const savedLang = localStorage.getItem('preferredLanguage');
    if (savedLang && savedLang !== 'pl') {
    const langBtn = document.querySelector(`.lang-btn[onclick*="${savedLang}"]`);
    if (langBtn) {
    langBtn.click();
}
}
    checkCookieConsent();
});

    // Navigation Scroll Effect
    window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    const scrollTop = document.getElementById('scrollTop');

    if (window.scrollY > 100) {
    navbar.classList.add('scrolled');
    scrollTop.classList.add('visible');
} else {
    navbar.classList.remove('scrolled');
    scrollTop.classList.remove('visible');
}
});

    // Mobile Menu Toggle
    function toggleMenu() {
    const navLinks = document.getElementById('navLinks');
    navLinks.classList.toggle('active');
}

    // Scroll to Top
    function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

    // Time Slot Selection
    let selectedTimeSlot = null;

    function selectTime(element, time) {
    document.querySelectorAll('.time-slot').forEach(slot => {
        slot.classList.remove('selected');
    });
    element.classList.add('selected');
    selectedTimeSlot = time;
    document.getElementById('timeSlot').value = time;
}

    // Form Submission
    function handleSubmit(event) {
    event.preventDefault();

    if (!selectedTimeSlot) {
    const messages = {
    pl: 'Proszę wybrać preferowaną porę dnia',
    en: 'Please select your preferred time of day',
    ru: 'Пожалуйста, выберите предпочтительное время'
};
    alert(messages[currentLang]);
    return;
}

    const formData = {
    name: document.getElementById('name').value,
    phone: document.getElementById('phone').value,
    email: document.getElementById('email').value,
    date: document.getElementById('date').value,
    timeSlot: selectedTimeSlot,
    service: document.getElementById('service').value,
    message: document.getElementById('message').value
};

    console.log('Formularz wysłany:', formData);

    const successMessages = {
    pl: 'Dziękujemy za zgłoszenie! Skontaktujemy się z Tobą wkrótce.',
    en: 'Thank you for your request! We will contact you soon.',
    ru: 'Спасибо за ваш запрос! Мы свяжемся с вами в ближайшее время.'
};

    alert(successMessages[currentLang]);

    event.target.reset();
    document.querySelectorAll('.time-slot').forEach(slot => {
    slot.classList.remove('selected');
});
    selectedTimeSlot = null;
}

    // Set minimum date to today
    const dateInput = document.getElementById('date');
    if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
}

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            document.getElementById('navLinks').classList.remove('active');
        }
    });
});

    // Intersection Observer for animations
    const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

    const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

    // Observe all cards
    document.querySelectorAll('.service-card, .stat-card, .price-category, .info-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

    // Counter animation for stats
    function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-count'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    const suffix = element.textContent.replace(/[0-9]/g, '');

    const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
    element.textContent = target + suffix;
    clearInterval(timer);
} else {
    element.textContent = Math.floor(current) + suffix;
}
}, 16);
}

    // Animate counters when visible
    const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            const number = entry.target.querySelector('.stat-number');
            animateCounter(number);
            entry.target.classList.add('animated');
        }
    });
}, observerOptions);

    document.querySelectorAll('.stat-card').forEach(card => {
    statsObserver.observe(card);
});
