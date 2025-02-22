class TouchSlider {
  constructor() {
    this.slider = document.querySelector('.slider');
    this.autoSlideInterval = 5000;
    this.autoSlideTimer = null;
    this.touchStartX = 0;
    this.touchEndX = 0;
    this.minSwipeDistance = 50;
    this.isAnimating = false;

    this.initializeEvents();
    this.startAutoSlide();
  }

  initializeEvents() {
    // Touch events
    this.slider.addEventListener('touchstart', (e) => this.handleTouchStart(e), false);
    this.slider.addEventListener('touchmove', (e) => this.handleTouchMove(e), false);
    this.slider.addEventListener('touchend', (e) => this.handleTouchEnd(e), false);

    // Click events
    document.addEventListener('click', (e) => this.handleClick(e), false);

    // Hover events for desktop
    this.slider.addEventListener('mouseenter', () => this.pauseAutoSlide(), false);
    this.slider.addEventListener('mouseleave', () => this.startAutoSlide(), false);

    // Visibility change
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.pauseAutoSlide();
      } else {
        this.startAutoSlide();
      }
    });
  }

  handleTouchStart(e) {
    this.touchStartX = e.touches[0].clientX;
    this.pauseAutoSlide();
  }

  handleTouchMove(e) {
    e.preventDefault();
    this.touchEndX = e.touches[0].clientX;
  }

  handleTouchEnd() {
    const swipeDistance = this.touchEndX - this.touchStartX;
    
    if (Math.abs(swipeDistance) > this.minSwipeDistance && !this.isAnimating) {
      if (swipeDistance > 0) {
        this.prevSlide();
      } else {
        this.nextSlide();
      }
    }
    
    this.startAutoSlide();
  }

  handleClick(e) {
    if (this.isAnimating) return;

    if (e.target.matches('.next')) {
      this.nextSlide();
    } else if (e.target.matches('.prev')) {
      this.prevSlide();
    } else if (e.target.closest('.item')) {
      this.handleItemClick(e.target.closest('.item'));
    }
  }

  handleItemClick(clickedItem) {
    const items = Array.from(document.querySelectorAll('.item'));
    const clickedIndex = items.indexOf(clickedItem);
    
    if (clickedIndex >= 2) {
      this.moveToIndex(clickedIndex);
    }
  }

  moveToIndex(targetIndex) {
    for (let i = 0; i < targetIndex - 1; i++) {
      this.nextSlide();
    }
  }

  nextSlide() {
    if (this.isAnimating) return;
    this.isAnimating = true;
    
    const items = document.querySelectorAll('.item');
    this.slider.append(items[0]);
    
    setTimeout(() => {
      this.isAnimating = false;
    }, 750); // Match transition duration from CSS
  }

  prevSlide() {
    if (this.isAnimating) return;
    this.isAnimating = true;
    
    const items = document.querySelectorAll('.item');
    this.slider.prepend(items[items.length - 1]);
    
    setTimeout(() => {
      this.isAnimating = false;
    }, 750); // Match transition duration from CSS
  }

  startAutoSlide() {
    this.pauseAutoSlide();
    this.autoSlideTimer = setInterval(() => this.nextSlide(), this.autoSlideInterval);
  }

  pauseAutoSlide() {
    if (this.autoSlideTimer) {
      clearInterval(this.autoSlideTimer);
      this.autoSlideTimer = null;
    }
  }
}

// Initialize the slider when the DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new TouchSlider();
});