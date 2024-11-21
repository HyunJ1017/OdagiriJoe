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

const blankRow = '<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>';
const salesTableBody = document.getElementById('sales-table-body');
const totalSales = document.getElementById('total-sales');
const monthSales = document.getElementById('month-sales');
let rowCount = 0;
let totalAmount = 0;

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
    console.log(result.sellList);
    console.log(result.sellAmount);
    totalSales.innerText = result.sellAmount;
    rowCount = 0;
    totalAmount = 0;
    monthSales.innerText = '';
    salesTableBody.innerHTML = '';
    sellList = result.sellList;
    sellList.forEach(sell => {
      rowCount++;
      if(sell.priceReg != 0) totalAmount += Number(sell.payAmount.replace(/[^\d]/g, ""));
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${sell.artistNickname}</td>
        <td>${sell.pieceTitle}</td>
        <td>${sell.pieceType == "1" ? "판매" : "경매"}</td>
        <td>${sell.payAmount}</td>
        <td>10.1%</td>
        <td>${sell.payDate}</td>
        <td>${sell.priceReg == 0 ? "미완료" : "입금완료"}</td>
        `;
      salesTableBody.appendChild(tr);
    })

    if(rowCount < 10) {
      for(let i = 0; i < 10 - rowCount; i++) {
        salesTableBody.innerHTML += blankRow;
      }
    }

    monthSales.innerText = totalAmount.toLocaleString();
  })
  .catch(err => console.error(err));
}
