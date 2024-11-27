
let noticeNo = 0;

document.addEventListener("click", (event) => {
  if(event.target.classList.contains("erase-button")){
    noticeNo = event.target.dataset.noticeNo;

    if(confirm("정말로 삭제하시겠습니까?")){
      
      fetch(`manage/erase/${noticeNo}`, {
        method : "DELETE",
        headers : {
          "Content-Type" : "application/json",
        },
      })
      .then((response) => {
       if(response.ok){
        alert("삭제 성공");
        location.reload();
       }else{
        throw new Error("삭제 실패");
       }
      })
      .catch(error => alert(`삭제 실패: ${error.message}`));
    }

  }
})

// 공지사항 수정하기
document.addEventListener("click", (event) => {
  if (event.target.classList.contains("revise-button")) {
    const noticeNo = event.target.dataset.noticeNo;

    // 공지사항 수정 페이지로 이동
    location.href = `/manage/revise2/${noticeNo}`;
  }
});

