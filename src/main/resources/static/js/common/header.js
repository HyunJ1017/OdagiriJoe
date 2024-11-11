document.addEventListener('DOMContentLoaded', function () {
  const navItems = document.querySelectorAll('.nav-item');
  const overlay = document.createElement('div');
  overlay.className = 'nav-overlay';
  document.body.appendChild(overlay);

  // 드롭다운 메뉴 표시 시 오버레이 활성화
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
      dropdown.addEventListener('mouseleave', closeAllDropdowns);
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

  // 오버레이 클릭 시 모든 드롭다운 닫기
  overlay.addEventListener('click', closeAllDropdowns);
});

// 사이드 메뉴 열기/닫기 함수
function toggleMenu() {
  const sideMenu = document.getElementById('side-menu');
  if (sideMenu) {
    sideMenu.classList.toggle('open');
  }
}

// 햄버거 아이콘 클릭 시 메뉴 열기/닫기
const menuIcon = document.querySelector('.menu-icon');
if (menuIcon) {
  menuIcon.addEventListener('click', toggleMenu);
}

// 메뉴 외부 클릭 시 메뉴 닫기
window.addEventListener('click', function (event) {
  const sideMenu = document.getElementById('side-menu');
  const menuIcon = document.querySelector('.menu-icon');
  if (sideMenu && menuIcon && !sideMenu.contains(event.target) && event.target !== menuIcon) {
    sideMenu.classList.remove('open');
  }
});

// ESC 키로 메뉴 닫기
window.addEventListener('keydown', function (event) {
  if (event.key === 'Escape') {
    const sideMenu = document.getElementById('side-menu');
    if (sideMenu) {
      sideMenu.classList.remove('open');
    }
  }
});
