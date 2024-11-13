let slideIndex = 0;
const slidesContainer = document.querySelector('.slides');
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length - 1; // 마지막 슬라이드는 복사본이므로 총 슬라이드 수에서 제외
const progressBar = document.querySelector('.progress-bar');
let slideTimer = null;

function showSlides() {
  slideIndex++;
  slidesContainer.style.transition = 'transform 6s ease-in-out';
  slidesContainer.style.transform = `translateX(-${slideIndex * 100}vw)`;

  // 마지막 슬라이드에서 첫 슬라이드로 넘어갈 때
  if (slideIndex === totalSlides) {
    setTimeout(() => {
      slidesContainer.style.transition = 'none';
      slideIndex = 0;
      slidesContainer.style.transform = `translateX(0vw)`;
      setTimeout(() => {
        slidesContainer.style.transition = 'transform 6s ease-in-out';
      }, 50);
    }, 6000);
  }

  updateProgressBar(6000);
  slideTimer = setTimeout(showSlides, 11000); // 다음 슬라이드 전환 시간 설정
}

function updateProgressBar(duration = 1000) {
  const progressPercentage = ((slideIndex % totalSlides) / totalSlides) * 100;
  progressBar.style.width = `${progressPercentage}%`;
  progressBar.style.transition = `width ${duration}ms ease-in-out`;
}

// 이전/다음 버튼으로 슬라이드 이동 시
function moveSlide(n) {
  slideIndex = (slideIndex + n + totalSlides) % totalSlides;
  slidesContainer.style.transition = 'transform 1s ease-in-out';
  slidesContainer.style.transform = `translateX(-${slideIndex * 100}vw)`;
  updateProgressBar(1000);

  clearTimeout(slideTimer);
  slideTimer = setTimeout(showSlides, 6000);
}

// 특정 슬라이드로 이동
function goToSlide(index) {
  slideIndex = index;
  slidesContainer.style.transition = 'transform 1s ease-in-out';
  slidesContainer.style.transform = `translateX(-${slideIndex * 100}vw)`;
  updateProgressBar(1000);

  clearTimeout(slideTimer);
  slideTimer = setTimeout(showSlides, 6000);
}

document.addEventListener("DOMContentLoaded", function () {
  slideIndex = 0;
  updateProgressBar(0);
  slideTimer = setTimeout(showSlides, 6000);
});
