// 배송 상태를 비동기로 처리하는 JavaScript 코드

document.addEventListener('DOMContentLoaded', function() {
  // 버튼 및 입력 요소에 대한 참조 가져오기
  const selectBtn = document.getElementById('select');
  const insertBtn = document.getElementById('insert');
  const startDateInput = document.getElementById('start-date');
  const returnDateInput = document.getElementById('return-date');

  // 조회 버튼 클릭 시 선택한 날짜에 따라 배송 데이터를 가져오는 이벤트 리스너
  selectBtn.addEventListener('click', function() {
    const startDate = startDateInput.value;
    const returnDate = returnDateInput.value;
    
    // 지정된 날짜 범위에 따라 배송 목록을 가져오기 위한 GET 요청
    fetch(`/delivery/list?startDate=${startDate}&endDate=${returnDate}`, {
      method: 'GET'
    })
    .then(response => response.json()) // 응답을 JSON으로 파싱
    .then(data => updateDeliveryTable(data)) // 가져온 데이터로 배송 테이블 업데이트
    .catch(error => console.error('배송 목록 가져오는 중 오류 발생:', error)); // 오류 로그 출력
  });

  // 저장 버튼 클릭 시 업데이트된 배송 정보를 저장하는 이벤트 리스너
  insertBtn.addEventListener('click', function() {
    // 선택된 체크박스 모두 가져오기
    const selectedCheckboxes = document.querySelectorAll('input.filter-checkbox:checked');
    const deliveriesToUpdate = Array.from(selectedCheckboxes).map(checkbox => {
      const row = checkbox.closest('tr');
      return {
        deliveryNo: checkbox.dataset.deliveryNo, // 데이터 속성에서 송장 번호 가져오기
        deliveryIngDate: row.querySelector('input[type="date"]#deliveryIngDate').value, // 배송 진행 날짜 가져오기
        deliveryEndDate: row.querySelector('input[type="date"]#deliveryEndDate').value, // 배송 완료 날짜 가져오기
        deliveryStatus: row.querySelector('.sort-select').value // 현재 배송 상태 가져오기
      };
    });

    // 배송 정보를 업데이트하기 위한 PUT 요청
    fetch('/delivery/update', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json' // 콘텐츠 유형을 JSON으로 설정
      },
      body: JSON.stringify(deliveriesToUpdate) // 업데이트된 배송 정보를 JSON으로 전송
    })
    .then(response => response.json()) // 응답을 JSON으로 파싱
    .then(data => {
      alert('배송 정보가 저장되었습니다.'); // 사용자에게 배송 정보가 저장되었음을 알림
      updateDeliveryTable(data); // 새로운 데이터로 배송 테이블 업데이트
    })
    .catch(error => console.error('배송 상태 업데이트 중 오류 발생:', error)); // 오류 로그 출력
  });
});

// 주어진 배송 목록으로 배송 테이블을 업데이트하는 함수
function updateDeliveryTable(deliveryList) {
  if (!Array.isArray(deliveryList)) {
    console.error('배송 목록이 배열이 아닙니다:', deliveryList);
    return;
  }

  const deliveryTbody = document.getElementById('delivery-tbody');
  deliveryTbody.innerHTML = ''; // 현재 테이블 내용을 비우기
  deliveryList.forEach(manage => {
    const row = document.createElement('tr'); // 각 배송 항목에 대한 새로운 행 생성
    row.innerHTML = `
      <th><input type="checkbox" class="filter-checkbox" data-delivery-no="${manage.deliveryNo}"></th>
      <td>${manage.deliveryNo}</td>
      <td class="deliveryDate">${manage.deliveryDate}</td>
      <td>${manage.pieceTitle}</td>
      <td>${manage.sellPrice ? `${manage.sellPrice} 원` : manage.endPrice ? `${manage.endPrice} 원` : ''}</td>
      <td>${manage.deliveryAddress}</td>
      <td><input type="date" id="deliveryIngDate" value="${manage.deliveryIngDate ?? ''}"></td>
      <td><input type="date" id="deliveryEndDate" value="${manage.deliveryEndDate ?? ''}"></td>
      <td class="arr-container">
        <select id="sort" class="sort-select" onChange="onSortChange(event)">
          <option value="visit" ${manage.deliveryStatus === 'visit' ? 'selected' : ''}>방문수령</option>
          <option value="preparing" ${manage.deliveryStatus === 'preparing' ? 'selected' : ''}>배송 준비중</option>
          <option value="in_transit" ${manage.deliveryStatus === 'in_transit' ? 'selected' : ''}>배송중</option>
          <option value="completed" ${manage.deliveryStatus === 'completed' ? 'selected' : ''}>배송 완료</option>
        </select>
      </td>
    `;
    deliveryTbody.appendChild(row); // 새 행을 테이블 본문에 추가
  });
  attachCheckboxEvents(); // 동적 요소 추가 후 체크박스 이벤트 다시 연결
}

// 배송 상태 드롭다운 변경을 처리하는 함수
function onSortChange(event) {
  console.log('배송 상태가 변경되었습니다:', event.target.value); // 변경된 배송 상태 로그 출력
}

// 모든 개별 체크박스의 상태를 업데이트하는 함수
function updateAllCheckboxes(isChecked) {
  const checkboxes = document.querySelectorAll('input[type="checkbox"].filter-checkbox');
  checkboxes.forEach(checkbox => {
    checkbox.checked = isChecked; // 전체 체크박스 상태에 따라 개별 체크박스 상태 변경
  });
}

