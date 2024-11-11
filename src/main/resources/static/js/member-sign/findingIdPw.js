/* 아이디 찾기

인증번호 발송시
- 전화번호 입력 확인
- 인증번호 발송

인증확인 클릭시
- 인증확인 발송
- 인증완료시 id검색 후 전화번호로 id 전송
*/

/* 비밀번호 찾기

인증번호 발송시
- 아이디, 전화번호 입력 확인
- 아이디, 전화번호 체크
- 아이디 있으면
- (서버에서)인증번호 발송 후 리턴
- 없으면 여기로 리턴

인증확인 클릭시
- 인증확인 발송
- 인증완료시 비밀번호 재입력
*/

const inputId = document.querySelector("#inputId");


/* 전화번호 */
const inputPh = document.querySelector("#inputPh");
const phoneCheckBtn = document.querySelector("#phCheck");
let keyFl = false;
let pwCheck = false;
let lastCheckId = '';
let lastCheckPhone = '';


phoneCheckBtn?.addEventListener("click", ()=>{

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



  if(inputId){
    if(inputId.value.length === 0){
      alert("아이디를 입력해 주세요");
      return;
    }

    console.log("inputPhone=" + inputPhoneV + "&inputId" + inputId.value);

    fetch("/member/login/searchIdPh?inputPhone=" + inputPhoneV + "&inputId=" + inputId.value)
    .then(response => {
      if (response.ok) return response.text();
      throw new Error("AJAX 통신 실패");
    })
    .then(result => {
      if(result == 0){
        alert("전화번호와 일치하는 ID가 없습니다.");
      } else {
        lastCheckId = inputId.value;
        lastCheckPhone = inputPhoneV;
        sendSms(inputPhoneV);
      }
    })
    .catch(err => console.error(err));

  } else {

    sendSms(inputPhoneV);
  }

});

const sendSms = (inputPhoneV) => {
  fetch("/sms/sendSms?phoneNumber=" + inputPhoneV + "&typeCode=1")
  .then(response => {
    if (response.ok) return response.text();
    throw new Error("AJAX 통신 실패");
  })
  .then(result => {
    if(result > 0){
      keyFl = true;
      alert("인증번호가 발송되었습니다.");
      startCount();
    } else {
      alert("인증번호 발송에 실패하였습니다.\n전화번호를 다시 확인하시거나 관리자에게 문의하십시오");
    }
  })
  .catch(err => console.error(err));
}


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
    if(result == 1){
      
      if(inputId !== undefined){
        console.log(result);
        /* 비밀번호 재입력창 열기 */
        openPwReinput();
      } else {
        /* 아이디리스트를 해당 전화번호로 전송 */
        sendIdList( inputPh.value.trim() );
      }

    } else if (result == 2) {
      alert("인증번호가 잘못 입력되었습니다.\n다시 확인해 주세요");
      return;
    } else {
      alert("입력시간이 만료되었습니다.");
      keyFl = false;
      return;
    }
    
  })
  .catch(err => console.error(err));

})





// 아이디찾기 - 아이디목록요청
const sendIdList = (phoneNumber) => {

  fetch("/sms/sendSms?phoneNumber=" + phoneNumber + "&typeCode=2")
  .then(response => {
    if (response.ok) return response.json();
    throw new Error("AJAX 통신 실패");
  })
  .then(result => {
    if(result > 0){
      alert("아이디 목록을 휴대전화로 보내드렸습니다.");
    } else {
      alert("아이디 조회에 실패하였습니다.");
    }
  })
  .catch(err => console.error(err));
};



// 비밀번호 변경창 열기
openPwReinput = () => {
  document.querySelector("#inputPwBox").classList.remove("sign-displayNone");
  document.querySelector("#inputPwCBox").classList.remove("sign-displayNone");
};


/* 비밀번호 체크 */
const inputPw = document.querySelector("#inputPw");
const inputPwC = document.querySelector("#inputPwC");
const pwMessage = document.querySelector("#pwMessage");

// 비밀번호입력창이 선택되었을때
inputPw?.addEventListener("focus", () => {
  focusPassword();
});

