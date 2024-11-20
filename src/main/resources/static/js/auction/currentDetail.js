/* 신고하기 버튼 가져오기 */
const reportBtn = document.querySelector("#currentReportBtn");

reportBtn.addEventListener("click", () => {

  if (!loginCheck) {
    alert("로그인이 필요합니다. 로그인 후 이용해 주세요.");
    location.href = "/member/login";
  }

  const width = 520;
  const height = 400;
  const left = (window.screen.width / 2) - (width / 2);
  const top = (window.screen.height / 2) - (height / 2);

  // pieceNo 값을 URL에 포함시켜 팝업 창에 전달
  window.open(
    `/auction/upCommingReport?pieceNo=${pieceNo}`,
    'reportPopup',
    `width=${width}, height=${height}, left=${left}, top=${top}, scrollbars=no, location=no, status=no, menubar=no`
  );
});



/* 좋아요 버튼 클릭 */
const likeCurrentBtn = document.querySelector("#likeCurrentBtn");
const pieceContainer = document.querySelector("#pieceContainer");
const pieceNo = pieceContainer.getAttribute("data-pieceNo");
  

// 좋아요 버튼 클릭
likeCurrentBtn.addEventListener("click", e => {

  if(!loginCheck) {
    alert("로그인이 필요합니다. 로그인 후 이용해 주세요.");
    location.href = "/member/login";
    return;
  }

  // 비동기로 좋아요 요청
  fetch("/auction/like", {
    method : "POST",
    headers : {"Content-Type" : "application/json"},
    body: JSON.stringify(pieceNo)
  })
  .then(response => {
    if(response.ok) return response.json();
    throw new Error("AJAX 통신 실패");
  })
  .then(result => {
    
    console.log(result);

    if(result.check === 'insert') { // 채우기
      likeCurrentBtn.classList.add("fa-solid");
      likeCurrentBtn.classList.remove("fa-regular");
    } else { // 비우기
      likeCurrentBtn.classList.add("fa-regular");
      likeCurrentBtn.classList.remove("fa-solid");
    }
  })
  .catch(err => console.error(err));

});