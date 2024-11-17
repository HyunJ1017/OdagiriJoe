/* 버튼클릭시 페이지 이동 */

/* url 모음 */
const urls = {
  /* 상세보기 */ "detail" : "/",
  /* 배달정보 */ "delivery" : "/"
}


// 배달정보 버튼 클릭시 배달정보 페이지로 이동
const deliveryBtns = document.querySelectorAll(".deliveryBtn");
deliveryBtns?.forEach(btn => {
  btn.addEventListener("click", () => {
    location.href = urls.delivery;
  })
})

// 상세정보 버튼 클릭시 상세정보 페이지로 이동
const detailBtns = document.querySelectorAll(".detailBtn");
detailBtns?.forEach(btn => {
  btn.addEventListener("click", () => {
    location.href = urls.detail;
  })
})


// 이미지 로딩완료시 이미지 표시 및 로딩이미지 숨기기
function hideLoader(imgElement) {
  const loader = imgElement.nextElementSibling; // loader div
  loader.style.display = 'none'; // 로딩 이미지 숨기기
  imgElement.style.display = 'block'; // 실제 이미지 보이기
}


// ajax로 현재 작품의 최고 입찰가 받아와 비교후 교체하기
const getEndprice = () => {
  const currentPrices = document.querySelectorAll(".current-price");

  currentPrices.forEach(currentPrice => {
    const pieceNo = currentPrice.dataset.pieceNo;

    fetch("/member/myPage/getEndprice?pieceNo=" + pieceNo)
    .then(response => {
      if (response.ok) return response.text();
      throw new Error("AJAX 통신 실패");
    })
    .then(result => {
      currentPrice.innerHTML = '';
      const getPrice = new Intl.NumberFormat('ko-KR').format(result);
      currentPrice.innerHTML = getPrice;
    })
    .catch(err => console.error(err));
  });
}

// 페이지 로딩시 현재 작품의 최고 입찰가 받아와 비교후 교체하고 1분마다 재실행
document.addEventListener("DOMContentLoaded", () => {
  getEndprice();
  setInterval(getEndprice, 60000);
});