// 비밀번호 입력 창 밑에 메세지창 만들기
const focusPassword = () => {
    const otherCheck = document.querySelector("#inputMessage");
    if(otherCheck !== null){
      otherCheck.remove();
    }
    // 메세지창 초기화
    pwMessage.innerHTML = "";
    const section = document.createElement("section");
    section.id = "inputMessage";
  
    const div1 = document.createElement("div");
    const check1 = document.createElement("i");
    check1.id = "pwCheck1";
    check1.classList.add("fa-regular", "fa-square-check");
    const span1 = document.createElement("span");
    span1.innerText=" 5~20자리의 비밀번호를 입력 해 주세요.";
    div1.append(check1, span1);
  
    const div2 = document.createElement("div");
    const check2 = document.createElement("i");
    check2.id = "pwCheck2";
    check2.classList.add("fa-regular", "fa-square-check");
    const span2 = document.createElement("span");
    span2.innerText=" 숫자, 특수문자가 포함되어야 합니다.";
    div2.append(check2, span2);
  
    const div3 = document.createElement("div");
    const check3 = document.createElement("i");
    check3.id = "pwCheck3";
    check3.classList.add("fa-regular", "fa-square-check");
    const span3 = document.createElement("span");
    span3.innerText=" 2차입력 비밀번호와 일치해야 합니다.";
    div3.append(check3, span3);
    
    section.append(div1, div2, div3);
    // 메세지추가
    pwMessage.append(section);
};

// Password Input 확인
inputPw?.addEventListener("input", ()=>{
  pwInputCheck();
});

// 기본확인
const pwInputCheck = () => {
    // 메세지창
    const pwCheck1 = document.querySelector("#pwCheck1");
    const pwCheck2 = document.querySelector("#pwCheck2");
    const pwCheck3 = document.querySelector("#pwCheck3");
  
    pwCheck = false;
    const inputPwV = inputPw.value.trim();
    const inputPwCV = inputPwC.value.trim();
  
    if(inputPwV.length > 4 && inputPwV.length<20){
      pwCheck1.classList.remove("fa-regular");
      pwCheck1.classList.add("fa-solid");
    } else {
      pwCheck1.classList.add("fa-regular");
      pwCheck1.classList.remove("fa-solid");
    }
    
    const regEx = /^(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>]).+$/;
    if (regEx.test(inputPwV) === true) {
      pwCheck2.classList.remove("fa-regular");
      pwCheck2.classList.add("fa-solid");
    } else {
      pwCheck2.classList.add("fa-regular");
      pwCheck2.classList.remove("fa-solid");
    }
  
    if(inputPwV === inputPwCV && inputPwV.length*inputPwCV.length !== 0){
      pwCheck3.classList.remove("fa-regular");
      pwCheck3.classList.add("fa-solid");
    } else {
      pwCheck3.classList.add("fa-regular");
      pwCheck3.classList.remove("fa-solid");
    }
  
    if(pwCheck1.classList.contains("fa-solid")
    && pwCheck2.classList.contains("fa-solid")
    && pwCheck3.classList.contains("fa-solid")){
      pwCheck = true;
    } else {
      pwCheck = false;
    }
};

inputPwC?.addEventListener("focus", () => {
  focusPassword();
  pwInputCheck();
});

// 비밀번호확인 Input 확인
inputPwC?.addEventListener("input", ()=>{

  // 메세지창
  const pwCheck1 = document.querySelector("#pwCheck1");
  const pwCheck2 = document.querySelector("#pwCheck2");
  const pwCheck3 = document.querySelector("#pwCheck3");

  pwCheck = false;
  const inputPwV = inputPw.value.trim();
  const inputPwCV = inputPwC.value.trim();

  if(inputPwV === inputPwCV){
    pwCheck3.classList.remove("fa-regular");
    pwCheck3.classList.add("fa-solid");
  } else {
    pwCheck3.classList.add("fa-regular");
    pwCheck3.classList.remove("fa-solid");
  }

  if(pwCheck1.classList.contains("fa-solid")
    && pwCheck2.classList.contains("fa-solid")
    && pwCheck3.classList.contains("fa-solid")){
      pwCheck = true;
    } else {
      pwCheck = false;
    }
});


// 비밀번호 변경버튼 클릭시
const submitPwChange = document.querySelector("#submitPwChange");
submitPwChange?.addEventListener("click", () => {

  if(lastCheckId.length === 0){
    alert("아이디를 입력해 주세요");
    return;
  }

  if(!pwCheck){
    alert("비밀번호가 일치하지 않습니다.");
    return;
  }

  const submitPwChangeObj = {
    "memberId" : lastCheckId,
    "memberPw" : inputPw.value.trim(),
    "memberPhone" : lastCheckPhone
  }

  fetch("/member/login/changePw", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(submitPwChangeObj)
  })
  .then(response => {
    if (response.ok) return response.text();
    throw new Error("AJAX 통신 실패");
  })
  .then(result => {
    if(result > 0){
      alert("비밀번호가 변경되었습니다.");
      location.href="/member/login";
    } else {
      alert("일치하는 ID, 전화번호가 없습니다.");
      return;
    }
  })
  .catch(err => console.error(err));

})