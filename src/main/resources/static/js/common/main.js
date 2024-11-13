let slideIndex = 0; // 슬라이드 인덱스를 0부터 시작
const slidesContainer = document.querySelector('.slides');
const totalSlides = document.querySelectorAll('.slide').length;
const progressBar = document.querySelector('.progress-bar');
let slideTimer = null;


// 슬라이드 전환 함수
function showSlides() {
  slideIndex++;
  slidesContainer.style.transition = 'transform 6s ease-in-out'; // 전환 시간은 6초 동안 유지
  slidesContainer.style.transform = `translateX(-${slideIndex * 100}vw)`; // 다음 슬라이드로 이동

  // 마지막 슬라이드(복사본)에 도달했을 때 첫 번째 슬라이드로 자연스럽게 이동 처리
  if (slideIndex === totalSlides - 1) {
    setTimeout(() => {
      slidesContainer.style.transition = 'none'; // 트랜지션 없이 즉시 이동
      slideIndex = 0; // 첫 번째 슬라이드로 인덱스를 변경
      slidesContainer.style.transform = `translateX(0vw)`; // 첫 번째 슬라이드로 이동

      // 트랜지션을 다시 활성화하기 위해 짧은 지연 후 적용
      setTimeout(() => {
        slidesContainer.style.transition = 'transform 6s ease-in-out';
      }, 30);
    }, 6000); // 마지막 슬라이드에서 첫 번째 슬라이드로 전환 시 6초 대기
  }

  // 각 슬라이드 유지 시간 5초 설정
  setTimeout(showSlides, 11000); // 6초 이동 + 5초 유지 후 다음 슬라이드 전환
}

// ---------------------------------------------------------------------------------------------------

// 진행 상태 업데이트 함수 (슬라이드 전환 시에만 업데이트)
function updateProgressBar(duration = 1000) {
  let progressPercentage = 0;

  // 진행 상태 바의 너비 계산
  if (slideIndex === totalSlides) {
      progressPercentage = 100; // 마지막 슬라이드일 때 진행 상태 바가 꽉 차게 설정
  } else {
      progressPercentage = ((slideIndex) / totalSlides) * 100;
  }

  // 진행 상태 바의 너비를 업데이트하고 부드러운 트랜지션 적용
  progressBar.style.width = `${progressPercentage}%`;
  progressBar.style.backgroundColor = '#5e7c71'; // 진행 상태 바에 색상 채우기
  progressBar.style.transition = `width ${duration}ms ease-in-out`; // 트랜지션 지속 시간을 매개변수로 받아 처리
}

// 이전/다음 버튼으로 슬라이드 이동 시 진행 상태 업데이트
function moveSlide(n) {
  slideIndex = (slideIndex + n + totalSlides) % totalSlides;

  // 슬라이드 이동 애니메이션 설정
  slidesContainer.style.transition = 'transform 1s ease-in-out'; // 버튼 클릭 시 1초 동안 이동
  slidesContainer.style.transform = `translateX(-${slideIndex * 100}vw)`;

  // 진행 상태 바 업데이트 (버튼 클릭 시 트랜지션 시간에 맞춰 설정)
  updateProgressBar(1000);

  // 다음 슬라이드 자동 이동 타이머 초기화 및 재설정
  clearTimeout(slideTimer);
  slideTimer = setTimeout(showSlides, 6000); // 6초 후 자동으로 다음 슬라이드로 이동
}

// 인디케이터로 특정 슬라이드 이동 시 진행 상태 업데이트
function goToSlide(index) {
  slideIndex = index;
  slidesContainer.style.transition = 'transform 1s ease-in-out';
  slidesContainer.style.transform = `translateX(-${slideIndex * 100}vw)`;
  updateProgressBar(1000); // 진행 상태 업데이트 (트랜지션 시간에 맞춰 설정)

  // 다음 슬라이드 자동 이동 타이머 초기화 및 재설정
  clearTimeout(slideTimer);
  slideTimer = setTimeout(showSlides, 6000);
}

// 자동 슬라이드 전환 함수
function showSlides() {
  if (slideIndex === totalSlides - 1) {
    // 마지막 슬라이드에서 첫 번째 슬라이드로 자연스럽게 전환하기 위해 애니메이션 설정
    slidesContainer.style.transition = 'transform 1s ease-in-out';
    slidesContainer.style.transform = `translateX(-${slideIndex * 100}vw)`;
    updateProgressBar(1000); // 마지막 슬라이드에서 진행 상태바를 채움
    setTimeout(() => {
      slidesContainer.style.transition = 'none';
      slideIndex = 0;
      slidesContainer.style.transform = `translateX(0vw)`;
      setTimeout(() => {
        slidesContainer.style.transition = 'transform 1s ease-in-out';
      }, 20); // 깜빡거림을 방지하기 위해 약간의 지연 시간을 추가
    }, 1000);
  } else {
    slideIndex = (slideIndex + 1) % totalSlides;
    slidesContainer.style.transition = 'transform 1s ease-in-out';
    slidesContainer.style.transform = `translateX(-${slideIndex * 100}vw)`;
    updateProgressBar(6000); // 자동 슬라이드 전환 시 진행 상태바의 트랜지션 시간도 6초로 설정
  }

  // 다음 슬라이드 자동 이동 타이머 설정
  clearTimeout(slideTimer);
  slideTimer = setTimeout(showSlides, 6000); // 6초 후 자동으로 다음 슬라이드로 이동
}

// 페이지 로드 시 초기 슬라이드 표시
document.addEventListener("DOMContentLoaded", function () {
  slideIndex = 0;
  updateProgressBar(0); // 초기 진행 상태 설정 (트랜지션 없이 바로 설정)
  progressBar.style.width = '0%'; // 초기 상태에서 진행 바가 0%로 설정되도록 보장
  slideTimer = setTimeout(showSlides, 6000); // 첫 슬라이드 시작 시 6초 대기 후 전환
});