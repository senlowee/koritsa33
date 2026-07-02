document.addEventListener('DOMContentLoaded', function() {
    console.log('Сайт кофейни "Корица" загружен!');
    
    // Все фото для лайтбокса
    const galleryImages = [
        'images/photo2.jpg',        // 0
        'images/photo3.jpg',        // 1
        'images/photo4.jpg',        // 2
        'images/photo5.jpg',        // 3
        'images/photo6.jpg',        // 4
        'images/klybnika.jpg',      // 5
        'images/kokot.jpg',         // 6
        'images/semga.jpg',         // 7
        'images/icelatte.jpg',      // 8
        'images/chiz.jpg',          // 9
        'images/bambl.jpg',         // 10
        'images/barxat.jpg',        // 11
        'images/bylochka.jpg',      // 12
        'images/cirnik.jpg',        // 13
        'images/clasica.jpg',       // 14
        'images/espresso-tonik.jpg',// 15
        'images/gorshok.jpg',       // 16
        'images/kakao.jpg',         // 17
        'images/kapychino.jpg',     // 18
        'images/kasha.jpg',         // 19
        'images/latte.jpg',         // 20
        'images/lattehalva.jpg',    // 21
        'images/limonad.jpg',       // 22
        'images/medovik.jpg',       // 23
        'images/mindal.jpg',        // 24
        'images/pirog.jpg',         // 25
        'images/smorodina.jpg',     // 26
        'images/tiramisy.jpg',      // 27
        'images/vetchina.jpg',      // 28
        'images/okno.jpg',          // 29
        'images/vet.jpg',           // 30
        'images/elka.jpg',          // 31
        'images/stakan.jpg',        // 32
        'images/meny.jpg'           // 33
    ];

    let currentPhotoIndex = 0;
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCounter = document.getElementById('lightbox-counter');

    // ========================================
    // LIGHTBOX
    // ========================================
    window.openLightbox = function(index) {
        currentPhotoIndex = index;
        updateLightbox();
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
        console.log('Открыто фото #' + index + ': ' + galleryImages[index]);
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

    // Открытие фото меню в лайтбоксе
    const menuImg = document.querySelector('.menu-page__img');
    if (menuImg) {
        menuImg.addEventListener('click', function() {
            const menuIndex = galleryImages.indexOf('images/meny.png');
            if (menuIndex !== -1) {
                openLightbox(menuIndex);
            } else {
                console.error('Меню не найдено в массиве!');
            }
        });
        menuImg.style.cursor = 'pointer';
    }

    // Закрытие по клику на фон
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    // Навигация с клавиатуры
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') changePhoto(1);
        if (e.key === 'ArrowLeft') changePhoto(-1);
    });

    // ========================================
    // ПОКАЗАТЬ/СКРЫТЬ ФОТО
    // ========================================
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


    // ========================================
    // ПЛАВНАЯ ПРОКРУТКА К СЕКЦИИ МЕНЮ
    // ========================================
    document.querySelectorAll('a[href="#menu"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const menuSection = document.getElementById('menu');
            if (menuSection) {
                const headerOffset = 100;
                const elementPosition = menuSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

   Ы

    // ========================================
    // УВЕДОМЛЕНИЕ О КОПИРОВАНИИ
    // ========================================
    function showCopyNotification(message) {
        const oldNotification = document.querySelector('.copy-notification');
        if (oldNotification) {
            oldNotification.remove();
        }
        
        const notification = document.createElement('div');
        notification.className = 'copy-notification';
        notification.textContent = message || '✓ Скопировано!';
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideIn 0.3s ease reverse';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    // ========================================
    // КОПИРОВАНИЕ ТЕЛЕФОНА (ФУТЕР)
    // ========================================
    const phoneLink = document.getElementById('phoneLink');
    if (phoneLink) {
        phoneLink.addEventListener('click', function(e) {
            e.preventDefault();
            
            const phoneNumber = '+7 960 734-39-36';
            
            navigator.clipboard.writeText(phoneNumber).then(() => {
                showCopyNotification('✓ Номер телефона скопирован!');
            }).catch(err => {
                const textArea = document.createElement('textarea');
                textArea.value = phoneNumber;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                showCopyNotification('✓ Номер телефона скопирован!');
            });
        });
    }

    // ========================================
    // КОПИРОВАНИЕ EMAIL (ФУТЕР)
    // ========================================
    const emailLink = document.getElementById('emailLink');
    if (emailLink) {
        emailLink.addEventListener('click', function() {
            const emailAddress = 'Lazurina@gmail.com';
            
            navigator.clipboard.writeText(emailAddress).then(() => {
                showCopyNotification('✓ Email скопирован!');
            }).catch(err => {
                const textArea = document.createElement('textarea');
                textArea.value = emailAddress;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                showCopyNotification('✓ Email скопирован!');
            });
        });
    }

    // ========================================
    // КОПИРОВАНИЕ ТЕЛЕФОНА (СЕКЦИЯ КОНТАКТЫ)
    // ========================================
    const phoneElements = document.querySelectorAll('.phone-copy');
    
    phoneElements.forEach(phoneEl => {
        phoneEl.addEventListener('click', function(e) {
            e.preventDefault();
            const phoneNumber = this.getAttribute('data-phone');
            
            if (phoneNumber) {
                navigator.clipboard.writeText(phoneNumber).then(() => {
                    showCopyNotification('✓ Номер телефона скопирован!');
                }).catch(err => {
                    const textArea = document.createElement('textarea');
                    textArea.value = phoneNumber;
                    document.body.appendChild(textArea);
                    textArea.select();
                    document.execCommand('copy');
                    document.body.removeChild(textArea);
                    showCopyNotification('✓ Номер телефона скопирован!');
                });
            }
        });
    });
});
