function toggleContent(element) {
  const content = element.nextElementSibling;
  const isVisible = content.classList.contains("open");

  // 모든 notice-content를 닫기
  document.querySelectorAll(".notice-content").forEach(item => {
    if (item !== content) {
      item.style.height = "0px";
      item.classList.remove("open");
      item.previousElementSibling.classList.remove("open");
    }
  });

  // 클릭한 항목에 애니메이션 적용
  if (!isVisible) {
    element.classList.add("open");
    content.classList.add("open");

    // 높이를 계산하여 설정
    const scrollHeight = content.scrollHeight + "px";
    content.style.height = scrollHeight;

    // 애니메이션이 끝난 후 height를 auto로 설정
    content.addEventListener("transitionend", function handler() {
      content.style.height = "auto";
      content.removeEventListener("transitionend", handler);
    });
  } else {
    content.style.height = content.scrollHeight + "px";
    // 강제로 리플로우(Reflow) 시켜 애니메이션 효과 적용
    content.offsetHeight;
    content.style.height = "0px";
    element.classList.remove("open");
    content.classList.remove("open");
  }
}


/* 페이지네이션, 공지사항 리스트 조회 */
const noticeList = document.querySelectorAll(".notice-item");

const selectNoticeList = (cp) => {

  let requestURL = `/howTo/noticeList?cp=${cp}`;

  fetch(requestURL)
    .then(response => {
      if (response.ok) return response.json();
      throw new Error("AJAX 통신 실패");
    })
    .then(map => {

      const noticeList = map.noticeList;
      const pagination = map.pagination;

      console.log(noticeList);
      console.log(pagination);

      NoticeItems(noticeList);
      NoticePagination(pagination);
    })

    .catch(error => console.log(error));
};


const NoticeItems = (noticeList) => {

  const noticeContainer = document.getElementById("noticeContainer");

  noticeContainer.innerHTML = ''; // 기존 항목 초기화

  noticeList.forEach(list => {

    // 공지사항 항목 생성
    const noticeItem = document.createElement("div");
    noticeItem.className = "notice-item";

    // 제목 부분 생성 및 클릭 이벤트 추가
    const noticeTitle = document.createElement("div");
    noticeTitle.className = "notice-title";
    noticeTitle.innerText = `[공지] ${list.noticeTitle}`;
    noticeTitle.onclick = function () {
      toggleContent(this);
    };

    // 내용 부분 생성
    const noticeContent = document.createElement("div");
    noticeContent.className = "notice-content";

    // 내용 텍스트 추가 (단일 문자열로 처리)
    const p = document.createElement("p");
    p.innerText = list.noticeContent; // `list.noticeContent`는 단일 문자열입니다.
    noticeContent.appendChild(p);

    // 생성한 요소를 notice-item에 추가
    noticeItem.appendChild(noticeTitle);
    noticeItem.appendChild(noticeContent);

    // notice-item을 noticeContainer에 추가
    noticeContainer.appendChild(noticeItem);

  });

};



let paginationBox = document.getElementById("paginationBox");


const NoticePagination = (pagination) => {

  paginationBox.innerHTML = '';  // 기존 페이지 버튼 초기화

  

  const createPageButton = (page, text, isActive = false) => {
    const button = document.createElement("a");
    button.href = "#";
    button.classList.add("page-btn");
    button.dataset.page = page > 0 ? page : 1; // 0 이하일 경우 1로 보정
    button.textContent = text;

    if (isActive) button.classList.add("active");

    button.addEventListener("click", (event) => {
      event.preventDefault();
      const cp = parseInt(event.target.dataset.page); // 클릭된 버튼의 페이지 번호 추출
      selectNoticeList(cp);

      
    });

    return button;
  };

  // <<, < 버튼 추가
  paginationBox.appendChild(createPageButton(1, "<<"));
  paginationBox.appendChild(createPageButton(pagination.prevPage, "<"));

  // 동적 페이지 번호 버튼 생성
  for (let i = pagination.startPage; i <= pagination.endPage; i++) {
    const isActive = i === pagination.currentPage;
    paginationBox.appendChild(createPageButton(i, i, isActive));
  }

  // >, >> 버튼 추가
  paginationBox.appendChild(createPageButton(pagination.nextPage, ">"));
  paginationBox.appendChild(createPageButton(pagination.maxPage, ">>"));
};


 




document.addEventListener("DOMContentLoaded", () => {
  selectNoticeList(1);
})