const saleBtn = document.querySelector(".sale-btn");
const auctionBtn = document.querySelector(".auction-btn");
const title = document.querySelector("#pieceTitle");
const detail = document.querySelector("#pieceDetail");
const pieceType = document.querySelector("#pieceType");
const piceStatus = document.querySelector("#pieceStatus");
const sizeX = document.querySelector("#sizeX");
const sizeY = document.querySelector("#sizeY");
const salePopup = document.querySelector(".sale-popup");
const auctionPopup = document.querySelector(".auction-popup");
const startDate = document.querySelector("#startDate");
const sellCancel = document.querySelector("#sell-cancel");
const auctionCancel = document.querySelector("#auction-cancel");
const form = document.querySelector("#upload-form");
let pieceNo = 0;
let clickFl = false;
let tempCheck = false;
if(document.querySelector("#pieceNo")) {
  pieceNo = document.querySelector("#pieceNo").value;
  tempCheck = true;
}

// 판매버튼 클릭시 화면 보이기
saleBtn.addEventListener("click", () => {
  clickConFirm();
  if(!clickFl) return;
  pieceType.value = 1;
  piceStatus.value = 'N';
  salePopup.classList.remove("display-none");
});
// 판매버튼 클릭시 화면 보이기2
auctionBtn.addEventListener("click", () => {
  clickConFirm();
  if(!clickFl) return;
  auctionPopup.classList.remove("display-none");
  pieceType.value = 2;
  piceStatus.value = 'A';
});
const clickConFirm = () => {
  clickFl = false;
  if(imgInput.files[0] === undefined && !tempCheck){
    alert("작품 이미지를 첨부해 주세요.");
    return;
  }
  if(title.value.trim().length === 0){
    title.placeholder="작품에 대한 설명을 입력해주세요.";
    title.focus();
    return;
  }
  if(detail.value.trim().length === 0){
    detail.placeholder="작품에 대한 설명을 입력해주세요.";
    detail.focus();
    return;
  }
  
  if (sizeX.value.length === 0) {
    sizeX.placeholder="가로크기";
    sizeX.focus();
    return;
  }
  if (sizeY.value.length === 0) {
    sizeY.placeholder="가로크기";
    sizeY.focus();
    return;
  }
  const regEx = /^\d*\.?\d*$/; // 숫자와 소수점만 허용하는 정규식

  if (!regEx.test(sizeX.value)) { // sizeX 값 유효성 검사
    sizeX.value = "";
    sizeX.placeholder = "소숫점을 포함한 숫자만 입력가능합니다.";
    sizeX.focus();
    return;
  }

  if (!regEx.test(sizeY.value)) { // sizeY 값 유효성 검사
    sizeY.value = "";
    sizeY.placeholder = "소숫점을 포함한 숫자만 입력가능합니다.";
    sizeY.focus();
    return;
  }
  
  clickFl = true;
} // clickConFirm end

// 취소버튼
sellCancel.addEventListener("click", () => {
  salePopup.classList.add("display-none");
  pieceType.value = "1";
})
auctionCancel.addEventListener("click", () => {
  auctionPopup.classList.add("display-none");
  pieceType.value = "1";
})


/* 작품 이미지 */

// 미리보기 이미지 표시할 곳
const inputImgPreview = document.querySelector("#preview-image");
// 이미지 선택
const imgInput = document.querySelector("#file-upload");
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

const returnImig = () => {
  // 미리보기를 기본이미지로 변경
  // inputImg : 전역변수선언 해둠
  // updatePreview(defaultPieceImg);
  inputImgPreview.src=defaultPieceImg; 

  // input태그와 마지막 선택된 파일을 저장하는 lastValidFile에 저장된 값을 모두 삭제
  imgInput.value = ''; // 기본이미지는 없으면 기본이 뜨니까 파일 저장해 줄 필요 없음
  lastInputImg = null;
}

// 임시저장버튼 클릭시
const saveBtn = document.querySelector("#save-button");
saveBtn.addEventListener("click", () => {
  if(!confirm("작품을 저장하실 건가요?")){
    return;
  }
  piceStatus.value = 'T';
  formSubmitSequence();
})

// 제출시
form.addEventListener("submit", e => {
  e.preventDefault();
  formSubmitSequence();
})

