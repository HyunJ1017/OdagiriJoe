const slider = document.querySelector('.slider');
const slides = document.querySelectorAll('.slide');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
let currentIndex = 0;

function showSlide(index) {
  slider.style.transform = `translateX(${-index * 100}%)`;
}

prevButton.addEventListener('click', () => {
  currentIndex = (currentIndex > 0) ? currentIndex - 1 : slides.length - 1;
  showSlide(currentIndex);
});

nextButton.addEventListener('click', () => {
  currentIndex = (currentIndex < slides.length - 1) ? currentIndex + 1 : 0;
  showSlide(currentIndex);
});

// -------------------------------------------------------------------------------------