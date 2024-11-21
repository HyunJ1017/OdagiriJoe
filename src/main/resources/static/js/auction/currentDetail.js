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



// 웹소켓 설정
const socket = new WebSocket("ws://localhost:8080/websocket/bidding");

// 서버에서 메시지를 받아와 현재 입찰 금액 갱신
socket.onmessage = (event) => {
  const data = JSON.parse(event.data); // JSON 형태로 파싱
  if (data.pieceNo === parseInt(pieceNo)) { // 해당 작품에 대한 업데이트만 처리
    document.querySelector(".current-bid span").textContent = `${data.currentBidPrice} (KRW)`;
  }
};

// 웹소켓 연결 성공
socket.onopen = () => {
  console.log("웹소켓 연결 성공");
};

// 웹소켓 오류 처리
socket.onerror = (error) => {
  console.error("웹소켓 오류 발생:", error);
};

// 웹소켓 닫힘 처리
socket.onclose = () => {
  console.log("웹소켓 연결 종료");
};

/* 모달창 */
const modal = document.getElementById('modal');
const bidApplyBtn = document.getElementById('bidApplyBtn');
const closeBtn = document.querySelector('.close-btn');

// 모달 열기
bidApplyBtn.addEventListener('click', function () {
  modal.style.display = 'block';
});

// 모달 닫기 (닫기 버튼 클릭)
closeBtn.addEventListener('click', function () {
  modal.style.display = 'none';
});

// 모달 닫기 (외부 클릭)
window.addEventListener('click', function (event) {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
});

  // 입찰 금액 제출 이벤트
confirmBidBtn.addEventListener('click', function () {
  const bidAmount = parseFloat(bidAmountInput.value);

  if (bidAmount > 0) {
    // 웹소켓으로 입찰 정보 전송
    const bidData = {
      pieceNo: parseInt(pieceNo), // 작품 번호
      memberNo: loginNo, // 로그인한 사용자 번호
      bidPrice: bidAmount
    };
    socket.send(JSON.stringify(bidData)); // JSON 형태로 서버에 전송
    modal.style.display = 'none'; // 모달 닫기
  } else {
    alert('유효한 금액을 입력하세요!');
  }
});