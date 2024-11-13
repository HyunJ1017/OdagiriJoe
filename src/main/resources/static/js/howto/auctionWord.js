document.addEventListener("DOMContentLoaded", function() {
  const tabs = document.querySelectorAll(".tab-button");
  const sections = document.querySelectorAll(".wordText");

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      // 모든 섹션 숨기기
      sections.forEach(section => section.style.display = "none");

      // 클릭한 탭의 data-target 속성에 해당하는 섹션만 표시
      const targetId = tab.getAttribute("data-target");
      document.getElementById(targetId).style.display = "block";
    });
  });
});