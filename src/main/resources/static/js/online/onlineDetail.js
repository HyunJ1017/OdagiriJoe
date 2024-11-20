/* 신고하기 버튼 가져오기 */
const reportBtn = document.querySelector("#online-reportBtn");

/* 신고하기 버튼 클릭 시 신고 팝업 창 열기 */
reportBtn.addEventListener("click", () => {

  if(!loginCheck) {
    alert("로그인 후 사용할 수 있습니다.");
    location.href = "/member/login";
    return;
  } // 로그인 하지 않으면 신고하기 불가

  // peiceNo를 URL 파라미터로 추가해서 팝업 창으로 전달
  const width = 520;
  const height = 400;
  const left = (window.screen.width / 2) - (width / 2);
  const top = (window.screen.height / 2) - (height / 2);
  
  
  window.open(
      `/report/onlineReport?pieceNo=${pieceNo}`,
      '',
      `width=${width}, height=${height}, left=${left}, top=${top}, scrollbars=no, location=no, status=no, menubar=no`
  );
  

});

/* 구매하기 버튼 가져오기 */
const purchaseBtn = document.querySelector("#purchaseBtn");

/* 구매하기 버튼 클릭 시 구매 팝업 창 열기 */
purchaseBtn.addEventListener("click", () => {
  
  if(!loginCheck) {
    alert("로그인 후 사용할 수 있습니다.");
    return;
  } // 로그인 하지 않으면 구매하기 불가

  // peiceNo를 URL 파라미터로 추가해서 팝업 창으로 전달
  const width = 520;
  const height = 700;
  const left = (window.screen.width / 2) - (width / 2);
  const top = (window.screen.height / 2) - (height / 2);

  window.open (
    `/piece/purchasePopup?pieceNo=${pieceNo}`,
    '',
    `width=${width}, height=${height}, left=${left}, top=${top}, scrollbars=no, location=no, status=no, menubar=no`
  );
});

/* 위시리스트(좋아요) 비동기  */
const wishList = document.querySelector("#online-wishList");

// 좋아요 임티 클릭
wishList.addEventListener("click", e => {

  // 로그인 여부
  if(!loginCheck) {
    alert("로그인 후 사용할 수 있습니다.");
    return;
  }

  // 비동기로 좋아요 요청
  fetch("/piece/wish", {
    method : "POST",
    headers : {"Content-Type" : "application/json"},
    body : pieceNo 
  })
  .then(response => {
    if(response.ok) return response.json();
    throw new Error("AJAX 통신 실패");
  })
  .then(result => {
    console.log(result);

    if(result.check === 'insert') { // 채우기
      wishList.classList.add("fa-solid");
      wishList.classList.remove("fa-regular");
    } else { // 비우기
      wishList.classList.add("fa-regular");
      wishList.classList.remove("fa-solid");
    }
  })
  .catch(err => console.error(err));

});