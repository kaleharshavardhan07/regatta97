const images = document.querySelectorAll(".card img");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const closeBtn = document.querySelector(".close");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

let currentIndex = 0;

// Open Lightbox
function openLightbox(index) {
    currentIndex = index;
    lightbox.style.display = "flex";
    lightboxImg.src = images[currentIndex].src;
    document.body.classList.add("lightbox-active");
    document.querySelector(".page-bg").style.backgroundImage = `url(${images[currentIndex].src})`;
}

// Close Lightbox
function closeLightbox() {
    lightbox.style.display = "none";
    document.body.classList.remove("lightbox-active");
}

// Navigate Images
function navigateImage(step) {
    currentIndex = (currentIndex + step + images.length) % images.length;
    lightboxImg.src = images[currentIndex].src;
    document.querySelector(".page-bg").style.backgroundImage = `url(${images[currentIndex].src})`;
}

// Add Event Listeners
images.forEach((img, index) => {
    img.addEventListener("click", () => openLightbox(index));
});

closeBtn.addEventListener("click", closeLightbox);
prevBtn.addEventListener("click", () => navigateImage(-1));
nextBtn.addEventListener("click", () => navigateImage(1));

// Close Lightbox on Clicking Outside Image
lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
});

// Keyboard Navigation
document.addEventListener("keydown", (e) => {
    if (lightbox.style.display === "flex") {
        if (e.key === "ArrowLeft") navigateImage(-1);
        if (e.key === "ArrowRight") navigateImage(1);
        if (e.key === "Escape") closeLightbox();
    }
});


