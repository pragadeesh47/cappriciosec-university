document.addEventListener("DOMContentLoaded", () => {
    const slidesContainer = document.getElementById("slides");
    const filterContainer = document.querySelector(".filter-options");

    fetch("https://raw.githubusercontent.com/Cappricio-Securities/Cappriciosec-University/refs/heads/main/university.json")
        .then(response => response.json())
        .then(data => {
            const banners = data.banner_imgs || [];
            const tags = data.Tags || [];
            const baseURL = data.url;
            const images = data.We_trainged || [];
            // === Render banner images ===
            slidesContainer.innerHTML = '';
            banners.forEach(url => {
                if (url && url.startsWith("http")) {
                    const slide = document.createElement("div");
                    slide.classList.add("slide");
                    slide.style.backgroundImage = `url('${url}')`;
                    slidesContainer.appendChild(slide);
                }
            });

            // === Render filter tags ===
            filterContainer.innerHTML = '';
            tags.forEach((tag, index) => {
                const btn = document.createElement("button");
                btn.classList.add("filter-btn");
                btn.dataset.filter = tag.toLowerCase().replace(/\s+/g, "");
                btn.textContent = tag;
                if (index === 0) btn.classList.add("active");
                filterContainer.appendChild(btn);
            });

            // === Logo and app link ===
            const logoEl = document.querySelector(".logo");
            if (logoEl && data.header_logo) {
                logoEl.src = data.header_logo;
            }

            const appLinkEl = document.querySelector(".header-actions");
            if (appLinkEl && data.App_Link) {
                appLinkEl.addEventListener("click", function () {
                    window.location.href = data.App_Link;
                });
            }

            // === Scrolling logos ===
            const track = document.querySelector(".slide-track");
            if (track) {
                track.innerHTML = '';
                [...images, ...images].forEach((img, index) => {
                    const image = document.createElement("img");
                    image.src = `${baseURL}/${img}`;
                    image.alt = "Client Logo";
                    image.classList.add("client-img");
                    image.classList.add(`image-${index % 2 == 0 ? 'even' : 'odd'}`)
                    track.appendChild(image);
                });
            }
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
            data.footer.sections.forEach(section => {
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
            });

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
});