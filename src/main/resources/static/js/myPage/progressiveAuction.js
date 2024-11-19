/* 버튼클릭시 페이지 이동 */

/* url 모음 */
const urls = {
  /* 상세보기 */ "detail" : "/",
  /* 입금화면 */ "payment" : "/"
}

// 입금하기 버튼 클릭시 입금 페이지로 이동? 팝업열기?
const paymentBtns = document.querySelectorAll(".piece-payment");
paymentBtns?.forEach(btn => {
  btn.addEventListener("click", () => {
    location.href = urls.detail;
  })
}) // paymentBtns end

// 상세정보 버튼 클릭시 상세정보 페이지로 이동
const detailBtns = document.querySelectorAll(".detailBtn");
detailBtns?.forEach(btn => {
  btn.addEventListener("click", () => {
    location.href = urls.detail;
  })
}) // detailBtns end

// 이미지 로딩 완료시 이미지 띄움
function hideLoader(imgElement) {
  const loader = imgElement.nextElementSibling; // loader div
  loader.style.display = 'none'; // 로딩 이미지 숨기기
  imgElement.style.display = 'block'; // 실제 이미지 보이기
} // hideLoader end

// ajax로 현재 작품의 최고 입찰가 받아와 비교후 교체하기
const getEndprice = () => {
  const currentPrices = document.querySelectorAll(".current-price");

  currentPrices.forEach(currentPrice => {
    let endPrice = 0;
    if (currentPrice.innerText.trim().startsWith("내")) {  // "내"로 시작하는지 확인
      endPrice = parseInt(
        currentPrice.innerText
          .replace("내 입찰액 ₩", "") // "내 입찰액 ₩" 제거
          .replace(/[^\d]/g, ""),     // 숫자가 아닌 모든 문자 제거
        10
      );
    }
    const pieceNo = currentPrice.dataset.pieceNo;

    fetch("/member/myPage/getEndprice?pieceNo=" + pieceNo)
    .then(response => {
      if (response.ok) return response.text();
      throw new Error("AJAX 통신 실패");
    })
    .then(result => {
        if(result > endPrice) {
          currentPrice.innerHTML = '';
          const getPrice = new Intl.NumberFormat('ko-KR').format(result);
          currentPrice.innerHTML = "현재 입찰액 \u20A9" + getPrice;
        }
    })
    .catch(err => console.error(err));
  });
}

// 페이지 로딩시 현재 작품의 최고 입찰가 받아와 비교후 교체하고 1분마다 재실행
document.addEventListener("DOMContentLoaded", () => {
  getEndprice();
  setInterval(getEndprice, 60000);
});