// 문의사항 클릭시 세부내용 창을 여는 함수
const inquiryClickEvent = () => {
  const items = document.querySelectorAll(".inquiry-item");

  items.forEach((item) => {
    item.addEventListener("click", () => {
      // 클릭한 아이템의 아이콘을 90도 회전
      const icon = item.querySelector(".icon");

      icon.classList.toggle("rotate");

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

// 삭제하기
const deleteClickEvent = () => {
  const deleteBtn = document.querySelectorAll(".deleteBtn");
  deleteBtn.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation(); // 부모로의 이벤트 전파 중단

      const questionNo = e.target.dataset.questionNo;
      fetch("/member/myPage/deleteQuestion?questionNo=" + questionNo)
        .then(response => {
          if (response.ok) return response.json();
          throw new Error("AJAX 통신 실패");
        })
        .then(result => {
          if (result > 0) {
            location.href = "/member/myPage/onequestion";
          } else {
            alert("다시 시도해 주세요.");
          }
        })
        .catch(err => console.error(err));
    }, { once: true }); // 이벤트 중복 방지를 위해 'once' 옵션 추가
  });
};

/* 페이지네이션 */
const pageNation = document.querySelector(".pagination");
const pagenations = pageNation.querySelectorAll("a");

pagenations.forEach((pagenation) => {
  pagenation.addEventListener("click", (e) => {
    e.preventDefault();
    console.log("된거야만거야");
    if(e.target.classList.contains("current")) return;
    location.href = location.pathname + "?cp=" + e.target.innerText;
  });
});

document.addEventListener("DOMContentLoaded", ()=> {
  inquiryClickEvent();
  deleteClickEvent();
});