
document.addEventListener('DOMContentLoaded', function () {
  const deliveryOption = document.getElementById('deliveryOption');
  const pickupOption = document.getElementById('pickupOption');
  const addressInput = document.getElementById('address');
  const detailAddressInput = document.getElementById('detailAddress');

  // 수령 방법 선택 시 주소 입력창 활성화/비활성화
  function toggleAddressInput() {
    if (deliveryOption.checked) {
      // 배송 선택 시 주소 입력창 활성화
      addressInput.disabled = false;
      detailAddressInput.disabled = false;
    } else if (pickupOption.checked) {
      // 직접수령 선택 시 주소 입력창 비활성화
      addressInput.disabled = true;
      detailAddressInput.disabled = true;
      // 입력된 내용도 초기화
      addressInput.value = '';
      detailAddressInput.value = '';
    }
  }

  // 라디오 버튼 클릭 이벤트 리스너 추가
  deliveryOption.addEventListener('change', toggleAddressInput);
  pickupOption.addEventListener('change', toggleAddressInput);

  // 초기 상태 설정
  toggleAddressInput();
});


/* 결제 */
let pieceTitle = "";
let pieceNo = 0;
let payAmount = 0;
let payName = "";
let payPhone = "";
let deliveryType = "";
let deliveryAddress = "";


// 등록하기 클릭시 유효성검사
const paymentBtn = document.querySelector("#registerButton");
paymentBtn.addEventListener("click", () => {
  
  // 채크된 input type="radio" 얻어오기
  const deliverySelect = document.querySelector('[name="receiveMethod"]:checked');
  if(deliverySelect === null) {
    alert("배송방법을 선택해 주세요");
    return;
  }
  // console.log(deliverySelect.value);
  deliveryType = deliverySelect.value;

  // deliveryType의 값이 delivery 일때 주소 입력여부 확인하기
  if(deliveryType === "delivery") {
    const addressInput = document.querySelector("#address");
    if(addressInput.value.trim() === "") {  // 주소 입력여부 확인
      alert("주소를 입력해 주세요");
      return;
    }
    const addressInput2 = document.querySelector("#detailAddress");
    if(addressInput2.value.trim() === "") {  // 상세주소 입력여부 확인
      alert("상세주소를 입력해 주세요");
      return;
    }
    deliveryAddress = addressInput.value.trim() + ", " + addressInput2.value.trim();
    // console.log(loginAddress);
  }

  // 전화번호 입력여부 확인하기
  const phoneInput = document.querySelector("#phone").value;
  let onlyNumbers = phoneInput.replace(/\D/g, '');
  if(onlyNumbers.length < 10 || onlyNumbers.length > 11) {
    alert("전화번호를 입력해 주세요");
    return;
  }
  payPhone = onlyNumbers;
  payName = loginName; 
  pieceTitle = document.querySelector("#pieceTitle").value;
  payAmount = document.querySelector("#payAmount").value;
  const urlParams = new URLSearchParams(window.location.search);
  pieceNo = urlParams.get('pieceNo');

  fetch("/payment/pleseKey")
  .then(response => {
    if (response.ok) return response.json();
    throw new Error("AJAX 통신 실패");
  })
  .then(result => {
    callPayment(result);
  })
  .catch(err => console.error(err));

}); // paymentBtn event end

// 결체저리
const callPayment = (result) => {
  const channelKey = result.chennelKey;
  const chennelId = result.chennelId;

  // console.log("channelKey", result);
  // console.log("memberNo", memberNo);
  // console.log("pieceTitle", pieceTitle);
  // console.log("pieceNo", pieceNo);
  // console.log("payAmount", payAmount);
  // console.log("payName", payName);
  // console.log("payPhone", payPhone);
  // console.log("deliveryType", deliveryType);
  // console.log("deliveryAddress", deliveryAddress);

  IMP.init(chennelId);

  IMP.request_pay(
    {
      channelKey: channelKey,
      pay_method: "card",
      merchant_uid: `payment-${crypto.randomUUID ? crypto.randomUUID() : Date.now()}`, // 주문 고유 번호
      name: pieceTitle,
      amount: 100,
      buyer_name: payName,
      buyer_addr: deliveryAddress,
      m_redirect_url: "/main"
    },
    async (response) => {
      if (response.error_code != null) {
        fetch("/pay/fail", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({"error_code" : response.error_code, "error_msg" : response.error_msg})
        })
        alert(response.error_msg);
        
        const statusCode = 'error';
        window.opener.postMessage(statusCode, window.location.origin);

        // 현재 창 닫기
        window.close();
      }
      else 
      await notified(response);

    }
  );
};

// 결제 성공시 수행할 함수
const notified = async (response) => {

  // 데이터 요소 추가
  const data = {
    impUid: response.imp_uid,
    merchantUid: response.merchant_uid,
    memberNo: memberNo,
    pieceNo: pieceNo,
    payAmount: payAmount,
    payName: loginName,
    payPhone: payPhone,
    deliveryType: deliveryType,
    deliveryAddress: deliveryAddress
  };


  fetch("/payment/payment/complete", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  })
  .then(response => {
    if (response.ok) return response.text();
    throw new Error("AJAX 통신 실패");
  })
  .then(result => {

    if(result > 0) {
      const statusCode = 'success';
      window.opener.postMessage(statusCode, window.location.origin);

      // 현재 창 닫기
      window.close();

    } else {
      const statusCode = 'error';
      window.opener.postMessage(statusCode, window.location.origin);

      // 현재 창 닫기
      window.close();
    }
  })
  .catch(err => console.error(err));

};
