/* 정렬 기준 변경 이벤트 */
function onSortChange(event) {
  const order = event.target.value; // 선택된 정렬 기준 ('asc' 또는 'desc')
  const table = document.querySelector(".table-container tbody");
  const rows = Array.from(table.rows); // 테이블 행 가져오기 (헤더 제외)
  const columnIndex = 1; // "주문 일자" 열 인덱스 (0부터 시작)
  
  // 행 정렬
  rows.sort((a, b) => {

    const dateA = new Date(a.cells[columnIndex].innerText.trim().replace(/[^\d]+/g,'-').slice(0, -1));
    const dateB = new Date(b.cells[columnIndex].innerText.trim().replace(/[^\d]+/g,'-').slice(0, -1));
    return order === "asc" ? dateA - dateB : dateB - dateA;
  });
  
  // 정렬된 행 다시 추가
  rows.forEach( (row) => {
    table.appendChild(row);
  });
}


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


