/* 유효성검사항목 */
const submitConfirm = {
  "artistNickname": false,
  "artistProfile" : false,
  "bankNo"        : false,
  "bankCode"     : false
}
let preProfileFl = false;
let prePortfolioFl = false;

/* 프로필 이미지 */

// 미리보기 이미지 표시할 곳
const inputImgPreview = document.querySelector("#imgPreview");
// 이미지 선택
const imgInput = document.querySelector("#artistProfile");
// 마지막으로 선택했던 이미지
let lastInputImg = null;

// 이미지를 선택하여 미리보기 함수를 호출할 경우
const inputPreview = (img) => {

  lastInputImg = img;

  // JS에서 제공하는 파일을 읽어오는 객체
  const reader = new FileReader();

  // 파일을 읽어오는데 DataURL 형식으로 읽어옴
  // DataURL : 파일 전체 "데이터"가 브라우저가 해석할 수 있는 긴 주소형태의 "문자열"로 변환이 됨
  reader.readAsDataURL(img);

  // 선택된 파일이 다 인식되었을때
  reader.addEventListener("load", e => {

    inputImgPreview.src=e.target.result;
    // 파일리더의 결과( (주소처럼생긴)문자열 )의 결과(주소)를 참조주소값에 대입

  })
};

// 이미지 input에 이미지가 선택, 취소 된 경우
imgInput.addEventListener("change", e => {
  // 이미지가 변경되었으면 이전이미지 필요없음
  preProfileFl = false;
  const img = e.target.files[0];
  
  // 이미지 유효성 검사
  let flag = false;

  // 업로드한 이미지 크기 확인
  if(img?.size > 1024*1024*10){
    alertM("10MB 이하의 이미지를 선택해 주세요");
    flag = true;
  }

  // input 태그를 취소한 경우
  if(img === undefined){
    flag = true;
  }

  if(flag){

    // 선택한적 없이 취소한 경우
    if(lastInputImg === null) {
      returnImig(); // 입력이미지 삭제
      return;
    }

    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(lastInputImg);
    // -> lastVaildFile을 요소로 포함한 FileList가 생성이 됨
    // dataTransfer가 가지고 있는 files 필드에 lastVaildFile 추가
    
    // input의 files 변수에 lastVaildFile이 추가된 files 대입
    imgInput.files = dataTransfer.files;

    // 이전 선택된 파일로 미리보기 되돌리기(없어도 되긴 함)
    inputPreview(lastInputImg);

    // 선택된 파일이 없으면 돌아가고, 있으면 미리보기함수를 호출
    return;
  }

  // 미리보기 함수 호출
  inputPreview(img);
});

// 선택취소버튼 클릭시
const deleteImg = document.querySelector("#deleteImg");
deleteImg.addEventListener("click", () => {

  returnImig(); // 이미지 삭제함수
});

const returnImig = () => {
  // 미리보기를 기본이미지로 변경
  // inputImg : 전역변수선언 해둠
  // updatePreview(defaultProfileImg);
  inputImgPreview.src=defaultProfileImg; 

  // input태그와 마지막 선택된 파일을 저장하는 lastValidFile에 저장된 값을 모두 삭제
  imgInput.value = ''; // 기본이미지는 없으면 기본이 뜨니까 파일 저장해 줄 필요 없음
  lastInputImg = null;
}


/* 포트폴리오 파일 */
const artistPortfolio = document.querySelector("#artistPortfolio");

artistPortfolio.addEventListener("change", e => {
  // 포트폴리오가 변경되었으면 이전 포트폴리오 필요없음
  prePortfolioFl = false;
  const portfolio = e.target.files[0];
  
  let fileName = '';
  if(portfolio !== undefined){
    fileName = portfolio.name;
  } else {
    fileName = "포트폴리오를 첨부해 주세요.";
  }

  const artistPortfolioName = document.querySelector("#artistPortfolioName");
  artistPortfolioName.innerHTML = '';
  artistPortfolioName.innerText = fileName;
});


/* 은행 */
const selectBank = document.querySelector("#selectBank");
let bankList;
selectBank.addEventListener("click", () => {
  bankFetch();
});

const bankFetch = () => {
  fetch("/member/myPage/getBankList")
  .then(response => {
    if (response.ok) return response.json();
    throw new Error("AJAX 통신 실패");
  })
  .then(result => {
    showBankList(result);
  })
  .catch(err => console.error(err));
}

