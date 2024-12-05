// 정렬상태 초기화(전역변수)
let workSortState = { field: "recent", direction: "desc" };

let currentPage = 1; // 현재 페이지
let isFetching = false; // 데이터 로딩 상태
let hasMore = true; // 추가 데이터 여부

// "자세히 보기" 버튼 클릭 이벤트 리스너
document.querySelector(".artwork-list").addEventListener("click", (event) => {
  // 클릭한 요소가 "view-button" 클래스인지 확인
  if (event.target.classList.contains("view-button")) {
    
    const pieceNo = event.target.dataset.pieceNo; // 작품 번호 가져오기
    const pieceStatus = event.target.dataset.status; // 작품 상태 가져오기



    if (pieceNo && pieceStatus) {
      // 상세 조회 페이지 결정
      let detailPage = determineDetailPage(pieceNo, pieceStatus);

      if (detailPage) {
        location.href = detailPage; // 페이지 이동
      } else {
        console.error("유효하지 않은 작품 상태입니다:", pieceStatus);
      }
    }
  }
});


function determineDetailPage(pieceNo, pieceStatus) {
  if (pieceStatus === 'A') {
    return `/auction/auctionDetail?pieceNo=${pieceNo}`;
  } else if (pieceStatus === 'S') {
    return `/auction/auctionDetail?pieceNo=${pieceNo}`;
  } else if (pieceStatus === 'N' || pieceStatus === 'F') {
    return `/piece/onlineDetail?pieceNo=${pieceNo}`;
  } else {
    return null;
  }

}

// 작품 목록 비동기 로드 함수
function loadArtistWorks(memberNo, sort = "recent", order = "desc") {

  if (isFetching || !hasMore) return; // 이미 로딩 중이거나 데이터가 더 없으면 종료
  isFetching = true; // 로딩 상태 설정

  console.log("memberNo:", memberNo); // 추가: memberNo 값 확인
  console.log("sort:", sort, "order:", order); // 추가: 정렬 필드와 방향 확인

  const url = `/artist/works?memberNo=${memberNo}&cp=${currentPage}&sort=${sort}&order=${order}`;
  fetch(url)
    .then(response => {
      if (response.ok) return response.json();
      throw new Error("AJAX 통신 실패");
    })
    .then(data => {
      setTimeout(() => {

        document.querySelector("#loader").style.display = "none";
  
        // 다 불러옴
        if(data.works.length === 0) {
          hasMore = false;
          return;
        }
  
        isFetching = false; // 로딩끝
  
        renderArtistWorks(data.works); // 작품 목록 렌더링
        currentPage = data.currentPage + 1; // 다음 페이지
        hasMore = data.hasMore; // 추가 데이터 여부
        isLoading = false; // 로딩 상태 해제
        //renderArtistWorks(data, workSortState); // 데이터를 렌더링

      }, 1000);
    })
    .catch(err => {
      console.error("Error fetching artist works:", err);
      isFetching = false;
    });
    
}

let status = "";

function formatPrice(amount) {
  return new Intl.NumberFormat("ko-KR", {
    style: "currency",
    currency: "KRW"
  }).format(amount) + "(KRW)";
}

// 작품 목록 렌더링 함수
function renderArtistWorks(works) {

  

  const container = document.querySelector(".artwork-list");
  console.log(works);
  container.innerHTML += works.map(work => `
    <div class="artwork-item">
            <div class="artwork-info">
                <h4>${work.pieceTitle}</h4>
                <p class="amount>낙찰가: ₩${work.sellPrice.LocaleString()}  <br> 크기: &nbsp &nbsp &nbsp ${work.sizeX} x ${work.sizeY}</p>
                <button class="view-button"
                        data-piece-no="${work.pieceNo}" 
                        data-status="${work.pieceStatus}">자세히 보기</button>
            </div>
            <img src="${work.pieceRename}" class="artwork-image">
        </div>
    `).join("");
}



// // 페이지 로드 시 작품 목록 로드
// document.addEventListener("DOMContentLoaded", () => {

