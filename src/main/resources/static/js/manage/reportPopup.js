// 팝업 열기
function openPopup() {
  const popup = document.getElementById("reportPopup");
  if (popup) {
    popup.classList.remove("display-none");
    console.log("팝업 열림");
  } else {
    console.log("팝업 요소를 찾을 수 없음");
  }
}


// 상세보기 버튼 클릭 이벤트
document.addEventListener("click", (event) => {
  console.log("reportPopup.js");
  if (event.target.classList.contains("view-button")) {
    console.log("상세보기 버튼 클릭 감지");
    openPopup();
  }
});

// 팝업 닫기
function closePopup() {
  const popup = document.getElementById("reportPopup");
  if (popup) {
    popup.style.display = "none";
    console.log("팝업 닫힘");
  }
}

// 팝업 닫기 버튼 이벤트
document.getElementById("cancelReport").addEventListener("click", closePopup);
document.getElementById("confirmReport").addEventListener("click", () => {
  alert("게시글 확인");
  closePopup();
});
