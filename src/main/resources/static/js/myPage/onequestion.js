// 문의사항 클릭시 세부내용 창을 여는 함수
const inquiryClickEvect = () => {
  const items = document.querySelectorAll(".inquiry-item");

  items.forEach((item) => {
    item.addEventListener("click", () => {
      const details = item.querySelectorAll(".detail");

      details.forEach((detail) => {
        detail.classList.toggle("display-none");
      });
    })
  });
}

// 1:1 문의 남기기
const insertBtn = document.getElementById("insertBtn");
insertBtn.addEventListener("click", () => {
  const insertQuestionBox = document.getElementById("insertQuestionBox");
  insertQuestionBox.classList.toggle("display-none");
})
const insertQuestion = document.getElementById("insertQuestion");
insertQuestion.addEventListener("click", () => {
  if (document.getElementById("questionContent").value.trim().length === 0) {
    alert("1:1 문의 내용을 입력해주세요.");
    return;
  }
  const questionObj = {
    "questionCategoryNo": document.getElementById("questionCategoryNo").value,
    "questionContent": document.getElementById("questionContent").value,
    "memberNo": memberNo
  }
  fetch("/member/myPage/insertQuestion", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(questionObj)
  })
  .then(response => {
    if (response.ok) return response.json();
    throw new Error("AJAX 통신 실패");
  })
  .then(result => {
    if(result > 0){
      location.href = "/member/myPage/onequestion";
    } else {
      alert("다시 시도해 주새요.");
    }
    
  })
  .catch(err => console.error(err));
})

document.addEventListener("DOMContentLoaded", ()=> {
  inquiryClickEvect();
});