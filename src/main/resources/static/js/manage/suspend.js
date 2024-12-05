
// 회원 정지
document.addEventListener("click", (event) => {
  if (event.target.classList.contains("member-suspend-btn")) {
    const memberNo = event.target.closest(".member-summary").getAttribute("data-member-no");
    suspend(memberNo); // 정지 함수 호출
    return;
  }
});

function suspend(memberNo) {
  if (!confirm("정말로 이 회원을 정지하시겠습니까?")) return;
  fetch(`/manage/suspend`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: memberNo// MEMBER_NO 전달
  })
    .then((response) => {
      if (!response.ok) {throw new Error("정지 실패");
    }
    return response.text();
    })
    .then((data) => {
      alert(`회원 정지 성공: ${data}`);
      getList(2, page2, 0);
    })
    .catch((error) => alert(`정지 실패: ${error.message}`));
}

 // 회원 탈퇴
 document.addEventListener("click", (event) => {
  if (event.target.classList.contains("member-withdraw-btn")) {
    const memberNo = event.target.closest(".member-summary").getAttribute("data-member-no");
    withdraw(memberNo); // 정지 함수 호출
  }
});
 function withdraw(memberNo) {
   if (!confirm("정말로 이 회원을 탈퇴시키겠습니까?")) return;

   fetch(`/manage/withdraw`, {
     method: "POST",
     headers: {
       "Content-Type": "application/json",
     },
     body:  memberNo // MEMBER_NO 전달
   })
     .then((response) => {
       if (!response.ok) {throw new Error("탈퇴실패");
     } 
       return response.text();
    })
    .then((data) => {
       alert(`회원 탈퇴 성공: ${data}`);
       getList(2, page2, 0);
     })
    .catch((error) => alert(`탈퇴 실패: ${error.message}`));
  }

// 작가 정지
document.addEventListener("click", (event) => {
  if(event.target.classList.contains("artist-suspend-btn")){
    const memberNo = event.target.closest(".artist-item").getAttribute("data-member-no");
    suspend2(memberNo);
    return;
  }
})
function suspend2(memberNo){
  if(!confirm("정말로 이 작가을 정지하시겠습니까?")) return;
  fetch(`/manage/suspend2`, {
    method : "POST",
    headers : {
      "Content-Type" : "application/json",
    },
    body : memberNo
  })
  .then((response) => {
    if(!response.ok) {throw new Error("정지 실패");
  }
  return response.text();

  })
  .then((data) => {
    alert(`작가 정지 성공: ${data}`);
    getList(1, page1, 0);
  })
  .catch(error => alert(`정지 실패: ${error.message}`));
}
  
// 작가 탈퇴
document.addEventListener("click", (event) =>{
  if(event.target.classList.contains("artist-withdraw-btn")){
    const memberNo = event.target.closest(".artist-item").getAttribute("data-member-no");
    withdraw2(memberNo);
    return;
  }
})
function withdraw2(memberNo){
  if(!confirm("정말로 이 작가를 탍퇴시키겠습니까?")) return;
  fetch(`/manage/withdraw2`, {
  method : "POST",
  headers : {
    "Content-Type" : "application/json",
  },
  body : memberNo    
  })
  .then((response) => {
    if(!response.ok) {throw new Error("탈퇴 실패")}
    return response.text();
  })
  .then((data) => {
    alert(`작가 탈퇴 성공 : ${data}`);
    getList(1, page1, 0);
  })
  .catch(error => alert(`탈퇴 실패: ${error.message}`));  


}


