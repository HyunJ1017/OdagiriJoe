document.addEventListener('DOMContentLoaded', function () {
  // 사이드 메뉴 기능을 위한 요소 가져오기
  const sideMenu = document.getElementById('side-menu');
  const menuBtn = document.querySelector('#menu-icon');
  const closeBtn = document.querySelector('.close-icon');

  // 검색 및 알림 섹션 관련 요소 가져오기
  const searchSection = document.getElementById('search-section');
  const notificationSection = document.getElementById('notification-section');

  // 드롭다운 기능 요소
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

  // 사이드 메뉴 가시성 토글 함수
  function toggleMenu() {
    if (sideMenu.classList.contains('open')) sideMenu.classList.remove('open');
    else {
      // 사이드 메뉴를 열 때 다른 창 닫기
      searchSection.style.display = 'none';
      notificationSection.style.display = 'none';
      sideMenu.classList.add('open');
    }
  }

  // 사이드 메뉴 열기/닫기
  menuBtn.addEventListener("click", toggleMenu);
  closeBtn.addEventListener("click", toggleMenu);

  // 문서의 다른 부분 클릭 시 사이드 메뉴 닫기
  document.addEventListener('click', (event) => {
    if (sideMenu.classList.contains('open')) {
      const clickedInsideMenu = sideMenu.contains(event.target);
      const clickedMenuBtn = menuBtn && menuBtn.contains(event.target);
      if (!clickedInsideMenu && !clickedMenuBtn) {
        sideMenu.classList.remove('open');
      }
    }
  });
});

// ----------------------------------------------------------------------------------------------------------------
/* 검색 섹션 */
document.addEventListener('DOMContentLoaded', () => {
  const searchIcon = document.getElementById('search-icon');
  const searchSection = document.getElementById('search-section');
  const searchBtn = document.getElementById('searchBtn');
  const queryInput = document.getElementById('query');
  const sideMenu = document.getElementById('side-menu');
  const notificationSection = document.getElementById('notification-section');

  // 검색 아이콘 클릭 이벤트
  searchIcon.addEventListener('click', () => {
    // 검색창 열기/닫기
    if (searchSection.style.display === 'none' || searchSection.style.display === '') {
      searchSection.style.display = 'block'; // 검색창 열기
      notificationSection.style.display = 'none'; // 알림창 닫기
      sideMenu.classList.remove('open'); // 사이드바 닫기
    } else {
      searchSection.style.display = 'none'; // 검색창 닫기
    }
  });

  // 검색 버튼 클릭 이벤트
  searchBtn.addEventListener('click', (event) => {
    event.preventDefault(); // 기본 버튼 동작 방지
    const query = queryInput.value.trim();

    if (query) {
      window.location.href = `/main/search?query=${encodeURIComponent(query)}`; // 검색 결과 페이지로 이동
    } else {
      alert('검색어를 입력해주세요.'); // 검색어가 비어 있을 때 경고
    }
  });
});

// ----------------------------------------------------------------------------------------------------------------
/* 알림 섹션 */
document.addEventListener('DOMContentLoaded', () => {
  const notificationIcon = document.getElementById('notification-icon'); // 알림 아이콘
  const notificationSection = document.getElementById('notification-section'); // 알림 섹션
  const notificationList = document.querySelector(".notification-list"); // 알림 목록
  const searchSection = document.getElementById('search-section'); // 검색 섹션
  const sideMenu = document.getElementById('side-menu'); // 사이드바

  // 알림 아이콘 클릭 이벤트 - 알림 섹션 표시/숨기기
  notificationIcon.addEventListener('click', () => {
    // 검색창과 사이드바 닫기
    searchSection.style.display = 'none';
    sideMenu.classList.remove('open');

    // 알림 섹션 열기/닫기
    notificationSection.style.display =
      notificationSection.style.display === 'none' || notificationSection.style.display === '' ? 'block' : 'none';

    // 알림 목록 표시/숨기기
    if (!notificationList.classList.contains("notification-show")) {
      selectNotificationList(); // 알림 목록을 비동기로 조회
      notificationList.classList.add("notification-show");
    } else {
      notificationList.classList.remove("notification-show");
    }
  });
});


