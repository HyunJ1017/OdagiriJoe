/* 알림 섹션 초기화 */
document.addEventListener('DOMContentLoaded', () => {
  const notificationIcon = document.getElementById('notification-icon');
  const notificationSection = document.getElementById('notification-section');
  const notificationList = document.querySelector(".notification-list");
  const searchSection = document.getElementById('search-section');
  const sideMenu = document.getElementById('side-menu');
  console.log(notificationList);

  // 알림 아이콘 클릭 이벤트
  notificationIcon.addEventListener('click', () => {
    // 검색창과 사이드바 닫기
    searchSection.style.display = 'none';
    sideMenu.classList.remove('open');

    // 알림 섹션 열기/닫기
    notificationSection.style.display =
      notificationSection.style.display === 'none' || notificationSection.style.display === '' ? 'block' : 'none';

    // 알림 목록 표시/숨기기
    if (!notificationList.classList.contains("notification-show")) {
      selectNotificationList(); // 비동기로 알림 목록 조회
      notificationList.classList.add("notification-show");
    } else {
      notificationList.classList.remove("notification-show");
    }
  });
});

// 서버로부터 알림을 수신하는 SSE (Server-Sent Events) 연결 함수
const connectSse = () => {
  if (notificationLoginCheck === false) return; // 로그인이 안 된 경우, SSE 연결 중단

  const eventSource = new EventSource("/notification/noti"); // 서버에서 알림 데이터를 수신하기 위한 SSE 연결

  // 서버로부터 메시지를 받아서 화면에 표시
  eventSource.addEventListener("message", (e) => {
    const data = JSON.parse(e.data); // 수신된 데이터를 JSON으로 파싱

    // 알림 카운트 요소 업데이트
    const notiCount = document.querySelector(".notification-count");
    notiCount.style.display = "flex";
    notiCount.innerText = data.notiCount; // 수신된 알림 개수로 업데이트
  });

  // SSE 연결 실패 시 재연결 시도
  eventSource.addEventListener("error", () => {
    console.error("SSE 연결 실패, 재연결 시도...");
    setTimeout(connectSse, 5000); // 5초 후 재연결 시도
  });
};

// 알림 수 업데이트 함수 - 알림 개수를 하나 증가시킴
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
  if (notificationLoginCheck === false) return; // 로그인이 안 된 경우 전송 중단

  // 알림 데이터 구성
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
      if (!response.ok) throw new Error("알림 전송 실패"); // 오류가 있는 경우 예외 발생
      console.log("알림 전송 성공"); // 성공 메시지 로그
    })
    .catch(console.error); // 오류 로그 출력
};

//----------------------------------------------------------------------------------------------------------------

/* 날짜 함수 - 알림 시간을 사람이 읽기 쉽게 변환 */
// 알림 시간을 현재와 비교하여 사람이 읽기 쉬운 형태로 포맷
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

// 알림 데이터를 날짜에 따라 그룹화하여 분류
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

// 알림 데이터를 그룹화하여 날짜별로 분류
function groupNotificationsByDate(notifications) {
  const groupedNotifications = {
    "오늘": [],
    "이번 주": [],
    "이번 달": [],
    "이전 활동": [],
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
      separator.style.borderTop = "1px solid #ccc";
      separator.style.margin = "10px 0";
      notificationList.appendChild(separator);
    }

    // 섹션 헤더 추가
    const sectionHeader = document.createElement("h3");
    sectionHeader.textContent = category;
    sectionHeader.style.margin = "10px 0";
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

      // 알림 삭제 버튼
      const notiDelete = document.createElement("button");
      notiDelete.className = "notification-delete";
      notiDelete.innerHTML = "&times;";
      notiDelete.addEventListener("click", () => {
        console.log(`삭제 요청: 알림 번호 ${data.notiNo}`);
        fetch(`/notification/delete/${data.notiNo}`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        })
          .then((response) => {
            if (!response.ok) {
              console.error("삭제 요청 실패:", response.status);
              throw new Error("알림 삭제 실패");
            }
            console.log(`알림 ${data.notiNo} 삭제 성공`);
            notiItem.remove(); // DOM에서 항목 제거
            readCheck(); // 읽지 않은 알림 개수 갱신
          })
          .catch((error) => {
            console.error("Error deleting notification:", error);
          });
      });

      // 알림 내용 클릭 시 URL로 이동
      notiContent.addEventListener("click", () => {
        location.href = data.notiUrl;
      });

      // 각 알림 항목에 데이터 추가
      notiItem.append(notiContent, notiType, notiDate, notiDelete);
      notificationList.appendChild(notiItem);
    });

    isFirstSection = false; // 첫 섹션 렌더링 후 false로 변경
  }
}

// 서버에서 알림 데이터를 가져와 렌더링
const selectNotificationList = () => {
  if (!notificationLoginCheck) return; // 로그인이 안 된 경우 중단

  fetch("/notification/list")
    .then((response) => {
      if (response.ok) return response.json();
      throw new Error("알림 목록 조회 실패");
    })
    .then((notifications) => {
      const groupedNotifications = groupNotificationsByDate(notifications);
      renderNotifications(groupedNotifications); // 알림 목록 화면에 렌더링
    })
    .catch(console.error); // 오류 처리
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
    .catch(console.error); // 오류 처리
};

// 팔로우 알림 전송 함수
const sendFollowedArtistNotification = (follower, content) => {
  // 팔로우 알림 데이터 구성
  const notification = {
    notiContent: content,
    notiType: "F", // 알림 유형 F: 팔로우 알림
    sendMemberNo: follower,
  };

  // POST 요청으로 알림 데이터 전송
  fetch("/notification/followedArtistUpload", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(notification),
  })
    .then((response) => {
      if (!response.ok) throw new Error("팔로우 알림 전송 실패");
      console.log("팔로우 알림 전송 성공");
    })
    .catch((err) => console.error(err)); // 오류 처리
};
