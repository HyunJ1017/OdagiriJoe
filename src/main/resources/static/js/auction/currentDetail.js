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




/* 모달창 */
const modal = document.getElementById('modal');
const bidApplyBtn = document.getElementById('bidApplyBtn');
const closeBtn = document.querySelector('.close-btn');
const bidAmountInput = document.getElementById('bidAmount'); // 입력 필드 참조 추가
const confirmBidBtn = document.getElementById('confirmBidBtn'); // 입찰 버튼 참조 추가



// 모달 열기
bidApplyBtn.addEventListener('click', function () {
  
  if(!loginCheck) {
    alert("로그인이 필요합니다. 로그인 후 이용해 주세요.");
    location.href = "/member/login";
    return;
  }

  modal.style.display = 'block';
});

// 모달 닫기 (닫기 버튼 클릭)
closeBtn.addEventListener('click', function () {
  modal.style.display = 'none';
  resetBidInput();
});

// // 모달 닫기 (외부 클릭)
// window.addEventListener('click', function (event) {
//   if (event.target === modal) {
//     modal.style.display = 'none';
//   }
// });


// 입력 필드 초기화 함수
function resetBidInput() {
  bidAmountInput.value = ''; // 입력 필드 값 초기화
  bidAmountInput.setAttribute('data-prev-value', ''); // 이전 값도 초기화
}


// 현재 최고 입찰가를 저장할 변수
let currentHighestBid = 0;

document.addEventListener('DOMContentLoaded', function () {

  // 페이지 로드 시 서버에서 최신 데이터를 가져옴
  // 10은 정수 변환
  const pieceNo = parseInt(document.getElementById('pieceContainer').getAttribute('data-pieceNo'), 10);

  // 입찰 데이터 가져오기
  fetch(`/api/bid/current?pieceNo=${pieceNo}`)
    .then((response) => {
      if (!response.ok) throw new Error("Failed to fetch current bid data.");
      return response.json();
    })
    .then((data) => {
      console.log(data);

      // 현재입찰가를 최고입찰가로 할당
      currentHighestBid = data.currentBidPrice;

      console.log(currentHighestBid);

      // 최신 데이터로 초기화
      const currentBidPriceDiv = document.getElementById('currentBidPrice');
      if (currentBidPriceDiv) {
        currentBidPriceDiv.innerHTML = `${data.currentBidPrice.toLocaleString()} (KRW)`;
      }

      const currentBidAmountSpan = document.getElementById('currentBidAmount');
      if (currentBidAmountSpan) {
        currentBidAmountSpan.innerText = `${data.currentBidPrice.toLocaleString()} (KRW)`;
      }
    })
    .catch((error) => {
      console.error("Error fetching current bid data:", error);
    });
});

// 엔드포인트 지정 WebSocket 연결 
// const socket = new WebSocket("ws://192.168.10.28/bid");
const socket = new WebSocket("/bid");


// 금액 입력 필드에 쉼표 추가 (문자열로 처리)
bidAmountInput.addEventListener('input', function (e) {
  // 입력값에서 쉼표 제거
  let rawValue = e.target.value.replace(/,/g, '');

  // 숫자로만 구성된 입력값인지 확인
  if (/^\d*$/.test(rawValue)) {
    // 유효한 숫자일 경우 쉼표를 추가하여 표시
    e.target.value = rawValue.replace(/\B(?=(\d{3})+(?!\d))/g, ','); // 정규식으로 쉼표 추가

    // 유효한 숫자를 data-prev-value에 저장
    e.target.setAttribute('data-prev-value', rawValue);

    // 값이 1조를 초과하는 경우 제한
    const maxLimit = 1_000_000_000_000; // 1조
    if (BigInt(rawValue) > maxLimit) {
      alert('입력 가능한 최대 금액은 1조 원까지입니다.');
      e.target.value = maxLimit.toLocaleString(); // 최대값으로 설정
      e.target.setAttribute('data-prev-value', maxLimit.toString());
    }
  } else {
    // 유효하지 않은 입력일 경우 이전 값 복구
    const previousValue = e.target.getAttribute('data-prev-value') || '';
    e.target.value = previousValue.replace(/\B(?=(\d{3})+(?!\d))/g, ','); // 이전 값 복구 후 쉼표 추가
  }
});





