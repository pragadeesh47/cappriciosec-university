document.addEventListener('DOMContentLoaded', function () {
    const body = document.body;
    let feedbackVideos = [];
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

    loadTestimonials();
    loadCarouselImages();


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


 function getSimilarCourses(tags){
         fetch("https://raw.githubusercontent.com/Cappricio-Securities/Cappriciosec-University/refs/heads/main/course.json?v=123")
                .then(res => res.json())
                .then(data => {
                    const courseList = data.Course || [];
                    const allCourses = courseList.map(courseKey => {
                        const course = data[courseKey];
                        if (!course) return null;
                        return {
                            id: courseKey.toLowerCase(),
                            tag: course.Tag,
                            title: course.title || '',
                            description: course["Short Description"] || '',
                            category: 'Cybersecurity', // Default category
                            price: course.price || '',
                            offerPrice: course["offer price"] || '',
                            banner: course.banner || '/placeholder.svg?height=400&width=600',
                            level: course.Language || 'Beginner',
                            mentor: course.Mentor?.name || 'Unknown Mentor',
                            duration: course.Duration || '',
                            enrollUrl: course["Enroll now"] || '#'
                        };
                    }).filter(course => course !== null);


                    // Make courses available globally
                    

                    // mostSellingCourses(allCourses);
                    const similarCourses = allCourses.filter(course=>course.tag.some(tag=>tags.includes(tag)));
                    renderCourses(similarCourses);
                    updateNav();
                    autoCenter();

                   
                })
                .catch(err => {
                    console.error("Failed to load course data:", err);
                });

      }


     
         const track = document.getElementById("MostSellingsliderTrack");
      
        function createCard(course) {
            return `
      <div class="most-selling-course-card">
        <img class="most-selling-course-image" src="${course.banner}" alt="${course.title}">
        <div class="most-selling-course-content">
          <div class="most-selling-course-title">${course.title}</div>
          
          <div class="most-selling-course-meta">
            ⭐ 4.8
            <span>|</span> ⏱️ ${course.duration}
          </div>
          <div class="most-selling-course-price">
            ${course.offerPrice ? ` <del>₹${course.price}</del>
            <span style="color:green;">₹${course.offerPrice}</span>` : `₹${course.price}`}
           
          </div>
          <div class="most-selling-course-mentor-row">
            <div>${createProfileIcon(course.mentor)}</div>
            <p class="most-selling-course-mentor-name">${course.mentor}</p>
          </div>
          <a href="${course.enrollUrl}" target="_blank" class="most-selling-course-cta">🎓 Enroll Now</a>
        </div>
      </div>
    `;
        }

        function renderCourses(courses) {
            document.querySelector(".msc-loading-container").classList.add("hide-loader");
            courses = courses.filter(course => course.price > 3000)
            if (courses.length == 0) {
                document.querySelector(".most-selling-courses-section").style.display = "none";
                return;
            }
            track.innerHTML = courses.map(createCard).join('');
        }

        const prev = document.getElementById("prevBtn");
        const next = document.getElementById("nextBtn");

        function updateNav() {
            const maxScroll = track.scrollWidth - track.clientWidth;
            prev.disabled = track.scrollLeft <= 1;
            next.disabled = track.scrollLeft >= maxScroll - 1;
        }

        function autoCenter() {
            const cards = track.querySelectorAll(".most-selling-course-card").length;
            const limit = window.innerWidth >= 1024 ? 3 : window.innerWidth > 640 ? 2 : 1;
            track.classList.toggle("centered", cards <= limit);
            prev.classList.toggle("hide", cards <= limit);
            next.classList.toggle("hide", cards <= limit);
        }

        function scrollCards(dir = 1) {
            const oneCard = track.querySelector(".most-selling-course-card");
            if (!oneCard) return;
            const gap = parseInt(getComputedStyle(track).gap) || 22;
            const scrollAmt = oneCard.offsetWidth + gap;
            track.scrollBy({ left: scrollAmt * dir, behavior: "smooth" });
        }

        prev.addEventListener("click", () => scrollCards(-1));
        next.addEventListener("click", () => scrollCards(1));
        track.addEventListener("scroll", updateNav);


        window.addEventListener("resize", () => {
            updateNav();
            autoCenter();
        });

        // Optional: drag to scroll
        let isDown = false, startX, scrollLeft;
        track.addEventListener('mousedown', e => {
            isDown = true;
            startX = e.pageX;
            scrollLeft = track.scrollLeft;
            track.style.cursor = 'grabbing';
        });
        track.addEventListener('mouseleave', () => { isDown = false; track.style.cursor = ''; });
        track.addEventListener('mouseup', () => { isDown = false; track.style.cursor = ''; });
        track.addEventListener('mousemove', e => {
            if (!isDown) return;
            const dx = e.pageX - startX;
            track.scrollLeft = scrollLeft - dx;
        });

        function createProfileIcon(name, imageUrl = '') {
            if (imageUrl) {
                return `<span class="profile-icon" style="background:url(${imageUrl}) center/cover no-repeat;"></span>`;
            } else {
                const initials = getInitials(name);
                const bgColor = getRandomColor();
                return `<span class="profile-icon" style="background:${bgColor};">${initials}</span>`;
            }
        }

          // Helper: Get initials from name
        function getInitials(name) {
            const parts = name.trim().split(' ');
            let initials = parts[0].charAt(0);
            if (parts.length > 1) {
                initials += parts[parts.length - 1].charAt(0);
            }
            return initials.toUpperCase();
        }

        // Random background color
        function getRandomColor() {
            const colors = ['#009d68'];
            return colors[Math.floor(Math.random() * colors.length)];
        }


           function initSlider(images) {
            const track = document.getElementById('sliderTrack');

            let index = 0;
            let interval;
            let intervalTime = 3000;
            let slidesPerView = 1;
            let slideWidth = 0;

            function getSlidesPerView() {
                const width = window.innerWidth;
                if (width >= 1400) return 5;
                if (width >= 1200) return 4;
                if (width >= 900) return 3;
                if (width >= 600) return 2;
                return 1;
            }

            function getIntervalTime() {
                return window.innerWidth < 600 ? 2000 : 2000;
            }

            function setupSlides() {
                track.innerHTML = '';
                slidesPerView = getSlidesPerView();
                const allImages = [...images, ...images.slice(0, slidesPerView)]; // clone first N for infinite loop

                allImages.forEach(src => {
                    const div = document.createElement('div');
                    div.className = 'slide-image';
                    const img = document.createElement('img');
                    img.src = src.replace("https://ibb.co/", "https://i.ibb.co/") + ".jpg";;
                    div.appendChild(img);
                    track.appendChild(div);
                });

                slideWidth = track.querySelector('.slide-image').offsetWidth;
            }

            function startSlider() {
                clearInterval(interval);
                intervalTime = getIntervalTime();
                interval = setInterval(() => {
                    index++;
                    track.style.transition = 'transform 0.8s ease-in-out';
                    track.style.transform = `translateX(-${index * slideWidth}px)`;

                    // Reset if we hit the cloned slides
                    if (index === images.length) {
                        setTimeout(() => {
                            track.style.transition = 'none';
                            track.style.transform = `translateX(0px)`;
                            index = 0;
                        }, 800);
                    }
                }, intervalTime);
            }

            function init() {
                setupSlides();
                startSlider();
            }

            // First init
            init();

            // Re-init on resize
            window.addEventListener('resize', () => {
                clearInterval(interval);
                index = 0;
                init();
            });
        }



         async function loadCarouselImages() {
            try {
                const response = await fetch('https://raw.githubusercontent.com/Cappricio-Securities/Cappriciosec-University/refs/heads/main/university.json?af=123');
                const data = await response.json();
                const talks = data.talks;
                initSlider(talks)
                feedbackVideos = data.feedback_videos;

            } catch (error) {
                console.error('Failed to load images:', error);
            }
        }



        // TESTIMONIALS
         function setActiveTestimonial(type) {
            const button = document.getElementById("linkedin-button");
            const videoButton = document.getElementById("videos-button");
            if (type == "linkedin") {
                if (!button.classList.contains("active-testimonial")) {
                    button.classList.add("active-testimonial");
                }
                if (videoButton.classList.contains("active-testimonial")) {
                    videoButton.classList.remove("active-testimonial")
                }
            }
            else {
                if (button.classList.contains("active-testimonial")) {
                    button.classList.remove("active-testimonial");
                }
                if (!videoButton.classList.contains("active-testimonial")) {
                    videoButton.classList.add("active-testimonial")
                }
            }
        }

          document.getElementById("linkedin-button").addEventListener("click", () => {
            const parent = document.querySelector(".testimonial-content");
            setActiveTestimonial("linkedin")
            parent.innerHTML = "";
            loadTestimonials();
        })

         document.getElementById("videos-button").addEventListener("click", () => {
            setActiveTestimonial("videos");
            initVideoSlider(feedbackVideos);
        });

        function initVideoSlider(videoSources) {
            const parent = document.querySelector(".testimonial-content");
        

            const layout = document.createElement('div');
            layout.className = 'layout';

            const prevBtn = document.createElement('button');
            prevBtn.className = 'nav-btn';
            prevBtn.id = 'prevBtn';
            prevBtn.textContent = '❮';

            const nextBtn = document.createElement('button');
            nextBtn.className = 'nav-btn';
            nextBtn.id = 'nextBtn';
            nextBtn.textContent = '❯';

            const wrapper = document.createElement('div');
            wrapper.className = 'video-wrapper';

            const container = document.createElement('div');
            container.className = 'testimonial-video-container';
            container.id = 'videoContainer';

            wrapper.appendChild(container);
            layout.appendChild(prevBtn);
            layout.appendChild(wrapper);
            layout.appendChild(nextBtn);

            const videos = [];

            videoSources.forEach((src, index) => {
                const slide = document.createElement('div');
                slide.className = 'video-slide';

                const video = document.createElement('video');
                video.src = src;
                video.controls = true;
                video.muted = true;
                video.playsInline = true;
                video.dataset.index = index;

                videos.push(video);
                slide.appendChild(video);
                container.appendChild(slide);
            });
            parent.innerHTML = '';
            parent.appendChild(container)
            let currentVideoIndex = 0;

            function playVideo(index) {
                videos.forEach(v => {
                    v.pause();
                    v.currentTime = 0;
                });
                videos[index].play();
            }

            function scrollToVideo(index) {
                videos[index].scrollIntoView({ behavior: 'smooth', inline: 'center' });
            }

            videos.forEach((video, index) => {
                video.addEventListener('ended', () => {
                    const next = (index + 1) % videos.length;
                    currentVideoIndex = next;
                    scrollToVideo(next);
                    playVideo(next);
                });

                video.addEventListener('click', () => {
                    currentVideoIndex = index;
                    playVideo(index);
                });
            });

            prevBtn.onclick = () => {
                currentVideoIndex = (currentVideoIndex - 1 + videos.length) % videos.length;
                scrollToVideo(currentVideoIndex);
                playVideo(currentVideoIndex);
            };

            nextBtn.onclick = () => {
                currentVideoIndex = (currentVideoIndex + 1) % videos.length;
                scrollToVideo(currentVideoIndex);
                playVideo(currentVideoIndex);
            };

            // Mouse drag support
            let isDown = false;
            let startX, scrollLeft;

            container.addEventListener('mousedown', e => {
                isDown = true;
                startX = e.pageX - container.offsetLeft;
                scrollLeft = container.scrollLeft;
            });
            container.addEventListener('mouseleave', () => isDown = false);
            container.addEventListener('mouseup', () => isDown = false);
            container.addEventListener('mousemove', e => {
                if (!isDown) return;
                e.preventDefault();
                const x = e.pageX - container.offsetLeft;
                const walk = (x - startX) * 1.5;
                container.scrollLeft = scrollLeft - walk;
            });

            // Touch swipe support
            let touchStartX = 0;
            let touchEndX = 0;

            container.addEventListener('touchstart', e => {
                touchStartX = e.changedTouches[0].screenX;
            });

            container.addEventListener('touchend', e => {
                touchEndX = e.changedTouches[0].screenX;
                handleSwipeGesture();
            });

            function handleSwipeGesture() {
                const swipeDistance = touchEndX - touchStartX;
                const swipeThreshold = 50; // minimum distance in px to count as swipe

                if (Math.abs(swipeDistance) > swipeThreshold) {
                    if (swipeDistance < 0) {
                        // Swipe left → next video
                        nextBtn.click();
                    } else {
                        // Swipe right → prev video
                        prevBtn.click();
                    }
                }
            }

            // playVideo(currentVideoIndex);
        }


        // STUDENT REVIEWS
                var testimonials = [];
        async function loadTestimonials() {
            try {
                if (testimonials.length == 0) {
                    const response = await fetch("https://raw.githubusercontent.com/Cappricio-Securities/Cappriciosec-University/refs/heads/main/university.json");
                    if (!response.ok) throw new Error(`Failed to fetch JSON: ${response.status}`);

                    const data = await response.json();
                    testimonials = data.testimonials;
                }

                const parent = document.querySelector(".testimonial-content");

                // Create testimonial-container
                const container = document.createElement('div');
                container.className = 'testimonial-container';

                // Create testimonial-image section
                const imageContainer = document.createElement('div');
                imageContainer.className = 'testimonial-image';

                const image = document.createElement('img');
                image.src = "https://onepercentclub.io/assets/creator/sharan/linkedin/trustpilot_img.webp";
                image.alt = "Trustpilot Badge";

                imageContainer.appendChild(image);
                container.appendChild(imageContainer);

                // Create testimonial-wrapper
                const wrapper = document.createElement('div');
                wrapper.className = 'testimonial-wrapper';

                // Create testimonial-track
                const track = document.createElement('div');
                track.className = 'testimonial-track';
                track.id = 'testimonialTrack';

                // console.log(data)
                // Append original + duplicate for seamless scroll
                const totalTestimonials = [...testimonials, ...testimonials];

                totalTestimonials.forEach(t => {
                    const stars = "★".repeat(t.rating.length) + "☆".repeat(5 - t.rating.length)
                    const card = document.createElement("div");
                    card.className = "testimonial";
                    card.innerHTML = `
  <div class="testimonial-header">
    <div>
    <img src="${t.image}" alt="${t.name}">
    </div>
    <div class="testimonial-info">
        <div class = "name-rating">
      <h4>${t.name}</h4>
       <p class="stars">${stars}</p>
      </div>
      <h6>${t.achievement || ''}</h6>
    </div>
  </div>
 
  <p class="quote">"${t.quote}"</p>
      `;
                    track.appendChild(card);
                });
                wrapper.appendChild(track);
                container.appendChild(wrapper);

                // Finally, attach the entire testimonial section to the page
                parent.appendChild(container);

            } catch (error) {
                if (testimonials.length == 0) {
                    console.error('Error loading testimonials:', error);
                }
            }
        }


        loadFooter();

        function loadFooter(){
             fetch("https://raw.githubusercontent.com/Cappricio-Securities/Cappriciosec-University/refs/heads/main/university.json")
        .then(response => response.json())
        .then(data => {
           
            const footer = document.querySelector("footer");
            const container = document.createElement("div");
            container.className = "container";

            const footerGrid = document.createElement("div");
            footerGrid.className = "footer-grid";

            // About Section
            const about = document.createElement("div");
            about.className = "footer-about";
            about.innerHTML = `
                <h3>${data.footer.about.title}</h3>
                <p>${data.footer.about.description}</p>
            `;
            footerGrid.appendChild(about);

            // Dynamic Sections (Quick Links, Categories, Contact Us)
            // data.footer.sections.forEach(section => {
                const section = data.footer.sections[2];
                const sectionDiv = document.createElement("div");
                sectionDiv.className = "footer-links";

                const sectionTitle = document.createElement("h3");
                sectionTitle.textContent = section.title;
                sectionDiv.appendChild(sectionTitle);

                const ul = document.createElement("ul");
                section.links.forEach(link => {
                    const li = document.createElement("li");
                    const a = document.createElement("a");

                    a.textContent = link.text;
                    if (link.href) a.setAttribute("href", link.href);
                    else if (link.url) a.setAttribute("href", link.url);
                    else if (link.type === "email") a.setAttribute("href", "mailto:" + link.text);
                    else if (link.type === "phone") a.setAttribute("href", "tel:" + link.text);
                    else if (link.filter) a.setAttribute("data-filter", link.filter);

                    li.appendChild(a);
                    ul.appendChild(li);
                });
                sectionDiv.appendChild(ul);
                footerGrid.appendChild(sectionDiv);
            // });

            // Append Grid
            container.appendChild(footerGrid);

            // Footer Bottom
            const footerBottom = document.createElement("div");
            footerBottom.className = "footer-bottom";
            footerBottom.innerHTML = `<p>${data.footer.bottom}</p>`;
            container.appendChild(footerBottom);

            // Replace old footer content
            footer.innerHTML = "";
            footer.appendChild(container);
        })
        .catch(error => {
            console.error("Failed to load banner images or tags:", error);
        });
        }
