

/* 드롭 다운 */
document.addEventListener("DOMContentLoaded", function() {
  const sortBtn = document.getElementById("sortBtn");
  const dropdownContent = document.getElementById("dropdownContent");

  // 버튼 클릭 시 드롭다운 메뉴 표시/숨기기
  sortBtn.addEventListener("click", function(event) {
      event.stopPropagation(); // 이벤트 전파 중지
      // 드롭다운이 보이는지 여부에 따라 표시/숨기기 토글
      if (dropdownContent.style.display === "block") {
          dropdownContent.style.display = "none";
      } else {
          dropdownContent.style.display = "block";
      }
  });

  // 드롭다운 외부 클릭 시 드롭다운 숨기기
  document.addEventListener("click", function() {
      dropdownContent.style.display = "none";
  });
});

// 작품 유형에 따라 로드 함수 호출
function setType(type) {
    const cp = 1; // 기본적으로 첫 페이지부터 로드
    if (type === '판매작품') {
        loadPieces(cp, '판매작품');
    } else if (type === '완료작품') {
        loadPieces(cp, '완료작품');
    } else {
        console.error('유효하지 않은 type입니다:', type);
    }
}


// 작품 유형에 따라 로드 함수 호출
function setType(type) {
    const cp = 1; // 기본적으로 첫 페이지부터 로드
    if (type === '판매작품') {
        loadPieces(cp, '판매작품');
    } else if (type === '완료작품') {
        loadPieces(cp, '완료작품');
    } else {
        console.error('유효하지 않은 type입니다:', type);
    }
}


/* 판매 작품 목록 로드 및 페이지네이션 */
function loadPieces(cp, type) {
		// console.log(type);

		const url = type === '판매작품' ? `/piece/online/sales?cp=${cp}` : `/piece/online/completed?cp=${cp}`;

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
						renderPagination(data.salesPagination, 'salesPaginationBox', type);
					} else if (type === '완료작품') {
						renderCompletedList(data.completedPiece || []); // 완료 작품 목록 렌더링
						renderPagination(data.complPagination, 'completedPaginationBox', type);
						
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
                <img src="">
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
                <img src="">
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





function renderPagination(pagination, paginationBoxId, type) {

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
				
				loadPieces(cp, type);
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
	setType('판매작품'); // 판매 작품 첫 페이지 로드
	setType('완료작품'); // 완료 작품 첫 페이지 로드
});


