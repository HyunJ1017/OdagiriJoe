// 예정경매
const buttons = document.querySelectorAll('.detail-button'); // 모든 상세보기 버튼 선택

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const pieceNo = button.getAttribute('data-id'); // 버튼의 data-id에서 pieceNo 가져오기

        // 상세 페이지로 이동
        location.href = `/auction/auctionDetail?pieceNo=${pieceNo}`;
    });
});



// 현재경매
const buttons2 = document.querySelectorAll('.detail-button2'); // 모든 상세보기 버튼 선택

buttons2.forEach(button => {
    button.addEventListener('click', () => {
        const pieceNo = button.getAttribute('data-id'); // 버튼의 data-id에서 pieceNo 가져오기

        // 상세 페이지로 이동
        location.href = `/auction/currentDetail?pieceNo=${pieceNo}`;
    });
});



/* 종료 경매 리스트 및 페이지네이션 */
const selectCompletedList = (cp) => {
    fetch(`/auction/completedList?cp=${cp}`)
      .then(response => {
        if (response.ok) return response.json();
        throw new Error("AJAX 통신 실패");
      })
      .then(data => {

        const completedList = data.completedList;
        const pagination = data.pagination;
  
        // 완료된 경매 리스트 업데이트
        updateCompletedList(completedList);
  
        // 페이지네이션 업데이트
        updatePagination(pagination);
      })
      .catch(error => console.error("Error fetching completed list:", error));
  };

  
  // 리스트 업데이트 함수
  const updateCompletedList = (completedList) => {
    const completedImgBox = document.querySelector(".completed-imgbox");
    completedImgBox.innerHTML = ""; // 기존 리스트 초기화
  
    completedList.forEach(item => {

      console.log(item);

      const itemDiv = document.createElement("div");
  
      // 작품 링크
      const link = document.createElement("a");
      link.href = `/auction/currentDetail?pieceNo=${item.pieceNo}`;
      link.style.padding = "0";
  
      // 작품 이미지
      const img = document.createElement("img");
      img.src = item.pieceRename || "/images/default.jpg";
      img.alt = "경매 이미지";
      img.className = "content-img"; // 클래스명 추가
      img.onload = function () {
        hideLoader(img); // 이미지 로드 완료 시 로더 숨기기
    };


      // 로더 생성
      const loader = document.createElement("div");
      loader.className = "loader";
  
      // 작가 이름
      const artistName = document.createElement("div");
      artistName.className = "artist-name";
      artistName.textContent = item.artistNickname || "작가 없음";
  
      // 조립
      link.appendChild(img);
      link.appendChild(loader);
      itemDiv.appendChild(link);
      itemDiv.appendChild(artistName);
      completedImgBox.appendChild(itemDiv);
    });
  };
  
  // 페이지네이션 업데이트 함수
  const updatePagination = (pagination) => {
    const paginationBox = document.getElementById("paginationBox");
    paginationBox.innerHTML = ""; // 기존 페이지네이션 초기화
  
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
        selectCompletedList(cp); // 리스트만 업데이트
      });
  
      return button;
    };
  
    // <<, < 버튼
    paginationBox.appendChild(createPageButton(1, "<<"));
    paginationBox.appendChild(createPageButton(pagination.prevPage, "<"));
  
    // 동적 페이지 번호 버튼
    for (let i = pagination.startPage; i <= pagination.endPage; i++) {
      const isActive = i === pagination.currentPage;
      paginationBox.appendChild(createPageButton(i, i, isActive));
    }
  
    // >, >> 버튼
    paginationBox.appendChild(createPageButton(pagination.nextPage, ">"));
    paginationBox.appendChild(createPageButton(pagination.maxPage, ">>"));
  };
  
  // 초기 실행
  document.addEventListener("DOMContentLoaded", () => {
    selectCompletedList(1); // 페이지 1번부터 시작
  });
  

  function hideLoader(imgElement) {
    const loader = imgElement.nextElementSibling; // loader div
    loader.style.display = 'none'; // 로딩 이미지 숨기기
    imgElement.style.display = 'block'; // 실제 이미지 보이기
  }