document.addEventListener('DOMContentLoaded', () => {
    // 쿠키 검사
    const visitorCookie = document.cookie.split('; ').find(row => row.startsWith('visitor='));

    document.cookie = 'visitor=true; max-age=86400; path=/';


    if (!visitorCookie) {
        // 방문자 증가 요청
        fetch('/dashboard/incrementVisitor', { method: 'POST' })
            .then(response => {
                if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
                fetchAndRenderVisitorData(); // 데이터 갱신
            })
            .catch(err => console.error("방문자 증가 요청 실패:", err));
    } else {
        // 방문자 쿠키가 존재하면 바로 대시보드 데이터를 불러옴
        fetchAndRenderVisitorData();
        
    }
});

document.addEventListener("DOMContentLoaded", () => {
	// 버튼 및 탭 내용 활성화
	const buttons  = document.querySelectorAll(".tab-btn");
	const tabContents  = document.querySelectorAll(".tab-content");

	// 버튼 클릭 이벤트 설정
	buttons.forEach(button => {
		button.addEventListener("click", () => {
			const targetId = button.getAttribute("data-target");

			// 모든 탭을 비활성화
			tabContents.forEach(tab => {
				tab.classList.remove("active");
			});

			// 선택된 탭 활성화
			document.getElementById(targetId).classList.add("active");

			// 그래프 초기화 및 렌더링
			if (targetId === 'visitor') {
				fetchAndRenderVisitorData(); // 방문자 데이터 렌더링
			} else if (targetId === 'trade') {
				fetchRenderTradeChart(); // 거래 데이터 렌더링
			} else if (targetId === 'artwork') {
				renderArtworkChart(); // 작품 데이터 렌더링
			}
		});
	});
	// 기본 활성화 상태 설정 (방문자 현황)
	fetchAndRenderVisitorData();
});

/* 방문자 데이터 렌더링 */
function fetchAndRenderVisitorData() {
    fetch('/dashboard/visitorData')
        .then(response => {
            if(response.ok) return response.json();
            throw new Error("방문자 데이터를 불러오지 못했습니다.");
        })
        .then(data => {
            // 응답 데이터 검증 및 기본값 처리
            const weeklyData = data.weeklyData || {}; // 기본값: 빈 객체
            const weeklyTotal = data.weeklyTotal || 0; // 기본값: 0
            const monthlyTotal = data.monthlyTotal || 0; // 기본값: 0

            for (let i = 6; i > 0; i--) {
                const date = new Date();
                date.setDate(date.getDate() - i); // i만큼 날짜를 빼면서 최근 7일 계산
        
                // 연도, 월, 일을 "YYYY-MM-DD" 형식으로 설정
                const year = date.getFullYear();
                const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1
                const day = String(date.getDate()).padStart(2, '0'); // 일자를 2자리로 설정
                
                weekKey = `${year}-${month}-${day}`;
                if (!(weekKey in weeklyData)) {
                    weeklyData[weekKey] = 0; // 해당 날짜 키에 0을 기본 값으로 설정
                }
            }

            // 날짜 키 정렬
            const sortedKeys = Object.keys(weeklyData).sort((a, b) => new Date(a) - new Date(b));

            // 정렬된 날짜 키를 사용해 데이터를 다시 추출
            const sortedWeeklyData = sortedKeys.reduce((acc, key) => {
                acc[key] = weeklyData[key];
                return acc;
            }, {});
            // console.log(sortedWeeklyData);
            renderVisitorChart(sortedKeys, sortedWeeklyData);

            // 테이블 렌더링
            renderVisitorTable(sortedKeys, sortedWeeklyData, weeklyTotal, monthlyTotal);
        })
        .catch(err => console.error("방문자 데이터를 불러오지 못했습니다:", err));
}

function renderVisitorChart(labels, data) {

    const ctx = document.getElementById('dashboardChart')?.getContext('2d');

    // 기존 차트가 존재하면 삭제
    console.log(window.dashboardChart);
    if (window.dashboardChart instanceof Chart) {
        window.dashboardChart.destroy(); // Chart.js 객체의 destroy() 메서드 호출
    }

    // 새 차트 생성
    window.dashboardChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: '방문자 수',
                data: Object.values(data),
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 2,
                fill: false
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: {

                    title: { display: true, text: '날짜' }
                },
                y: {
                    title: { display: true, text: '방문자 수' },
                    beginAtZero: true
                }
            }
        }
    });
    
}



