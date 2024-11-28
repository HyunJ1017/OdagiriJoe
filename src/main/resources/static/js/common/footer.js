document.addEventListener('DOMContentLoaded', function() {

  // a링크 클릭시 팝업열기
  const aTegBtns = document.querySelectorAll(".footer a");
  for(let i = 0; i<4; i++){

    aTegBtns[i].addEventListener("click", e => {
      e.preventDefault();
      switch(i){
        case 0 : alertM(strArr.a); break;
        case 1 : alertM(strArr.b); break;
        case 2 : alertM(strArr.c); break;
        case 3 : alertM(strArr.d); break;
      }
    })
  }
  

  let fullHeight = document.documentElement.scrollHeight;
  let windowHeight = window.innerHeight;
  let height = fullHeight - windowHeight;

  
  const count = getFullHeight(7); // 7개의 구간으로 나눔
  
  const sectionXBOX = document.querySelectorAll("#leftSide-barBox div");
  
  window.addEventListener('scroll', function() {
    displayScrollHeight(sectionXBOX, count, height);
  });
  setInterval( () => {
    fullHeight = document.documentElement.scrollHeight;
    windowHeight = window.innerHeight;
    height = fullHeight - windowHeight;

    displayScrollHeight(sectionXBOX, count, height);

  } , 1000);
});

function getFullHeight(divCount) {
  const sectionS = document.querySelector("#leftSide-barBox");
  for (let i = 0; i < divCount; i++) {
      const div = document.createElement("div");
      sectionS.appendChild(div);
  }
  return divCount; // 생성한 구간(div)의 개수를 반환
}


const displayScrollHeight = (sectionXBOX, count, height) => {
  const scrollHeight = Math.floor((window.scrollY / height) * count);
  
  sectionXBOX.forEach(div => div.classList.remove("currentHeight"));
  
  if (scrollHeight < sectionXBOX.length) {
      sectionXBOX[scrollHeight].classList.add("currentHeight");
  } else {
      sectionXBOX[sectionXBOX.length - 1].classList.add("currentHeight");
  }
};

const strArr = {
  "a" : 
  '\n  (주)화사 :: 愛 :: 화공 개인정보 처리 방침'
  +'\n'
  +'\n1. 수집하는 개인정보 항목'
  +'\n'
  +'\n이름, 연락처, 이메일, 주소'
  +'\n서비스 이용 기록, 쿠키, 접속 IP 정보'
  +'\n2. 개인정보의 수집 및 이용 목적'
  +'\n'
  +'\n회원 가입 및 관리'
  +'\n서비스 제공 및 개선'
  +'\n마케팅 및 광고 활용'
  +'\n3. 개인정보의 보유 및 이용 기간'
  +'\n'
  +'\n회원 탈퇴 시 즉시 삭제'
  +'\n법적 의무에 따른 보관 기간 준수'
  +'\n4. 개인정보의 제3자 제공'
  +'\n'
  +'\n원칙적으로 제공하지 않음'
  +'\n필요 시 사전 동의 획득',
  "b" :
  '\n(주)화사 :: 愛 :: 화공 경매 약관'
  +'\n'
  +'\n1. 목적'
  +'\n'
  +'\n경매 절차 및 규정 안내'
  +'\n2. 경매 참여 조건'
  +'\n'
  +'\n회원 가입 및 본인 인증 필수'
  +'\n미성년자 참여 제한'
  +'\n3. 낙찰 및 결제'
  +'\n'
  +'\n최고가 입찰자에게 낙찰'
  +'\n낙찰 후 48시간 내 결제 필요'
  +'\n4. 취소 및 환불 정책'
  +'\n'
  +'\n낙찰 후 취소 불가'
  +'\n하자 발생 시 검토 후 처리',
  "c" : 
  '\n(주)화사 :: 愛 :: 화공 내부 리뷰 규칙'
  +'\n'
  +'\n1. 리뷰 작성 기준'
  +'\n'
  +'\n서비스 및 제품에 대한 솔직한 의견 작성'
  +'\n비방, 허위 정보 금지'
  +'\n2. 금지 사항'
  +'\n'
  +'\n욕설, 명예훼손, 불법 콘텐츠 작성 금지'
  +'\n타인의 리뷰 복사 금지'
  +'\n3. 리뷰 삭제 기준'
  +'\n'
  +'\n규칙 위반 시 관리자 삭제 권한 보유'
  +'\n신고된 리뷰 검토 후 조치',
  "d" :
  '\n(주)화사 :: 愛 :: 화공 운영 정책'
  +'\n'
  +'\n1. 서비스 제공 시간'
  +'\n'
  +'\n24시간 연중무휴 운영'
  +'\n시스템 점검 시 사전 공지'
  +'\n2. 사용자 책임'
  +'\n'
  +'\n계정 정보 보호 및 관리'
  +'\n서비스 이용 중 발생하는 문제에 대한 책임'
  +'\n3. 제재 및 이용 제한'
  +'\n'
  +'\n규정 위반 시 서비스 이용 제한'
  +'\n불법 행위 적발 시 법적 대응'
}