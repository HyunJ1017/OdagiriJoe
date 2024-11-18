/* 이름변경서비스 */
const nameSec = document.querySelector("#myPage-name");
let nameSecBackUp;

// 이름칸 클릭시
nameSec.addEventListener("click", () => {
  if(nameSec.classList.contains("active")) return;
  nameSecBackUp = nameSec.innerHTML;
  const name = nameSec.innerHTML;
  nameSec.innerHTML = "";

  const label = document.createElement("label");
  const input = document.createElement("input");
  input.type = "text";
  input.value = name;
  input.id = "memberName";
  label.htmlFor = "memberName";
  const div = document.createElement("div");
  div.classList.add("member-hov");
  div.innerText = "수정하기";
  div.addEventListener("click", () => {submitId()});
  const div2 = document.createElement("div");
  div2.classList.add("member-hov");
  div2.innerText = "취소";
  div2.addEventListener("click", () => {
    nameCancle();
  });

  label.append(input, div, div2);
  nameSec.append(label);
  input.focus();
  nameSec.classList.add("active");
})

const nameCancle = () => {
  nameSec.innerHTML = ""; // 비우기

  setTimeout(() => {
    nameSec.innerHTML = nameSecBackUp; // 백업된 HTML 복구
    nameSec.classList.remove("active"); // 'active' 제거
  }, 0);
}

// 이름 변경 요청
const submitId = () => {

  const inputName = document.querySelector("#memberName").value.trim();

  if(inputName.length < 2){
    alert("이름을 입력해 주세요");
    return;
  }
  const regEx = /^[가-힣]+$/;
  if (regEx.test(inputName) === false) {
    alert("한글로 된 이름만 입력해 주세요");
    return;
  }
  if(inputName.length > 6){
    alert("6자 까지만 입력해 주세요.");
    return;
  }

  const submitIdObj = {
    "memberNo" : memberNo,
    "memberName" : inputName
  }

  fetch("/member/myPage/updateName", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(submitIdObj)
  })
  .then(response => {
    if (response.ok) return response.text();
    throw new Error("AJAX 통신 실패");
  })
  .then(result => {
    if(result > 0){
      nameSecBackUp = inputName;
      nameCancle();
    } else {
      alert("다시 시도해 주새요");
      return;
    }
  })
  .catch(err => console.error(err));

};


/* 비밀번호변경 */
const pwSec = document.querySelector("#myPage-pw");
let pwSecBackUp;
let pwCheck = false;

// 비밀번호칸 클릭시
pwSec.addEventListener("click", () => {
  if(pwSec.classList.contains("active")) return;
  pwSecBackUp = pwSec.innerHTML;
  pwSec.innerHTML = "";

  // 현재비밀번호
  const label0 = document.createElement("label");
  const input0 = document.createElement("input");
  input0.type = "password";
  input0.placeholder = "현재 비밀번호";
  input0.id="memberPw";
  label0.htmlFor = "memberPw";
  label0.append(input0);

  // 새 비밀번호
  const label1 = document.createElement("label");
  const input1 = document.createElement("input");
  input1.type = "password";
  input1.placeholder = "새 비밀번호";
  input1.id = "inputPw";
  label1.htmlFor="inputPw";
  const div = document.createElement("div");
  div.classList.add("member-hov");
  div.innerText = "수정하기";
  div.addEventListener("click", () => {submitPw()});
  const div2 = document.createElement("div");
  div2.classList.add("member-hov");
  div2.innerText = "취소";
  div2.addEventListener("click", () => {
    pwSec.innerHTML = ""; // 비우기
    
    setTimeout(() => {
       pwSec.innerHTML = pwSecBackUp; 
       pwSec.classList.remove("active"); // 'active' 제거
     }, 0);
    });
  label1.append(input1, div, div2);
  pwSec.classList.add("active");

  // 새 비밀번호 확인
  const label2 = document.createElement("label");
  const input2 = document.createElement("input");
  input2.type = "password";
  input2.placeholder = "새 비밀번호 확인";
  input2.id = "inputPwCheck";
  label2.htmlFor = "inputPwCheck"
  label2.append(input2);

  // 유효성검사창
  const section = document.createElement("section");
  section.id = "inputMessage";

  const div3 = document.createElement("div");
  const check1 = document.createElement("i");
  check1.id = "pwCheck1";
  check1.classList.add("fa-regular", "fa-square-check");
  const span1 = document.createElement("span");
  span1.innerText=" 5~20자리의 비밀번호를 입력 해 주세요.";
  div3.append(check1, span1);

  const div4 = document.createElement("div");
  const check2 = document.createElement("i");
  check2.id = "pwCheck2";
  check2.classList.add("fa-regular", "fa-square-check");
  const span2 = document.createElement("span");
  span2.innerText=" 숫자, 특수문자가 포함되어야 합니다.";
  div4.append(check2, span2);

  const div5 = document.createElement("div");
  const check3 = document.createElement("i");
  check3.id = "pwCheck3";
  check3.classList.add("fa-regular", "fa-square-check");
  const span3 = document.createElement("span");
  span3.innerText=" 2차입력 비밀번호와 일치해야 합니다.";
  div5.append(check3, span3);
  
  section.append(div3, div4, div5);

  pwSec.append(label0, label1, label2, section);
  input0.focus();

  // 비밀번호 유효성검사
    
  // Password Input 확인
  const inputPw = document.querySelector("#inputPw");
  const inputPwC = document.querySelector("#inputPwCheck");
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
});