const formSubmitSequence = () => {
  
  if(imgInput.files[0] === undefined && !tempCheck){
    alert("작품 이미지를 첨부해 주세요.");
    return;
  }
  if(title.value.trim().length === 0){
    title.placeholder="작품에 대한 설명을 입력해주세요.";
    auctionPopup.classList.add("display-none");
    salePopup.classList.add("display-none");
    title.focus();
    return;
  }
  if(detail.value.trim().length === 0){
    detail.placeholder="작품에 대한 설명을 입력해주세요.";
    auctionPopup.classList.add("display-none");
    salePopup.classList.add("display-none");
    detail.focus();
    return;
  }
  
  if (sizeX.value.length === 0) {
    sizeX.placeholder="가로크기";
    auctionPopup.classList.add("display-none");
    salePopup.classList.add("display-none");
    sizeX.focus();
    return;
  }
  if (sizeY.value.length === 0) {
    sizeY.placeholder="가로크기";
    auctionPopup.classList.add("display-none");
    salePopup.classList.add("display-none");
    sizeY.focus();
    return;
  }
  const regEx = /^\d*\.?\d*$/; // 숫자와 소수점만 허용하는 정규식

  if (!regEx.test(sizeX.value)) { // sizeX 값 유효성 검사
    sizeX.value = "";
    sizeX.placeholder = "작품 크기는 소숫점을 포함한 숫자만 입력가능합니다.";
    auctionPopup.classList.add("display-none");
    salePopup.classList.add("display-none");
    sizeX.focus();
    return;
  }

  if (!regEx.test(sizeY.value)) { // sizeY 값 유효성 검사
    sizeY.value = "";
    sizeY.placeholder = "작품 크기는  소숫점을 포함한 숫자만 입력가능합니다.";
    auctionPopup.classList.add("display-none");
    salePopup.classList.add("display-none");
    sizeY.focus();
    return;
  }

  /* 임시저장 할 작품이면 바로 호출 */
  // 작품번호 있을 수 있고 없을 수 있음
  if(piceStatus.value === 'T'){
    if(pieceNo !== 0) {
      pieceUpload();
      return;

    } else {
      /* 작품번호 얻어오기 */
      fetch("/coolPiece/getPieceNo")
      .then(response => {
        if (response.ok) return response.json();
        throw new Error("AJAX 통신 실패");
      })
      .then(result => {
        pieceNo = result;
        pieceUpload();
      })
      .catch(err => console.error(err));
      return;
    }
  }

  if(auctionPopup.classList.contains("display-none")){
    // 즉시판매창이 열려있는경우
    const sellPrice = document.querySelector("#sellPrice");
    if(sellPrice.value.length === 0){
      sellPrice.placeholder="판매가격을 입력해 주세요";
      sellPrice.focus();
      return;
    }
    if(sellPrice.value < 10000){
      alertM("만원 이상의 판매가격을 입력해 주세요");
      sellPrice.focus();
      return;
    }
  }
  if(salePopup.classList.contains("display-none")){
    // 경매판매창이 열려있는경우
    const datePicker = document.querySelector("#datePicker");
    if(datePicker.value.length === 0){
      datePicker.placeholder="경매일자를 선택해주세요";
      return;
    }
    const startPrice = document.querySelector("#startPrice");
    if(startPrice.value.length === 0){
      startPrice.placeholder="시작가를 입력해 주세요";
      startPrice.focus();
      return;
    }
    const hopePrice = document.querySelector("#hopePrice");
    if(hopePrice.value.length === 0){
      hopePrice.placeholder="희망낙찰가를 입력해 주세요";
      hopePrice.focus();
      return;
    }
    if(hopePrice.value < 100000){
      alertM("10만원 이상의 희망낙찰가를 입력해 주세요");
      hopePrice.focus();
      return;
    }
  }

  if(pieceNo !== 0) pieceUpload();
  else 
  /* 작품번호 얻어오기 */
  fetch("/coolPiece/getPieceNo")
  .then(response => {
    if (response.ok) return response.json();
    throw new Error("AJAX 통신 실패");
  })
  .then(result => {
    pieceNo = result;
    pieceUpload();
  })
  .catch(err => console.error(err));

};

// 파일등록함수
const pieceUpload = () => {
  if(imgInput.files[0] !== undefined) {
    const formData = new FormData();
    const fileRename = "piece" + pieceNo + "." +  imgInput.files[0].name.split(".").pop();
    formData.append("image", imgInput.files[0]);
    formData.append("fileName", fileRename);

    alertM("작품 이미지를 등록하고 있습니다.");
    fetch("/images/piece", {
      method: "POST",
      body: formData
    })
    .then(response => {
      if (response.ok) return response.text();
      throw new Error("AJAX 통신 실패");
    })
    .then(result => {
      if(result !== null){
        alertM("작품 이미지 등록에 성공하였습니다.");
        const input1 = document.createElement("input");
        input1.type="hidden";
        input1.name="memberNo";
        input1.value=memberNo;
        form.appendChild(input1);
        
        const input2 = document.querySelector("#pieceRename");
        input2.value=result;
        form.appendChild(input2);
        
        const input3 = document.createElement("input");
        input3.type="hidden";
        input3.name="pieceNo";
        input3.value=pieceNo;
        form.appendChild(input3);

        if(piceStatus.value === 'T') {
          document.querySelector("#upload-form").action="/piece/saveTemp";
          document.querySelector("#upload-form").submit();
          return;
        }

        let notiUrl;
        let notiContent;
    
        if(pieceType.value === "1"){
          notiUrl = `/piece/onlineDetail?pieceNo=${pieceNo}`;
          notiContent = '팔로우한 작가가 새로운 작품을 업로드했습니다.';
        }
        else if(pieceType.value === "2"){
          notiUrl = `/auction/upCommingDetail?pieceNo=${pieceNo}`;
          notiContent = '팔로우한 작가가 새로운 경매를 업로드했습니다.';
        }
        
        sendNotification("F", notiUrl, pieceNo, notiContent);

        document.querySelector("#upload-form").submit();
      } else {
        alertM("프로필 이미지 등록에 실패하였습니다.");
        return;
      }
    })
    .catch(err => console.error(err));

  } else {

    alertM("작품을 등록하겠습니다.");
    const input1 = document.createElement("input");
    input1.type="hidden";
    input1.name="memberNo";
    input1.value=memberNo;
    form.appendChild(input1);
    
    const input3 = document.createElement("input");
    input3.type="hidden";
    input3.name="pieceNo";
    input3.value=pieceNo;
    form.appendChild(input3);

    if(piceStatus.value === 'T') {
      document.querySelector("#upload-form").action="/piece/saveTemp";
      document.querySelector("#upload-form").submit();
      return;
    }
    document.querySelector("#upload-form").submit();
  }
};