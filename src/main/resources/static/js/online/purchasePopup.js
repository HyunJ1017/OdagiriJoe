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
