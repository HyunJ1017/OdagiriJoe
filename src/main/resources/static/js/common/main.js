// 현재 슬라이드 인덱스 초기화
let slideIndex = 0;

// 슬라이드 관련 DOM 요소 선택
const slidesContainer = document.querySelector('.main-header'); // 슬라이드 컨테이너
const slides = document.querySelectorAll('.main-item'); // 모든 슬라이드 요소
const totalSlides = slides.length; // 슬라이드의 총 개수
const progressBar = document.querySelector('.progress-bar'); // 진행 바 요소

// 슬라이드 자동 전환 타이머
let slideTimer = null;

// 슬라이드를 자동으로 전환하는 함수
function showSlides() {
  slideIndex++; // 다음 슬라이드로 이동

  slideIndex = slideIndex >= totalSlides ? 0 : slideIndex;
  // 슬라이드 이동 애니메이션 설정
  slidesContainer.style.transition = 'transform 6s ease-in-out'; // 부드러운 애니메이션 설정
  slidesContainer.style.transform = `translateX(-${slideIndex * (slidesContainer.clientWidth / 4)}px)`; // 슬라이드 이동

  // 마지막 슬라이드에서 첫 슬라이드로 넘어갈 때
  if (slideIndex === totalSlides) {
    setTimeout(() => {
      slidesContainer.style.transition = 'none'; // 애니메이션 효과 제거
      slideIndex = 0; // 첫 슬라이드로 이동
      slidesContainer.style.transform = `translateX(0vw)`; // 위치 초기화

      setTimeout(() => {
        slidesContainer.style.transition = 'transform 6s ease-in-out'; // 애니메이션 효과 복원
      }, 50); // 50ms 대기 후 애니메이션 복원
    }, 6000); // 6초 대기 후 첫 슬라이드로 돌아감
  }

  // 진행 바 업데이트
  updateProgressBar(6000);

  // 다음 슬라이드로 넘어가기 위한 타이머 설정
  slideTimer = setTimeout(showSlides, 11000); // 11초 간격으로 호출
}

// 진행 바를 업데이트하는 함수
function updateProgressBar(duration = 1000) {
  const progressPercentage = ((slideIndex + 1) / totalSlides) * 100; // 현재 슬라이드의 진행률 계산
  progressBar.style.width = `${progressPercentage}%`; // 진행 바의 너비를 진행률에 맞게 설정
  progressBar.style.transition = `width ${duration}ms ease-in-out`; // 진행 바의 애니메이션 설정
}

// 이전/다음 버튼으로 슬라이드를 이동시키는 함수
function moveMainSlide(n) {
    // 슬라이드 인덱스 업데이트 (모듈로 연산으로 순환)
    slideIndex = (slideIndex + n + totalSlides) % totalSlides;
    slideIndex = slideIndex >= totalSlides ? 0 : slideIndex;
  
    // 슬라이드 이동 애니메이션 설정
    slidesContainer.style.transition = 'transform 1s ease-in-out'; // 빠른 애니메이션 설정
    slidesContainer.style.transform = `translateX(-${slideIndex * slidesContainer.clientWidth / 4}px)`; // 슬라이드 이동
  
  // 진행 바 업데이트
  updateProgressBar(1000);

  // 자동 슬라이드 타이머 초기화
  clearTimeout(slideTimer); // 기존 타이머 초기화
  slideTimer = setTimeout(showSlides, 6000); // 새로운 타이머 설정
}

// 특정 슬라이드로 바로 이동시키는 함수
function goToSlide(index) {
  slideIndex = index; // 이동할 슬라이드 인덱스 설정

  // 슬라이드 이동 애니메이션 설정
  slidesContainer.style.transition = 'transform 1s ease-in-out'; // 빠른 애니메이션 설정
  slidesContainer.style.transform = `translateX(-${slideIndex * slidesContainer.clientWidth * 100}}vw)`; // 슬라이드 이동

  // 진행 바 업데이트
  updateProgressBar(1000);

  // 자동 슬라이드 타이머 초기화
  clearTimeout(slideTimer); // 기존 타이머 초기화
  slideTimer = setTimeout(showSlides, 6000); // 새로운 타이머 설정
}



//-------------------------------------------------------------
// 현재 슬라이드 인덱스 초기화
let auctionsSlideIndex = 0;

// 슬라이드 관련 DOM 요소 선택
const auctionSlidesContainer = document.querySelector('.auctions-slide'); // 슬라이드 컨테이너
const auctionSlides = document.querySelectorAll('.auctions-container'); // 모든 슬라이드 요소
const auctionTotalSlides = auctionSlides.length; // 슬라이드의 총 개수
const auctionsProgressBar = document.querySelector('.auctions-progress-bar'); // 진행 바 요소

// 슬라이드 자동 전환 타이머
let auctionSlideTimer = null;

