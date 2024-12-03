let deliveryTrList = [];
let listCount = 0;
let delivertyPg = {
  currentPage : 1,
  maxPage : 0,
  startPage : 0,
  endPage : 0,
  prevPage : 0,
  nextPage : 0,
  totalPageCount : 0
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

// ----------------------------------------------------------------------
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
/* 배송 정보 수정하기 */
document.addEventListener("DOMContentLoaded", () => {
  const selectAllCheckbox = document.getElementById("selectAll"); // 전체 선택 체크박스
  const insertButton = document.getElementById("insert"); // 저장 버튼
  
  // 날짜 데이터를 YYYY-MM-DD 형식으로 변환하는 함수
  function formatDateToYYYYMMDD(dateString) {
    if (!dateString) return null; // 값이 없으면 null 반환
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 +1
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }
  
  // 전체 선택 체크박스 이벤트
  if (selectAllCheckbox) {
    selectAllCheckbox.addEventListener("change", () => {
      const isChecked = selectAllCheckbox.checked;
      const checkboxes = document.querySelectorAll('input[type="checkbox"].filter-checkbox');
      checkboxes.forEach((checkbox) => {
        checkbox.checked = isChecked;
      });
    });
  }
  
  // 개별 체크박스 상태에 따른 전체 선택 체크박스 업데이트
  const checkboxes = document.querySelectorAll('input[type="checkbox"].filter-checkbox');
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      const allChecked = Array.from(checkboxes).every((cb) => cb.checked);
      const anyChecked = Array.from(checkboxes).some((cb) => cb.checked);
      if (selectAllCheckbox) {
        selectAllCheckbox.checked = allChecked;
        selectAllCheckbox.indeterminate = !allChecked && anyChecked; // 일부 체크 상태 반영
      }
    });
  });
  
  // 저장 버튼 클릭 이벤트
  if (insertButton) {
    insertButton.addEventListener("click", () => {
      const rows = document.querySelectorAll("tbody tr"); // 테이블 행 선택
      const deliveryList = []; // 서버로 전송할 데이터 리스트
      const uniqueDeliveryNos = new Set(); // 중복 방지를 위한 Set
      
      rows.forEach((row) => {
        const checkbox = row.querySelector(".filter-checkbox");
        if (checkbox && checkbox.checked) {
          const deliveryNo = checkbox.getAttribute("data-delivery-no"); // 송장 번호
          const sortSelect = row.querySelector(".sort-select");
          const deliveryIngDateInput = row.querySelector(".deliveryIngDate");
          const deliveryEndDateInput = row.querySelector(".deliveryEndDate");
          
          // 정확한 값을 추출
          const deliveryStatus = sortSelect ? parseInt(sortSelect.value, 10) : null; // 숫자로 변환
          const deliveryIngDate = deliveryIngDateInput
          ? formatDateToYYYYMMDD(deliveryIngDateInput.value)
          : null; // 날짜 형식 변환
          const deliveryEndDate = deliveryEndDateInput
          ? formatDateToYYYYMMDD(deliveryEndDateInput.value)
          : null; // 날짜 형식 변환
          
          // 중복 확인 후 데이터 추가
          if (deliveryNo && !uniqueDeliveryNos.has(deliveryNo) && deliveryStatus !== null) {
            uniqueDeliveryNos.add(deliveryNo); // Set에 추가하여 중복 방지
            deliveryList.push({
              deliveryNo: parseInt(deliveryNo, 10), // 숫자로 변환
              deliveryStatus, // 숫자로 저장
              deliveryIngDate, // 변환된 날짜
              deliveryEndDate // 변환된 날짜
            });
          }
        }
      });
      
      if (deliveryList.length === 0) {
        alert("저장할 데이터를 선택해주세요.");
        return;
      }
      
      // 서버로 데이터 전송
      fetch("/delivery/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json", // JSON 데이터임을 명시
        },
        body: JSON.stringify(deliveryList), // JSON 직렬화
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`요청 실패: ${response.status}`);
        }
        return response.text();
      })
      .then((data) => {
        alert("배송 정보가 저장되었습니다.");
      })
      .catch((error) => {
        alert("저장 중 오류가 발생했습니다. 다시 시도해주세요.");
        console.error("에러:", error);
      });
    });
  }
});

