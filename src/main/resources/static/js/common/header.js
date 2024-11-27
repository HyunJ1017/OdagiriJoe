document.addEventListener('DOMContentLoaded', function () {

  // 사이드 메뉴 기능을 위한 요소 가져오기
  const sideMenu = document.getElementById('side-menu');
  const menuBtn = document.querySelector('#menu-icon');
  const closeBtn = document.querySelector('.close-icon');

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
    console.log("$");
    console.log(sideMenu);

    if (sideMenu.classList.contains('open')) sideMenu.classList.remove('open');
    else sideMenu.classList.add('open');
  }

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

/* 검색 */
document.addEventListener('DOMContentLoaded', () => {
  // 검색 아이콘과 특정 검색 섹션 가져오기
  const searchIcon = document.getElementById('search-icon');
  const searchSection = document.getElementById('search-section');

  // 알림 관련 DOM 요소 가져오기
  const notificationSection = document.getElementById('notification-section');

  // 검색 아이콘 클릭 이벤트
  searchIcon.addEventListener('click', () => {
    // 검색 섹션 표시/숨김 상태 토글
    if (searchSection.style.display === 'none' || searchSection.style.display === '') {
      searchSection.style.display = 'block'; // 검색창 보이기
      notificationSection.style.display = 'none'; // 알림창 닫기
    } else {
      searchSection.style.display = 'none'; // 검색창 숨기기
    }
  });
});

document.addEventListener('DOMContentLoaded', () => {
  // 검색 버튼과 검색 입력 필드 가져오기
  const searchBtn = document.getElementById('searchBtn');
  const queryInput = document.getElementById('query');

  // 검색 버튼 클릭 이벤트
  searchBtn.addEventListener('click', (event) => {
    event.preventDefault(); // 기본 버튼 동작 방지

    // 검색어 가져오기
    const query = queryInput.value.trim();

    if (query) {
      // 검색 결과 페이지로 이동 (URL이 /search로 시작)
      window.location.href = `/main/search?query=${encodeURIComponent(query)}`;
    } else {
      alert('검색어를 입력해주세요.'); // 검색어가 비어 있을 때 경고
    }
  });
});


// ----------------------------------------------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  const notificationIcon = document.getElementById('notification-icon'); // 알림 아이콘
  const notificationSection = document.getElementById('notification-section'); // 알림 섹션
  const notificationList = document.querySelector(".notification-list"); // 알림 목록

  // 알림 아이콘 클릭 이벤트 - 알림 섹션 표시/숨기기
  notificationIcon.addEventListener('click', () => {
    // 알림 섹션 토글
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
function showNotification(message) {
  const popup = document.getElementById('notification-popup'); // 팝업 요소 선택

  // 알림 메시지 설정
  popup.textContent = message;

  // 팝업 표시
  popup.classList.add('show');
  popup.classList.remove('hide');
  popup.style.display = 'block';

  // 3초 후 팝업 숨김
  setTimeout(() => {
    popup.classList.add('hide');
    popup.classList.remove('show');
    setTimeout(() => {
      popup.style.display = 'none'; // 완전히 숨김 처리
    }, 300); // CSS transition 완료 후 실행
  }, 3000); // 3초 동안 표시
}

// 예시: SSE 또는 WebSocket에서 알림 수신 시 호출
document.addEventListener('DOMContentLoaded', () => {
  // SSE 예제
  const eventSource = new EventSource('/notification/sse-endpoint'); // 서버의 SSE 엔드포인트

  eventSource.onmessage = (event) => {
    const data = JSON.parse(event.data);
    const notificationCount = document.querySelector('.notification-count');

    // 알림 개수 업데이트
    notificationCount.textContent = data.notiCount || '♥ 0';
    notificationCount.style.display = 'inline-block';

    // 실시간 알림 팝업 표시
    showNotification(data.message); // 서버로부터 받은 메시지를 팝업에 표시
  };

  eventSource.onerror = () => {
    console.error('SSE 연결 실패');
  };
});

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

// 비동기로 알림 목록 조회 및 화면 표시// 날짜 포맷 함수
function formatNotificationDate(dateString) {
  const notificationDate = new Date(dateString); // 알림 날짜
  const now = new Date(); // 현재 날짜
  const timeDiff = now - notificationDate; // 밀리초 단위 시간 차이
  const oneDay = 24 * 60 * 60 * 1000; // 1일 (밀리초 단위)
  const oneHour = 60 * 60 * 1000; // 1시간 (밀리초 단위)
  const oneMinute = 60 * 1000; // 1분 (밀리초 단위)
  const oneSecond = 1000; // 1초 (밀리초 단위)

  // 1분 이내
  if (timeDiff < oneMinute) {
    const secondsAgo = Math.floor(timeDiff / oneSecond); // 초 단위 차이
    return secondsAgo === 0 ? "방금 전" : `${secondsAgo}초 전`;
  }

  // 1시간 이내
  if (timeDiff < oneHour) {
    const minutesAgo = Math.floor(timeDiff / oneMinute); // 분 단위 차이
    return `${minutesAgo}분 전`;
  }

  // 24시간 이내
  if (timeDiff < oneDay) {
    const hoursAgo = Math.floor(timeDiff / oneHour); // 시간 단위 차이
    return `${hoursAgo}시간 전`;
  }

  // 일주일 이내
  const daysAgo = Math.floor(timeDiff / oneDay); // 일 단위 차이
  if (daysAgo <= 7) {
    return `${daysAgo}일 전`;
  }

  // 일주일 이상 (날짜만 표시)
  const year = notificationDate.getFullYear();
  const month = (notificationDate.getMonth() + 1).toString().padStart(2, '0'); // 월
  const day = notificationDate.getDate().toString().padStart(2, '0'); // 일
  return `${year}-${month}-${day}`; // "YYYY-MM-DD" 형식으로 반환
}


// 비동기로 알림 목록 조회 및 화면 표시
const selectNotificationList = () => {
  if (!notificationLoginCheck) return; // 로그인이 안 된 경우 종료

  fetch("/notification/list") // 서버로부터 알림 목록 조회
    .then((response) => {
      if (response.ok) return response.json(); // 성공 시 JSON 데이터를 파싱
      throw new Error("알림 목록 조회 실패");
    })
    .then((notifications) => {
      const notificationList = document.querySelector(".notification-list");
      notificationList.innerHTML = ""; // 기존 알림 초기화

      notifications.forEach((data) => {
        const notiItem = document.createElement("li"); // 알림 항목 요소 생성
        notiItem.className = "notification-item";

        // 알림 내용
        const notiContent = document.createElement("div");
        notiContent.className = "notification-content";
        notiContent.innerText = data.notiContent;

        // 경매/업로드 상태
        const notiType = document.createElement("div");
        notiType.className = "notification-type";
        notiType.innerText = data.notiType;

        // 날짜와 시간
        const notiDate = document.createElement("div");
        notiDate.className = "notification-date";
        notiDate.innerText = formatNotificationDate(data.notiDate); // 날짜 포맷팅 함수 사용

        // 삭제 버튼
        const notiDelete = document.createElement("button");
        notiDelete.className = "notification-delete";
        notiDelete.innerHTML = "&times;"; // 버튼 표시
        notiDelete.addEventListener("click", () => {
          // 삭제 요청
          fetch(`/notification/delete/${data.notiNo}`, { method: "DELETE" })
            .then((response) => {
              if (!response.ok) throw new Error("알림 삭제 실패");
              notiItem.remove(); // 삭제된 항목 제거
              readCheck(); // 읽지 않은 알림 개수 갱신
            })
            .catch(console.error);
        });

        // 알림 클릭 시 해당 경로로 이동
        notiContent.addEventListener("click", () => {
          location.href = data.notiUrl; // 알림 경로로 이동
        });

        // 구성 순서: 내용 -> 경매/업로드 상태 -> 날짜/시간 -> 삭제 버튼
        notiItem.append(notiContent, notiType, notiDate, notiDelete);
        notificationList.appendChild(notiItem);
      });
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
