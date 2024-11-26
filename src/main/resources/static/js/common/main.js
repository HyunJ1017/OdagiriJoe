let slideIndex = 0;
// const slidesContainer = document.querySelector('.slides');
const slidesContainer = document.querySelector('.main-header');
// const slides = document.querySelectorAll('.slide');
const slides = document.querySelectorAll('.main-item');
const totalSlides = slides.length; 
const progressBar = document.querySelector('.progress-bar');
let slideTimer = null;


function showSlides() {
  slideIndex++;
  slidesContainer.style.transition = 'transform 6s ease-in-out';
  // slidesContainer.style.transform = `translateX(-${slideIndex * 100}vw)`;

  slidesContainer.style.transform = `translateX(-${slideIndex * (slidesContainer.clientWidth / 4)}px)`;

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
  const progressPercentage = ((slideIndex+1) / totalSlides) * 100;
  progressBar.style.width = `${progressPercentage}%`;
  progressBar.style.transition = `width ${duration}ms ease-in-out`;
}

// 이전/다음 버튼으로 슬라이드 이동 시
function moveSlide(n) {
  slideIndex = (slideIndex + n + totalSlides) % totalSlides;
  slidesContainer.style.transition = 'transform 1s ease-in-out';
  slidesContainer.style.transform = `translateX(-${slideIndex * (slidesContainer.clientWidth / 4)}px)`;
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
  imgDetails.forEach((detail) => {
    const pieceType = detail.getAttribute('data-piece-type');
    const pieceNo = detail.getAttribute('data-piece-no');
    const link = detail.querySelector('a#piece-link');

    // URL 동적 설정
    if (pieceType === '1') {
      link.href = `/piece/onlineDetail?pieceNo=${pieceNo}`;
    } else if (pieceType === '2') {
      link.href = `/auction/auctionDetail?pieceNo=${pieceNo}`;
    }
  });
});

//-------------------------------------------------------------
let auctionsSlideIndex = 0;
const auctionSlidesContainer = document.querySelector('.auctions-slide');
const auctionSlides = document.querySelectorAll('.auctions-container');
const auctionTotalSlides = auctionSlides.length; 
const auctionsProgressBar = document.querySelector('.auctions-progress-bar');
let auctionSlideTimer = null;

function auctionShowSlides() {
  auctionsSlideIndex++;
  auctionSlidesContainer.style.transition = 'transform 6s ease-in-out';

  console.log(auctionsSlideIndex);

  auctionSlidesContainer.style.transform = `translateX(-${auctionsSlideIndex * (auctionSlidesContainer.clientWidth)}px)`;

  // 마지막 슬라이드에서 첫 슬라이드로 넘어갈 때
  if (auctionsSlideIndex === auctionTotalSlides) {
    setTimeout(() => {
      auctionSlidesContainer.style.transition = 'none';
      auctionsSlideIndex = 0;
      auctionSlidesContainer.style.transform = `translateX(0vw)`;
      setTimeout(() => {
        auctionSlidesContainer.style.transition = 'transform 6s ease-in-out';
      }, 50);
    }, 6000);
  }

  updateAuctionsProgressBar(6000);
  auctionSlideTimer = setTimeout(auctionShowSlides, 11000); // 다음 슬라이드 전환 시간 설정
}


function updateAuctionsProgressBar(duration = 1000) {
  const auctionsProgressPercentage = ((auctionsSlideIndex+1) / auctionTotalSlides) * 100;
  auctionsProgressBar.style.width = `${auctionsProgressPercentage}%`;
  auctionsProgressBar.style.transition = `width ${duration}ms ease-in-out`;
}

// 이전/다음 버튼으로 슬라이드 이동 시
function moveSlide(n) {
  auctionsSlideIndex = (auctionsSlideIndex + n + auctionTotalSlides) % auctionTotalSlides;
  auctionSlidesContainer.style.transition = 'transform 1s ease-in-out';
  auctionSlidesContainer.style.transform = `translateX(-${auctionsSlideIndex * (auctionSlidesContainer.clientWidth)}px)`;
  updateAuctionsProgressBar(1000);

  clearTimeout(auctionSlideTimer);
  auctionSlideTimer = setTimeout(auctionShowSlides, 6000);
}


// 특정 슬라이드로 이동
function goToSlide(index) {
  auctionsSlideIndex = index;
  auctionSlidesContainer.style.transition = 'transform 1s ease-in-out';
  auctionSlidesContainer.style.transform = `translateX(-${auctionsSlideIndex * 100}vw)`;
  updateAuctionsProgressBar(1000);

  clearTimeout(auctionSlideTimer);
  auctionSlideTimer = setTimeout(auctionShowSlides, 6000);
}

document.addEventListener("DOMContentLoaded", function () {
  auctionsSlideIndex = 0;
  updateAuctionsProgressBar(0);
  auctionSlideTimer = setTimeout(auctionShowSlides, 6000);
});

