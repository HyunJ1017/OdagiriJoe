document.addEventListener("DOMContentLoaded", function() {
  // 조회 버튼 클릭 시 데이터 조회
  const selectButton = document.getElementById("select");
  if (selectButton) {
    selectButton.addEventListener("click", function() {
      fetchDeliveryList();
    });
  } else {
    console.error("조회 버튼을 찾을 수 없습니다. 버튼 ID가 정확한지 확인하세요.");
  }

  // 페이지 로드 시 전체 데이터 조회
  fetchDeliveryList();

  function fetchDeliveryList() {
    const url = `/delivery/uploadDelivery`; // Thymeleaf로 렌더링된 HTML 페이지를 받아오는 엔드포인트

    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "text/html"
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`네트워크 응답에 문제가 있습니다. 상태 코드: ${response.status}`);
      }
      return response.text(); // HTML을 텍스트로 받기
    })
    .then(html => {
      // HTML 문자열을 DOM으로 변환
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");

      // 새로운 문서에서 tbody의 모든 tr 요소 선택
      const newRows = doc.querySelectorAll("#delivery-tbody tr");

      if (newRows.length === 0) {
        console.warn("조회된 데이터가 없습니다.");
        return;
      }

      // 현재 페이지의 tbody 요소 선택
      const tbody = document.getElementById("delivery-tbody");
      tbody.innerHTML = ""; // 기존 데이터를 지움

      // 새로 가져온 tr 요소들을 tbody에 추가
      newRows.forEach(row => {
        tbody.appendChild(row.cloneNode(true));
      });
    })
    .catch(error => {
      console.error("데이터 조회 중 오류 발생: ", error);
    });
  }
});

// -------------------------------------------------------------------------------------------------------------
// 배송 상태 수정
function updateDeliveryTable(deliveryList) {
  const deliveryTbody = document.getElementById('delivery-tbody');
  deliveryTbody.innerHTML = ''; // 현재 테이블 내용을 비우기

  let isFirstRow = true;
  deliveryList.forEach((deliveryItem, index) => {
    if (index !== 0) { // 첫 행이 아닌 경우에만 구분선 추가
      const separator = document.createElement("tr");
      separator.className = "separator-row";
      const separatorTd = document.createElement("td");
      separatorTd.colSpan = 9; // 테이블의 모든 열을 차지하도록 설정
      separatorTd.style.borderTop = "1px solid #ccc";
      separatorTd.style.padding = "10px 0";
      separator.appendChild(separatorTd);
      deliveryTbody.appendChild(separator);
    }
  });
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
async function saveDeliveryData(data) {
  try {
    const response = await fetch('/delivery/update', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error('배송 데이터 저장 실패');
    }
    alert('선택된 항목이 성공적으로 저장되었습니다!');
  } catch (error) {
    console.error('배송 데이터 저장 중 오류 발생:', error);
  }
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


// ---------------------------------------------------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
  const selectAllCheckbox = document.getElementById("selectAll"); // 전체 선택 체크박스
  const insertButton = document.getElementById("insert"); // 저장 버튼
  const checkboxes = document.querySelectorAll('input[type="checkbox"].filter-checkbox'); // 개별 체크박스

  // 전체 선택 체크박스 이벤트
  if (selectAllCheckbox) {
    selectAllCheckbox.addEventListener("change", () => {
      const isChecked = selectAllCheckbox.checked;
      checkboxes.forEach((checkbox) => {
        checkbox.checked = isChecked;
      });
    });
  }

  // 개별 체크박스 상태에 따른 전체 선택 체크박스 업데이트
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      const allChecked = Array.from(checkboxes).every((cb) => cb.checked);
      if (selectAllCheckbox) {
        selectAllCheckbox.checked = allChecked;
      }
    });
  });

  // 저장 버튼 클릭 이벤트
  if (insertButton) {
    insertButton.addEventListener("click", () => {
      const rows = document.querySelectorAll("tbody tr"); // 테이블 행 선택
      const requestData = [];

      rows.forEach((row) => {
        const checkbox = row.querySelector(".filter-checkbox");
        if (checkbox && checkbox.checked) {
          const deliveryNo = checkbox.getAttribute("data-delivery-no"); // 송장 번호
          const sortSelect = row.querySelector(".sort-select").value; // 정렬 방식
          const deliveryIngDate = row.querySelector(".deliveryIngDate").value; // 배송 예정일
          const deliveryEndDate = row.querySelector(".deliveryEndDate").value; // 배송 완료일

          requestData.push({
            deliveryNo,
            sortStatus: sortSelect || null,
            deliveryStartDate: deliveryIngDate || null,
            deliveryEndDate: deliveryEndDate || null,
          });
        }
      });

      if (requestData.length === 0) {
        alert("저장할 데이터를 선택해주세요.");
        return;
      }

      console.log("서버로 전송할 데이터:", requestData);

      // 서버로 데이터 전송
      fetch("/delivery/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("요청이 실패되었습니다.");
          }
        })
        .then((data) => {
          alert("배송 정보가 저장 되었습니다.");
          console.log("응답 데이터:", data);
        })
        .catch((error) => {
          alert("저장 중 오류가 발생했습니다. 다시 시도해주세요.");
          console.error("에러:", error);
        });
    });
  }
});