const artistBank = document.querySelector("#artistBank");
// 은행목록 보여주기 창 띄우기
const showBankList = (bankList) => {
  const bankListSelect = document.createElement("select");
  bankListSelect.name = "bankCode";

  bankList.forEach(bank => {
    const option = document.createElement("option");
    option.value = bank.bankCode;
    option.innerText = bank.bankName;

    bankListSelect.appendChild(option);
  });

  artistBank.appendChild(bankListSelect);
  submitConfirm.bankCode =true;
  if(artistFl){
    bankListSelect.value = preBankCode;
  }
};


/* 닉네임체크 */
const artistNickname = document.querySelector("#artistNickname");
const nicknameMessage = document.querySelector("#nicknameMessage");

// 닉네임입력창이 선택되었을때
artistNickname?.addEventListener("focus", () => {
  // 다른곳에 열려있던 메세지가 있었다면 지우기
  const otherCheck = document.querySelector("#inputMessage");
  if(otherCheck !== null){
    otherCheck.remove();
  }
  nicknameMessage.innerHTML = "";
  const span = document.createElement("span");
  span.id="inputMessage";
  span.innerText = "한글로된 2~12자의 닉네임을 입력해 주세요";
  nicknameMessage.appendChild(span);
  doNicknameConfirm();
});

// 닉네임 입력시
artistNickname.addEventListener("change", ()=>{

  doNicknameConfirm();

});

const doNicknameConfirm = () => {
  
  artistNickname.classList.remove("confirm-red");
  // 메세지창
  const inputMessage = document.querySelector("#inputMessage");

  submitConfirm.artistNickname = false;
  const inputNickname = artistNickname.value.trim();

  if(inputNickname.length < 2){
    artistNickname.classList.add("confirm-red");
    inputMessage.innerText = "한글로된 2~12자의 이름을 입력해 주세요";
    return;
  }
  
  const regEx = /^[가-힣]+$/;
  if (regEx.test(inputNickname) === false) {
    artistNickname.classList.add("confirm-red");
    inputMessage.innerText = "한글만 입력해 주세요";
    return;
  }

  if(inputNickname.length > 12){
    artistNickname.classList.add("confirm-red");
    inputMessage.innerText = "12자 이하의 ID만 입력가능합니다.";
    return;
  }
    
  fetch("/member/myPage/checkNickname?artistNickname=" + inputNickname)
  .then(response => {
    if (response.ok) return response.json();
    throw new Error("AJAX 통신 실패");
  })
  .then(result => {
    submitConfirm.artistNickname = true;
    artistNickname.classList.remove("confirm-red");
    inputMessage.innerText = "사용 가능한 닉네임 입니다.";
    if(artistFl && preArtistNickname === inputNickname) return;
    if(result > 0){
      submitConfirm.artistNickname = false;
      artistNickname.classList.add("confirm-red");
      inputMessage.innerText = "사용중인 닉네임입니다.";
    }
  })
  .catch(err => console.error(err));
}


/* 계좌번호체크 */
const bankNo = document.querySelector("#bankNo");
const babkNoMessage = document.querySelector("#babkNoMessage");

// 계좌번호입력창이 선택되었을때
bankNo?.addEventListener("focus", () => {
  // 다른곳에 열려있던 메세지가 있었다면 지우기
  const otherCheck = document.querySelector("#inputMessage");
  if(otherCheck !== null){
    otherCheck.remove();
  }
  babkNoMessage.innerHTML = "";
  const span = document.createElement("span");
  span.id="inputMessage";
  span.innerText = "계좌번호를 입력해 주세요";
  babkNoMessage.appendChild(span);
});

// 계좌번호 입력시
bankNo.addEventListener("input", ()=>{

  bankNo.classList.remove("confirm-red");
  // 메세지창
  const inputMessage = document.querySelector("#inputMessage");

  submitConfirm.bankNo = false;
  const inputBankNo = bankNo.value.trim();

  if(inputBankNo.length < 10){
    inputMessage.innerText = "계좌번호를 입력해 주세요";
    return;
  }
  
  const regEx = /^[\d\s-]+$/;
  if (regEx.test(inputBankNo) === false) {
    bankNo.classList.add("confirm-red");
    inputMessage.innerText = "올바른 형태로 입력해 주세요";
    return;
  }


  if(inputBankNo.length > 17){
    bankNo.classList.add("confirm-red");
    inputMessage.innerText = "17자 이하의 계좌번호만 입력가능합니다.";
    return;
  }

  submitConfirm.bankNo = true;
});

