document.addEventListener('DOMContentLoaded', () => {
  const selectMonth = document.getElementById('selectMonth');
  const now = new Date();
  
  // 현재 연도와 월을 "YYYY-MM" 형식으로 설정
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1
  selectMonth.value = `${year}-${month}`;

  getSalesConfirmation(`${year}-${month}`);
});

const selectMonth = document.getElementById('selectMonth');
selectMonth.addEventListener('change', () => {
  const selectedMonth = selectMonth.value;
  
  getSalesConfirmation(selectedMonth);
});

// 비동기로 판매현황표 얻어오기
const getSalesConfirmation = (selectedMonth) => {
  
  console.log(`Selected month: ${selectedMonth}`);

  const obj = {
    "selectedMonth" : selectedMonth,
    "memberNo" : memberNo
  };

  fetch("/member/myPage/getSalesConfirmation", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(obj)
  })
  .then(response => {
    if (response.ok) return response.json();
    throw new Error("AJAX 통신 실패");
  })
  .then(result => {
    console.log(result);
  })
  .catch(err => console.error(err));
}