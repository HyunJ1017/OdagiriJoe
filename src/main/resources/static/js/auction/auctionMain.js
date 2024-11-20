const buttons = document.querySelectorAll('.detail-button'); // 모든 상세보기 버튼 선택

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const pieceNo = button.getAttribute('data-id'); // 버튼의 data-id에서 pieceNo 가져오기

        // 상세 페이지로 이동
        location.href = `/auction/upCommingDetail?pieceNo=${pieceNo}`;
    });
});



const buttons2 = document.querySelectorAll('.detail-button2'); // 모든 상세보기 버튼 선택

buttons2.forEach(button => {
    button.addEventListener('click', () => {
        const pieceNo = button.getAttribute('data-id'); // 버튼의 data-id에서 pieceNo 가져오기

        // 상세 페이지로 이동
        location.href = `/auction/currentDetail?pieceNo=${pieceNo}`;
    });
});





