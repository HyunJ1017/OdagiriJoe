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
  const width = 700;
  const height = 700;
  const left = (window.screen.width / 2) - (width / 2);
  const top = (window.screen.height / 2) - (height / 2);

  const popup = window.open (
    `/piece/purchasePopup?pieceNo=${pieceNo}`,
    'popup',
    `width=${width}, height=${height}, left=${left}, top=${top}, scrollbars=no, location=no, status=no, menubar=no`
  );

  // 상태 코드 초기화
  let statusCode = null;

  // 창 닫힘 감지
  const checkClose = setInterval(() => {
      if (popup.closed) {
          clearInterval(checkClose); // 타이머 정지
          console.log(`창 닫힘. 상태 코드: ${statusCode}`);

          // 상태 코드에 따라 처리
          if (statusCode === 'error') {
            console.log('결제중 오류가 발생했습니다.');
          } else if (statusCode === 'success') {
            window.location.href = '/member/myPage/purchaseDetails';
          } else {
            console.log('창닫기');
          }
      }
  }, 500);

  // 메시지 받기 (상태 코드)
  window.addEventListener('message', (event) => {
      if (event.origin !== window.location.origin) {
          console.warn('다른 도메인의 메시지는 처리하지 않습니다.');
          return;
      }
      statusCode = event.data; // 상태 코드 저장
  });
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

document.addEventListener("DOMContentLoaded", () => {
  const purchaseBtn = document.querySelector("#purchaseBtn");

  // 작품 상태 확인 후 버튼 텍스트 변경
  if (pieceStatus === 'F') {
    purchaseBtn.textContent = "마감"; // 텍스트 변경
    purchaseBtn.disabled = true; // 버튼 비활성화
    purchaseBtn.style.cursor = "not-allowed"; // 비활성화된 버튼의 시각적 효과
  }
});


document.addEventListener("DOMContentLoaded", () => {
  const sellPrice = document.getElementById("sellPrice");
  const rawPrice = sellPrice.getAttribute("data-price");

  if(rawPrice) {
    const formattedPrice = new Intl.NumberFormat("ko-KR", {
      style: "currency",
      currency: "KRW"
    }).format(Number(rawPrice));
    sellPrice.textContent = formattedPrice + " (KRW)";
  }
});

function hideLoader(imgElement) {
  const loader = imgElement.nextElementSibling; // loader div
  loader.style.display = 'none'; // 로딩 이미지 숨기기
  imgElement.style.display = 'block'; // 실제 이미지 보이기
}