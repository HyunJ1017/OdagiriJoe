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


