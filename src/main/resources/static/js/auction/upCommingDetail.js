/* *******************  예정경매 상세페이지 ******************* */
/* 목록으로 가기 */
const listBtn = document.querySelector("#listBtn");

listBtn.addEventListener("click", () => {
  location.href = "/auction/main";
});


/* 위시리스트(좋아요) 비동기  */
const likePiece = document.querySelector("#likePiece");

// 좋아요 버튼 클릭
likePiece.addEventListener("click", e => {

  if (!loginCheck) {
    alert("로그인이 필요합니다. 로그인 후 이용해 주세요.");
    location.href = "/member/login";
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
      likePiece.classList.add("fa-solid");
      likePiece.classList.remove("fa-regular");
    } else { // 비우기
      likePiece.classList.add("fa-regular");
      likePiece.classList.remove("fa-solid");
    }
  })
  .catch(err => console.error(err));

});

//--------------------------------------------------------------------------
/* 경매 알림 */
// const sendAuctionNotifications = (notifications, notiContent) => {
//   notifications.forEach((auction) => {
//     const pieceNo = auction.pieceNo; // 작품 번호
//     const pieceStatus = auction.pieceStatus; // 경매 상태

//     let notiUrl;
//     let notiContent;
    
//     // 경매 상태에 따른 URL 설정
//     if(pieceStatus.value === "A"){
//       notiUrl = `/auction/upCommingDetail?pieceNo=${pieceNo}`;
//       notiContent = '찜한 게시물의 경매가 내일 오전 10시에 시작됩니다.';
//     }
//     else if(pieceStatus.value === "S"){
//       notiUrl = `/auction/currentDetail?pieceNo=${pieceNo}`;
//       notiContent = '찜한 게시물의 경매가 오늘 오전 10시에 시작됩니다.';
//     }
//     // 알림 전송
//     sendNotification("A", notiUrl, pieceNo, notiContent);
//   });
// };

// --------------------------------------------------------------------------
// 남은 시간을 업데이트하는 함수
function updateCountdown(remainingTime, onCountdownEnd) {
  const { hours, minutes, seconds } = remainingTime;

  // 남은 시간이 모두 0이 되었을 때 처리
  if (hours === 0 && minutes === 0 && seconds === 0) {
      onCountdownEnd(); // 카운트다운 종료 처리
      return;
  }

  // 초 감소
  if (remainingTime.seconds > 0) {
      remainingTime.seconds--;
  } else {
      remainingTime.seconds = 59;
      if (remainingTime.minutes > 0) {
          remainingTime.minutes--;
      } else {
          remainingTime.minutes = 59;
          if (remainingTime.hours > 0) {
              remainingTime.hours--;
          }
      }
  }

  // DOM 업데이트
  document.querySelector(".hours-box span").textContent = String(remainingTime.hours).padStart(2, "0");
  document.querySelector(".minutes-box span").textContent = String(remainingTime.minutes).padStart(2, "0");
  document.querySelector(".seconds-box span").textContent = String(remainingTime.seconds).padStart(2, "0");
}

// 카운트다운 종료 시 처리
function handleCountdownEnd() {
  clearInterval(countdownTimer); // 타이머 종료
  alert("경매가 시작되었습니다!");
  location.href = "/auction/main";
}

// 초기 실행 함수
function initializeCountdown(hours, minutes, seconds) {
  const remainingTime = { hours, minutes, seconds };

  // 1초마다 카운트다운 업데이트
  const countdownTimer = setInterval(() => {
      updateCountdown(remainingTime, handleCountdownEnd);
  }, 1000);

  // 즉시 한 번 실행
  updateCountdown(remainingTime, handleCountdownEnd);
}

/* 신고하기 버튼 가져오기 */
const reportBtn = document.querySelector("#reportBtn");

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



/* *******************  예정경매 상세페이지 ******************* */

function hideLoader(imgElement) {
  const loader = imgElement.nextElementSibling; // loader div
  loader.style.display = 'none'; // 로딩 이미지 숨기기
  imgElement.style.display = 'block'; // 실제 이미지 보이기
}



document.addEventListener("DOMContentLoaded", () => {
    // 초기화 함수 호출
    initializeCountdown(remainingHours, remainingMinutes, remainingSeconds);
});
