function toggleFaq(element) {
  const faqBox = element.parentNode;
  const answerContainer = faqBox.nextElementSibling;
  const isOpen = faqBox.classList.contains("open");

  // 모든 FAQ 박스와 답변 영역 초기화
  document.querySelectorAll(".faq-box").forEach(box => box.classList.remove("open"));
  document.querySelectorAll(".faq-answer-container").forEach(answer => {
    answer.style.maxHeight = "0";
    answer.classList.remove("open");
    answer.previousElementSibling.querySelector(".toggle-icon").style.transform = "rotate(0deg)";
  });

  // 현재 클릭한 항목이 열려 있지 않으면 열기
  if (!isOpen) {
    faqBox.classList.add("open");
    answerContainer.classList.add("open");
    answerContainer.style.maxHeight = answerContainer.scrollHeight + "px";
    element.querySelector(".toggle-icon").style.transform = "rotate(90deg)";
  }
}

// transitionend 이벤트 추가
document.querySelectorAll(".faq-answer-container").forEach(answer => {
  answer.addEventListener("transitionend", function () {
    // 열려 있을 때 maxHeight를 auto로 설정하여 자연스러운 애니메이션 제공
    if (answer.classList.contains("open")) {
      answer.style.maxHeight = "auto";
    }
  });
});
