/* 유효성검사항목 */
const signConfirm = {
  "nameCheck"  : false,
  "idCheck"    : false,
  "emailCheck" : false,
  "pwCheck"    : false,
  "phonCheck"  : false
}


/* 이름 체크 */
const inputName = document.querySelector("#inputName");
const nameMessage = document.querySelector("#nameMessage");

// 이름입력창이 선택되었을때
inputName?.addEventListener("focus", () => {
  // 다른곳에 열려있던 메세지가 있었다면 지우기
  const otherCheck = document.querySelector("#inputMessage");
  if(otherCheck !== null){
    otherCheck.remove();
  }
  // 메세지창 초기화
  nameMessage.innerHTML = "";
  const span = document.createElement("span");
  span.id="inputMessage";
  span.innerText = "이름을 입력해 주세요";
  // 메세지추가
  nameMessage.appendChild(span);
});

// Name Input 확인
inputName?.addEventListener("input", ()=>{

  // 메세지창
  const inputMessage = document.querySelector("#inputMessage");

  signConfirm.nameCheck = false;
  const inputNameV = inputName.value.trim();

  if(inputNameV.length < 2){
    inputId.classList.add("confirm-red");
    inputMessage.innerText = "이름을 입력해 주세요";
    return;
  }
  
  const regEx = /^[가-힣]+$/;
  if (regEx.test(inputNameV) === false) {
    inputId.classList.add("confirm-red");
    inputMessage.innerText = "한글로 된 이름만 입력해 주세요";
    return;
  }


  if(inputNameV.length > 6){
    inputId.classList.add("confirm-red");
    inputMessage.innerText = "6자 까지만 입력해 주세요.";
    return;
  } else {
    inputId.classList.remove("confirm-red");
    inputMessage.innerText = "이름을 입력해 주세요";
    signConfirm.nameCheck = true;
  }
});


/* 아이디체크 */
const inputId = document.querySelector("#inputId");
const idCheckBtn = document.querySelector("#idCheck");
const idMessage = document.querySelector("#idMessage");

// 아이디입력창이 선택되었을때
inputId?.addEventListener("focus", () => {
  // 다른곳에 열려있던 메세지가 있었다면 지우기
  const otherCheck = document.querySelector("#inputMessage");
  if(otherCheck !== null){
    otherCheck.remove();
  }
  idMessage.innerHTML = "";
  const span = document.createElement("span");
  span.id="inputMessage";
  span.innerText = "영어와 숫자로 구성된 6~12자의 ID를 입력해 주세요";
  idMessage.appendChild(span);
});

// ID Input태그 색상변환
inputId.addEventListener("input", ()=>{

  // 메세지창
  const inputMessage = document.querySelector("#inputMessage");

  signConfirm.idCheck = false;
  const inputIdV = inputId.value.trim();

  if(inputIdV.length === 0){
    inputId.classList.add("confirm-red");
    inputMessage.innerText = "영어와 숫자로 구성된 6~12자의 ID를 입력해 주세요";
    return;
  }
  
  const regEx = /^[a-zA-Z0-9]+$/;
  if (regEx.test(inputIdV) === false) {
    inputId.classList.add("confirm-red");
    inputMessage.innerText = "영어와 숫자만 입력해 주세요";
    return;
  }


  if(inputIdV.length > 12){
    inputId.classList.add("confirm-red");
    inputMessage.innerText = "12자 이하의 ID만 입력가능합니다.";
    return;
  } else {
    inputId.classList.remove("confirm-red");
    inputMessage.innerText = "영어와 숫자로 구성된 6~12자의 ID를 입력해 주세요";
  }
});

idCheckBtn?.addEventListener("click", ()=>{

  signConfirm.idCheck = false;
  const inputIdV = inputId.value.trim();

  if(inputIdV.length === 0){
    alert("ID를 입력 해 주세요");
    return;
  }

  const regEx = /^[a-zA-Z0-9]{6,12}$/;
  if (regEx.test(inputIdV) === false) {
    alert("6~12글자의 영어, 숫자만 입력 해 주세요");
    return;
  }

  fetch("/member/signUp/idCheck?inputId=" + inputIdV)
  .then(response => {
    if (response.ok) return response.text();
    throw new Error("AJAX 통신 실패");
  })
  .then(result => {
    if(result > 0){
      alert("이미 사용중인 ID 입니다.");
      return;
    } else {
      alert("사용 가능한 ID 입니다.");
      signConfirm.idCheck = true;
    }
  })
  .catch(err => console.error(err));

});



/*이메일 체크 */
const inputEmail = document.querySelector("#inputEmail");
const emailMessage = document.querySelector("#emailMessage");

// 이름입력창이 선택되었을때
inputEmail?.addEventListener("focus", () => {
  // 다른곳에 열려있던 메세지가 있었다면 지우기
  const otherCheck = document.querySelector("#inputMessage");
  if(otherCheck !== null){
    otherCheck.remove();
  }
  // 메세지창 초기화
  emailMessage.innerHTML = "";
  const span = document.createElement("span");
  span.id="inputMessage";
  span.innerText = "[whasaAnd@whapung.com] 형태의 이메일을 입력 해 주세요.";
  // 메세지추가
  emailMessage.appendChild(span);
});

// Name Input 확인
inputEmail?.addEventListener("input", ()=>{


  signConfirm.emailCheck = false;
  const inputEmailV = inputEmail.value.trim();

  const regEx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if(regEx.test(inputEmailV) === true ){
    signConfirm.emailCheck = true;
  } else {
    signConfirm.emailCheck = false;
  }
});



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
    // 다른곳에 열려있던 메세지가 있었다면 지우기
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
inputPwC?.addEventListener("input", ()=>{

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
const inputPh = document.querySelector("#inputPh");
const phoneCheckBtn = document.querySelector("#phCheck");
const phMessage = document.querySelector("#phMessage");

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

  signConfirm.idCheck = false;
  const inputPhoneV = inputId.value.trim();

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

  fetch("/member/signUp/sendSms?inputPhone=" + inputPhoneV)
  .then(response => {
    if (response.ok) return response.json();
    throw new Error("AJAX 통신 실패");
  })
  .then(result => {
    console.log(result);
  })
  .catch(err => console.error(err));

});



/* 가입하기버튼 클릭시 */
const signUpBtn = document.querySelector("#signUp-btn");
signUpBtn.addEventListener("click", ()=>{

  if(!signConfirm.nameCheck) {
    alert("이름 입력을 다시 확인해 주세요.\n한글로된 2~6글자만 입력이 가능합니다.");
    return;
  }
  if(!signConfirm.idCheck) {
    alert("ID 중복검사를 해주세요");
    return;
  }
  if(!signConfirm.emailCheck) {
    alert("잘못된 이메일 형식입니다.");
    return;
  }
  if(!signConfirm.pwCheck) {
    alert("비밀번호가 잘못 입력되었습니다.");
    return;
  }
  // if(!signConfirm.phonCheck) {
  //   alert("전화번호 인증을 해 주십시오");
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
      alert("회원가입 실패");
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