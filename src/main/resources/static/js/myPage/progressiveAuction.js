/* 버튼클릭시 페이지 이동 */

/* url 모음 */
const urls = {
    /* 경매진행작 */ "detailCurrent" : "/auction/currentDetail?pieceNo=",
}

// 상세정보 버튼 클릭시 상세정보 페이지로 이동
const detailBtns = document.querySelectorAll(".piece-detales");
detailBtns?.forEach(btn => {
  btn.addEventListener("click", () => {
    location.href = urls.detailCurrent + btn.dataset.pieceNo;
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
          .replace(/[^\d]/g, "")     // 숫자가 아닌 모든 문자 제거
      );
    }
    const pieceNo = currentPrice.dataset.pieceNo;

    fetch("/member/myPage/getEndprice?pieceNo=" + pieceNo)
    .then(response => {
      if (response.ok) return response.text();
      throw new Error("AJAX 통신 실패");
    })
    .then(result => {
        if(Number(result.replace(/[^\d]/g, "")) > Number(endPrice)) {
          currentPrice.innerHTML = '';
          const getPrice = result;
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


/* 구매하기 버튼 가져오기 */
const purchaseBtn = document.querySelectorAll(".piece-payment");

/* 구매하기 버튼 클릭 시 구매 팝업 창 열기 */
purchaseBtn.forEach(btn => {
  
  btn.addEventListener("click", (e) => {

    const pieceNo = e.target.dataset.pieceNo;
  
    // peiceNo를 URL 파라미터로 추가해서 팝업 창으로 전달
    const width = 700;
    const height = 700;
    const left = (window.screen.width / 2) - (width / 2);
    const top = (window.screen.height / 2) - (height / 2);
  
    const popup = window.open (
      `/piece/purchasePopup?pieceNo=${pieceNo}`,
      'popup',
      `width=${width}, height=${height}, left=${left}, top=${top}, scrollbars=no, location=no, status=no, menubar=no`
    );
  
    // 상태 코드 초기화
    let statusCode = null;
  
    // 창 닫힘 감지
    const checkClose = setInterval(() => {
      if (popup.closed) {
        clearInterval(checkClose); // 타이머 정지
        console.log(`창 닫힘. 상태 코드: ${statusCode}`);

        // 상태 코드에 따라 처리
        if (statusCode === 'error') {
          console.log('결제중 오류가 발생했습니다.');
        } else if (statusCode === 'success') {
          window.location.href = '/main';
        } else {
          console.log('창닫기');
        }
      }
    }, 500);
  
    // 메시지 받기 (상태 코드)
    window.addEventListener('message', (event) => {
        if (event.origin !== window.location.origin) {
            console.warn('다른 도메인의 메시지는 처리하지 않습니다.');
            return;
        }
        statusCode = event.data; // 상태 코드 저장
    });
  });

})
// /* 결제 ㅜㅜ */
// // let channelKey = "channel-key-96637ccf-2cd4-427a-ad69-57447b1a4391";
// // let loginMemberNO = memberNo;
// // let loginName = "홍길동";
// let pieceTitle = "";
// let pieceNo = 0;
// let payAmount = 0;
// let payName = "";
// let payPhone = "";
// let deliveryType = "";
// let deliveryAddress = "";

// // 입금하기 버튼 클릭시 팝업열기
// const popupView = document.querySelector("#popup-view");
// const paymentBtns = document.querySelectorAll(".piece-payment");
// paymentBtns?.forEach(btn => {
//   btn.addEventListener("click", (e) => {
    
//     pieceTitle = e.target.dataset.pieceTitle;
//     pieceNo = e.target.dataset.pieceNo;
//     payAmount = e.target.dataset.payAmount.replace(/[^\d]/g, "");
//     popupView.classList.remove("display-none");

//   })
// }) // paymentBtns end

// // 팝업창 닫기
// const popupClose = document.querySelector("#popup-close");
// popupClose.addEventListener("click", () => {
//   popupView.classList.add("display-none");
// });

// // 결제하기 클릭시 유효성검사
// const paymentBtn = document.querySelector("#popup-register");
// paymentBtn.addEventListener("click", () => {
  
//   // 채크된 input type="radio" 얻어오기
//   const deliverySelect = document.querySelector('[name="receiveMethod"]:checked');
//   if(deliverySelect === null) {
//     alert("배송방법을 선택해 주세요");
//     return;
//   }
//   // console.log(deliverySelect.value);
//   deliveryType = deliverySelect.value;

//   // deliveryType의 값이 delivery 일때 주소 입력여부 확인하기
//   if(deliveryType === "delivery") {
//     const addressInput = document.querySelector("#address1");
//     if(addressInput.value.trim() === "") {  // 주소 입력여부 확인
//       alert("주소를 입력해 주세요");
//       return;
//     }
//     const addressInput2 = document.querySelector("#address2");
//     if(addressInput2.value.trim() === "") {  // 상세주소 입력여부 확인
//       alert("상세주소를 입력해 주세요");
//       return;
//     }
//     deliveryAddress = addressInput.value.trim() + ", " + addressInput2.value.trim();
//     // console.log(loginAddress);
//   }

//   // 전화번호 입력여부 확인하기
//   const phoneInput = document.querySelector("#phone").value;
//   let onlyNumbers = phoneInput.replace(/\D/g, '');
//   if(onlyNumbers.length < 10 || onlyNumbers.length > 11) {
//     alert("전화번호를 입력해 주세요");
//     return;
//   }
//   payPhone = onlyNumbers;
//   payName = loginName;
//   // console.log(loginTel);

//   // console.log("pieceTitle", pieceTitle);
//   // console.log("pieceNo", pieceNo);
//   // console.log("payAmount", payAmount);
//   // console.log("payPhone", payPhone);
//   // console.log("deliveryType", deliveryType);
//   // console.log("loginAddress", deliveryAddress);

//   fetch("/payment/pleseKey")
//   .then(response => {
//     if (response.ok) return response.json();
//     throw new Error("AJAX 통신 실패");
//   })
//   .then(result => {
//     callPayment(result);
//   })
//   .catch(err => console.error(err));

// }); // paymentBtn event end

// // 결체저리
// const callPayment = (result) => {
//   const channelKey = result.chennelKey;
//   const chennelId = result.chennelId;

//   // console.log("channelKey", result);
//   // console.log("memberNo", memberNo);
//   // console.log("pieceTitle", pieceTitle);
//   // console.log("pieceNo", pieceNo);
//   // console.log("payAmount", payAmount);
//   // console.log("payName", payName);
//   // console.log("payPhone", payPhone);
//   // console.log("deliveryType", deliveryType);
//   // console.log("deliveryAddress", deliveryAddress);

//   IMP.init(chennelId);

//   IMP.request_pay(
//     {
//       channelKey: channelKey,
//       pay_method: "card",
//       merchant_uid: `payment-${crypto.randomUUID()}`, // 주문 고유 번호
//       name: pieceTitle,
//       amount: 100,
//       buyer_name: payName,
//       buyer_addr: deliveryAddress,
//       m_redirect_url: "/main"
//     },
//     async (response) => {
//       if (response.error_code != null) {
//         fetch("/pay/fail", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({"error_code" : response.error_code, "error_msg" : response.error_msg})
//         })
//       }
//       else 
//       // 고객사 서버에서 /payment/complete 엔드포인트를 구현해야 합니다.
//       // (다음 목차에서 설명합니다)
//       await notified(response);
      
//     }
//   );
// };

// // 결제 성공시 수행할 함수
// const notified = async (response) => {
//   // 폼 생성
//   const form = document.createElement("form");
//   form.method = "POST";
//   form.action = "/payment/payment/complete";

//   // 데이터를 input 요소로 추가
//   const data = {
//     impUid: response.imp_uid,
//     merchantUid: response.merchant_uid,
//     memberNo: memberNo,
//     pieceNo: pieceNo,
//     payAmount: payAmount,
//     payName: payName,
//     payPhone: payPhone,
//     deliveryType: deliveryType,
//     deliveryAddress: deliveryAddress
//   };

//   // 데이터를 폼에 추가
//   for (const key in data) {
//     if (data.hasOwnProperty(key)) {
//       const input = document.createElement("input");
//       input.type = "hidden";
//       input.name = key;
//       input.value = data[key];
//       form.appendChild(input);
//     }
//   }

//   // 폼을 body에 추가 후 제출
//   document.body.appendChild(form);
//   form.submit();
// };