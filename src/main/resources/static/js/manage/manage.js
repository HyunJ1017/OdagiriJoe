function showTab(tabId) {
  // 모든 탭 버튼에서 'active' 클래스 제거
  document.querySelectorAll('.tab-btn').forEach(function(button) {
      button.classList.remove('active');
  });
  // 클릭한 버튼에 'active' 클래스 추가
  event.target.classList.add('active');

  // 모든 콘텐츠 숨김
  document.querySelectorAll('.tab-content').forEach(function(content) {
      content.classList.remove('active');
  });
  // 선택한 콘텐츠만 표시
  document.getElementById(tabId).classList.add('active');
}