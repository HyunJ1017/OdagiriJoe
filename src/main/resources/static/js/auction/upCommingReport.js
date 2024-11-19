document.addEventListener("DOMContentLoaded", function() {
  document.querySelector(".submit-btn").addEventListener("click", function() {

    const pieceNo = new URLSearchParams(location.search).get('pieceNo');

    // 선택된 신고 사유 가져오기
    let reason = document.querySelector('input[name="reason"]:checked')?.value;
    let detail = document.querySelector(".detail-section textarea").value.trim();


    // 필수 신고 사유를 선택 했는지 확인
    if (!reason) {
      alert("신고 사유를 선택해주세요");
      return;
    } else if (detail.length === 0) {
      alert("신고 내용를 입력해 주세요.");
      return;
    }


    // 서버에 전송할 데이터 구성
    let reportData = {
      memberNo: loginMemberNo,
      pieceNo : pieceNo,
      reportContent: detail,
      reportType: parseInt(reason)
    };

    // 서버로 fetch 요청 보내기
    fetch('/auction/report', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(reportData)
    })
    .then(response => {
      if(response.ok) return response.json();
      throw new Error("AJAX 통신 실패");
    })
    .then(data => {

      if(data > 0) {
        alert("신고가 성공적으로 접수되었습니다.");
        window.close();
      } else {
        alert("신고 접수에 실패하였습니다.");
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert("신고 처리 중 오류가 발생했습니다.");
    });

  });
});