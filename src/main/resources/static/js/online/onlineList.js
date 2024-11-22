
// 정렬 상태 초기화(전역변수)
let salesSortState = { field: "recent", direction: "desc" };
let completedSortState = { field: "recent", direction: "desc" };

/* 드롭 다운 */
document.addEventListener("DOMContentLoaded", function() {
  // 판매 작품 정렬
  let salesSortBtn = document.getElementById("salesSortBtn");
  const salesDropdownContent = document.getElementById("salesDropdownContent");

	


  salesSortBtn.addEventListener("click", function(event) {
    event.stopPropagation();
    salesDropdownContent.style.display = 
        salesDropdownContent.style.display === "block" ? "none" : "block";
  });

  document.addEventListener("click", function() {
    salesDropdownContent.style.display = "none";
  });

  document.getElementById("salesSortByName").addEventListener("click", () => 
    handleSort("판매작품", "name"));
  document.getElementById("salesSortByPrice").addEventListener("click", () => 
    handleSort("판매작품", "price"));

  // 완료 작품 정렬
  let completedSortBtn = document.getElementById("completedSortBtn");
  const completedDropdownContent = document.getElementById("completedDropdownContent");
  

  completedSortBtn.addEventListener("click", function (event) {
    event.stopPropagation();
    completedDropdownContent.style.display = 
        completedDropdownContent.style.display === "block" ? "none" : "block";
  });

  document.addEventListener("click", function () {
    completedDropdownContent.style.display = "none";
  });

  document.getElementById("completedSortByName").addEventListener("click", () => 
    handleSort("완료작품", "name"));
  document.getElementById("completedSortByPrice").addEventListener("click", () => 
    handleSort("완료작품", "price"));

  // 정렬 처리 함수
  function handleSort(type, field) {
    let sortState = type === "판매작품" ? salesSortState : completedSortState;

    // 정렬 상태 업데이트
    if (sortState.field === field) {
				sortState.direction = sortState.direction === "asc" ? "desc" : "asc";
    } else {
        sortState.field = field;
				sortState.direction = "asc";
    }

		console.log("Sort State:", sortState);

		// 로드 데이터 호출
		loadPieces(1, type, sortState.field, sortState.direction);
  }
    
})

// 작품 유형에 따라 로드 함수 호출
// function setType(type) {
//     const cp = 1; // 기본적으로 첫 페이지부터 로드
//     if (type === '판매작품') {
//         loadPieces(cp, '판매작품');
//     } else if (type === '완료작품') {
//         loadPieces(cp, '완료작품');
//     } else {
//         console.error('유효하지 않은 type입니다:', type);
//     }
// }

/* 판매 작품 목록 로드 및 페이지네이션 */
function loadPieces(cp, type, sort = "recent", order = "desc") {
		// console.log(type);

    
		const url =
    type === "판매작품"
      ? `/piece/online/sales?cp=${cp}&sort=${sort}&order=${order}`
      : `/piece/online/completed?cp=${cp}&sort=${sort}&order=${order}`;

			console.log("Request URL:", url); // 요청 URL 확인

    fetch(url)
        .then(response => {
          if(response.ok) { // HTTP 응답 상태 코드 200번(응답 성공)
            return response.json(); // 응답 결과를 JSON 객체로 변환
          }
        })
        .then(data => {

					console.log(data.salesPagination);

					if (type === '판매작품') {
            renderSalesList(data.salesPiece || []); // 판매 작품 목록 렌더링
						renderPagination(data.salesPagination, 'salesPaginationBox', type, salesSortState);
					} else if (type === '완료작품') {
						renderCompletedList(data.completedPiece || []); // 완료 작품 목록 렌더링
						renderPagination(data.complPagination, 'completedPaginationBox', type, completedSortState);
						
					}
						

						// console.log(data);
           
        })
        .catch(err => console.error(err));
    }

            
            

