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
// document.addEventListener('DOMContentLoaded', () => {
//   const sort = document.getElementById('sort');
//   const sortSelect = document.querySelector('.sort-select');

//   // 정렬 함수
//   const sortItems = (criteria) => {
//     const items = Array.from(sortSelect.querySelectorAll('option')); // 모든 항목 가져오기

//     // 정렬 기준에 따른 정렬 로직
//     items.sort((a, b) => {
//       if (criteria === 'latest') {
//         // 최신순 (날짜 내림차순)
//         return new Date(b.dataset.date) - new Date(a.dataset.date);
//       } else if (criteria === 'oldest') {
//         // 오래된순 (날짜 오름차순)
//         return new Date(a.dataset.date) - new Date(b.dataset.date);
//       } else if (criteria === 'priceUp') {
//         // 추정가 높은순 (가격 내림차순)
//         return b.dataset.price - a.dataset.price;
//       } else if (criteria === 'priceDown') {
//         // 추정가 낮은순 (가격 오름차순)
//         return a.dataset.price - b.dataset.price;
//       }
//     });

//     // 기존 목록 제거 및 정렬된 항목 다시 추가
//     sortSelect.innerHTML = '';
//     items.forEach(item => itemList.appendChild(item));
//   };
//       // 이벤트 핸들러 추가
//       sort.addEventListener('change', (event) => {
//         const selectedValue = event.target.value; // 선택된 값 가져오기
//         sortItems(selectedValue); // 정렬 수행
//       });


//       // 초기 정렬 (최신순)
//       sortItems('latest');
//     });
