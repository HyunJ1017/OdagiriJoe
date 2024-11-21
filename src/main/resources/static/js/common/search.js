// ----------------------------------------------------------------------------------------------------------------
/* 체크박스 선택 시 */
document.addEventListener('DOMContentLoaded', () => {
  const checkboxes = document.querySelectorAll('.filter-checkbox'); // 체크박스 선택
  const detailContainer = document.querySelector('.detail-container'); // 전체 detail-container 선택
  const detailItems = document.querySelectorAll('.detail-container [data-category]'); // 각 항목 선택

  // 필터링 함수
  const filterDetails = () => {
    let hasVisibleItems = false; // 표시되는 항목 여부 확인

    // 각 항목 확인
    detailItems.forEach(item => {
      // const category = item.getAttribute('data-category');
      // const matchingCheckbox = Array.from(checkboxes).find(cb => cb.getAttribute('data-category') === category);
      const category = item.dataset.category;
      const matchingCheckbox = Array.from(checkboxes).find(cb => cb.dataset.category === category);

      if (matchingCheckbox && matchingCheckbox.checked) {
        item.closest('.search-detail').style.display = 'block'; // 체크박스 체크된 경우 항목 표시
        hasVisibleItems = true;
      } else {
        item.closest('.search-detail').style.display = 'none'; // 체크박스 해제된 경우 항목 숨기기
      }
    });

    // 전체 컨테이너 표시/숨기기
    if (hasVisibleItems) {
      detailContainer.classList.remove('hidden'); // 항목이 있으면 컨테이너 표시
    } else {
      detailContainer.classList.add('hidden'); // 항목이 없으면 컨테이너 숨김
    }
  };

  // 체크박스 변경 시 필터링 적용
  checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', filterDetails);
  });

  // 초기 필터링 실행
  filterDetails();
});

// ---------------------------------------------------------------------------------------------------------------
/* 정렬 기준 변경 이벤트 */
function onSortChange(event) {
  const order = event.target.value; // 선택된 정렬 기준 ('latest', 'oldest', 'priceUp', 'priceDown')
  const container = document.querySelector(".detail-container"); // 정렬 대상 컨테이너
  const articles = Array.from(container.querySelectorAll(".search-detail")); // 검색 결과 리스트 요소들

  // 정렬 로직
  articles.sort((a, b) => {
    if (order === "latest" || order === "oldest") {
      // 날짜 정렬
      const dateA = new Date(a.querySelector(".reg-date").innerText.trim().replace(/[^\d]+/g, '-').slice(0, -1));
      const dateB = new Date(b.querySelector(".reg-date").innerText.trim().replace(/[^\d]+/g, '-').slice(0, -1));
      return order === "latest" ? dateB - dateA : dateA - dateB;
    } else if (order === "priceUp" || order === "priceDown") {
      // 가격 정렬 
      const aa =a.querySelector(".hope-price").textContent;
      const bb =b.querySelector(".hope-price").textContent;

      const priceA = Number(aa.trim().replaceAll(",",""));
      const priceB = Number(bb.trim().replaceAll(",",""));
      return order === "priceDown" ? priceA - priceB : priceB - priceA;
    }
  });

  // 정렬된 요소를 다시 DOM에 추가
  articles.forEach((article) => {
    container.appendChild(article)
  });
}



