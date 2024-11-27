document.addEventListener('DOMContentLoaded', () => {
  const visitorCookie = document.cookie.split('; ').find(row => row.startsWith('visitor='));

  if (!visitorCookie) {
      // 방문자 증가 요청
      fetch('/dashboard/incrementVisitor', { method: 'POST' })
          .then(response => {
              if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
              return response.json();
          })
          .then(data => {
              console.log(`방문자 수: ${data.visitorCount}`);

              // 쿠키 저장 (유효기간 1일)
              document.cookie = 'visitor=true; max-age=86400; path=/';

              // 대시보드 데이터를 불러오는 함수 호출
              fetchAndRenderVisitorData();
          })
          .catch(err => console.error("방문자 증가 요청 실패:", err));
  } else {
      // 방문자 쿠키가 존재하면 바로 대시보드 데이터를 불러옴
      fetchAndRenderVisitorData();
  }
});

function fetchAndRenderVisitorData() {
  fetch('/dashboard/visitorData')
      .then(response => {
          if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
          return response.json();
      })
      .then(visitorData => {
          const labels = Object.keys(visitorData); // 날짜
          const data = Object.values(visitorData); // 방문자 수

          // 차트와 테이블에 데이터 렌더링
          renderChart(labels, data);
          renderTable(labels, data); // 테이블 렌더링 추가
      })
      .catch(err => console.error("방문자 데이터를 불러오지 못했습니다:", err));
}

function renderChart(labels, data) {
  const ctx = document.getElementById('dashboardChart').getContext('2d');

  // 기존 차트 삭제 (재렌더링 방지)
  if (window.dashboardChart && typeof window.dashboardChart.destroy === 'function') {
      window.dashboardChart.destroy();
  }

  // 새 차트 생성
  window.dashboardChart = new Chart(ctx, {
      type: 'line',
      data: {
          labels: labels,
          datasets: [{
              label: '방문자 수',
              data: data,
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 2,
              fill: false
          }]
      },
      options: {
          responsive: true,
          scales: {
              x: {
                  title: {
                      display: true,
                      text: '날짜'
                  }
              },
              y: {
                  title: {
                      display: true,
                      text: '방문자 수'
                  },
                  beginAtZero: true
              }
          }
      }
  });
}

function renderTable(labels, data) {
  const tableBody = document.getElementById('tableBody');
  tableBody.innerHTML = ''; // 기존 테이블 초기화

  labels.forEach((label, index) => {
      const row = document.createElement('tr');
      row.innerHTML = `
          <td>${label}</td>
          <td>${data[index]}</td>
      `;
      tableBody.appendChild(row);
  });
}
