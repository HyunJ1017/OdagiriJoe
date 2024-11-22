/* 버튼클릭시 페이지 이동 */

/* url 모음 */
const urls = {
  /* 상세보기 */ "detail" : "/",
  /* 입금화면 */ "payment" : "/",
  /* 배달정보 */ "delivery" : "/"
}

// 상세정보 버튼 클릭시 상세정보 페이지로 이동
const detailBtnAddEvent = () => {
  const detailBtns = document.querySelectorAll(".detailBtn");
  detailBtns?.forEach(btn => {
    btn.addEventListener("click", () => {
      location.href = urls.detail;
    })
  }) // detailBtns end
}

// 이미지 로딩 완료시 이미지 띄움
function hideLoader(imgElement) {
  const loader = imgElement.nextElementSibling; // loader div
  loader.style.display = 'none'; // 로딩 이미지 숨기기
  imgElement.style.display = 'block'; // 실제 이미지 보이기
} // hideLoader end


/* 스크롤 로딩 */
const contentContainer = document.getElementById('content-section');
const loader = document.getElementById('loader');
let isLoading = false;
let isFinish = false;
let currentpage = 1;


// 스크롤 이벤트 인식
document.addEventListener('DOMContentLoaded', () => {

  loadMoreContent();
  window.addEventListener('scroll', handleScroll);

});

const handleScroll = () => {
  if(isFinish) return;
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  if (scrollTop + clientHeight >= scrollHeight - 216) {
    loadMoreContent();
  }
};

const loadMoreContent = () => {
  if (isLoading) return; // 이미 로딩 중이면 중복 호출 방지
  isLoading = true;
  loader.style.display = 'block';

  // 새 콘텐츠를 시뮬레이션으로 추가 (예: API 호출 대신)
  setTimeout(() => {

    fetch("/member/myPage/getPurchases?memberNo=" + memberNo + "&currentPage=" + currentpage)
    .then(response => {
      if (response.ok) return response.json();
      throw new Error("AJAX 통신 실패");
    })
    .then(purchaseList => {
      
      // console.log(purchaseList);
      // console.log(purchaseList.length);

      if(purchaseList.length != 0){
        // 반환받은 리스트 화면에 추가하기
        purchaseList.forEach(piece => {
          // console.log(piece);
          // 새로운 content-div 생성
          const contentDiv = document.createElement('div');
          contentDiv.classList.add("content-div");
    
          contentDiv.innerHTML = `
            <div class="image-container">
              <img src="${piece.pieceRename}" alt="사진" class="content-img" onload="hideLoader(this)">
              <div class="loader"></div>
            </div>
            <div>
              <h3>${piece.pieceTitle}</h3>
              <h4>작가명 ${piece.artistNickname}</h4>
              <p>구매가 ₩${piece.finalPrice}</p>
              <p>${piece.sizeX} x ${piece.sizeY}</p>
              <div class="piece-detales" data-piece-no="${piece.pieceNo}">상세정보</div>
            </div>
          `;
    
          // 컨테이너에 content-div 추가
          contentContainer.appendChild(contentDiv);
          detailBtnAddEvent();
        })
      } else {

        // 끝내기
        loader.remove();
        isFinish = true;
      }
      
    })
    .catch(err => console.error(err));

    loader.style.display = 'none';
    currentpage ++;
    isLoading = false;
  }, 1000); // 1초 후 로드 시뮬레이션
};