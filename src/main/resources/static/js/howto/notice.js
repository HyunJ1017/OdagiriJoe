function toggleContent(element) {
  const content = element.nextElementSibling;
  const isVisible = content.classList.contains("open");

  // 모든 notice-content를 닫기
  document.querySelectorAll(".notice-content").forEach(item => {
      if (item !== content) {
          item.style.height = "0px";
          item.classList.remove("open");
          item.previousElementSibling.classList.remove("open");
      }
  });

  // 클릭한 항목에 애니메이션 적용
  if (!isVisible) {
      element.classList.add("open");
      content.classList.add("open");
      
      // 높이를 계산하여 설정
      const scrollHeight = content.scrollHeight + "px";
      content.style.height = scrollHeight;

      // 애니메이션이 끝난 후 height를 auto로 설정
      content.addEventListener("transitionend", function handler() {
          content.style.height = "auto";
          content.removeEventListener("transitionend", handler);
      });
  } else {
      content.style.height = content.scrollHeight + "px";
      // 강제로 리플로우(Reflow) 시켜 애니메이션 효과 적용
      content.offsetHeight;
      content.style.height = "0px";
      element.classList.remove("open");
      content.classList.remove("open");
  }
}