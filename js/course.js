document.addEventListener('DOMContentLoaded', function () {
    const body = document.body;

    // Mobile Menu

    // Tab Functionality
    document.querySelectorAll('.tab-btn').forEach(button => {
        button.addEventListener('click', () => {
            const tab = button.getAttribute('data-tab');

            document.querySelectorAll('.tab-btn').forEach(btn =>
                btn.classList.remove('active'));

            button.classList.add('active');

            document.querySelectorAll('.tab-content').forEach(content =>
                content.classList.remove('active'));

            const targetTab = document.getElementById(tab);
            if (targetTab) {
                targetTab.classList.add('active');
            } else {
                console.warn("No tab content found for:", tab);
            }
        });
    });

    // Curriculum Section Toggle
    const sectionHeaders = document.querySelectorAll('.section-header');
    sectionHeaders.forEach(header => {
        header.addEventListener('click', function () {
            const content = this.nextElementSibling;
            content.classList.toggle('active');

            const icon = this.querySelector('i');
            if (icon) {
                icon.className = content.classList.contains('active') ? 'fas fa-chevron-up' : 'fas fa-chevron-down';
            }
        });
    });

    // Mobile Navigation
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function () {
            navItems.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Add animation classes on scroll
    const animateOnScroll = function () {
        const elements = document.querySelectorAll('.course-card, .related-card, .faq-item, .review-item');
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            if (elementPosition < screenPosition) {
                element.classList.add('animate-fadeIn');
            }
        });
    };

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on page load
});

document.addEventListener("DOMContentLoaded", function () {
    fetch("https://raw.githubusercontent.com/Cappricio-Securities/Cappriciosec-University/refs/heads/main/university.json")
        .then(res => res.json())
        .then(data => {
            const baseURL = data.url;
            const images = data.We_trainged;
            const track = document.querySelector(".slide-track");
            document.querySelector(".logo").src = data.header_logo;
            document.querySelector(".header-actions").addEventListener("click", function () {
                window.location.href = data.App_Link;
            });

            track.innerHTML = "";
            [...images, ...images].forEach(img => {
                const image = document.createElement("img");
                image.src = `${baseURL}/${img}`;
                image.alt = "Client Logo";
                image.classList.add("client-img");
                track.appendChild(image);
            });
        })
        .catch(err => console.error("Failed to load client images:", err));
});