// SSE(Send Server Events) 연결 함수
const connectSse = () => {
  if (notificationLoginCheck === false) return;

  const eventSource = new EventSource("/notification/noti");

  // 메시지를 받아서 화면에 표시
  eventSource.addEventListener("message", (e) => {
    const data = JSON.parse(e.data);

    const notiCountHeart = document.querySelector(".notification-count");
    notiCountHeart.style.display = "flex";
    notiCountHeart.innerText = data.notiCount;

  });

  eventSource.addEventListener("error", () => {
    console.error("SSE 연결 실패, 재연결 시도...");
    setTimeout(connectSse, 5000); // 5초 후 재연결 시도
  });
};

// 알림 팝업 표시 함수
function updateNotificationCount() {
  const notificationCount = document.querySelector('.notification-count'); // 알림 카운트 요소

  // 현재 알림 개수를 가져오고 +1 증가
  const currentCount = parseInt(notificationCount.textContent) || 0;
  notificationCount.textContent = currentCount + 1;

  // 알림 배지 표시
  notificationCount.style.display = 'inline-block'; // 알림이 있으면 배지를 보이게 함
}

// 알림 전송 함수 (Ajax 사용)
const sendNotification = (type, url, pkNo, content) => {
  if (notificationLoginCheck === false) return; // 로그인이 안 된 경우 종료

  const notification = {
    notiType: type,
    notiUrl: url,
    pkNo: pkNo,
    notiContent: content,
  };

  // POST 요청으로 알림 데이터 전송
  fetch("/notification/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(notification),
  })
    .then((response) => {
      if (!response.ok) throw new Error("알림 전송 실패");
      console.log("알림 전송 성공");
    })
    .catch(console.error);
};


// ------------------------------------------------------------------------------------------------------------------
/* 날짜 함수 */
function formatNotificationDate(dateString) {
  const notificationDate = new Date(dateString);
  const now = new Date();
  const timeDiff = now - notificationDate;
  const oneDay = 24 * 60 * 60 * 1000;
  const oneWeek = 7 * oneDay;
  const oneHour = 60 * 60 * 1000;
  const oneMinute = 60 * 1000;
  const oneSecond = 1000;

  if (timeDiff < oneMinute) {
    const secondsAgo = Math.floor(timeDiff / oneSecond);
    return secondsAgo === 0 ? "방금 전" : `${secondsAgo}초 전`;
  }

  if (timeDiff < oneHour) {
    const minutesAgo = Math.floor(timeDiff / oneMinute);
    return `${minutesAgo}분 전`;
  }

  if (timeDiff < oneDay) {
    const hoursAgo = Math.floor(timeDiff / oneHour);
    return `${hoursAgo}시간 전`;
  }

  if (timeDiff < oneWeek) {
    const daysAgo = Math.floor(timeDiff / oneDay);
    return `${daysAgo}일 전`;
  }

  const weeksAgo = Math.ceil(timeDiff / oneWeek);
  return `${weeksAgo}주 전`;
}

// 알림 데이터를 날짜에 따라 그룹화
function categorizeNotificationDate(dateString) {
  const notificationDate = new Date(dateString);
  const now = new Date();

  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const weekStart = new Date(todayStart);
  weekStart.setDate(todayStart.getDate() - todayStart.getDay());
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

  if (notificationDate >= todayStart) {
    return "오늘";
  } else if (notificationDate >= weekStart) {
    return "이번 주";
  } else if (notificationDate >= monthStart) {
    return "이번 달";
  } else {
    return "이전 활동";
  }
}

// 알림 데이터를 그룹화
function groupNotificationsByDate(notifications) {
  const groupedNotifications = {
    "오늘": [],
    "이번 주": [],
    "이번 달": [],
    "이전 활동": []
  };

  notifications.forEach((notification) => {
    const category = categorizeNotificationDate(notification.notiDate);
    groupedNotifications[category].push(notification);
  });

  return groupedNotifications;
}

