const logInMain= document.querySelector("#member-logIn");
const findIdMain = document.querySelector("#member-findId");
const findPwMain = document.querySelector("#member-findPw");
const signUpMain = document.querySelector("#member-signUp");
let currentPage = 0;
let keyFl = false;

// 초기화용 저장객체
const backupHTML = [
  logInMain.innerHTML,
  findIdMain.innerHTML,
  findPwMain.innerHTML,
  signUpMain.innerHTML
];



document.addEventListener("DOMContentLoaded", ()=> {
  
  // 첫화면 로딩하기
  if(pageKey === "logIn") {
    logInMain.style.display = "flex";
    currentPage = 0;
    logInEventAdd();
  } else {
    signUpMain.style.display = "flex";
    currentPage = 3;
    signUpEventAdd();
  }
  
})

// 하단 링크버튼 클릭시 슬라이드 전환
const signMainBtns = document.querySelectorAll(".signMain-btn");
const links = [logInMain, findIdMain, findPwMain, signUpMain];
for(let i=0; i<signMainBtns.length; i++) {
  signMainBtns[i].addEventListener("click", () => {
    if(i === currentPage) return;
    allDisplayNone(i);
    
    // 현재 부모 컨테이너 높이
    const container = document.querySelector("#signMain");
    const currentHeight = document.querySelector("#signMain").offsetHeight;

    // 새 섹션의 높이
    // 임시로 요소 표시
    links[i].style.display = "flex";
    links[i].style.visibility = "hidden"; // 보이지 않게 설정
    links[i].style.position = "absolute"; // 레이아웃에 영향 없음
    // 높이 측정
    const targetHeight = links[i].scrollHeight;
    // 원래 상태로 복구
    links[i].style.visibility = "";
    links[i].style.position = "";
    links[i].style.display = "none";

    // 최대 높이 선택
    const maxHeight = Math.max(currentHeight, targetHeight);

    // 부모 컨테이너 높이를 부드럽게 변경
    container.style.transition = "height 0.3s ease";
    container.style.height = `${maxHeight}px`;
    
    // 슬라이드 효과 적용
    setTimeout(() => {
      links[i].style.transform = "translateX(100%)";
      links[i].style.display = "flex";
      setTimeout(() => {
        links[i].style.transition = "transform 0.3s ease";
        links[i].style.transform = "translateX(0)";
      }, 10);
    }, 300);
    
    // 슬라이드 종료 후 높이 축소 (더 작은 경우)
    setTimeout(() => {
      if (targetHeight < maxHeight) {
        container.style.height = `${targetHeight}px`;
      }
      window.scrollTo({ top: 0, behavior: 'smooth' }); // 부드럽게 스크롤
    }, 600); // 슬라이드 전환 시간 이후 실행
  })
}
const allDisplayNone = (i) => {
  // 현제페이지 초기화
  const num1 = currentPage;
  currentPage = i;
  
  // 왼쪽으로 사라지는 효과
  links[num1].style.transition = "transform 0.3s ease";
  links[num1].style.transform = "translateX(-100%)";
  
  setTimeout(() => {
    // 슬라이드가 끝난 후 초기화
    links[num1].style.display = "none";
    links[num1].innerHTML = backupHTML[num1];
    // 이벤트 재지정
    switch(i) {
      case 0:
        logInEventAdd();
        break;
      case 1:
        findIdEventAdd();
        break;
      case 2:
        findPwEventAdd();
        break;
      case 3:
        signUpEventAdd();
        break;
    }
  }, 300); // transition 시간과 동일하게 설정
}

// 로그인
const logInEventAdd = () => {
  const logInBtn = document.querySelector("#logIn-btn");
  const inputPw = document.querySelector("#logIn-inputPw");
  const inputId = document.querySelector("#logIn-inputId");

  logInBtn.addEventListener("click", () => {
    if(inputId.value.trim().length === 0)return;
    if(inputPw.value.trim().length === 0)return;
    goLogIn();
  });
  inputId.addEventListener("keyup", (e)=> {
    if(inputId.value.trim().length === 0)return;
    if(inputPw.value.trim().length === 0)return;
    if(e.key === "Enter") goLogIn();
  })
  inputPw.addEventListener("keyup", (e)=> {
    if(inputId.value.trim().length === 0)return;
    if(inputPw.value.trim().length === 0)return;
    if(e.key === "Enter") goLogIn();
  })
  const goLogIn = () => {
    const form = document.createElement("form");
    form.action="/member/login";
    form.method="POST";
    const input1 = document.createElement("input");
    input1.type = "hidden";
    input1.value = inputId.value.trim();
    input1.name = "memberId";
    const input2 = document.createElement("input");
    input2.type = "hidden";
    input2.value = inputPw.value.trim();
    input2.name = "memberPw";
    form.append(input1,input2);
    document.querySelector("body").append(form);
    form.submit();
  }
}

