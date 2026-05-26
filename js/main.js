// ============ БУРГЕР МЕНЮ ============
document.addEventListener('DOMContentLoaded', function() {
    const menuIcon = document.getElementById('menuIcon');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuIcon && navLinks) {
        menuIcon.addEventListener('click', function(e) {
            e.stopPropagation();
            navLinks.classList.toggle('active');
        });
        
        document.addEventListener('click', function() {
            navLinks.classList.remove('active');
        });
    }
});

// ============ ТИЛ АЛМАШТИРИШ (МЕНЮ ИЧИДА) ============
document.addEventListener('DOMContentLoaded', function() {
    const langBtnNav = document.getElementById('langBtnNav');
    const langDropdownNav = document.getElementById('langDropdownNav');
    
    if (langBtnNav && langDropdownNav) {
        langBtnNav.addEventListener('click', function(e) {
            e.stopPropagation();
            langDropdownNav.classList.toggle('show');
        });
        
        document.addEventListener('click', function() {
            langDropdownNav.classList.remove('show');
        });
    }
});

// ============ FAQ АККОРДЕОН ============
document.addEventListener('DOMContentLoaded', function() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            if (answer) {
                answer.classList.toggle('active');
            }
        });
    });
});

// ============ МОДАЛ ОЙНАЛАР (ФАКУЛТЕТЛАР) ============
function openModal(facultyId) {
    const modal = document.getElementById('facultyModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
    
    if (!modal || !modalTitle || !modalBody) return;
    
    // Бу ерда факультет маълумотларини тўлдириш керак
    // Ҳозирча маълумотлар faculties.js да бор, кейин бирлаштирамиз
    
    modal.style.display = 'flex';
}

function closeModal() {
    const modal = document.getElementById('facultyModal');
    if (modal) modal.style.display = 'none';
}

// Модални ойнадан ташқари босганда ёпиш
window.onclick = function(e) {
    const facultyModal = document.getElementById('facultyModal');
    const newsModal = document.getElementById('newsModal');
    const modal = document.getElementById('modal');
    
    if (e.target === facultyModal) closeModal();
    if (e.target === newsModal) closeNewsModal();
    if (e.target === modal) closeSimpleModal();
};

// ============ ХАБАРЛАР МОДАЛИ ============
function openNewsModal(newsId) {
    const modal = document.getElementById('newsModal');
    const modalTitle = document.getElementById('newsModalTitle');
    const modalDate = document.getElementById('newsModalDate');
    const modalText = document.getElementById('newsModalText');
    
    if (!modal || !modalTitle || !modalDate || !modalText) return;
    
    // Бу ерда хабар маълумотларини тўлдириш керак
    // Ҳозирча маълумотлар news.js да бор
    
    modal.style.display = 'flex';
}

function closeNewsModal() {
    const modal = document.getElementById('newsModal');
    if (modal) modal.style.display = 'none';
}

// ============ ОДДИЙ МОДАЛ (ФОРМА УЧУН) ============
function closeSimpleModal() {
    const modal = document.getElementById('modal');
    if (modal) modal.style.display = 'none';
}

// ============ СЛАЙДЕР (АСОСИЙ САҲИФА) ============
document.addEventListener('DOMContentLoaded', function() {
    const sliderWrapper = document.getElementById('sliderWrapper');
    const slides = document.querySelectorAll('.slider-slide');
    const prevBtn = document.getElementById('sliderPrev');
    const nextBtn = document.getElementById('sliderNext');
    const dotsContainer = document.getElementById('sliderDots');
    
    if (!sliderWrapper || slides.length === 0) return;
    
    let currentIndex = 0;
    const slideCount = slides.length;
    let autoSlideInterval;
    const autoSlideDelay = 4000;
    
    // Индикатор нуқталарини яратиш
    function createDots() {
        if (!dotsContainer) return;
        dotsContainer.innerHTML = '';
        for (let i = 0; i < slideCount; i++) {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (i === currentIndex) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(i));
            dotsContainer.appendChild(dot);
        }
    }
    
    // Слайдга ўтиш
    function goToSlide(index) {
        if (index < 0) index = 0;
        if (index >= slideCount) index = slideCount - 1;
        if (index === currentIndex) return;
        
        currentIndex = index;
        sliderWrapper.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        if (dotsContainer) {
            document.querySelectorAll('.dot').forEach((dot, i) => {
                dot.classList.toggle('active', i === currentIndex);
            });
        }
    }
    
    // Кейинги слайд
    function nextSlide() {
        let newIndex = currentIndex + 1;
        if (newIndex >= slideCount) newIndex = 0;
        goToSlide(newIndex);
    }
    
    // Олдинги слайд
    function prevSlide() {
        let newIndex = currentIndex - 1;
        if (newIndex < 0) newIndex = slideCount - 1;
        goToSlide(newIndex);
    }
    
    // Авто слайд
    function startAutoSlide() {
        if (autoSlideInterval) clearInterval(autoSlideInterval);
        autoSlideInterval = setInterval(nextSlide, autoSlideDelay);
    }
    
    function stopAutoSlide() {
        if (autoSlideInterval) clearInterval(autoSlideInterval);
    }
    
    // Тугмаларга босилганда
    if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); stopAutoSlide(); startAutoSlide(); });
    if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); stopAutoSlide(); startAutoSlide(); });
    
    // Слайдер устига келганда авто тўхташ
    const sliderContainer = document.querySelector('.slider-container');
    if (sliderContainer) {
        sliderContainer.addEventListener('mouseenter', stopAutoSlide);
        sliderContainer.addEventListener('mouseleave', startAutoSlide);
    }
    
    // Бошлаш
    sliderWrapper.style.transform = 'translateX(0%)';
    createDots();
    startAutoSlide();
});

// ============ СЧЁТЧИК (РАҚАМЛАР АНИМАЦИЯСИ) ============
document.addEventListener('DOMContentLoaded', function() {
    const counters = document.querySelectorAll('.stat-number, .number');
    let started = false;
    
    function startCounters() {
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            if (isNaN(target) || target === 0) return;
            
            let current = 0;
            const increment = target / 60;
            const updateCount = () => {
                current += increment;
                if (current < target) {
                    counter.innerText = Math.floor(current);
                    setTimeout(updateCount, 20);
                } else {
                    counter.innerText = target;
                }
            };
            updateCount();
        });
    }
    
    function checkScroll() {
        const statsSection = document.querySelector('.stats-detailed, .achievements');
        if (statsSection && !started && window.scrollY + window.innerHeight > statsSection.offsetTop + 100) {
            started = true;
            startCounters();
        }
    }
    
    window.addEventListener('scroll', checkScroll);
    checkScroll();
});

// ============ ФОРМА ЮБОРИШ (АДМИССИОН, КОНТАКТ) ============
document.addEventListener('DOMContentLoaded', function() {
    const submitBtn = document.getElementById('submitBtn');
    const modal = document.getElementById('modal');
    
    if (submitBtn && modal) {
        submitBtn.addEventListener('click', function() {
            modal.style.display = 'flex';
            setTimeout(() => { modal.style.display = 'none'; }, 3000);
        });
    }
});

// ============ HEADER СКРОЛЛ ЭФФЕКТИ ============
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (header) {
        if (window.scrollY > 50) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 5px 20px rgba(0,0,0,0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 10px 30px rgba(0,0,0,0.05)';
        }
    }
});