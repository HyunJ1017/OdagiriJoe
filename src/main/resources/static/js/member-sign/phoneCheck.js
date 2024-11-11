
/* 전화번호 */
const inputPh = document.querySelector("#inputPh");
const phoneCheckBtn = document.querySelector("#phCheck");
const phMessage = document.querySelector("#phMessage");
let keyFl = false;

// 전화번호입력창이 선택되었을때
inputPh?.addEventListener("focus", () => {
  // 다른곳에 열려있던 메세지가 있었다면 지우기
  const otherCheck = document.querySelector("#inputMessage");
  if(otherCheck !== null){
    otherCheck.remove();
  }
  // 메세지창 초기화
  phMessage.innerHTML = "";
  const span = document.createElement("span");
  span.id="inputMessage";
  span.innerText = "전화번호를 입력해 주세요";
  // 메세지추가
  phMessage.appendChild(span);
});

inputPh?.addEventListener("input", ()=>{

  const inputMessage = document.querySelector("#inputMessage");

  signConfirm.phonCheck = false;
  const inputPhoneV = inputPh.value.trim();

  if(inputPhoneV.length === 0){
    inputPh.classList.add("confirm-red");
    return;
  }

  const regEx = /^[0-9]+$/;
  if (regEx.test(inputPhoneV) === false) {
    inputPh.classList.add("confirm-red");
    inputMessage.innerText = "숫자만 입력해 주세요";
    return;
  }
  
  if(inputPhoneV.length > 11){
    inputPh.classList.add("confirm-red");
    inputMessage.innerText = "전화번호 형식이 알맞지 않습니다.";
    return;
  } else {
    inputPh.classList.remove("confirm-red");
    inputMessage.innerText = "전화번호를 입력해 주세요";
  }
});

phoneCheckBtn?.addEventListener("click", ()=>{

  signConfirm.phonCheck = false;
  const inputPhoneV = inputPh.value.trim();

  if(inputPhoneV.length === 0){
    alert("전화번호를 입력해 주세요");
    return;
  }

  const regEx = /^[0-9]+$/;
  if (regEx.test(inputPhoneV) === false) {
    alert("숫자만 입력 해 주세요");
    return;
  }

  const regEx2 = /^[0-9]{10,11}$/;
  if (regEx2.test(inputPhoneV) === false) {
    alert("올바른 형태의 전화번호를 입력해 주세요.");
    return;
  }

  fetch("/sms/sendSms?phoneNumber=" + inputPhoneV)
  .then(response => {
    if (response.ok) return response.text();
    throw new Error("AJAX 통신 실패");
  })
  .then(result => {
    if(result > 0){
      keyFl = true;
      alert("인증번호가 발송되었습니다.");
      startCount();
      /* 번호,확인버튼 활성화 */
    } else {
      alert("인증번호 발송에 실패하였습니다.\n전화번호를 다시 확인하시거나 관리자에게 문의하십시오");
    }
  })
  .catch(err => console.error(err));

});

const signUpCounter = document.querySelector("#signUp-count");
const initTime = "05:00"; // 인증 초기시간
const initMin  = 4;       // 초기값 5분에서 1초 감소된 후 분
const initSec  = 59;      // 초기값 5분에서 1초 감소된 후 초
let min        = initMin; // 실제 줄어든 시간 분
let sec        = initSec; // 실제 줄어든 시간 초
let authTimer;            // 타이머 역할의 setInterval을 저장할 변수
//                           타이머를 멈추는 clearInterval 수행을 위해 필요
const inputPhC = document.querySelector("#inputPhC");

// 카운트 스타트
const startCount = () => {

  signUpCounter.innerText = initTime; // 05:00 문자열 출력
  signUpCounter.classList.remove("confirm-red");

  // 1초가 지날 때 마다 함수 내부 내용이 실행되는 setInterval 작성
  // authTimer = setInterval(() => {}, 1000);
  authTimer = setInterval(() => {

    signUpCounter.innerText = `${addZero(min)}:${addZero(sec)}`;
    
    // 00분 0초 정지
    if( min === 0 && sec === 0) {
      clearInterval(authTimer); // 1초마다 동작하는 secInterval 멈춤
      signUpCounter.classList.add("confirm-red");  // 빨간글씨
    }

    if( sec === 0 ){    // 출력된 초가 0인 경우(1분지남)
      sec = 60;
      min--;            // q분 감소
    }

    sec--;              // 1초가 지날 때 마다 sec값 1씩 감소

  }, 1000);

}

function addZero(num){
  if(num<10) return "0" + num;
  else       return num;
}

// 인증확인버튼
const keyCheck = document.querySelector("#keyCheck");
keyCheck.addEventListener("click", () => {
  if(keyFl === false) return;

  if(signUpCounter.classList.contains("confirm-red")){
    alert("입력시간이 만료되었습니다.");
  }

  fetch("/sms/authKeyCheck?authKey=" + inputPhC.value.trim() + "&phoneNumber=" + inputPh.value.trim() )
  .then(response => {
    if (response.ok) return response.text();
    throw new Error("AJAX 통신 실패");
  })
  .then(result => {
    console.log(result);
    if(result == 1){
      alert("전화번호 인증이 완료되었습니다.");
      signConfirm.phonCheck = true;
    } else if (result == 2) {
      alert("인증번호가 잘못 입력되었습니다.\n다시 확인해 주세요");
      signConfirm.phonCheck = false;
      return;
    } else {
      alert("입력시간이 만료되었습니다.");
      signConfirm.phonCheck = false;
      keyFl = false;
      return;
    }
    
  })
  .catch(err => console.error(err));

})
