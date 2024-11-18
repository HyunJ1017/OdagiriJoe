
// /* 프리뷰, 경매시작일 날짜 */
// document.addEventListener('DOMContentLoaded', () => {
//   const now = new Date();
//   const weekdays = ['일', '월', '화', '수', '목', '금', '토'];

//   // 날짜 포맷 함수
//   function formatDateWithDay(date) {
//       const month = date.getMonth() + 1;
//       const day = date.getDate();
//       const weekday = weekdays[date.getDay()];
//       return `${month}월 ${day}일(${weekday})`;
//   }

//   function formatDateWithTime(date) {
//       const month = date.getMonth() + 1;
//       const day = date.getDate();
//       return `${month}월 ${day}일 14:00`;
//   }

//   // 모든 경매 항목에 대해 날짜 계산 및 삽입
//   document.querySelectorAll('.upcoming-box').forEach((box, index) => {
//       const previewStartDate = new Date(now);
//       const previewEndDate = new Date(now);
//       previewStartDate.setDate(now.getDate() + 7); // 프리뷰 시작일: 현재 날짜 + 7일
//       previewEndDate.setDate(now.getDate() + 17); // 프리뷰 종료일: 현재 날짜 + 17일

//       const auctionDate = new Date(now);
//       auctionDate.setDate(now.getDate() + 21); // 경매일: 현재 날짜 + 21일
//       auctionDate.setHours(14, 0, 0, 0); // 시간 고정: 14:00

//       // 각 항목의 preview-date와 auction-date 요소 선택
//       const previewDateElement = document.getElementById(`preview-date${index}`);
//       const auctionDateElement = document.getElementById(`auction-date${index}`);

//       // 계산된 날짜 삽입
//       if (previewDateElement) {
//           previewDateElement.textContent = `${formatDateWithDay(previewStartDate)} ~ ${formatDateWithDay(previewEndDate)}`;
//       }
//       if (auctionDateElement) {
//           auctionDateElement.textContent = formatDateWithTime(auctionDate);
//       }
//   });
// });




    const buttons = document.querySelectorAll('.detail-button'); // 모든 상세보기 버튼 선택

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const pieceNo = button.getAttribute('data-id'); // 버튼의 data-id에서 pieceNo 가져오기
            console.log(`Button clicked with pieceNo: ${pieceNo}`);

            // 상세 페이지로 이동
            location.href = `/auction/upCommingDetail?pieceNo=${pieceNo}`;
        });
    });



// request opooNO
// 비동기로 조회