// 슬라이드를 자동으로 전환하는 함수
function auctionShowSlides() {
  auctionsSlideIndex++; // 다음 슬라이드로 이동

  auctionsSlideIndex = auctionsSlideIndex >= auctionTotalSlides ? 0 : auctionsSlideIndex;

  // 슬라이드 컨테이너를 이동
  auctionSlidesContainer.style.transition = 'transform 6s ease-in-out'; // 부드러운 애니메이션 설정
  auctionSlidesContainer.style.transform = `translateX(-${auctionsSlideIndex * auctionSlidesContainer.clientWidth}px)`; // 슬라이드 이동

  // 마지막 슬라이드에서 첫 슬라이드로 넘어갈 때
  if (auctionsSlideIndex === auctionTotalSlides) {
    setTimeout(() => {
      auctionSlidesContainer.style.transition = 'none'; // 애니메이션 효과 제거
      auctionsSlideIndex = 0; // 첫 슬라이드로 이동
      auctionSlidesContainer.style.transform = `translateX(0vw)`; // 위치 초기화

      setTimeout(() => {
        auctionSlidesContainer.style.transition = 'transform 6s ease-in-out'; // 애니메이션 효과 복원
      }, 50); // 50ms 대기 후 애니메이션 복원
    }, 6000); // 6초 대기 후 첫 슬라이드로 돌아감
  }

  // 진행 바 업데이트
  updateAuctionsProgressBar(6000);

  // 다음 슬라이드로 넘어가기 위한 타이머 설정
  auctionSlideTimer = setTimeout(auctionShowSlides, 11000); // 11초 간격으로 호출
}

// 진행 바를 업데이트하는 함수
function updateAuctionsProgressBar(duration = 1000) {
  const auctionsProgressPercentage = ((auctionsSlideIndex + 1) / auctionTotalSlides) * 100; // 현재 슬라이드의 진행률 계산
  auctionsProgressBar.style.width = `${auctionsProgressPercentage}%`; // 진행 바의 너비를 진행률에 맞게 설정
  auctionsProgressBar.style.transition = `width ${duration}ms ease-in-out`; // 진행 바의 애니메이션 설정
}

// 이전/다음 버튼으로 슬라이드 이동
function moveSlide(n) {

  // 슬라이드 인덱스 업데이트 (모듈로 연산으로 순환)
  auctionsSlideIndex = (auctionsSlideIndex + n + auctionTotalSlides) % auctionTotalSlides;
  auctionsSlideIndex = auctionsSlideIndex >= auctionTotalSlides ? 0 : auctionsSlideIndex;

  // 슬라이드 이동 애니메이션 설정
  auctionSlidesContainer.style.transition = 'transform 1s ease-in-out'; // 빠른 애니메이션 설정
  auctionSlidesContainer.style.transform = `translateX(-${auctionsSlideIndex * auctionSlidesContainer.clientWidth}px)`; // 슬라이드 이동

  // 진행 바 업데이트
  updateAuctionsProgressBar(1000);

  // 자동 슬라이드 타이머 초기화
  clearTimeout(auctionSlideTimer); // 기존 타이머 초기화
  auctionSlideTimer = setTimeout(auctionShowSlides, 6000); // 새로운 타이머 설정
}

// 특정 슬라이드로 이동하는 함수
function goToSlide(index) {
  auctionsSlideIndex = index; // 이동할 슬라이드 인덱스 설정

  // 슬라이드 이동 애니메이션 설정
  auctionSlidesContainer.style.transition = 'transform 1s ease-in-out'; // 빠른 애니메이션 설정
  auctionSlidesContainer.style.transform = `translateX(-${auctionsSlideIndex * auctionSlidesContainer.clientWidth}px)`; // 슬라이드 이동

  // 진행 바 업데이트
  updateAuctionsProgressBar(1000);

  // 자동 슬라이드 타이머 초기화
  clearTimeout(auctionSlideTimer); // 기존 타이머 초기화
  auctionSlideTimer = setTimeout(auctionShowSlides, 6000); // 새로운 타이머 설정
}

// ---------------------------------------------------------------------------------------------------------
// 페이지가 로드되었을 때 초기화
document.addEventListener("DOMContentLoaded", function () {
  slideIndex = 0; // 슬라이드 인덱스 초기화
  updateProgressBar(0); // 진행 바 초기화
  slideTimer = setTimeout(showSlides, 6000); // 6초 후 첫 슬라이드 호출
  
  auctionsSlideIndex = 0; // 슬라이드 인덱스 초기화
  updateAuctionsProgressBar(0); // 진행 바 초기화
  auctionSlideTimer = setTimeout(auctionShowSlides, 6000); // 6초 후 첫 슬라이드 호출
});

// ---------------------------------------------------------------------------------------------------------
function hideLoader(imgElement) {
  const loader = imgElement.nextElementSibling; // loader div
  loader.style.display = 'none'; // 로딩 이미지 숨기기
  imgElement.style.display = 'block'; // 실제 이미지 보이기
}