// 아이디 찾기
const findIdEventAdd = () => {
  const inputPh = document.querySelector("#findId-inputPh");
  const phoneCheckBtn = document.querySelector("#findId-phCheck");
  const signUpCounter = document.querySelector("#findId-count");
  keyFl = false;
  let lastCheckPhone = '';

  phoneCheckBtn?.addEventListener("click", ()=>{

    const inputPhoneV = inputPh.value.trim();

    if(inputPhoneV.length === 0){
      alertM("전화번호를 입력해 주세요");
      return;
    }

    const regEx = /^[0-9\s-]+$/;
    if (!regEx.test(inputPhoneV)) {
      alertM("올바른 형태의 전화번호를 입력해 주세요.");
      return;
    }

    if (inputPhoneV.replace(/[^\d]/g, "").length !==11 && inputPhoneV.replace(/[^\d]/g, "").length !==10) {
      alertM("10 ~ 11 자리의 번호를 입력해 주세요.");
      return;
    }

    lastCheckPhone = inputPh.value.replace(/[^\d]/g, "");
    sendSms(lastCheckPhone, signUpCounter);

  });


  // 인증확인버튼
  const keyCheck = document.querySelector("#findId-keyCheck");
  const inputPhC = document.querySelector("#findId-inputPhC");
  keyCheck.addEventListener("click", () => {
    if(keyFl === false) return;

    if(signUpCounter.classList.contains("confirm-red")){
      alertM("입력시간이 만료되었습니다.");
      keyFl = false;
      return;
    }

    fetch("/sms/authKeyCheck?authKey=" + inputPhC.value.trim() + "&phoneNumber=" + lastCheckPhone, "")
    .then(response => {
      if (response.ok) return response.text();
      throw new Error("AJAX 통신 실패");
    })
    .then(result => {
      if(result == 1){
        // 카운터 정지
        clearInterval(authTimer);
        /* 아이디리스트를 해당 전화번호로 전송 */
        sendIdList( lastCheckPhone );
        return;
      } else if (result == 2) {
        alertM("인증번호가 잘못 입력되었습니다.\n다시 확인해 주세요");
        return;
      } else {
        alertM("입력시간이 만료되었습니다.");
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
        location.href = "/member/login?message=" + "아이디 목록을 문자메세지로 보내드렸습니다.";
      } else {
        alertM("아이디 조회에 실패하였습니다.");
      }
    })
    .catch(err => console.error(err));
  };

} // findIdEventAdd end

// 비밀번호 찾기
const findPwEventAdd = () => {
  console.log("비밀번호 이벤트 시작");

  const inputId = document.querySelector("#findPw-inputId");
  const inputPh = document.querySelector("#findPw-inputPh");
  const phoneCheckBtn = document.querySelector("#findPw-phCheck");
  const signUpCounter = document.querySelector("#findPw-count");
  keyFl = false;
  let pwCheck = false;
  let lastCheckId = '';
  let lastCheckPhone = '';

  phoneCheckBtn?.addEventListener("click", (e)=>{
    // 부모요소 이벤트 막기
    e.stopPropagation();

    const inputPhoneV = inputPh.value.trim();

    if(inputPhoneV.length === 0){
      alertM("전화번호를 입력해 주세요");
      return;
    }

    const regEx = /^[0-9\s-]+$/;
    if (!regEx.test(inputPhoneV)) {
      alertM("올바른 형태의 전화번호를 입력해 주세요.");
      return;
    }

    if (inputPhoneV.replace(/[^\d]/g, "").length !==11 && inputPhoneV.replace(/[^\d]/g, "").length !==10) {
      alertM("10 ~ 11 자리의 번호를 입력해 주세요.");
      return;
    }

    if(inputId.value.length === 0){
      alertM("아이디를 입력해 주세요");
      return;
    }

    lastCheckId = inputId.value;
    lastCheckPhone = inputPh.value.replace(/[^\d]/g, "");

    fetch("/member/login/searchIdPh?inputPhone=" + lastCheckPhone + "&inputId=" + lastCheckId )
    .then(response => {
      if (response.ok) return response.text();
      throw new Error("AJAX 통신 실패");
    })
    .then(result => {
      if(result == 0){
        alertM("전화번호와 일치하는 ID가 없습니다.");
      } else {
        sendSms(lastCheckPhone, signUpCounter);
      }
    })
    .catch(err => console.error(err));
  }); // phoneCheckBtn end


  // 인증확인버튼
  const keyCheck = document.querySelector("#findPw-keyCheck");
  const inputPhC = document.querySelector("#findPw-inputPhC");
  keyCheck.addEventListener("click", () => {
    if(keyFl === false) return;

    if(signUpCounter.classList.contains("confirm-red")){
      alertM("입력시간이 만료되었습니다.");
      keyFl = false;
      return;
    }

    fetch("/sms/authKeyCheck?authKey=" + inputPhC.value.trim() + "&phoneNumber=" + inputPh.value.trim() )
    .then(response => {
      if (response.ok) return response.text();
      throw new Error("AJAX 통신 실패");
    })
    .then(result => {
      if(result == 1){
        // 카운터 정지
        clearInterval(authTimer);
        /* 비밀번호 재입력창 열기 */
        openPwReinput();
      } else if (result == 2) {
        alertM("인증번호가 잘못 입력되었습니다.\n다시 확인해 주세요");
        return;
      } else {
        alertM("입력시간이 만료되었습니다.");
        keyFl = false;
        return;
      }
      
    })
    .catch(err => console.error(err));

  })



  // 비밀번호 변경창 열기
  const openPwReinput = () => {
    document.querySelector("#findPw-inputPwBox").classList.remove("sign-displayNone");
    document.querySelector("#findPw-inputPwCBox").classList.remove("sign-displayNone");
    console.log(document.querySelector("#signMain").style.height);
    console.log(document.querySelector("#member-findPw").scrollHeight);
    document.querySelector("#signMain").style.height = document.querySelector("#member-findPw").scrollHeight + 'px';
    console.log(document.querySelector("#signMain").style.height);
    /* 비밀번호 체크 */
    const inputPw = document.querySelector("#findPw-inputPw");
    const inputPwC = document.querySelector("#findPw-inputPwC");
    const pwMessage = document.querySelector("#findPw-pwMessage");
    // 비밀번호입력창이 선택되었을때
    inputPw?.addEventListener("focus", () => {
      focusPassword(pwMessage);
    });
    // Password Input 확인
    inputPw?.addEventListener("change", ()=>{
      pwInputCheck(inputPw, inputPwC);
    });
    inputPwC?.addEventListener("change", ()=>{
      pwInputCheck(inputPw, inputPwC);
    });
    inputPwC?.addEventListener("focus", () => {
      focusPassword(pwMessage);
      pwInputCheck(inputPw, inputPwC);
    });
  };

  // 비밀번호 입력 창 밑에 메세지창 만들기
  const focusPassword = (pwMessage) => {
      const otherCheck = document.querySelector("#find-inputMessage");
      if(otherCheck !== null){
        otherCheck.remove();
      }
      // 메세지창 초기화
      pwMessage.innerHTML = "";
      const section = document.createElement("section");
      section.id = "find-inputMessage";
    
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

  // 기본확인
  const pwInputCheck = (inputPw, inputPwC) => {
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



  // 비밀번호 변경버튼 클릭시
  const submitPwChange = document.querySelector("#findPw-submitPwChange");
  submitPwChange?.addEventListener("click", () => {

    const inputPw = document.querySelector("#inputPw");

    if(lastCheckId.length === 0){
      alertM("아이디를 입력해 주세요");
      return;
    }

    if(!pwCheck){
      alertM("비밀번호가 일치하지 않습니다.");
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
        location.href="/member/login?message=" + "비밀번호가 변경되었습니다";
      } else {
        alertM("일치하는 ID, 전화번호가 없습니다.");
        return;
      }
    })
    .catch(err => console.error(err));

  }); // submitPwChange end
} // findPwEventAdd end


const sendSms = (phoneNumber, CounterDom) => {
  fetch("/sms/sendSms?phoneNumber=" + phoneNumber + "&typeCode=1")
  .then(response => {
    if (response.ok) return response.text();
    throw new Error("AJAX 통신 실패");
  })
  .then(result => {
    if(result > 0){
      alertM("인증번호가 발송되었습니다.");
      keyFl = true;
      startCount(CounterDom);
    } else {
      alertM("인증번호 발송에 실패하였습니다.\n전화번호를 다시 확인하시거나 관리자에게 문의하십시오");
    }
  })
  .catch(err => console.error(err));
} // sendSms end

const initTime = "05:00"; // 인증 초기시간
const initMin  = 4;       // 초기값 5분에서 1초 감소된 후 분
const initSec  = 59;      // 초기값 5분에서 1초 감소된 후 초
let min        = initMin; // 실제 줄어든 시간 분
let sec        = initSec; // 실제 줄어든 시간 초
let authTimer;            // 타이머 역할의 setInterval을 저장할 변수
//                           타이머를 멈추는 clearInterval 수행을 위해 필요
// 카운트 스타트
const startCount = (CounterDom) => {

  CounterDom.innerText = initTime;
  CounterDom.classList.remove("confirm-red");

  authTimer = setInterval(() => {
    CounterDom.innerText = `${addZero(min)}:${addZero(sec)}`;
    if( min === 0 && sec === 0) {
      clearInterval(authTimer);
      keyFl = false;
      CounterDom.classList.add("confirm-red");
    }
    if( sec === 0 ){    // 출력된 초가 0인 경우(1분지남)
      sec = 60;
      min--;
    }
    sec--;
  }, 1000);
}; // startCount end
function addZero(num){
  if(num<10) return "0" + num;
  else       return num;
} // addZero end

const signUpEventAdd = () => {
  /* 유효성검사항목 */
  const signConfirm = {
    "nameCheck"  : false,
    "idCheck"    : false,
    "emailCheck" : false,
    "pwCheck"    : false,
    "phonCheck"  : false
  }

  /* 이름 체크 */
  const inputName = document.querySelector("#signUp-inputName");
  const nameMessage = document.querySelector("#signUp-nameMessage");

  // 이름입력창이 선택되었을때
  inputName?.addEventListener("focus", () => {
    // 다른곳에 열려있던 메세지가 있었다면 지우기
    const otherCheck = document.querySelector("#signUp-inputMessage");
    if(otherCheck !== null){
      otherCheck.remove();
    }
    // 메세지창 초기화
    nameMessage.innerHTML = "";
    const span = document.createElement("span");
    span.id="signUp-inputMessage";
    span.innerText = "이름을 입력해 주세요";
    // 메세지추가
    nameMessage.appendChild(span);
  });

  // Name Input 확인
  inputName?.addEventListener("change", ()=>{

    // 메세지창
    const inputMessage = document.querySelector("#signUp-inputMessage");

    signConfirm.nameCheck = false;
    const inputNameV = inputName.value.trim();

    if(inputNameV.length < 2){
      inputMessage.classList.add("confirm-red");
      inputMessage.classList.remove("confirm-green");
      inputMessage.innerText = "이름을 입력해 주세요";
      return;
    }
    
    const regEx = /^[가-힣]+$/;
    if (regEx.test(inputNameV) === false) {
      inputMessage.classList.add("confirm-red");
      inputMessage.classList.remove("confirm-green");
      inputMessage.innerText = "한글로 된 이름만 입력해 주세요";
      return;
    }


    if(inputNameV.length > 6){
      inputMessage.classList.add("confirm-red");
      inputMessage.classList.remove("confirm-green");
      inputMessage.innerText = "6자 까지만 입력해 주세요.";
      return;
    } else {
      inputMessage.classList.remove("confirm-red");
      inputMessage.classList.add("confirm-green");
      inputMessage.innerText = "이름을 입력해 주세요";
      signConfirm.nameCheck = true;
    }
  });


  /* 아이디체크 */
  const inputId = document.querySelector("#signUp-inputId");
  const idCheckBtn = document.querySelector("#signUp-idCheck");
  const idMessage = document.querySelector("#signUp-idMessage");

  // 아이디입력창이 선택되었을때
  inputId?.addEventListener("focus", () => {
    // 다른곳에 열려있던 메세지가 있었다면 지우기
    const otherCheck = document.querySelector("#signUp-inputMessage");
    if(otherCheck !== null){
      otherCheck.remove();
    }
    idMessage.innerHTML = "";
    const span = document.createElement("span");
    span.id="signUp-inputMessage";
    span.innerText = "영어와 숫자로 구성된 6~12자의 ID를 입력해 주세요";
    idMessage.appendChild(span);
  });

  // ID Input태그 색상변환
  inputId.addEventListener("change", ()=>{

    // 메세지창
    const inputMessage = document.querySelector("#signUp-inputMessage");

    signConfirm.idCheck = false;
    const inputIdV = inputId.value.trim();

    if(inputIdV.length < 6){
      inputMessage.classList.add("confirm-red");
      inputMessage.classList.remove("confirm-green");
      inputMessage.innerText = "영어와 숫자로 구성된 6~12자의 ID를 입력해 주세요";
      return;
    }
    
    const regEx = /^[a-zA-Z0-9]+$/;
    if (regEx.test(inputIdV) === false) {
      inputMessage.classList.add("confirm-red");
      inputMessage.classList.remove("confirm-green");
      inputMessage.innerText = "영어와 숫자만 입력해 주세요";
      return;
    }


    if(inputIdV.length > 12){
      inputMessage.classList.add("confirm-red");
      inputMessage.classList.remove("confirm-green");
      inputMessage.innerText = "12자 이하의 ID만 입력가능합니다.";
      return;
    } else {
      inputMessage.classList.remove("confirm-red");
      inputMessage.classList.add("confirm-green");
      inputMessage.innerText = "영어와 숫자로 구성된 6~12자의 ID를 입력해 주세요";
    }
  });

  idCheckBtn?.addEventListener("click", ()=>{

    signConfirm.idCheck = false;
    const inputIdV = inputId.value.trim();
    // 메세지창
    const inputMessage = document.querySelector("#signUp-inputMessage");

    if(inputIdV.length === 0){
      inputMessage.classList.add("confirm-red");
      inputMessage.classList.remove("confirm-green");
      inputMessage.innerText = "영어와 숫자로 구성된 6~12자의 ID를 입력해 주세요";
      alertM("ID를 입력 해 주세요");
      return;
    }

    const regEx = /^[a-zA-Z0-9]{6,12}$/;
    if (regEx.test(inputIdV) === false) {
      inputMessage.classList.add("confirm-red");
      inputMessage.classList.remove("confirm-green");
      inputMessage.innerText = "영어와 숫자로 구성된 6~12자의 ID를 입력해 주세요";
      alertM("6~12글자의 영어, 숫자만 입력 해 주세요");
      return;
    }

    fetch("/member/signUp/idCheck?inputId=" + inputIdV)
    .then(response => {
      if (response.ok) return response.text();
      throw new Error("AJAX 통신 실패");
    })
    .then(result => {
      document.querySelector("#signUp-inputMessage").innerText = '';
      if(result > 0){
        document.querySelector("#signUp-inputMessage").classList.add("confirm-red");
        document.querySelector("#signUp-inputMessage").classList.remove("confirm-green");
        document.querySelector("#signUp-inputMessage").innerText = "이미 사용중인 ID 입니다.";
        return;
      } else {
        document.querySelector("#signUp-inputMessage").classList.remove("confirm-red");
        document.querySelector("#signUp-inputMessage").classList.add("confirm-green");
        document.querySelector("#signUp-inputMessage").innerText = "사용 가능한 ID 입니다.";
        signConfirm.idCheck = true;
      }
    })
    .catch(err => console.error(err));

  });



  /*이메일 체크 */
  const inputEmail = document.querySelector("#signUp-inputEmail");
  const emailMessage = document.querySelector("#signUp-emailMessage");

  // 이메일입력창이 선택되었을때
  inputEmail?.addEventListener("focus", () => {
    // 다른곳에 열려있던 메세지가 있었다면 지우기
    const otherCheck = document.querySelector("#signUp-inputMessage");
    if(otherCheck !== null){
      otherCheck.remove();
    }
    // 메세지창 초기화
    emailMessage.innerHTML = "";
    const span = document.createElement("span");
    span.id="signUp-inputMessage";
    span.innerText = "[whasaAnd@whapung.com] 형태의 이메일을 입력 해 주세요.";
    // 메세지추가
    emailMessage.appendChild(span);
  });

  // Email Input 확인
  inputEmail?.addEventListener("change", ()=>{

    signConfirm.emailCheck = false;
    const inputEmailV = inputEmail.value.trim();
    // 메세지창
    const inputMessage = document.querySelector("#signUp-inputMessage");

    const regEx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if(regEx.test(inputEmailV) === true ){
      inputMessage.classList.remove("confirm-red");
      inputMessage.classList.add("confirm-green");
      signConfirm.emailCheck = true;
    } else {
      signConfirm.emailCheck = false;
      inputMessage.classList.add("confirm-red");
      inputMessage.classList.remove("confirm-green");
    }
  });



  /* 비밀번호 체크 */
  const inputPw = document.querySelector("#signUp-inputPw");
  const inputPwC = document.querySelector("#signUp-inputPwC");
  const pwMessage = document.querySelector("#signUp-pwMessage");

  // 비밀번호입력창이 선택되었을때
  inputPw?.addEventListener("focus", () => {
    focusPassword();
  });

  // 비밀번호 입력 창 밑에 메세지창 만들기
  const focusPassword = () => {
      // 다른곳에 열려있던 메세지가 있었다면 지우기
      const otherCheck = document.querySelector("#signUp-inputMessage");
      if(otherCheck !== null){
        otherCheck.remove();
      }
      // 메세지창 초기화
      pwMessage.innerHTML = "";
      const section = document.createElement("section");
      section.id="signUp-inputMessage";
    
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
    
      signConfirm.pwCheck = false;
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
        signConfirm.pwCheck = true;
      } else {
        signConfirm.pwCheck = false;
      }
  };

  inputPwC?.addEventListener("focus", () => {
    focusPassword();
    pwInputCheck();
  });

  // 비밀번호확인 Input 확인
  inputPwC?.addEventListener("change", ()=>{

    // 메세지창
    const pwCheck1 = document.querySelector("#pwCheck1");
    const pwCheck2 = document.querySelector("#pwCheck2");
    const pwCheck3 = document.querySelector("#pwCheck3");

    signConfirm.pwCheck = false;
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
        signConfirm.pwCheck = true;
      } else {
        signConfirm.pwCheck = false;
      }
  });



  /* 전화번호 */
  const inputPh = document.querySelector("#signUp-inputPh");
  const phoneCheckBtn = document.querySelector("#signUp-phCheck");
  const phMessage = document.querySelector("#signUp-phMessage");
  const signUpCounter = document.querySelector("#signUp-count");
  keyFl = false;

  // 전화번호입력창이 선택되었을때
  inputPh?.addEventListener("focus", () => {
    // 다른곳에 열려있던 메세지가 있었다면 지우기
    const otherCheck = document.querySelector("#signUp-inputMessage");
    if(otherCheck !== null){
      otherCheck.remove();
    }
    // 메세지창 초기화
    phMessage.innerHTML = "";
    const span = document.createElement("span");
    span.id="signUp-inputMessage";
    span.innerText = "전화번호를 입력해 주세요";
    // 메세지추가
    phMessage.appendChild(span);
  });

  inputPh?.addEventListener("change", ()=>{

    const inputMessage = document.querySelector("#signUp-inputMessage");

    signConfirm.phonCheck = false;
    const inputPhoneV = inputPh.value.trim();

    if(inputPhoneV.length === 0){
      inputPh.classList.add("confirm-red");
      return;
    }

    const regEx = /^[0-9]+$/;
    if (regEx.test(inputPhoneV) === false) {
      inputMessage.classList.add("confirm-red");
      inputMessage.classList.remove("confirm-green");
      inputMessage.innerText = "숫자만 입력해 주세요";
      return;
    }
    
    if(inputPhoneV.length > 11){
      inputMessage.classList.add("confirm-red");
      inputMessage.classList.remove("confirm-green");
      inputMessage.innerText = "전화번호 형식이 알맞지 않습니다.";
      return;
    } else {
      inputMessage.classList.remove("confirm-red");
      inputMessage.classList.add("confirm-green");
      inputMessage.innerText = "전화번호를 입력해 주세요";
    }
  });

  phoneCheckBtn?.addEventListener("click", ()=>{

    signConfirm.phonCheck = false;
    let inputPhoneV = inputPh.value.trim();

    if(inputPhoneV.length === 0){
      alertM("전화번호를 입력해 주세요");
      return;
    }

    const regEx = /^[0-9\s-]+$/;
    if (!regEx.test(inputPhoneV)) {
      alertM("올바른 형태의 전화번호를 입력해 주세요.");
      return;
    }

    inputPhoneV = inputPhoneV.replace(/[^\d]/g, "");
    if (inputPhoneV.length !==11 && inputPhoneV.length !==10) {
      alertM("10 ~ 11 자리의 번호를 입력해 주세요.");
      return;
    }
    
    sendSms(inputPhoneV, signUpCounter);

  });


  // 인증확인버튼
  const keyCheck = document.querySelector("#signUp-keyCheck");
  const inputPhC = document.querySelector("#signUp-inputPhC");
  keyCheck.addEventListener("click", () => {
    
    if(keyFl === false) return;

    if(signUpCounter.classList.contains("confirm-red")){
      alertM("입력시간이 만료되었습니다.");
      keyFl = false;
      return;
    }

    fetch("/sms/authKeyCheck?authKey=" + inputPhC.value.trim() + "&phoneNumber=" + inputPh.value.trim() )
    .then(response => {
      if (response.ok) return response.text();
      throw new Error("AJAX 통신 실패");
    })
    .then(result => {
      
      if(result == 1){
        clearInterval(authTimer);
        alertM("전화번호 인증이 완료되었습니다.");
        signConfirm.phonCheck = true;
        return;
      } else if (result == 2) {
        alertM("인증번호가 잘못 입력되었습니다.\n다시 확인해 주세요");
        signConfirm.phonCheck = false;
        return;
      } else {
        alertM("입력시간이 만료되었습니다.");
        signConfirm.phonCheck = false;
        keyFl = false;
        return;
      }
    })
    .catch(err => console.error(err));

  })


  /* 가입하기버튼 클릭시 */
  const signUpBtn = document.querySelector("#signUp-btn");
  signUpBtn.addEventListener("click", ()=>{

    if(!signConfirm.nameCheck) {
      alertM("이름 입력을 다시 확인해 주세요.\n한글로된 2~6글자만 입력이 가능합니다.");
      return;
    }
    if(!signConfirm.idCheck) {
      alertM("ID 중복검사를 해주세요");
      return;
    }
    if(!signConfirm.emailCheck) {
      alertM("잘못된 이메일 형식입니다.");
      return;
    }
    if(!signConfirm.pwCheck) {
      alertM("비밀번호가 잘못 입력되었습니다.");
      return;
    }
    // if(!signConfirm.phonCheck) {
    //   alertM("전화번호 인증을 해 주십시오");
    //   return;
    // }

    const signUpObj = {
      "memberName" : inputName.value,
      "memberId" : inputId.value,
      "memberEmail" : inputEmail.value,
      "inputPw" : inputPw.value,
      "memberPhone" : inputPh.value
    }

    fetch("/member/signUp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(signUpObj)
    })
    .then(response => {
      if (response.ok) return response.text();
      throw new Error("AJAX 통신 실패");
    })
    .then(result => {
      if(result < 1){
        alertM("회원가입 실패");
      } else {
        logIn(signUpObj);
      }
    })
    .catch(err => console.error(err));
    
  });

  const logIn = (obj) => {
    const form = document.createElement("form");
    form.action="/member/login";
    form.method="POST";
    const input1 = document.createElement("input");
    input1.type = "hidden";
    input1.value = obj.memberId;
    input1.name = "memberId";
    const input2 = document.createElement("input");
    input2.type = "hidden";
    input2.value = obj.inputPw;
    input2.name = "memberPw";
    form.append(input1,input2);
    document.querySelector("body").append(form);
    form.submit();
  }
} // signUpEventAdd end