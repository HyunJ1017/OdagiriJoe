/* 정렬 기준 변경 이벤트 */
function onSortChange(event) {
  const order = event.target.value; // 선택된 정렬 기준 ('asc' 또는 'desc')
  const table = document.querySelector(".table-container tbody");
  const rows = Array.from(table.rows); // 테이블 행 가져오기 (헤더 제외)
  const columnIndex = 1; // "주문 일자" 열 인덱스 (0부터 시작)
  
  // 행 정렬
  rows.sort((a, b) => {
    const dateA = new Date(a.cells[columnIndex].innerText.trim());
    const dateB = new Date(b.cells[columnIndex].innerText.trim());
    return order === "asc" ? dateA - dateB : dateB - dateA;
  });
  
  // 정렬된 행 다시 추가
  rows.forEach(row => table.appendChild(row));
}

// ---------------------------------------------------------------------------------------------------------------
/* 날짜 기준 변경 이벤트 */
document.addEventListener("DOMContentLoaded", function () {
  // input 요소 가져오기
  const monthInput = document.getElementById("month");
  const weekInput = document.getElementById("week");
  const dateInput = document.getElementById("date");
  const selectButton = document.getElementById("select");
  const tableBody = document.querySelector(".table-content");

  // 하나의 input을 선택하면 다른 input 비활성화
  const inputs = [monthInput, weekInput, dateInput];
  inputs.forEach((input) => {
    input.addEventListener("change", () => {
      inputs.forEach((otherInput) => {
        if (otherInput !== input) {
          otherInput.disabled = input.value !== ""; // 현재 input에 값이 있으면 다른 input 비활성화
        }
      });
    });
  });

    // 조회 버튼에 클릭 이벤트 리스너 추가
    document.getElementById('select').addEventListener('click', function () {
      // 일별, 주별, 월별의 입력값 가져오기
      const dateValue = document.getElementById('date').value;
      const weekValue = document.getElementById('week').value;
      const monthValue = document.getElementById('month').value;
  
      // 서버로 전달할 query string 생성
      let queryParams = '';
      if (dateValue) {
          queryParams = `date=${dateValue}`;
      } else if (weekValue) {
          queryParams = `week=${weekValue}`;
      } else if (monthValue) {
          queryParams = `month=${monthValue}`;
      }
  
      // Ajax 요청을 통해 서버에 GET 요청을 보내고 조회된 결과를 화면에 업데이트
      fetch(`/delivery/main/filter?${queryParams}`, {
          method: 'GET'
      })
      .then(response => response.text()) // 응답을 텍스트 형태로 변환 (HTML)
      .then(data => {
          // 조회 결과를 tbody에 반영
          document.querySelector('.table-content').innerHTML = data;
      })
      .catch(error => console.error('Error:', error));
  });
});