// 선택된 배송 데이터를 서버에 저장하는 함수
function saveDeliveryData(data) {
  fetch('/delivery/update', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('배송 데이터 저장 실패');
      }
      alert('선택된 항목이 성공적으로 저장되었습니다!');
    })
    .catch(error => {
      console.error('배송 데이터 저장 중 오류 발생:', error);
    });
}

// 개별 체크박스 상태에 따른 전체 체크박스 업데이트
function attachCheckboxEvents() {
  const checkboxes = document.querySelectorAll('input[type="checkbox"].filter-checkbox');
  const selectAllCheckbox = document.getElementById('selectAll');
  checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', () => {
      // 모든 개별 체크박스가 선택된 경우 전체 선택 체크박스를 선택 상태로 변경
      const isChecked = Array.from(checkboxes).every(cb => cb.checked);
      if (selectAllCheckbox) {
        selectAllCheckbox.checked = isChecked;
      }
    });
  });
}

// 초기 체크박스 이벤트 연결
attachCheckboxEvents();



// ---------------------------------------------------------------------------------------------------------------
/* 날짜 기준 변경 이벤트 */
// 오늘 날짜 설정
let today = new Date();
let day = today.getDate();
let month = today.getMonth() + 1; // 1월이 0부터 시작
let year = today.getFullYear();

// 날짜 형식 고정 (두 자리 유지)
if (day < 10) day = '0' + day;
if (month < 10) month = '0' + month;

today = `${year}-${month}-${day}`;

// start-date와 return-date 요소 가져오기
const startDateInput = document.getElementById("start-date");
const returnDateInput = document.getElementById("return-date");

// start-date 설정: 과거 날짜 및 오늘 날짜만 선택 가능
startDateInput.setAttribute("max", today);

// return-date 설정: 오늘 이후 날짜 선택 불가
returnDateInput.setAttribute("max", today);

// start-date 변경 시 return-date의 최소값 설정
startDateInput.addEventListener("change", () => {
  const selectedStartDate = startDateInput.value;
  if (selectedStartDate) {
    returnDateInput.setAttribute("min", selectedStartDate); // return-date 최소값을 start-date 이후로 설정
  } else {
    returnDateInput.setAttribute("min", ""); // start-date가 비어 있으면 제한 해제
  }
});

// return-date 변경 시 start-date의 최대값 설정
returnDateInput.addEventListener("change", () => {
  const selectedReturnDate = returnDateInput.value;
  if (selectedReturnDate) {
    startDateInput.setAttribute("max", selectedReturnDate); // start-date 최대값을 return-date 이전으로 설정
  } else {
    startDateInput.setAttribute("max", today); // return-date가 비어 있으면 기본값으로 설정
  }
});

// 조회 버튼 클릭 이벤트
document.getElementById("select").addEventListener("click", () => {
  // 날짜 입력 필드 값 가져오기
  const startDate = startDateInput.value;
  const returnDate = returnDateInput.value;

  // 입력값 검증
  if (!startDate || !returnDate) {
    alert("시작 날짜와 종료 날짜를 모두 선택해주세요.");
    return;
  }

  // 날짜 값 변환
  const start = new Date(startDate);
  const end = new Date(returnDate);

  // 모든 테이블 행 가져오기
  const rows = document.querySelectorAll(".table-content tr");
  let visibleRowCount = 0; // 조회된 결과가 있는지 확인하기 위해 카운트 변수

  rows.forEach(row => {
    // 각 행의 주문 일자 가져오기
    const deliveryDateText = row.querySelector(".deliveryDate")?.innerText.trim();
    
    if (deliveryDateText) {
      // "YYYY년 MM월 DD일" 형식을 "YYYY-MM-DD"로 변환
      const formattedDateText = deliveryDateText
        .replace("년", "-")
        .replace("월", "-")
        .replace("일", "")
        .trim();

      const deliveryDate = new Date(formattedDateText); // 변환된 날짜

      // 행 표시 여부 결정
      if (deliveryDate >= start && deliveryDate <= end) {
        row.style.display = ""; // 조건에 맞으면 표시
        visibleRowCount++;
      } else {
        row.style.display = "none"; // 조건에 맞지 않으면 숨김
      }
    } else {
      row.style.display = "none"; // 날짜 정보가 없는 경우 숨김
    }
  });

  // 조회 결과가 없을 경우 메시지 표시
  const messageContainer = document.getElementById('no-results-message');
  if (!messageContainer) {
    // 메시지를 처음 추가하는 경우
    const tableContainer = document.querySelector('.table-container');
    const noResultsMessage = document.createElement('div');
    noResultsMessage.id = 'no-results-message';
    noResultsMessage.style.textAlign = 'center';
    noResultsMessage.style.marginTop = '20px';
    noResultsMessage.style.color = '#5e7c71';
    tableContainer.parentNode.insertBefore(noResultsMessage, tableContainer.nextSibling);
  }

  // 조회된 결과가 없으면 메시지 표시, 있으면 숨김
  if (visibleRowCount === 0) {
    document.getElementById('no-results-message').innerText = "배송 조회 결과가 없습니다.";
  } else {
    document.getElementById('no-results-message').innerText = ""; // 메시지 제거
  }
});


// ---------------------------------------------------------------------------------------------------------------
/* 정렬 선택 시 테이블 저장 */