// WebSocket 메시지 수신 및 업데이트
socket.onmessage = function (event) {

  console.log("WebSocket message received:", event.data);
  const response = JSON.parse(event.data);

  // 에러 메시지 처리
  if (response.error) {
    console.error("Error from WebSocket:", response.error);
    alert("입찰 처리 중 문제가 발생했습니다. 다시 시도 해주세요.");
    return; // 에러일 경우 로직 중단
  }


  // 성공 메시지 처리
  if (response.currentBidPrice !== undefined) {
    currentHighestBid = response.currentBidPrice; // 현재 최고 입찰가 업데이트
  
    // '현재 입찰가' 업데이트1
    const currentBidPriceDiv = document.getElementById('currentBidPrice');
    if (currentBidPriceDiv) {
      currentBidPriceDiv.innerHTML = `${response.currentBidPrice.toLocaleString()} (KRW)`;

       // 업데이트 시 강조 애니메이션 추가
      currentBidPriceDiv.classList.add('updated');
      
      // 애니메이션 종료 후 클래스 제거
      setTimeout(() => {
        currentBidPriceDiv.classList.remove('updated');
      }, 500);
    }

    // '현재 입찰 금액' 업데이트
    const currentBidAmountSpan = document.getElementById('currentBidAmount');
    if (currentBidAmountSpan) {
      currentBidAmountSpan.innerText = `${response.currentBidPrice.toLocaleString()} (KRW)`;
    }

    if (bidAmountInput && document.getElementById('modal').style.display !== 'block') {
      bidAmountInput.value = ''; // 값 초기화
    }


  } else {
    console.warn("No currentBidPrice in WebSocket message:", response);
  }
};

confirmBidBtn.addEventListener('click', function () {

  const bidAmountInput = document.getElementById('bidAmount');
  const rawValue = bidAmountInput.value.replace(/,/g, ''); // 쉼표 제거
  const bidAmount = parseFloat(rawValue); // 숫자로 변환

  console.log("bidAmountInput.value : ", bidAmountInput.value);
  console.log("Bid Amount Entered:", bidAmount);
  console.log("Current Highest Bid:", currentHighestBid);

  // 시작가 가져오기
  const startPriceElement = document.getElementById('startPrice');
  const rawStartPrice = startPriceElement.getAttribute('data-startPrice').replace(/,/g, ''); // 쉼표 제거
  const startPrice = parseFloat(rawStartPrice);

  if (isNaN(bidAmount) || bidAmount <= 0) {
    alert("유효한 금액을 입력하세요!");
    return; // 금액이 0이거나 유효하지 않은 경우 로직 중단
  }

  if (bidAmount <= currentHighestBid) {
    alert(`입찰 금액은 현재 최고 입찰가 (${currentHighestBid.toLocaleString()} (KRW))보다 높아야 합니다.`);
    return; // 현재 최고 입찰가보다 낮거나 같을 경우 로직 중단
  }

  if (bidAmount < startPrice) { 
    alert(`입찰 금액은 시작가 (${startPrice.toLocaleString()} KRW) 이상이어야 합니다.`);
    return; // 시작가보다 낮을 경우 로직 중단
  }
  
  


  const pieceNo = parseInt(document.getElementById('pieceContainer').getAttribute('data-pieceNo'), 10);

  const bidData = {
    pieceNo: pieceNo,   // 작품 번호
    memberNo: loginNo,  // 사용자 번호
    bidPrice: bidAmount // 입찰 금액
  };

  // WebSocket으로 입찰 데이터 전송
  if (socket.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify(bidData));
    console.log(bidData);
    const modal = document.getElementById('modal');
    modal.style.display = 'none';

    
  } else {
    console.error("WebSocket is not open. Current state:", socket.readyState);
    alert("WebSocket 연결이 완료되지 않았습니다. 다시 시도하세요.");
  }
});