// ---------------------------------------------------------------------------------------------------------------
/* 날짜 기준 변경 이벤트 */
// 오늘 날짜 설정
document.addEventListener("DOMContentLoaded", function () {
  // 오늘 날짜 (YYYY-MM-DD 형식)
  const today = new Date().toISOString().split("T")[0];

  // 날짜 입력 요소 가져오기
  const startDateInput = document.getElementById("start-date");
  const returnDateInput = document.getElementById("return-date");
  const selectButton = document.getElementById("select");

  // 날짜 입력 요소 초기화
  startDateInput.setAttribute("max", today);
  returnDateInput.setAttribute("max", today);

  // start-date 변경 시 return-date의 최소값 설정
  startDateInput.addEventListener("change", () => {
    returnDateInput.setAttribute("min", startDateInput.value || "");
  });

  // return-date 변경 시 start-date의 최대값 설정
  returnDateInput.addEventListener("change", () => {
    startDateInput.setAttribute("max", returnDateInput.value || today);
  });

  // 조회 버튼 클릭 시 데이터 조회
  if (selectButton) {
    selectButton.addEventListener("click", function () {
      const startDate = startDateInput.value;
      const returnDate = returnDateInput.value;

      // 입력값 검증
      if (!startDate || !returnDate) {
        alert("시작 날짜와 종료 날짜를 모두 선택해주세요.");
        return;
      }

      fetchDeliveryList(startDate, returnDate);
    });
  } else {
    console.error("조회 버튼을 찾을 수 없습니다. 버튼 ID가 정확한지 확인하세요.");
  }

  // 페이지 로드 시 전체 데이터 조회
  fetchDeliveryList();

  // 데이터 조회 함수
  function fetchDeliveryList(startDate = null, returnDate = null) {
    const url = `/delivery/uploadDelivery`;

    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(`네트워크 응답에 문제가 있습니다. 상태 코드: ${response.status}`);
        }
        return response.text();
      })
      .then(html => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");
        const newRows = doc.querySelectorAll("#delivery-tbody tr");

        const tbody = document.getElementById("delivery-tbody");
        if (!tbody) {
          console.error("테이블 본문 요소를 찾을 수 없습니다.");
          return;
        }

        tbody.innerHTML = ""; // 기존 데이터 비우기

        if (newRows.length === 0) {
          console.warn("조회된 데이터가 없습니다.");
          displayNoResultsMessage();
          return;
        }

        // 날짜 필터링 및 데이터 추가
        deliveryTrList = [];
        let visibleRowCount = 0;

        newRows.forEach(row => {
          const deliveryDateText = row.querySelector(".deliveryDate")?.innerText.trim();
          if (deliveryDateText) {
            const formattedDateText = deliveryDateText
              .replace("년", "-")
              .replace("월", "-")
              .replace("일", "")
              .trim();
            const deliveryDate = new Date(formattedDateText);

            // 날짜 필터링
            if (
              (!startDate || deliveryDate >= new Date(startDate)) &&
              (!returnDate || deliveryDate <= new Date(returnDate))
            ) {
              deliveryTrList.push(row);
              visibleRowCount++;
            }
          }
        });
        
        // 페이지네이션용 리스트카운트 초기화
        listCount = visibleRowCount;

        // 첫 페이지 랜더링 전 숫자확인
        let randerCount = 0;
        if(visibleRowCount > 10) {
          randerCount = 10;
        } else {
          randerCount = visibleRowCount;
        }
        // 첫 페이지 랜더링
        for(let i = 0; i < randerCount; i++) {
          tbody.appendChild(deliveryTrList[i]);
        }

        // 없을경우 메세지 출력
        if (visibleRowCount === 0) {
          displayNoResultsMessage();
        } else {
          hideNoResultsMessage();
        }

        // 페이지네이션 설정 후 랜더링까지
        delivertyPaginationSetting();
        
      })
      .catch(error => {
        console.error("데이터 조회 중 오류 발생: ", error);
        alert("데이터를 불러오는 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
      });
  }

  // 조회 결과가 없을 때 메시지 표시
  function displayNoResultsMessage() {
    let messageContainer = document.getElementById("no-results-message");
    if (!messageContainer) {
      const tableContainer = document.querySelector(".table-container");
      messageContainer = document.createElement("div");
      messageContainer.id = "no-results-message";
      messageContainer.style.textAlign = "center";
      messageContainer.style.marginTop = "20px";
      messageContainer.style.color = "#5e7c71";
      tableContainer.parentNode.insertBefore(messageContainer, tableContainer.nextSibling);
    }
    messageContainer.innerText = "선택된 날짜에 해당하는 데이터가 없습니다.";
  }

  // 조회 결과 메시지 숨기기
  function hideNoResultsMessage() {
    const messageContainer = document.getElementById("no-results-message");
    if (messageContainer) {
      messageContainer.innerText = "";
    }
  }
});

// -------------------------------------------------------------------------------------------------------------



