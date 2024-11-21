function loadArtistWorks (memberNo, sort = "recent", order = "desc") {
  console.log("memberNo:", memberNo); // 추가: memberNo 값 확인
  console.log("sort:", sort, "order:", order); // 추가: 정렬 필드와 방향 확인
  
  const url = `/artist/works?memberNo=${memberNo}&sort=${sort}&order=${order}`;
  fetch(url)
  .then(response => {
    if(response.ok) return response.json();
    throw new Error("AJAX 통신 실패");
  })
  .then(data => {
    renderArtistWorks(data, workSortState); // 데이터를 렌더링
  })
  .catch(err => console.error(err));
}

// 작품 목록 렌더링 함수
function renderArtistWorks(works) {
  const container = document.querySelector(".artwork-list");
  container.innerHTML = works.map(work => `
    <div class="artwork-item">
            <div class="artwork-info">
                <h4>${work.pieceTitle}</h4>
                <p>낙찰가: ₩${work.sellPrice}  <br> 크기: &nbsp &nbsp &nbsp ${work.sizeX} x ${work.sizeY}</p>
                <button class="view-button">자세히 보기</button>
            </div>
            <img src="${work.pieceRename}" class="artwork-image">
        </div>
    `).join("");
}

// 페이지 로드 시 작품 목록 로드
document.addEventListener("DOMContentLoaded", () => {
  const memberNo = new URLSearchParams(window.location.search).get("memberNo");
  if(memberNo) {
    loadArtistWorks(memberNo, workSortState.field, workSortState.direction); // 작품 목록 로드
  }
});

// 정렬상태 초기화(전역변수)
let workSortState = { field : "recent", direction : "desc"};

/* 드롭다운 영역 */
document.addEventListener("DOMContentLoaded", () => {

  let workSortBtn = document.getElementById("work-sort-btn");
  const workDropdown = document.getElementById("workDropdown");

  workSortBtn.addEventListener("click", function(event) {
    event.stopPropagation();
    workDropdown.style.display =
      workDropdown.style.display === "block" ? "none" : "block";
  });

  document.addEventListener("click", function() {
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
  if (!loginCheck1) {
    alert("로그인 후 사용할 수 있습니다.");
    return;
  }

  // 비동기로 팔로우 요청
  fetch("/artist/follow", {
    method : "POST",
    headers : {"Content-Type" : "application/json"},
    body : memberNo // JSON 형식으로 변경
  })
  .then(response => {
    if(response.ok) return response.json();
    throw new Error("AJAX 통신 실패");
  })
  .then(result => {
    console.log(result);

    if(result.check === 'insert'){ // 채우기
      followIcon.classList.add("fa-solid");
      followIcon.classList.remove("fa-regular");
    } else { // 비우기
      followIcon.classList.add("fa-regular");
      followIcon.classList.remove("fa-solid");
    }

  })
  .catch(err => console.error(err));

});
