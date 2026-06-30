document.addEventListener('DOMContentLoaded', function() {
    console.log('Сайт кофейни "Корица" загружен!');
    
    // Все фото для лайтбокса
    const galleryImages = [
        'images/photo2.jpg',
        'images/photo3.jpg',
        'images/photo4.jpg',
        'images/photo5.jpg',
        'images/photo6.jpg',
        'images/klybnika.jpg',
        'images/kokot.jpg',
        'images/semga.jpg',
        'images/icelatte.jpg',
        'images/chiz.jpg',
        'images/bambl.jpg',
        'images/barxat.jpg',
        'images/bylochka.jpg',
        'images/cirnik.jpg',
        'images/clasica.jpg',
        'images/espresso-tonik.jpg',
        'images/gorshok.jpg',
        'images/kakao.jpg',
        'images/kapychino.jpg',
        'images/kasha.jpg',
        'images/latte.jpg',
        'images/lattehalva.jpg',
        'images/limonad.jpg',
        'images/medovik.jpg',
        'images/mindal.jpg',
        'images/pirog.jpg',
        'images/smorodina.jpg',
        'images/tiramisy.jpg',
        'images/vetchina.jpg',
        'images/okno.jpg',
        'images/vet.jpg',
        'images/elka.jpg',
        'images/stakan.jpg'
    ];

    let currentPhotoIndex = 0;
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCounter = document.getElementById('lightbox-counter');

    // Lightbox
    window.openLightbox = function(index) {
        currentPhotoIndex = index;
        updateLightbox();
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    window.closeLightbox = function() {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    };

    window.changePhoto = function(direction) {
        currentPhotoIndex += direction;
        if (currentPhotoIndex >= galleryImages.length) currentPhotoIndex = 0;
        if (currentPhotoIndex < 0) currentPhotoIndex = galleryImages.length - 1;
        updateLightbox();
    };

    function updateLightbox() {
        lightboxImg.src = galleryImages[currentPhotoIndex];
        lightboxCounter.textContent = `${currentPhotoIndex + 1} / ${galleryImages.length}`;
    }

    // Close on background click
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') changePhoto(1);
        if (e.key === 'ArrowLeft') changePhoto(-1);
    });

    // Show/Hide Photos
    let allPhotosVisible = false;

    window.togglePhotos = function() {
        const hiddenPhotos = document.querySelectorAll('.photo-item--hidden');
        const btn = document.getElementById('showMoreBtn');
        
        allPhotosVisible = !allPhotosVisible;
        
        hiddenPhotos.forEach(photo => {
            if (allPhotosVisible) {
                photo.classList.add('show');
            } else {
                photo.classList.remove('show');
            }
        });
        
        btn.textContent = allPhotosVisible ? 'Свернуть' : 'Ещё';
    };

    // Scroll Back Button
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    let returnPosition = null;

    // Запоминаем позицию при клике на якорную ссылку
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', () => {
            returnPosition = window.scrollY;
        });
    });

    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400 || returnPosition !== null) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        });

        window.toggleScroll = function() {
            if (returnPosition !== null) {
                window.scrollTo({
                    top: returnPosition,
                    behavior: 'smooth'
                });
                returnPosition = null;
            } else {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
        };
    }

    // ========================================
    // CONTACT FORM WITH MODAL
    // ========================================
    const contactForm = document.getElementById('contactForm');
    const formModal = document.getElementById('formModal');
    const modalClose = document.getElementById('modalClose');
    const modalIcon = document.getElementById('modalIcon');
    const modalTitle = document.getElementById('modalTitle');
    const modalText = document.getElementById('modalText');
    const submitBtn = document.getElementById('submitBtn');

    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Получаем данные формы
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Показываем состояние загрузки
            submitBtn.disabled = true;
            submitBtn.textContent = 'Отправка...';
            
            try {
                // Отправляем на FormSubmit (email: senlowee@gmail.com)
                const response = await fetch('https://formsubmit.co/ajax/senlowee@gmail.com', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({
                        name: data.name,
                        phone: data.phone,
                        email: data.email || 'Не указан',
                        message: data.message,
                        _subject: '📬 Новая заявка с сайта Корица!',
                        _captcha: 'false',
                        _template: 'table',
                        _autoresponse: 'Спасибо! Мы получили вашу заявку и ответим в течение дня. — Кофейня Корица'
                    })
                });
                
                const result = await response.json();
                
                if (result.success || response.ok) {
                    // Успех
                    showModal('success', 'Заявка отправлена!', 'Мы получили ваше сообщение и ответим в течение дня.');
                    contactForm.reset();
                } else {
                    throw new Error('Ошибка отправки');
                }
            } catch (error) {
                // Ошибка
                showModal('error', 'Ошибка отправки', 'Пожалуйста, попробуйте ещё раз или позвоните нам напрямую.');
            } finally {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Отправить сообщение';
            }
        });
    }

    // Показ модального окна
    function showModal(type, title, text) {
        if (type === 'success') {
            modalIcon.textContent = '✓';
            modalIcon.className = 'modal__icon';
        } else {
            modalIcon.textContent = '✕';
            modalIcon.className = 'modal__icon modal__icon--error';
        }
        
        modalTitle.textContent = title;
        modalText.textContent = text;
        formModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // Закрытие модального окна
    function closeModal() {
        formModal.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }

    // Закрытие по клику на оверлей
    if (formModal) {
        formModal.addEventListener('click', function(e) {
            if (e.target === formModal.querySelector('.modal__overlay')) {
                closeModal();
            }
        });
    }

    // Закрытие по Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && formModal.classList.contains('active')) {
            closeModal();
        }
    });
});