function makePagination(paginationContainerId) {

  const paginationContainer = document.getElementById(paginationContainerId);

  if (!paginationContainer) {
    console.error("페이지네이션 컨테이너를 찾을 수 없습니다:", paginationContainerId);
    return;
  }
  paginationContainer.innerHTML = ""; // 기존 버튼 초기화
  const createPageButton = (page, text, isActive = false, isDisabled = false) => {
    const btn = document.createElement("a");
    btn.href = "#";
    btn.textContent = text;
    btn.classList.add("page-btn");
    if (isActive) btn.classList.add("active");
    if (isDisabled) btn.classList.add("disabled");

    if (!isDisabled) {
      btn.addEventListener("click", (event) => {
        event.preventDefault();
        displayDeliveryContents(page);
      });
    }

    return btn;
  };

  // << 버튼 (첫 페이지로 이동)
  paginationContainer.appendChild(createPageButton(1, "<<", false, delivertyPg.currentPage === 1));

  // < 버튼 (이전 페이지로 이동)
  paginationContainer.appendChild(createPageButton(delivertyPg.prevPage, "<", false, delivertyPg.currentPage === 1));


  // 페이지 번호 버튼
  for (let i = delivertyPg.startPage; i <= delivertyPg.endPage; i++) {
    paginationContainer.appendChild(createPageButton(i, i, i === delivertyPg.currentPage));
  }

  // > 버튼 (다음 페이지로 이동)
  paginationContainer.appendChild(createPageButton(delivertyPg.nextPage, ">", false, delivertyPg.currentPage === delivertyPg.totalPageCount));

  // >> 버튼 (마지막 페이지로 이동)
  paginationContainer.appendChild(createPageButton(delivertyPg.totalPageCount, ">>", false, delivertyPg.currentPage === delivertyPg.totalPageCount));
}



const delivertyPaginationSetting = () => {
  const pageSize = 10;
  const limit = 10;

  delivertyPg.maxPage = Math.ceil( listCount / limit );
	
  // startPage : 페이지 번호 목록의 시작 번호
  
  // 페이지 번호 목록이 10개(pageSize) 씩 보여질 경우
  delivertyPg.startPage = Math.floor((delivertyPg.currentPage - 1) / pageSize) * pageSize + 1;
  
  // endPage : 페이지 번호 목록의 끝 번호
  delivertyPg.endPage = pageSize - 1 + delivertyPg.startPage;
  
  
  // 페이지 끝 번호가 최대 페이지 수를 초과한 경우
  if(delivertyPg.endPage > delivertyPg.maxPage)	delivertyPg.endPage = delivertyPg.maxPage;
  
  // 더 이상 뒤로갈 페이지가 없을 경우
  if(delivertyPg.currentPage < pageSize) {
    delivertyPg.prevPage = 1; 
  
  } else {
    delivertyPg.prevPage = delivertyPg.startPage - 1;
  }
  
  // 더 이상 넘어갈 페이지가 없을 경우
  if(delivertyPg.endPage == delivertyPg.maxPage) {
    delivertyPg.nextPage = delivertyPg.maxPage;
  
  } else {
    delivertyPg.nextPage = endPage + 1;
  }

  makePagination("paginationDelivery"); // 페이지네이션 랜더링
};

const displayDeliveryContents = (page) => {
  // 현제페이지 수정
  delivertyPg.currentPage = page;

  // 현제페이지 변경되었으니가 다시 렌더링
  delivertyPaginationSetting();

  // 바뀐 페이지만큼 다시 표 출력
  let i = 0;
  // 1페이지 0 ~ 9
  // 2페이지 10~ 19
  // 3페이지 20~ 29
  // 11페이지 100 ~ 110
  i = (page-1)*10;
  const tbody = document.getElementById("delivery-tbody");
  tbody.innerHTML = "";
  const j = i + 10;
  for(i; i < j; i++) {
    tbody.appendChild(deliveryTrList[i]);
  }

}

// let deliveryTrList = [];
// const parser = new DOMParser();
// const doc = parser.parseFromString(html, "text/html");
// const newRows = doc.querySelectorAll("#delivery-tbody tr");
// newRows.forEach(row => {
//   const deliveryDateText = row.querySelector(".deliveryDate")?.innerText.trim();
//   if (deliveryDateText) {
//     const formattedDateText = deliveryDateText
//       .replace("년", "-")
//       .replace("월", "-")
//       .replace("일", "")
//       .trim();
//     const deliveryDate = new Date(formattedDateText);

//     // 날짜 필터링
//     if (
//       (!startDate || deliveryDate >= new Date(startDate)) &&
//       (!returnDate || deliveryDate <= new Date(returnDate))
//     ) {
//       deliveryTrList.put(row);
//       visibleRowCount++;
//     }
//   }
// });