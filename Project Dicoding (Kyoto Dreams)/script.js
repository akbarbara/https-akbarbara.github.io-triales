document.addEventListener('DOMContentLoaded', function() {
    const hamburgerButton = document.getElementById('hamburger-menu');
    const navLinks = document.getElementById('nav-links');
    const header = document.getElementById('header');
    hamburgerButton.addEventListener('click', function() {
        navLinks.classList.toggle('show');
        hamburgerButton.classList.toggle('active');
    });
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('show')) {
                navLinks.classList.remove('show');
                hamburgerButton.classList.remove('active');
            }
        });
    });

    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
        let currentScroll = window.scrollY;
        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        if (currentScroll > lastScrollTop && currentScroll > 50) {
            header.classList.add('header-hidden');
        } else {
            header.classList.remove('header-hidden');
        }
        lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; 
    });

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show-anim');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0 }); 

        const animatedElements = document.querySelectorAll('.hidden-anim');
        animatedElements.forEach((el) => observer.observe(el));
    } else {
        const animatedElements = document.querySelectorAll('.hidden-anim');
        animatedElements.forEach((el) => el.classList.add('show-anim'));
    }

    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.getElementById('lightbox-prev');
    const lightboxNext = document.getElementById('lightbox-next');
    let currentImageIndex = 0;
    const images = Array.from(galleryItems).map(item => item.querySelector('img').src);

    function openLightbox(index) {
        currentImageIndex = index;
        lightboxImage.src = images[currentImageIndex];
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = ''; 
    }

    function showNextImage() {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        lightboxImage.src = images[currentImageIndex];
    }

    function showPrevImage() {
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        lightboxImage.src = images[currentImageIndex];
    }

    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => openLightbox(index));
    });

    lightboxClose.addEventListener('click', closeLightbox);
    lightboxPrev.addEventListener('click', showPrevImage);
    lightboxNext.addEventListener('click', showNextImage);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
        if (lightbox.classList.contains('active')) {
            if (e.key === 'ArrowRight') showNextImage();
            if (e.key === 'ArrowLeft') showPrevImage();
        }
    });

    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    function showError(element, message) {
        const formGroup = element.closest('.form-group');
        formGroup.classList.add('error');
        formGroup.classList.remove('success');
        formGroup.querySelector('.error-message').textContent = message;
        formGroup.querySelector('.error-message').style.display = 'block';
    }

    function showSuccess(element) {
        const formGroup = element.closest('.form-group');
        formGroup.classList.remove('error');
        formGroup.classList.add('success');
        formGroup.querySelector('.error-message').style.display = 'none';
    }

    function checkRequired(input) {
        if (input.value.trim() === '') {
            showError(input, `${input.previousElementSibling.textContent.replace(':', '')} tidak boleh kosong.`);
            return false;
        }
        showSuccess(input);
        return true;
    }

    function validateName(input) {
        if (!checkRequired(input)) return false;
        if (input.value.trim().length < 3) {
            showError(input, 'Nama harus minimal 3 karakter.');
            return false;
        }
        showSuccess(input);
        return true;
    }

    function validateEmail(input) {
        if (!checkRequired(input)) return false;
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!re.test(input.value.trim())) {
            showError(input, 'Email tidak valid.');
            return false;
        }
        showSuccess(input);
        return true;
    }

    function validateMessage(input) {
        if (!checkRequired(input)) return false;
        if (input.value.trim().length < 10) {
            showError(input, 'Pesan harus minimal 10 karakter.');
            return false;
        }
        showSuccess(input);
        return true;
    }

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        let isValid = true;
        isValid = validateName(document.getElementById('name')) && isValid;
        isValid = validateEmail(document.getElementById('email')) && isValid;
        isValid = checkRequired(document.getElementById('subject')) && isValid;
        isValid = validateMessage(document.getElementById('message')) && isValid;

        if (isValid) {
            formStatus.classList.remove('error');
            formStatus.classList.add('success');
            formStatus.textContent = 'Pesan Anda berhasil dikirim! Kami akan segera menghubungi Anda.';
            formStatus.style.display = 'block';
            contactForm.reset();
            setTimeout(() => {
                formStatus.style.display = 'none';
                document.querySelectorAll('.form-group').forEach(group => group.classList.remove('success'));
            }, 5000);
        } else {
            formStatus.classList.remove('success');
            formStatus.classList.add('error');
            formStatus.textContent = 'Terjadi kesalahan. Mohon periksa kembali formulir Anda.';
            formStatus.style.display = 'block';
        }
    });
    document.getElementById('name').addEventListener('blur', function() { validateName(this); });
    document.getElementById('email').addEventListener('blur', function() { validateEmail(this); });
    document.getElementById('subject').addEventListener('blur', function() { checkRequired(this); });
    document.getElementById('message').addEventListener('blur', function() { validateMessage(this); });
});