// 경력사항 입력칸 추가
let MaxCount = 0;
document.getElementById('workDetailSection').addEventListener('input', function (e) {
  const inputs = document.querySelectorAll('.workDetail');
  let allFilled = true;

  // 빈칸이 있다면 추가함수 실행하지 않음
  inputs.forEach((input) => {
    if (input.value.length === 0) {
      allFilled = false;
    }
  });
  // 최대 2+2 줄까지 출력
  if(MaxCount > 1){
    return;
  }

  MaxCount ++;

  if (allFilled) {
    const newInput = document.createElement('input');
    newInput.type = 'text';
    newInput.className = 'workDetail';
    newInput.name = 'workDetail';
    newInput.placeholder = '경력사항이나 수상내역을 입력해 주세요.';
    this.appendChild(newInput);
  }
});

/* 제출 */
const artistSubmit = document.querySelector("#myPage-main");
artistSubmit?.addEventListener("submit", (e) => {
  e.preventDefault();

  if(submitConfirm.artistNickname === false){
    e.preventDefault();
    alert("닉네임 확인 후 제출해 주시기 바랍니다");
    return;
  }
  if(imgInput.files[0] === undefined && preProfileFl === false){
    e.preventDefault();
    alert("대표작품을 등록을 확인하여 주세요");
    return;
  }
  if(artistPortfolio.files[0] === undefined && prePortfolioFl === false){
    e.preventDefault();
    alert("포트폴리오 등록을 확인하여 주세요");
    return;
  }
  if(submitConfirm.bankNo === false){
    e.preventDefault();
    alert("계좌번호 입력이 잘못되었습니다.");
    return;
  }
  if(submitConfirm.bankCode === false){
    e.preventDefault();
    alert("은행 선택 버튼을 클릭해 주세요.");
    return;
  }

  profileUpload();
});
// 파일등록함수
const profileUpload = () => {

  // 이전 등록이미지를 그대로 사용할 경우
  if(preProfileFl){
    const input1 = document.createElement("input");
    input1.type="hidden";
    input1.name="memberNo";
    input1.value=memberNo;
    artistSubmit.appendChild(input1);
    const form = document.querySelector("#myPage-main");
    form.action = 'updateArtist';
    form.submit()
    return;
  }

  const formData = new FormData();
  const fileRename = "profile" + memberNo + "." +  imgInput.files[0].name.split(".").pop();
  formData.append("image", imgInput.files[0]);
  formData.append("fileName", fileRename);

  alertM("프로필 이미지를 등록하고 있습니다.");
  fetch("/images/profile", {
    method: "POST",
    body: formData
  })
  .then(response => {
    if (response.ok) return response.text();
    throw new Error("AJAX 통신 실패");
  })
  .then(result => {
    if(result !== null){
      alertM("프로필 이미지 등록에 성공하였습니다.");
      const input1 = document.createElement("input");
      input1.type="hidden";
      input1.name="memberNo";
      input1.value=memberNo;
      artistSubmit.appendChild(input1);
      
      const input2 = document.createElement("input");
      input2.type="hidden";
      input2.name="artistProfile";
      input2.value=result;
      artistSubmit.appendChild(input2);

      // 신청정보 업데이트인경우
      if(artistFl){
        const input1 = document.createElement("input");
        input1.type="hidden";
        input1.name="memberNo";
        input1.value=memberNo;
        artistSubmit.appendChild(input1);
        const form = document.querySelector("#myPage-main");
        form.action = 'updateArtist';
        form.submit();
        return;
      }

      document.querySelector("#myPage-main").submit();
    } else {
      alertM("프로필 이미지 등록에 실패하였습니다.");
      return;
    }
  })
  .catch(err => console.error(err));
};

document.addEventListener("DOMContentLoaded", () => {
  if(artistFl === false) return;

  // 이전 신청내역을 가져와서
  // 이미지 가져와서 인풋태그에 저장 X
  // 제출할때 pass
  // 은행코드 선택
  // 포트폴리오 다운로드 생성 및 label>span 채워주기
  // 일단 유효성 검사플레그 다 Y로 변경

  // 이전 이미지 확인용 플레그 세우기
  preProfileFl = true;
  prePortfolioFl = true;

  // 포트폴리오 다운로드 생성
  const artistPortfolioName = document.querySelector("#artistPortfolioName");
  artistPortfolioName.innerHTML = '';
  const a = document.createElement("a");
  a.href = prePortfolio;
  a.id = "profileAtag";
  a.download = `|포트폴리오${memberNo}|`;
  a.innerText = "포트폴리오 다운로드";
  artistPortfolioName.appendChild(a);
  a.addEventListener("click", (event) => {
    event.stopPropagation();
  })

  // 은행코드 가져오기
  bankFetch();

  // 유효성검사 플레그 다 변경
  submitConfirm.artistNickname = true;
  submitConfirm.artistProfile = true;
  submitConfirm.bankNo = true;
  submitConfirm.bankCode = true;
});