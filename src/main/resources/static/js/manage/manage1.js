// 쿠키 읽기
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
}

// 쿠키 설정
function setCookie(name, value, days) {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = `expires=${date.toUTCString()}`;
  document.cookie = `${name}=${value}; ${expires}; path=/`;
}

// 그래프 데이터 로드
function loadDashboardData(type) {
  // 서버로 요청하여 그래프 데이터 가져오기
  fetch(`/dashboard/data?type=${type}`)
    .then(response => response.json())
    .then(data => {
      renderChart(type, data.chartData); // 차트 렌더링
      renderTable(data.tableData); // 테이블 렌더링
      setCookie("selectedDashboard", type, 7); // 선택된 대시보드 쿠키 저장
    })
    .catch(err => console.error("그래프 데이터를 불러오지 못했습니다.", err));
}

// 초기 상태 설정
document.addEventListener("DOMContentLoaded", () => {
  const selectedDashboard = getCookie("selectedDashboard") || "visitor"; // 기본값: 방문자 현황
  loadDashboardData(selectedDashboard); // 쿠키에 저장된 데이터 로드
});

// 차트 렌더링 함수
function renderChart(type, chartData) {
  const ctx = document.getElementById("dashboardChart").getContext("2d");
  new Chart(ctx, {
    type: "line",
    data: {
      labels: chartData.labels,
      datasets: [{
        label: type === "visitor" ? "방문자 현황" : type === "charge" ? "충전 현황" : "거래 현황",
        data: chartData.data,
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
      }]
    }
  });
}

// 테이블 렌더링 함수
function renderTable(tableData) {
  const tableBody = document.querySelector(".data-table tbody");
  tableBody.innerHTML = tableData.map(row => `
    <tr>
      ${row.map(cell => `<td>${cell}</td>`).join("")}
    </tr>
  `).join("");
}
