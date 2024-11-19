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
      overlay.add('active');
    });
    item.addEventListener('mouseleave', () => {
      overlay.remove('active');
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

    if(sideMenu.classList.contains('open')) sideMenu.classList.remove('open');
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

  // 검색 아이콘 클릭 이벤트
  searchIcon.addEventListener('click', () => {
    // 검색 섹션의 표시/숨김 상태 토글
    if (searchSection.style.display === 'none' || searchSection.style.display === '') {
      searchSection.style.display = 'block'; // 보이기
    } else {
      searchSection.style.display = 'none'; // 숨기기
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
/* 체크박스 선택 시 */
document.addEventListener('DOMContentLoaded', () => {
  const checkboxes = document.querySelectorAll('.filter-checkbox'); // 체크박스 선택
  const detailContainer = document.querySelector('.detail-container'); // 전체 detail-container 선택
  const detailItems = document.querySelectorAll('.detail-container [data-category]'); // 각 항목 선택

  // 필터링 함수
  const filterDetails = () => {
    let hasVisibleItems = false; // 표시되는 항목 여부 확인

    // 각 항목 확인
    detailItems.forEach(item => {
      // const category = item.getAttribute('data-category');
      // const matchingCheckbox = Array.from(checkboxes).find(cb => cb.getAttribute('data-category') === category);
      const category = item.dataset.category;
      const matchingCheckbox = Array.from(checkboxes).find(cb => cb.dataset.category === category);

      if (matchingCheckbox && matchingCheckbox.checked) {
        item.closest('.search-detail').style.display = 'block'; // 체크박스 체크된 경우 항목 표시
        hasVisibleItems = true;
      } else {
        item.closest('.search-detail').style.display = 'none'; // 체크박스 해제된 경우 항목 숨기기
      }
    });

    // 전체 컨테이너 표시/숨기기
    if (hasVisibleItems) {
      detailContainer.classList.remove('hidden'); // 항목이 있으면 컨테이너 표시
    } else {
      detailContainer.classList.add('hidden'); // 항목이 없으면 컨테이너 숨김
    }
  };

  // 체크박스 변경 시 필터링 적용
  checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', filterDetails);
  });

  // 초기 필터링 실행
  filterDetails();
});

// ---------------------------------------------------------------------------------------------------------------
/* 정렬 기준 변경 이벤트 */
// document.addEventListener('DOMContentLoaded', () => {
//   const sort = document.getElementById('sort');
//   const sortSelect = document.querySelector('.sort-select');

//   // 정렬 함수
//   const sortItems = (criteria) => {
//     const items = Array.from(sortSelect.querySelectorAll('option')); // 모든 항목 가져오기

//     // 정렬 기준에 따른 정렬 로직
//     items.sort((a, b) => {
//       if (criteria === 'latest') {
//         // 최신순 (날짜 내림차순)
//         return new Date(b.dataset.date) - new Date(a.dataset.date);
//       } else if (criteria === 'oldest') {
//         // 오래된순 (날짜 오름차순)
//         return new Date(a.dataset.date) - new Date(b.dataset.date);
//       } else if (criteria === 'priceUp') {
//         // 추정가 높은순 (가격 내림차순)
//         return b.dataset.price - a.dataset.price;
//       } else if (criteria === 'priceDown') {
//         // 추정가 낮은순 (가격 오름차순)
//         return a.dataset.price - b.dataset.price;
//       }
//     });

//     // 기존 목록 제거 및 정렬된 항목 다시 추가
//     sortSelect.innerHTML = '';
//     items.forEach(item => itemList.appendChild(item));
//   };
//       // 이벤트 핸들러 추가
//       sort.addEventListener('change', (event) => {
//         const selectedValue = event.target.value; // 선택된 값 가져오기
//         sortItems(selectedValue); // 정렬 수행
//       });


//       // 초기 정렬 (최신순)
//       sortItems('latest');
//     });

// ----------------------------------------------------------------------------------------------------------------
 /* 알림 */
document.addEventListener('DOMContentLoaded', () => {

  // 알림 아이콘과 특정 검색 섹션 가져오기
  const notificationIcon = document.getElementById('notification-icon');
  const notificationSection = document.getElementById('notification-section');

  // 알림 아이콘 클릭 이벤트
  notificationIcon.addEventListener('click', () => {
    // 알림 섹션의 표시/숨김 상태 토글
    if (notificationSection.style.display === 'none' || notificationSection.style.display === '') {
      notificationSection.style.display = 'block'; // 보이기
    } else {
      notificationSection.style.display = 'none'; // 숨기기
    }
  });
});

const connectSse = () => {
  if (notificationLoginCheck === false) return;
  console.log("connectSse() 호출")

  const eventSource = new EventSource("/common/noti");

  
  // ----------------------------------------------------
  eventSource.addEventListener("message", e => {
    console.log(e.data);
    const obj = JSON.parse(e.data);
    console.log(obj);
    const notificationBtn = document.querySelector(".notification-btn");
    notificationBtn.classList.add("fa-solid");
    notificationBtn.classList.remove("fa-regular");
    const notificationCountArea = document.querySelector(".notification-count-area");
    notificationCountArea.innerText = obj.notiCount;
    const notificationList = document.querySelector(".notification-list");
    if(notificationList.classList.contains("notification-show")){
      selectNotificationList(); 
    }
  });

  eventSource.addEventListener("error", () => {
    console.log("재연결 시도")
    eventSource.close(); 
    setTimeout(() => connectSse(), 5000);
  })
}

const sendNotification = (type, url, pkNo, content) => {

  if (notificationLoginCheck === false) return;
  const notification = {
    "notiType": type,
    "notiUrl": url,
    "pkNo": pkNo,
    "notiContent": content
  }

  // 비동기(Ajax) 요청
  fetch("/common/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(notification)
  })
    .then(response => {
      if (!response.ok) { // 비동기 통신 실패
        throw new Error("알림 전송 실패");
      } console.log("알림 전송 성공");
    })
    .catch(err => console.error(err));
}
// ------------------------------------------------------------------------
/* 비동기로 알림 목록을 조회하는 함수 */
const selectNotificationList = () => {
  if (notificationLoginCheck === false) return; // 로그인이 안된 경우
  fetch("/noti")
    .then(response => {
      if (response.ok) return response.json();
      throw new Error("알림 목록 조회");
    })
    .then(selectList => {
      console.log(selectList);

      // 이전 알림 목록 삭제
      const notiList = document.querySelector(".notification-list");
      notiList.innerHTML = '';
      for (let data of selectList) {

        // 알림 전체를 감싸는 요소
        const notiItem = document.createElement("li");
        notiItem.className = 'notification-item';

        // 알림을 읽지 않은 경우 'not-read' 추가
        if (data.notificationCheck == 'N') notiItem.classList.add("not-read");

        // 알림 관련 내용(프로필 이미지 + 시간 + 내용)
        const notiText = document.createElement("div");
        notiText.className = 'notification-text';

        // 알림 클릭 시 동작
        notiText.addEventListener("click", e => {

          // 만약 읽지 않은 알람인 경우
          if (data.readCheck == 'N') {
            fetch("/noti", {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: data.notiNo
            })
          }

          // 클릭 시 알림에 기록된 경로로 이동
          location.href = data.notificationUrl;
        })

        // 알림 내용 영역
        const contentContainer = document.createElement("div");
        contentContainer.className = 'notification-content-container';

        // 알림 보내진 시간
        const notiDate = document.createElement("p");
        notiDate.className = 'notification-date';
        notiDate.innerText = data.notificationDate;

        // 알림 내용
        const notiContent = document.createElement("p");
        notiContent.className = 'notification-content';
        notiContent.innerHTML = data.notificationContent; // 태그가 해석 될 수 있도록 innerHTML

        // 삭제 버튼
        const notiDelete = document.createElement("span");
        notiDelete.className = 'notidication-delete';
        notiDelete.innerHTML = '&times;';

        /* 삭제 버튼 클릭 시 비동기로 해당 알림 지움 */
        notiDelete.addEventListener("click", e => {
          fetch("/noti", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: data.notificationNo
          })
            .then(resp => {
              if (resp.ok) {
                // 클릭된 x버튼이 포함된 알림 삭제
                notiDelete.parentElement.remove();
                notReadCheck();
                return;
              }
              throw new Error("네트워크 응답이 좋지 않습니다.");
            })
            .catch(err => console.error(err));
        })

        // 조립
        notiList.append(notiItem);
        notiItem.append(notiText, notiDelete);
        notiText.append(senderProfile, contentContainer);
        contentContainer.append(notiDate, notiContent);
      }
    })
    .catch(err => console.error(err));
}
// ------------------------------------------------------------------------
/* 읽지 않은 알림 개수 조회 및 알림 유무 표시 여부 변경 */
const readCheck = () => {
  if (!notificationLoginCheck) return;
  fetch("/noti/readCheck")
    .then(response => {
      if (response.ok) return response.text();
      throw new Error("알림 개수 조회를 실패하였습니다.");
    })
    .then(count => {
      // console.log(count);

      // 알림 개수 화면에 표시
      const notificationBtn = document.querySelector(".notification-btn");
      const notificationCountArea = document.querySelector(".notification-count-area");

      // 알림 개수 화면에 표시
      notificationCountArea.innerText = count;

      // 읽지 않은 알림의 수가 0보다 크다면 == 읽지 않은 알림 존재 == 색변경
      if (count > 0) {
        notificationBtn.classList.add("fa-solid");
        notificationBtn.classList.remove("fa-regular");
      } else { // 모든 알림을 읽은 상태
        notificationBtn.classList.remove("fa-solid");
        notificationBtn.classList.add("fa-regular");
      }
    })
    .catch(err => console.error(err));
}

// ------------------------------------------------------------------------
// 페이지 로딩 완료 후 수행
document.addEventListener("DOMContentLoaded", () => {
  connectSse(); // sse 연결
  readCheck(); // 알림 개수 조회

  // 종 버튼(알림) 클릭 시 알림 목록 출력하기
  const notificationBtn = document.querySelector(".notification-btn");
  notificationBtn?.addEventListener("click", () => {
    // 알림 목록
    const notificationList = document.querySelector(".notification-list");

    // 알림 목록이 보이고 있을 경우
    if (notificationList.classList.contains("notification-show")) {
      // 안보이게 하기
      notificationList.classList.remove("notification-show");
    } else {
      selectNotificationList(); // 비동기로 목록 조회 후
      // 화면에 목록 보이게 하기
      notificationList.classList.add("notification-show");
    }
  });

    /* 쿼리스트링 중 cn(댓글 번호)이 존재하는 경우 해당 댓글을 찾아 화면을 스크롤해서 이동하기 */

    // 쿼리스트링 다룰 수 있는 객체
    const params = new URLSearchParams(location.search);
    const cn = params.get("cn"); // cn 값 얻어오기
    if(cn != null) { // cn이 존재하는 경우
      const targetId = "c" + cn; // "c100", "c1234" 현태로 변환

      // 아이디가 일치하는 댓글 요소 얻어오기
      const target = document.getElementById(targetId);

      // 댓글 요소가 제일 위에서 얼마나 떨어져 있는지 반환 받기
      const scrollPosition = target.offsetTop;
      window.scrollTo({ // 창 스크롤
        top : scrollPosition - 200, // 스크롤할 길이
        behavior : "smooth" // 부드럽게 동작(행동) 하도록 지정
      }); 
    }
});
