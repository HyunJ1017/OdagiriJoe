// 팝업 열기
function openPopup(reportNo, pieceNo) {
  const popup = document.getElementById("reportPopup");
  if (!popup) {
    console.log("팝업 요소를 찾을 수 없음");
    return;
  }

  const confirmButton = popup.querySelector("#confirmReport");
  const cancelButton = popup.querySelector("#cancelReport");
  const reportReasonInput = popup.querySelector(".report-input");
  const reportDetailDiv = popup.querySelector(".report-detail");





  // 신고 사유 매핑
  const reportReasons = {
    1: "허위 정보",
    2: "사기 및 불법 행위",
    3: "부적절한 콘텐츠"
  }

  // 서버에서 데이터 가져오기
  fetch(`/manage/report/${reportNo}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("신고 내용 불러오기 실패");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      if (confirmButton) {
        confirmButton.dataset.id = reportNo;
      }
      if (cancelButton) {
        cancelButton.dataset.pieceNo = pieceNo;
      }
      // 팝업에 데이터 표시
      if (reportReasonInput) {
        const reasonText = reportReasons[data[0].reportType] || "알 수 없는 사유";
        reportReasonInput.value = reasonText;
      }
      if (reportDetailDiv) {
        reportDetailDiv.innerText = data[0].reportContent;
      }

      // 팝업 열기
      popup.classList.remove("display-none");
    })
    .catch((error) => {
      console.error("Error fetching report details:", error);
      alert("신고 내용을 불러오는 데 실패했습니다.");
    });
}

// 팝업 닫기
function closePopup() {
  const popup = document.getElementById("reportPopup");
  if (popup) {
    popup.classList.add("display-none"); // 팝업 숨기기
  } else {
    console.log("팝업 요소를 찾을 수 없음");
  }
}

// 상세보기 버튼 클릭 이벤트
document.addEventListener("click", (event) => {
  if (event.target.classList.contains("view-button")) {
    const reportNo = event.target.dataset.id; // data-id에서 reportNo 가져오기
    const pieceNo = event.target.dataset.pieceNo; // data-id에서 reportNo 가져오기
    openPopup(reportNo, pieceNo); // 팝업 열기
  }
});

// 팝업 닫기 버튼 이벤트
document.getElementById("closePopupBtn").addEventListener("click", closePopup);

// "게시글 삭제" 버튼 클릭 이벤트
document.getElementById("cancelReport").addEventListener("click", (event) => {
  const pieceNo = event.target.dataset.pieceNo; // data-id 속성에서 pieceNo 가져오기
 
  // 서버로 DELETE 요청 보내기
  fetch(`/manage/delete/${pieceNo}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("게시글 삭제 실패");
      }
      return response.text();
    })
    .then((result) => {
      // DOM에서 해당 항목 제거
      const deleteRow = document.querySelector(`[data-piece-id="${pieceNo}"]`);
      if (deleteRow) {
        deleteRow.remove(); // 항목 삭제
      }

      // 성공 알림창 표시
      alert("해당 게시글 삭제가 완료되었습니다.");

      // 목록 업데이트 (getList 함수 호출) 및 팝업 닫기
      getList(3, page3); // 필요 시 getList 함수 구현 확인
      closePopup();
    })
    .catch((error) => {
      console.error("게시글 삭제 오류:", error);
      alert("게시글 삭제에 실패하였습니다.");
    });
});


// "신고 반려" 버튼 클릭 이벤트
document.getElementById("confirmReport").addEventListener("click", (event) => {

  const reportNo = event.target.dataset.id;

  // 서버로 삭제 요청 보내기
  fetch(`/manage/report/${reportNo}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("신고 삭제 실패");
      }
      return response.text();

    })
    .then((result) => {


      const reportRow = document.querySelector(`[data-report-id="${reportNo}"]`);
      if (reportRow) {

        reportRow.remove();

      }

      // 성공 알림창 표시
      alert("신고 반려 처리가 완료되었습니다.");
      getList(3,page3);
      closePopup();
    })
    .catch(error => {
      console.error("Error deleting report:", error);
      alert("신고 삭제에 실패하였습니다.");
    });


});
