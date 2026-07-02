/* ==========================================
   DOM Elements
========================================== */

const filterButtons = document.querySelectorAll(".filter-buttons button");
const galleryItems = document.querySelectorAll(".gallery-item");
const galleryImages = document.querySelectorAll(".gallery-item img");

const lightbox = document.querySelector(".lightbox");
const lightboxImg = document.querySelector("#lightbox-img");
const lightboxCaption = document.querySelector("#lightbox-caption");

const closeBtn = document.querySelector(".close");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

const themeToggle = document.querySelector("#theme-toggle");


/* ==========================================
   Variables
========================================== */

let currentIndex = 0;
let visibleImages = [];


/* ==========================================
   Restore Saved Theme
========================================== */

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {

    document.body.classList.add("dark");
    themeToggle.textContent = "☀️";

} else {

    themeToggle.textContent = "🌙";

}


/* ==========================================
   Theme Toggle
========================================== */

themeToggle.addEventListener("click", function () {

    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {

        themeToggle.textContent = "☀️";
        localStorage.setItem("theme", "dark");

    } else {

        themeToggle.textContent = "🌙";
        localStorage.setItem("theme", "light");

    }

});


/* ==========================================
   Update Visible Images
========================================== */

function updateVisibleImages() {

    visibleImages = [...galleryImages].filter(function (image) {

        return !image.parentElement.classList.contains("hidden");

    });

}

updateVisibleImages();


/* ==========================================
   Show Image
========================================== */

function showImage(index) {

    if (index < 0 || index >= visibleImages.length) return;

    lightboxImg.classList.remove("fade");

    lightboxImg.src = visibleImages[index].src;
    lightboxImg.alt = visibleImages[index].alt;
    lightboxCaption.textContent = visibleImages[index].alt;

    void lightboxImg.offsetWidth;

    lightboxImg.classList.add("fade");

}


/* ==========================================
   Open Lightbox
========================================== */

galleryImages.forEach(function (image) {

    image.addEventListener("click", function () {

        updateVisibleImages();

        currentIndex = visibleImages.indexOf(image);

        if (currentIndex === -1) return;

        lightbox.style.display = "flex";

        showImage(currentIndex);

    });

});


/* ==========================================
   Close Lightbox
========================================== */

closeBtn.addEventListener("click", function () {

    lightbox.style.display = "none";

});


/* ==========================================
   Next Image
========================================== */

nextBtn.addEventListener("click", function () {

    currentIndex++;

    if (currentIndex >= visibleImages.length) {

        currentIndex = 0;

    }

    showImage(currentIndex);

});


/* ==========================================
   Previous Image
========================================== */

prevBtn.addEventListener("click", function () {

    currentIndex--;

    if (currentIndex < 0) {

        currentIndex = visibleImages.length - 1;

    }

    showImage(currentIndex);

});


/* ==========================================
   Keyboard Navigation
========================================== */

document.addEventListener("keydown", function (event) {

    if (lightbox.style.display === "flex") {

        if (event.key === "ArrowRight") {

            nextBtn.click();

        }

        if (event.key === "ArrowLeft") {

            prevBtn.click();

        }

        if (event.key === "Escape") {

            lightbox.style.display = "none";

        }

    }

});


/* ==========================================
   Close When Clicking Outside Image
========================================== */

lightbox.addEventListener("click", function (event) {

    if (event.target === lightbox) {

        lightbox.style.display = "none";

    }

});


/* ==========================================
   Image Filters
========================================== */

filterButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        // Active button
        filterButtons.forEach(function (btn) {

            btn.classList.remove("active");

        });

        button.classList.add("active");

        // Selected category
        const filter = button.dataset.filter;

        galleryItems.forEach(function (item) {

            const shouldShow =
                filter === "all" ||
                item.dataset.category === filter;

            if (shouldShow) {

                item.classList.remove("hidden");

                requestAnimationFrame(function () {

                    item.classList.remove("hide");

                });

            } else {

                item.classList.add("hide");

                setTimeout(function () {

                    item.classList.add("hidden");

                    updateVisibleImages();

                }, 300);

            }

        });

        updateVisibleImages();

    });

});