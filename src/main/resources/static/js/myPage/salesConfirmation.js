document.addEventListener('DOMContentLoaded', () => {
  const selectMonth = document.getElementById('selectMonth');
  const now = new Date();
  
  // 현재 연도와 월을 "YYYY-MM" 형식으로 설정
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1
  selectMonth.value = `${year}-${month}`;
});