// 알림 데이터를 화면에 렌더링
function renderNotifications(groupedNotifications) {
  const notificationList = document.querySelector(".notification-list");
  notificationList.innerHTML = "";

  let isFirstSection = true; // 첫 섹션 여부 확인

  for (const category in groupedNotifications) {
    if (!isFirstSection) {
      // 구분선 추가 (첫 섹션이 아닌 경우에만)
      const separator = document.createElement("div");
      separator.className = "custom-line";
      separator.style.borderTop = "1px solid #ccc"; // 구분선 스타일
      separator.style.margin = "10px 0";
      notificationList.appendChild(separator);
    }

    // 섹션 헤더 추가
    const sectionHeader = document.createElement("h3");
    sectionHeader.textContent = category;
    sectionHeader.style.margin = "10px 0"; // 헤더 간격 추가
    notificationList.appendChild(sectionHeader);

    groupedNotifications[category].forEach((data) => {
      const notiItem = document.createElement("li");
      notiItem.className = "notification-item";

      const notiContent = document.createElement("div");
      notiContent.className = "notification-content";
      notiContent.innerText = data.notiContent;

      const notiType = document.createElement("div");
      notiType.className = "notification-type";
      notiType.innerText = data.notiType;

      const notiDate = document.createElement("div");
      notiDate.className = "notification-date";
      notiDate.innerText = formatNotificationDate(data.notiDate);

      const notiDelete = document.createElement("button");
      notiDelete.className = "notification-delete";
      notiDelete.innerHTML = "&times;";
      notiDelete.addEventListener("click", () => {
        fetch(`/notification/delete/${data.notiNo}`, { method: "DELETE" })
          .then((response) => {
            if (!response.ok) throw new Error("알림 삭제 실패");
            notiItem.remove();
            readCheck();
          })
          .catch(console.error);
      });

      notiContent.addEventListener("click", () => {
        location.href = data.notiUrl;
      });

      notiItem.append(notiContent, notiType, notiDate, notiDelete);
      notificationList.appendChild(notiItem);
    });

    isFirstSection = false; // 첫 섹션 렌더링 후 false로 변경
  }
}

// 서버에서 알림 데이터를 가져와 렌더링
const selectNotificationList = () => {
  if (!notificationLoginCheck) return;

  fetch("/notification/list")
    .then((response) => {
      if (response.ok) return response.json();
      throw new Error("알림 목록 조회 실패");
    })
    .then((notifications) => {
      const groupedNotifications = groupNotificationsByDate(notifications);
      renderNotifications(groupedNotifications);
    })
    .catch(console.error);
};

// 읽지 않은 알림 개수 조회 및 화면 업데이트
const readCheck = () => {
  fetch("/notification/readCheck")
    .then((response) => {
      if (response.ok) return response.text();
      throw new Error("알림 개수 조회 실패");
    })
    .then((count) => {
      const notificationCount = document.querySelector(".notification-count");
      notificationCount.innerText = count;

      const notificationIcon = document.querySelector(".notification-icon");
      if (count > 0) {
        notificationIcon.classList.add("fa-solid"); // 읽지 않은 알림 표시
        notificationIcon.classList.remove("fa-regular");
      } else {
        notificationIcon.classList.remove("fa-solid"); // 모든 알림이 읽힌 상태
        notificationIcon.classList.add("fa-regular");
      }
    })
    .catch(console.error);
};

// ------------------------------------------------------------------------
const sendFollowedArtistNotification = (follower, content) => {
  const notification = {
    notiContent: content,
    notiType: "F",
    sendMemberNo: follower
  };

  fetch("/notification/followedArtistUpload", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(notification)
  })
    .then(response => {
      if (!response.ok) throw new Error("팔로우 알림 전송 실패");
      console.log("팔로우 알림 전송 성공");
    })
    .catch(err => console.error(err));
};
