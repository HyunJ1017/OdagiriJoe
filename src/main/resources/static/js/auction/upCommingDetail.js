
/* 목록으로 가기 */
const listBtn = document.querySelector("#listBtn");

listBtn.addEventListener("click", () => {
  location.href = "/auction/main";
});


document.addEventListener("DOMContentLoaded", () => {
  const updateCountdown = () => {
      // 남은 시간이 모두 0이 되었을 때 처리
      if (remainingHours === 0 && remainingMinutes === 0 && remainingSeconds === 0) {
          handleCountdownEnd();
          return;
      }

           // 초 감소
           if(remainingSeconds > 0) {
               remainingSeconds--;
            }else {
              remainingSeconds = 59;
              if (remainingMinutes > 0) {
                  remainingMinutes--;
              } else {
                remainingMinutes = 59;
                if (remainingHours > 0) {
                    remainingHours--;
                }
              }
         }

      console.log(`Remaining Time: ${remainingHours}h ${remainingMinutes}m ${remainingSeconds}s`); // 디버깅용

      // DOM 업데이트
      document.querySelector(".hours-box span").textContent = String(remainingHours).padStart(2, "0");
      document.querySelector(".minutes-box span").textContent = String(remainingMinutes).padStart(2, "0");
      document.querySelector(".seconds-box span").textContent = String(remainingSeconds).padStart(2, "0");
  };

  const handleCountdownEnd = () => {
      clearInterval(countdownTimer); // 타이머 종료
      alert("경매가 시작되었습니다!");
  };

  const countdownTimer = setInterval(updateCountdown, 1000);
  updateCountdown(); // 초기 실행
});