// 비밀번호 변경 요청
const submitPw = () => {

  if(!pwCheck) {
    alert("새 비밀번호의 형식이 올바르지 않습니다.")
    return;
  }

  const memberPw = document.querySelector("#memberPw").value.trim();
  const inputPw = document.querySelector("#inputPw").value.trim();

  const submitPwObj = {
    "memberNo" : memberNo,
    "memberPw" : memberPw,
    "inputPw" : inputPw
  }

  fetch("/member/myPage/updatePw", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(submitPwObj)
  })
  .then(response => {
    if (response.ok) return response.text();
    throw new Error("AJAX 통신 실패");
  })
  .then(result => {
    if(result > 0){
      nameSec.innerHTML = pwSecBackUp;
    } else {
      alert("현재 비밀번호가 일치하지 않습니다.");
      return;
    }
  })
  .catch(err => console.error(err));

};


/* 전화번호 변경 서비스 */
const phoneSec = document.querySelector("#myPage-phone");
let phoneSecBackUp;
let lastCheckedPhone;
let keyFl = false;

// 전화번호칸 클릭시
phoneSec.addEventListener("click", () => {
  if(phoneSec.classList.contains("active")) return;
  phoneSecBackUp = phoneSec.innerHTML;
  phoneSec.innerHTML = "";

  const label = document.createElement("label");
  const input = document.createElement("input");
  input.type = "text";
  input.placeholder = "새 전화번호를 입력 해 주세요";
  input.id = "memberName";
  label.htmlFor = "memberName";
  const div = document.createElement("div");
  div.classList.add("member-hov");
  div.innerText = "인증하기";
  div.addEventListener("click", () => {requestAuthNo()});
  const div2 = document.createElement("div");
  div2.classList.add("member-hov");
  div2.innerText = "취소";
  div2.addEventListener("click", () => {
    phoneSec.innerHTML = ""; // 비우기
    
    setTimeout(() => {
      phoneSec.innerHTML = pwSecBackUp; 
      phoneSec.classList.remove("active"); // 'active' 제거
     }, 0);
    });
  label.append(input, div, div2);

  const label2 = document.createElement("label");
  const input2 = document.createElement("input");
  input2.type = "text";
  input2.placeholder = "인증번호를 입력해 주세요";
  input2.id = "memberPhoneCheck";
  label2.htmlFor = "memberPhoneCheck";
  const div3 = document.createElement("div");
  div3.classList.add("member-hov");
  div3.innerText = "변경하기";
  div3.addEventListener("click", () => {keyCheck()});
  label2.append(input2, div3);

  phoneSec.append(label, label2);
  input.focus();
  phoneSec.classList.add("active");
})

const initTime = "05:00"; // 인증 초기시간
const initMin  = 4;       // 초기값 5분에서 1초 감소된 후 분
const initSec  = 59;      // 초기값 5분에서 1초 감소된 후 초
let min        = initMin; // 실제 줄어든 시간 분
let sec        = initSec; // 실제 줄어든 시간 초
let authTimer;            // 타이머 역할의 setInterval을 저장할 변수
//                           타이머를 멈추는 clearInterval 수행을 위해 필요
// 카운트 스타트
const startCount = () => {
  const signUpCounter = document.querySelector("#signUp-count");

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

};

function addZero(num){
  if(num<10) return "0" + num;
  else       return num;
}
// 전화번호 인증
const requestAuthNo = () => {
  lastCheckedPhone = document.querySelector("#memberPhone").value.trim();

  if(lastCheckedPhone.length === 0){
    alert("전화번호를 입력해 주세요");
    return;
  }

  const regEx = /^[0-9]+$/;
  if (regEx.test(lastCheckedPhone) === false) {
    alert("숫자만 입력 해 주세요");
    return;
  }

  const regEx2 = /^[0-9]{10,11}$/;
  if (regEx2.test(lastCheckedPhone) === false) {
    alert('올바른 형태의 전화번호를 입력해 주세요.\n"010"을 포함한 10~11자리의 숫자만 입력 가능합니다.');
    return;
  }

  fetch("/sms/sendSms?phoneNumber=" + lastCheckedPhone + "&typeCode=1")
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

};

// 인증키 체크
const keyCheck = () => {

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
      submitPhone();
      return;
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
}

// 전화번호 변경 요청
const submitPhone = () => {

  const inputPhone = lastCheckedPhone;

  const submitPhoneObj = {
    "memberNo" : memberNo,
    "memberPhone" : inputPhone
  }

  fetch("/member/myPage/updatePhone", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(submitPhoneObj)
  })
  .then(response => {
    if (response.ok) return response.text();
    throw new Error("AJAX 통신 실패");
  })
  .then(result => {
    if(result > 0){
      phoneSec.innerHTML = lastCheckedPhone;
    } else {
      alert("다시 시도해 주새요");
      return;
    }
  })
  .catch(err => console.error(err));

};


const myPageUpdateBtn = document.querySelector("#myPage-update");

myPageUpdateBtn.addEventListener("click", () => {
  let str = '';
  str += '개인정보를 수정할 수 있습니다.';
  str += '\n수정을 원하시는 항목을 클릭하면 수정창이 나타납니다.';
  str += '\n[수정 가능목록]';
  str += '\n[이름]';
  str += '\n[비밀번호]';
  str += '\n[전화번호]';
  alert(str);
})