//   const memberNo = new URLSearchParams(window.location.search).get("memberNo");
//   if (memberNo) {
//     loadArtistWorks(memberNo, workSortState.field, workSortState.direction); // 작품 목록 로드
//   }
// });

// // 무한 스크롤 이벤트 리스너
// window.addEventListener("scroll", () => {
//   const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

//   // 스크롤이 끝에 도달하면 데이터 로드
//   if (scrollTop + clientHeight >= scrollHeight - 5) {
//     const memberNo = new URLSearchParams(window.location.search).get("memberNo");
//     loadArtistWorks(memberNo);
//   }
// });





/* 드롭다운 영역 */
document.addEventListener("DOMContentLoaded", () => {

  let workSortBtn = document.getElementById("work-sort-btn");
  const workDropdown = document.getElementById("workDropdown");

  workSortBtn.addEventListener("click", function (event) {
    event.stopPropagation();
    workDropdown.style.display =
      workDropdown.style.display === "block" ? "none" : "block";
  });

  document.addEventListener("click", function () {
    workDropdown.style.display = "none";
  });

  document.getElementById("workByName").addEventListener("click", () =>
    workHandleSort("name"));
  document.getElementById("workByPrice").addEventListener("click", () =>
    workHandleSort("price"));

  // 정렬 처리 함수
  function workHandleSort(field) {
    // 정렬 상태 업데이트
    if (workSortState.field === field) {
      workSortState.direction = workSortState.direction === "asc" ? "desc" : "asc";
    } else {
      workSortState.field = field;
      workSortState.direction = "asc";
    }

     // 상태 초기화
    currentPage = 1; // 페이지 초기화
    hasMore = true; // 더 많은 데이터 로드 가능으로 초기화
    const container = document.querySelector(".artwork-list");
    container.innerHTML = ''; // 기존 목록 제거

    // memberNo를 다시 확인하고 전달
    const memberNo = new URLSearchParams(window.location.search).get("memberNo");
    console.log("workHandleSort 호출 시 memberNo:", memberNo); // 추가: memberNo 확인

    if (memberNo) {
      loadArtistWorks(memberNo, workSortState.field, workSortState.direction);
    } else {
      console.error("memberNo가 없습니다.");
    }
  }
});

/* 팔로우 버튼 비동기 */
const follow = document.querySelector("#follow-btn");
const followIcon = document.querySelector("#follow");


/* 팔로우 버튼 클릭 시 */
follow.addEventListener("click", () => {


  // 로그인 여부
  if (!loginCheck) {
    alert("로그인 후 사용할 수 있습니다.");
    location.href = "/member/login";
    return;
  }

  // 애니메이션 효과 추가
  followIcon.classList.add("sparkle-effect");

  // 애니메이션 효과 제거 (0.5초 뒤에 제거)
  setTimeout(() => {
    followIcon.classList.remove("sparkle-effect");
  }, 500);

  // 비동기로 팔로우 요청
  fetch("/artist/follow", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: memberNo, artistNo
  })
    .then(response => {
      if (response.ok) return response.json();
      throw new Error("AJAX 통신 실패");
    })
    .then(result => {
      console.log(result);

      if (result.check === 'insert') { // 채우기
        followIcon.classList.add("fa-solid");
        followIcon.classList.remove("fa-regular");
      } else { // 비우기
        followIcon.classList.add("fa-regular");
        followIcon.classList.remove("fa-solid");
      }

    })
    .catch(err => console.error(err));

});



document.addEventListener("DOMContentLoaded", () => {
  let intersectionObserver = new IntersectionObserver(function (entries) {
    if (entries[0].intersectionRatio <= 0) return; // 요소가 사라질 때
    if(hasMore) document.querySelector("#loader").style.display = "block";
    loadArtistWorks(memberNo, workSortState.field, workSortState.direction);
  });
  // 주시 시작
  intersectionObserver.observe(document.querySelector(".artwork-list-footer"));
})


