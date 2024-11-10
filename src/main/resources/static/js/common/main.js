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

// 선택적으로 사용할 수 있는 JavaScript 코드
document.addEventListener('DOMContentLoaded', function () {
  const navItems = document.querySelectorAll('.nav-item');
  const overlay = document.createElement('div');
  overlay.className = 'nav-overlay';
  document.body.appendChild(overlay);

  // 드롭다운 메뉴 표시 시 오버레이 표시
  navItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
      overlay.classList.add('active');
    });

    item.addEventListener('mouseleave', () => {
      overlay.classList.remove('active');
    });
  });

  // 드롭다운 메뉴 접근성 개선
  navItems.forEach(item => {
    const link = item.querySelector('a');
    const dropdown = item.querySelector('.dropdown');

    if (link && dropdown) {
      link.addEventListener('focus', () => {
        closeAllDropdowns();
        dropdown.style.opacity = '1';
        dropdown.style.visibility = 'visible';
        dropdown.style.transform = 'translateY(0)';
      });
    }
  });

  // 모든 드롭다운 메뉴 닫기
  function closeAllDropdowns() {
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
      dropdown.style.opacity = '0';
      dropdown.style.visibility = 'hidden';
      dropdown.style.transform = 'translateY(10px)';
    });
  }

  // 포커스가 메뉴를 벗어났을 때 드롭다운 닫기
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-item')) {
      closeAllDropdowns();
    }
  });
});