// 판매 작품 목록 렌더링
function renderSalesList(items = []) {

    const salesListContainer = document.querySelector('.online-list');
    salesListContainer.innerHTML = items.map(item => `
        <article class="gallery-item">
            <div class="artwork-image" data-id="${item.pieceNo}">
                <img src="${item.pieceRename}">
                <div class="artwork-info">
                    <h3>${item.artistNickname}</h3>
                    <p class="artwork-title">작품 : ${item.pieceTitle}</p>
                    <div class="artwork-details">
                        <p class="size">${item.sizeX} x ${item.sizeY}</p>
                        <p class="price">현재가 (KRW)</p>
                        <p class="amount">${item.sellPrice}</p>
                    </div>
                </div>
            </div>
        </article>
    `).join('');
}

// 완료 작품 목록 렌더링
function renderCompletedList(items = []) {
    const completedListContainer = document.querySelector('.online-list1');
    completedListContainer.innerHTML = items.map(item => `
        <article class="gallery-item">
            <div class="artwork-image" data-id="${item.pieceNo}">
                <img src="${item.pieceRename}">
                <div class="artwork-info">
                    <h3>${item.artistNickname}</h3>
                    <p class="artwork-title">작품 : ${item.pieceTitle}</p>
                    <div class="artwork-details">
                        <p class="size">${item.sizeX} x ${item.sizeY}</p>
                        <p class="price">현재가 (KRW)</p>
                        <p class="amount">${item.sellPrice}</p>
                    </div>
                </div>
            </div>
        </article>
    `).join('');
}





function renderPagination(pagination, paginationBoxId, type, sortState) {

    const paginationBox = document.getElementById(paginationBoxId);

    paginationBox.innerHTML = '';

    const createPageButton = (page, text, isActive = false) => {
			const button = document.createElement("a");
			button.href = "#";
			button.classList.add("page-btn");
			button.dataset.page = page;
			button.textContent = text;

			if (isActive) button.classList.add("active");

			button.addEventListener("click", (event) => {
				event.preventDefault();
				const cp = parseInt(event.target.dataset.page);

			  // 작품 유형에 따른 정렬 상태를 가져옴
				//  const sortState = type === "판매작품" ? salesSortState : completedSortState;
				
				// 현재 정렬 상태를 유지하여 요청
				loadPieces(cp, type, sortState.field, sortState.direction);
			});

			return button;
		};

		// <<, < 버튼 추가
		paginationBox.appendChild(createPageButton(1, "<<"));
		paginationBox.appendChild(createPageButton(pagination.prevPage, "<"));

		// 동적 페이지 번호 버튼 생성
		for (let i = pagination.startPage; i <= pagination.endPage; i++) {
			paginationBox.appendChild(createPageButton(i, i, i === pagination.currentPage));
		}

		// >, >> 버튼 추가
		paginationBox.appendChild(createPageButton(pagination.nextPage, ">"));
		paginationBox.appendChild(createPageButton(pagination.maxPage, ">>"));
};






// 초기 로드 시 첫 페이지 로드
document.addEventListener('DOMContentLoaded', () => {
	// setType('판매작품'); // 판매 작품 첫 페이지 로드
	// setType('완료작품'); // 완료 작품 첫 페이지 로드
	loadPieces(1, "판매작품", salesSortState.field, salesSortState.direction);
  loadPieces(1, "완료작품", completedSortState.field, completedSortState.direction);
  
  /* 상제 조회 페이지 이동 (판매 작품) */
  const salesListContainer = document.querySelector(".online-list");
  salesListContainer.addEventListener("click", (event) => {
    const artwork = event.target.closest(".gallery-item"); // 클릭한 영역이 gallery-item인지 확인
    if(artwork) {
      const pieceNo = artwork.querySelector(".artwork-image").dataset.id; // 작품 번호 가져오기
      window.location.href = `/piece/onlineDetail?pieceNo=${pieceNo}`; // 상세 조회 페이지 이동
    }
  });


  // 상세 조회 페이지 이동 (완료 작품)
  const completedListContainer = document.querySelector(".online-list1");
  completedListContainer.addEventListener("click", (event) => {
    const artwork = event.target.closest(".gallery-item");
    if (artwork) {
      const pieceNo = artwork.querySelector(".artwork-image").dataset.id;
      window.location.href = `/piece/onlineDetail?pieceNo=${pieceNo}`;
    }
  });

});
