/* 신고하기 버튼 얻어오기 */
const reportBtn = document.querySelector("#auction-reportBtn");

/* 신고하기 버튼 클릭 시 신고 팝업 창 열기 */
reportBtn.addEventListener("click", () => {

  // if(!loginCheck) {
  //   alert("로그인 후 사용할 수 있습니다.");
  //   return;
  // } // 로그인 하지 않면 신고하기 불가

  // peiceNo를 URL 파라미터로 추가해서 팝업 창으로 전달
  const width = 520;
  const height = 400;
  const left = (window.screen.width / 2) - (width / 2);
  const top = (window.screen.height / 2) - (height / 2);
  
  window.open(
      `/report/auctionReport`, // 작품 번호 넘길 예정
      '',
      `width=${width}, height=${height}, left=${left}, top=${top}, scrollbars=no, location=no, status=no, menubar=no`
  );

});