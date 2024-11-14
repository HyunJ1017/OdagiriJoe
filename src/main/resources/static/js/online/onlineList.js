/* 이미지 클릭 시 해당 작품 상세 조회 페이지 이동 */

// 모든 gallery-item 요소 선택
const galleryItems = document.querySelectorAll(".gallery-item");

// 각 gallery-item에 클릭 이벤트 추가
galleryItems.forEach((item) => {
    item.addEventListener("click", () => {
        // 클릭한 item의 data-id 값을 가져옴
        const artworkId = item.querySelector(".artwork-image").getAttribute("data-id");
        // 상세 조회 페이지로 이동
        window.location.href = `/piece/onlineDetail`;
    });
});

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



/* 온란인 갤러리 목록 조회, 페이지네이션 */
function loadPieces(page = 1) {
    fetch(`/piece/online?page=${page}`)
        .then(response => {
          if(response.ok) { // HTTP 응답 상태 코드 200번(응답 성공)
            return response.json(); // 응답 결과를 text로 파싱
          }
        })
        .then(data => {

           

            
            renderSalesList(data.salesPiece || []); // 판매 작품 목록 렌더링
            renderPagination(data.salesPagination, 'salesPaginationBox', loadPieces);
            renderCompletedList(data.completedPiece || []); // 완료 작품 목록 렌더링
            renderPagination(data.complPagination, 'completedPaginationBox', loadPieces);
            
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
function renderCompletedList(items) {
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

// 페이지네이션 렌더링 (판매 작품과 완료 작품 모두 사용)
function renderPagination(pagination = {}, paginationBoxId, loadFunction) {
    const paginationBox = document.getElementById(paginationBoxId);
    paginationBox.innerHTML = '';

    if (pagination.prevPage) {
        const prevButton = document.createElement('button');
        prevButton.innerText = '<';
        prevButton.onclick = () => loadFunction(pagination.prevPage);
        paginationBox.appendChild(prevButton);
    }

    for (let i = pagination.startPage; i <= pagination.endPage; i++) {
        const pageButton = document.createElement('button');
        pageButton.innerText = i;
        pageButton.classList.add(i === pagination.currentPage ? 'active' : '');
        pageButton.onclick = () => loadFunction(i);
        paginationBox.appendChild(pageButton);
    }

    if (pagination.nextPage) {
        const nextButton = document.createElement('button');
        nextButton.innerText = '>';
        nextButton.onclick = () => loadFunction(pagination.nextPage);
        paginationBox.appendChild(nextButton);
    }
}

// 초기 로드 시 첫 페이지 로드
document.addEventListener('DOMContentLoaded', () => {
    loadPieces(1); // 첫 페이지의 작품들을 로드
});