function renderVisitorTable(labels, counts, weeklyTotal, monthlyTotal, ) {
    const tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = ''; // 기존 내용 초기화

    console.log(labels);
    console.log(counts);
    labels.forEach((label, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${label}</td><td>${counts[label]}</td>`;
        tableBody.appendChild(row);
    });

    // 일주일 합계
    const weeklyRow = document.createElement('tr');
    weeklyRow.innerHTML = `<td>일주일 합계</td><td>${weeklyTotal}명</td>`;
    tableBody.appendChild(weeklyRow);

    // 한 달 합계
    const monthlyRow = document.createElement('tr');
    monthlyRow.innerHTML = `<td>한 달 합계</td><td>${monthlyTotal}명</td>`;
    tableBody.appendChild(monthlyRow);
}


/* 거래현황 데이터 렌더링 */
function fetchRenderTradeChart() {
	fetch('/dashboard/tradeData')
	.then(response => {
		if(response.ok) return response.json();
		throw new Error("거래현황 데이터를 불러오지 못했습니다.");
	})
	.then(data => {
		const dailyTrades = data.dailyTrades || {};
		const weeklyTradeTotal = data.weeklyTradeTotal || 0;
		const monthlyTradeTotal = data.monthlyTradeTotal || 0;

		console.log(dailyTrades);
		console.log(weeklyTradeTotal);
		console.log(monthlyTradeTotal);

		

	// 날짜 키 정렬
	const sortedKeys = Object.keys(weeklyData).sort((a, b) => new Date(a) - new Date(b));

	// 정렬된 날짜 키를 사용해 데이터를 다시 추출
	const sortedWeeklyData = sortedKeys.reduce((acc, key) => {
			acc[key] = dailyTrades[key];
			return acc;
	}, {});

	

	renderTradeChart(sortedKeys, sortedWeeklyData);
	

	// 태이블 렌더링
	renderTable(sortedKeys, sortedWeeklyData, weeklyTradeTotal, monthlyTradeTotal);
	})
	.catch(err => console.error("거래현황 데이터를 불러오지 못했습니다:", err));

}

function renderTradeChart(labels, data) {
	console.log(window.dashboardChart);
	const ctx = document.getElementById('tradeChart')?.getContext('2d');
	if (!ctx) {
    console.error("차트를 그릴 캔버스를 찾을 수 없습니다.");
    return;
}

	// 기존 차트기 존재하면 삭제
	if(window.dashboardChart instanceof Chart) {
		window.dashboardChart.destroy();
	}

	// 새 차트 생성
	window.dashboardChart = new Chart(ctx, {
		type : 'line',
		tradedata : {
			labels : labels,
			datasets : [{
				label : '결제 금액',
				data : Object.values(data),
				borderColor : 'rgba(75, 192, 192, 1)',
				borderWidth : 2,
				fill : false
			}]
		},
		options : {
			responsive : true,
			scales : {
				x : {
					title : { display : true, text : '날짜' }
				},
				y : {
					title : { display : true, text : '결제 금액' },
					beginAtZero : true
				}
			}
		}
	});
}


function renderTradeTable(labels, counts, weeklyTotal, monthlyTotal) {
	const tableBody = document.getElementById('tableBody');
	tableBody.innerHTML = '';

	labels.forEach((label, index) => {
			const row = document.createElement('tr');
			row.innerHTML = `<td>${label}</td><td>${counts[label]}원</td>`;
			tableBody.appendChild(row);
	});

	const weeklyRow = document.createElement('tr');
	weeklyRow.innerHTML = `<td>일주일 합계</td><td>${weeklyTotal}원</td>`;
	tableBody.appendChild(weeklyRow);

	const monthlyRow = document.createElement('tr');
	monthlyRow.innerHTML = `<td>한 달 합계</td><td>${monthlyTotal}원</td>`;
	tableBody.appendChild(monthlyRow);
}

