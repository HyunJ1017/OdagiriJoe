let page1 = 1;
let page2 = 1;
let page3 = 1;
let page4 = 1;
let page5 = 1;
let page6 = 1;
let page7 = 1;

function showTab(tabId, button) {
  // 모든 탭 버튼에서 'active' 클래스 제거
  document.querySelectorAll('.tab-btn').forEach(function (btn) {
    btn.classList.remove('active');
  });
  // 클릭된 버튼에 'active-btn' 클래스 추가
  button.classList.add('active-btn');

  // 모든 콘텐츠 숨김
  document.querySelectorAll('.tab-content').forEach(function (content) {
    content.classList.remove('active');
  });

  // 선택한 콘텐츠만 표시
  document.getElementById(tabId).classList.add('active');
}

// 페이지 로드 시 첫 번째 탭을 기본으로 표시
document.addEventListener("DOMContentLoaded", function () {
  document.querySelector('.tab-btn').click();
});


/* 토글 기능 추가 */

// 모든 아이콘 요소 선택
document.querySelectorAll(".faq-item .question-row").forEach(row => {

  row.addEventListener("click", () => {
    const answer = row.nextElementSibling;
    console.log(answer);

    const buttons = answer.nextElementSibling;

    // answer요소가 숨겨져 있거나 스타일이 지정되어 있지 않을 경우
    if (answer.style.display === "none" || !answer.style.display) {
      // answer 요소를 보이도록 함
      answer.style.display = "block";
      // bottons 요소를 보이도록 하고  flex 레이아웃 적용
      buttons.style.display = "flex";
      row.querySelector(".icon").textContent = "▼";
    } else {
      answer.style.display = "none";
      buttons.style.display = "none";
      row.querySelector(".icon").textContent = "▶";
    }
  });
});


// 1:1 문의 토글 기능
const questionToggleFn = () => {


  document.querySelectorAll(".inquiry-section .inquiry-row").forEach(row => {
    row.addEventListener("click", () => {
      const details = row.parentElement.querySelector(".details");
      const buttons = details.querySelector(".inquiry-buttons");

      if (details.style.display === "none" || !details.style.display) {
        details.style.display = "flex";
        buttons.style.display = "flex"; // 버튼들이 보이도록 설정
        row.querySelector(".icon").textContent = "▼";
      } else {
        details.style.display = "none";
        buttons.style.display = "none"; // 버튼들이 사라지도록 설정
        row.querySelector(".icon").textContent = "▶";
      }
    });
  });
}

const noticeToggleFn = () => {

  /* 공지사항 토글기능 */
  document.querySelectorAll(".notice-item .notice-row").forEach(row => {

    row.addEventListener("click", () => {

      const noticeAnswer = row.nextElementSibling; // 답변 요소
      const noticeButtons = noticeAnswer.nextElementSibling; // 답변 다음 행 버튼 요소

      // answer 요소가 숨겨져 있거나 스타일이 지정되어 있지 않을 경우
      if (noticeAnswer.style.display === "none" || !noticeAnswer.style.display) {
        // answer 요소를 보이도록 설정
        noticeAnswer.style.display = "block";
        // buttons 요소를 보이도록 설정
        noticeButtons.style.display = "flex";
        row.querySelector(".icon").textContent = "▼"; // 아이콘 변경
      } else {
        // answer 요소를 숨기도록 설정
        noticeAnswer.style.display = "none";
        // buttons 요소를 숨기도록 설정
        noticeButtons.style.display = "none";
        row.querySelector(".icon").textContent = "▶"; // 아이콘 변경
      }
    });
  });

}




// /* /* 페이지네이션 */
// // 공통 페이지네이션 함수
// function applyPagination(items, paginationContainer, itemsPerPage = 4) {
//   // 현재 페이지를 저장하는 변수 (기본값 1)
//   let currentPage = 1;

//   // 현재 페이지에 해당하는 항목만 화면에 표시하는 함수
//   function displayItems(page) {
//     // 현재 페이지의 시작 인덱스와 끝 인덱스 계산
//     const start = (page - 1) * itemsPerPage;
//     const end = start + itemsPerPage;

//     // 모든 항목을 순회하면서, 현재 페이지 범위에 속하는 항목만 표시하고 나머지는 숨김
//     items.forEach((item, index) => {
//       if (item.style.display = index >= start && index < end) {
//         if (item.tagName === 'TR') {
//           item.style.display = "table-row";
//         } else {
//           item.style.display = "block";
//         }
//       } else {
//         item.style.display = "none";
//       }
//     });
//   }

//   // 페이지네이션 버튼을 설정하고 업데이트하는 함수
//   function setupPagination(totalItems) {
//     // 총 페이지 수 계산
//     const pageCount = Math.ceil(totalItems / itemsPerPage);
//     // 페이지네이션 버튼 컨테이너 초기화 (이전에 생성된 버튼 제거)
//     paginationContainer.innerHTML = "";

//     // 이전 페이지 버튼 생성
//     const prevBtn = document.createElement("button");
//     prevBtn.classList.add("nav-btn"); // CSS 스타일을 적용하기 위해 'nav-btn' 클래스 추가
//     prevBtn.textContent = "이전"; // 버튼 텍스트 설정
//     prevBtn.disabled = currentPage === 1; // 첫 페이지일 때 버튼 비활성화
//     prevBtn.addEventListener("click", () => {
//       // 현재 페이지가 1보다 클 때만 페이지를 감소시킴
//       if (currentPage > 1) {
//         currentPage--; // 현재 페이지 감소
//         displayItems(currentPage); // 새로운 페이지 항목 표시
//         setupPagination(totalItems); // 페이지네이션 다시 설정
//       }
//     });
//     paginationContainer.appendChild(prevBtn); // 이전 버튼을 페이지네이션 컨테이너에 추가

//     // 페이지 번호 버튼 생성
//     for (let i = 1; i <= pageCount; i++) {
//       const pageBtn = document.createElement("button"); // 페이지 번호 버튼 생성
//       pageBtn.classList.add("page-btn"); // CSS 스타일을 적용하기 위해 'page-btn' 클래스 추가
//       pageBtn.textContent = i; // 버튼 텍스트를 페이지 번호로 설정

//       // 현재 페이지와 일치하는 버튼에 'active2' 클래스 추가
//       if (i === currentPage) {
//         pageBtn.classList.add("active2");
//       }

//       pageBtn.addEventListener("click", () => {
//         currentPage = i; // 현재 페이지를 클릭된 페이지 번호로 설정
//         displayItems(currentPage); // 새로운 페이지 항목 표시
//         setupPagination(totalItems); // 페이지네이션 다시 설정
//       });

//       paginationContainer.appendChild(pageBtn); // 페이지 번호 버튼을 페이지네이션 컨테이너에 추가
//     }

//     // 다음 페이지 버튼 생성
//     const nextBtn = document.createElement("button");
//     nextBtn.classList.add("nav-btn"); // CSS 스타일을 적용하기 위해 'nav-btn' 클래스 추가
//     nextBtn.textContent = "다음"; // 버튼 텍스트 설정
//     nextBtn.disabled = currentPage === pageCount; // 마지막 페이지일 때 버튼 비활성화
//     nextBtn.addEventListener("click", () => {
//       // 현재 페이지가 총 페이지 수보다 작을 때만 페이지를 증가시킴
//       if (currentPage < pageCount) {
//         currentPage++; // 현재 페이지 증가
//         displayItems(currentPage); // 새로운 페이지 항목 표시
//         setupPagination(totalItems); // 페이지네이션 다시 설정
//       }
//     });
//     paginationContainer.appendChild(nextBtn); // 다음 버튼을 페이지네이션 컨테이너에 추가
//   }



//   displayItems(currentPage); // 첫 페이지의 항목을 표시
//   setupPagination(items.length); // 페이지네이션 버튼을 초기화
// }


// // 각 세션에 페이지네이션 적용
// // 컨텐츠 관리
// const contentItems = Array.from(document.querySelectorAll("#contentGrid .content-card")); // 콘텐츠 관리 섹션의 항목 배열 가져오기
// const contentPagination = document.getElementById("pagination"); // 콘텐츠 관리 섹션의 페이지네이션 컨테이너 가져오기
// applyPagination(contentItems, contentPagination, 4); // 콘텐츠 관리 섹션에 페이지네이션 적용

// // 승인 요청 내역
// const acceptItems = Array.from(document.querySelectorAll(".request-grid .request-card"));
// const acceptPagination = document.createElement("div");
// acceptPagination.classList.add("pagination");
// document.querySelector(".accept-list").appendChild(acceptPagination);
// applyPagination(acceptItems, acceptPagination, 5);

// // 자주 묻는 질문
// const faqItems = Array.from(document.querySelectorAll(".faq-list .faq-item")); // 자주 묻는 질문 섹션의 항목 배열 가져오기
// const faqPagination = document.createElement("div"); // 페이지네이션 컨테이너 생성
// faqPagination.classList.add("pagination"); // 페이지네이션 컨테이너에 'pagination' 클래스 추가
// document.querySelector(".faq-section").appendChild(faqPagination); // 자주 묻는 질문 섹션에 페이지네이션 컨테이너 추가
// applyPagination(faqItems, faqPagination, 5); // 자주 묻는 질문 섹션에 페이지네이션 적용

// // 공지사항
// const noticeItems = Array.from(document.querySelectorAll(".notice-list .notice-item")); // 공지사항 섹션의 항목 배열 가져오기
// const noticePagination = document.createElement("div"); // 페이지네이션 컨테이너 생성
// noticePagination.classList.add("pagination"); // 페이지네이션 컨테이너에 'pagination' 클래스 추가
// document.querySelector(".notice-section").appendChild(noticePagination); // 공지사항 섹션에 페이지네이션 컨테이너 추가
// applyPagination(noticeItems, noticePagination, 4); // 공지사항 섹션에 페이지네이션 적용

// // 작가 환전
// const salesItems = Array.from(document.querySelectorAll(".sales-table tbody tr")); // 작가 환전 섹션의 항목 배열 가져오기
// const salesPagination = document.createElement("div"); // 페이지네이션 컨테이너 생성
// salesPagination.classList.add("pagination"); // 페이지네이션 컨테이너에 'pagination' 클래스 추가
// document.querySelector(".sales-section").appendChild(salesPagination); // 작가 환전 섹션에 페이지네이션 컨테이너 추가
// applyPagination(salesItems, salesPagination, 4); // 작가 환전 섹션에 페이지네이션 적용

// // 1:1 문의
// const inquiryItems = Array.from(document.querySelectorAll(".inquiry-list .inquiry-item")); // 1:1 문의 섹션의 항목 배열 가져오기
// const inquiryPagination = document.createElement("ul"); // 페이지네이션 컨테이너 생성
// inquiryPagination.classList.add("pagination"); // 페이지네이션 컨테이너에 'pagination' 클래스 추가
// document.querySelector(".inquiry-section").appendChild(inquiryPagination); // 1:1 문의 섹션에 페이지네이션 컨테이너 추가
// applyPagination(inquiryItems, inquiryPagination, 5); // 1:1 문의 섹션에 페이지네이션 적용





/* 목록 불러오기 */
document.addEventListener('DOMContentLoaded', () => {
  const artistList = document.getElementById("artist-list");
  const memberList = document.getElementById("member-list");
  const showArtistBtn = document.getElementById("show-artist");
  const showMemberBtn = document.getElementById("show-member");

  // 초기 상태: 작가 목록 표시, 회원 목록 숨기기
  artistList.style.display = "flex";
  memberList.style.display = "none";

  // "작가 보기" 버튼 클릭 이벤트
  showArtistBtn.addEventListener("click", () => {
    artistList.style.display = "flex";
    memberList.style.display = "none";
    paginationBoxArtist.style.display = "flex";
    paginationBoxMember.style.display = "none";
    console.log("작가 보기 활성화");
    getList(1, 1)
  });

  // "회원 보기" 버튼 클릭 이벤트
  showMemberBtn.addEventListener("click", () => {
    artistList.style.display = "none";
    paginationBoxArtist.style.display = "none";
    memberList.style.display = "flex";
    paginationBoxMember.style.display = "flex";
    console.log("회원 보기 활성화");
    getList(2, 1)
  });

  getList(1, 1); // 작가목록


  getList(3, 1); // 콘텐츠관리
  getList(4, 1) // 승인 요청 내역

  getList(5, 1); // 공지사항
  getList(6, 1); // 1대1문의
});

// 작가 목록 표시 함수
function displayArtistList(contents) {
  const artistList = document.getElementById('artist-list'); // 작가 목록을 표시할 컨테이너
  if (!artistList) {
    console.error("artist-list 요소를 찾을 수 없습니다.");
    return;
  }

  artistList.innerHTML = ''; // 기존 콘텐츠 초기화

  contents.forEach(content => {
    const artistItem = document.createElement('div');
    artistItem.classList.add('artist-item');
    artistItem.dataset.memberNo = content.memberNo;
    artistItem.innerHTML = `
      <img src="${content.artistProfile}" alt="작가 이미지">
      <div class="artist-info">
        <h3>${content.artistNickname} | 작가</h3>
        <p>경매 금액: ₩${content.endPrice?.toLocaleString() || '0'}</p>
        <p>판매 금액: ₩${content.sellPrice?.toLocaleString() || '0'}</p>
      </div>
        <div class="artist-actions">
              <button class="btn artist-suspend-btn">정지</button>
              <button class="btn artist-withdraw-btn">탈퇴</button>
            </div>`;
    artistList.appendChild(artistItem);
  });
}

// 회원 목록 표시 함수
function displayMemberList(contents) {
  const memberList = document.getElementById('member-list'); // 회원 목록을 표시할 컨테이너
  if (!memberList) {
    console.error("member-list 요소를 찾을 수 없습니다.");
    return;
  }
  memberList.innerHTML = '';
  contents.forEach(content => {
    const memberItem = document.createElement('div');
    memberItem.classList.add('member-summary');
    memberItem.dataset.memberNo = content.memberNo;
    memberItem.innerHTML = `
    <div class="summary-item">
        <h3>${content.memberName} | 회원</h3>
        <p>경매 금액: ₩${content.endPrice?.toLocaleString() || '0'}</p>
        <div class="summary-actions">
          <button class="btn member-suspend-btn">정지</button>
          <button class="btn member-withdraw-btn">탈퇴</button>
        </div>  
      </div>`;
    memberList.appendChild(memberItem);

  });
}

// 콘텐츠 표시 함수
function displayReportContents(contents) {
  const contentGrid = document.getElementById('contentGrid');
  contentGrid.innerHTML = ''; // 기존 콘텐츠 초기화

  contents.forEach(content => {
    const contentCard = document.createElement('div');
    contentCard.classList.add('content-card');
    contentCard.innerHTML = `
      <img src="${content.pieceRename}" class="content-image">
      <div class="content-info">
          <h2>${content.artistNickname}</h2>
          <p>작품명: ${content.pieceName}</p>
          <p>크기: ${content.pieceSize}</p>
          <div class="buttons">
              <button class="view-button" data-id="${content.reportNo}" data-piece-no="${content.pieceNo}">상세보기</button>
          </div>    
      </div>`;
    contentGrid.appendChild(contentCard);
  });
}

// 승인 요청 내역 표시함수
function displayRequestContents(contents) {
  const requestGrid = document.getElementById('requestGrid');
  requestGrid.innerHTML = ''; // 기존 콘텐츠 초기화'

  contents.forEach(content => {

    const requestCard = document.createElement('div');
    requestCard.classList.add('request-card');
    requestCard.dataset.memberNo = content.memberNo;
    requestCard.innerHTML = `
      <img src="${content.artistProfile}" class="profile-image" width="157" height="157">
      <div class="info">
          <h1>${content.artistNickname}</h1>
          <div class="action-buttons">
              <div class="detail-btn">
                  <button id="detailButton" class="detail-button" data-member-no="${content.memberNo}">정보 상세보기</button>
              </div>    
              <div class="two-btn">
                  <button class="approve-button" data-member-no="${content.memberNo}">승인</button>
                  <button class="reject-button" data-member-no="${content.memberNo}">거절</button>
              </div>    
          </div>    
      </div>`;
    requestGrid.appendChild(requestCard);

  });
  detailButtonsEventAdd();
  
}

// 공지사항 표시함수
function displayNoticeContents(contents) {

  const noticeGrid = document.getElementById('noticeGrid');
  const noticeList = noticeGrid.querySelector('ul.-noticelist');

  // <ul>-noticelist가 없으면 오류 출력 후 종료
  if (!noticeList) {
    console.error("공지사항 리스트 컨테이너를 찾을 수 없습니다.");
    return;
  }

  // <ul> 내부 초기화
  noticeList.innerHTML = '';

  // 공지사항 데이터 추가
  contents.forEach(content => {
    const noticeItem = document.createElement('li');
    noticeItem.classList.add('notice-item');
    noticeItem.innerHTML = `
        <div class="notice-row">
          <span class="icon">&#9654;</span>
          <span class="notice-question">${content.noticeTitle || '제목 없음'}</span>
        </div>
        <div class="notice-answer" style="display: none;">
          ${content.noticeContent || '내용 없음'}
        </div>
        <div class="notice-buttons" style="display: none;">
          <button class="revise-button" data-notice-no="${content.noticeNo}">수정하기</button>
          <button class="erase-button" data-notice-no="${content.noticeNo}">삭제하기</button>
        </div>
      `;
    noticeList.appendChild(noticeItem); // <ul>에 <li> 추가
  });

  noticeToggleFn();
}

// 1대1문의 표시함수
function displayquestionContents(contents) {

  const questionGrid = document.getElementById('questionGrid');
  const questionList = questionGrid.querySelector('ul.inquiry-list');

  if (!questionList) {
    console.error(contents);
    return;
  }
  questionList.innerHTML = '';
  contents.forEach(content => {
    const questionCategoryName = content.questionCategoryNo === 1 
    ? "일반문의" 
    : content.questionCategoryNo === 2 
      ? "배송 및 운탁문의" 
      : "기타";
    const questionItem = document.createElement('li');
    questionItem.classList.add('inquiry-item');
    questionItem.dataset.questionNo = content.questionNo;
    questionItem.dataset.category = content.questionCategoryNo;

    questionItem.innerHTML = `
        <div class="inquiry-row">
                <span class="icon">&#9654;</span>
                <span class="inquiry">${questionCategoryName}</span>
        </div>
            <div class="details" style="display: none;">
                <label for="inquiry-content" class="label">문의 내용</label>
              <input type="text" class="inquiry-content" value="${content.questionContent || '내용 없음'}" readonly>

                <label for="response-content" class="label">답변</label>
                <input type="text" class="response-content">
                <div class="inquiry-buttons" style="display: none;">
                <button class="answer-button" data-question-no="${content.questionNo}" >답변하기</button>
                <button class="delete-button" data-question-no="${content.questionNo}">삭제하기</button>
                </div>
              </div>
              
      `;
    questionList.appendChild(questionItem);
  });
  questionToggleFn();
}

/* 1대 1문의 드롭다운 */
function applyFilter(category) {
  const items = document.querySelectorAll('.inquiry-item');

  items.forEach(item => {
    const itemCategory = item.dataset.category;

    if (category === 'all' || itemCategory === category) {
      item.style.display = 'block'; // 필터 조건에 맞는 항목 표시
    } else {
      item.style.display = 'none'; // 조건에 맞지 않는 항목 숨김
    }
  });
}

// 드롭다운 이벤트 리스너
document.getElementById('questionFilter').addEventListener('change', function (event) {
  const selectedCategory = event.target.value;
  applyFilter(selectedCategory);
});

const detailButtonsEventAdd = () => {
  
  // 승인요청내역 정보상세보기
  const detailButtons = document.querySelectorAll(".detail-button");
  
  if (detailButtons) {
    detailButtons.forEach(detailButton => {
      detailButton.addEventListener("click", (event) => {
  
        const memberNo = event.target.dataset.memberNo;
  
  
        if (!memberNo) {
          alert("해당 회원 번호를 찾을 수 없습니다.");
          return;
        }
        location.href = `/manage/confirm/${memberNo}`;
      });
    })
  } else {
    console.error("detailButton 요소를 찾을 수 없습니다.");
  }

}

// 작가 거절
document.addEventListener("click", (event) => {
  if (event.target.classList.contains("reject-button")) {
    const memberNo = event.target.dataset.memberNo;

    if (!memberNo) {
      alert("memberNo를 찾을 수 없습니다.");
      return;
    }

    rejectArtists(memberNo);

  } else {
    console.log("거절 불가");
  }
})



// 작가 승인
document.addEventListener("click", (event) => {
  if (event.target.classList.contains("approve-button")) {
    const memberNo = event.target.dataset.memberNo;
    if (!memberNo) {
      alert("memberNo를 찾을 수 없습니다.");
      return;
    }
    approveArtist(memberNo);
  } else {
    console.log("승인 불가");
  }
})


// 작가 승인
function approveArtist(memberNo) {
  if (!confirm("이 작가을 승인하시겠습니까?")) return;
  fetch(`/manage/approve`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: memberNo
  })
    .then((response) => {
      if (!response.ok) { throw new Error("승인 실패") }
      return response.text();

    })
    .then((data) => {
      alert(`승인 성공 : ${data}`);
      getList(4, page4);
    })
    .catch(error => alert(`승인 실패: ${error.message}`));
}

// 작가 거절
function rejectArtists(memberNo) {
  if (!confirm("이 작가를 거절하시겠습니까?")) return;

  // 해당 작가의 전화번호를 가져옴 (예시로 임시 전화번호 사용)

  // 거절 요청과 문자 전송
  fetch(`/manage/reject`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: memberNo
  })
    .then((response) => {
      if (!response.ok) { throw new Error("거절 실패"); }
      return response.text();
    })
    .then((data) => {
      alert(`거절 성공 : ${data}`);

      // 문자 전송 호출
      sendRejectionMessage(memberNo);
      getList(4, page4); // 목록 새로고침
    })
    .catch(error => alert(`거절 실패 : ${error.message}`));
}


function sendRejectionMessage(memberNo) {


  fetch(`/api/message/send`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: memberNo
  })
    .then((response) => {
      if (!response.ok) { throw new Error("문자 전송 실패"); }
      return response.text();
    })
    .then((data) => {
      alert(`문자 전송 성공: ${data}`);
    })
    .catch((error) => {
      console.error("문자 전송 에러:", error);
      alert(`문자 전송 실패: ${error}`);
    });
}








// function rejectArtists(memberNo) {
//   if (!confirm("이 작가를 거절하시겠습니까?")) return;
  
//   fetch(`/manage/reject`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: memberNo
//   })
//     .then((response) => {
//       if (!response.ok) { throw new Error("승인 실패") }
//       return response.text();
//     })
//     .then((data) => {
//       alert(`거절 성공 : ${data}`);
//       getList(4, page4);
//     })
//     .catch(error => alert(`거절 실패 : ${error.message}`));
// }

// 1대 1문의 답변하기

document.addEventListener("click", (event) => {
  if (event.target.classList.contains("answer-button")) {
    const button = event.target; // 클릭된 버튼
    const details = button.closest(".details"); // 답변 입력 필드가 포함된 컨테이너
    const questionNo = button.closest("li").dataset.questionNo; // 문의 번호
    const responseContent = details.querySelector(".response-content").value.trim(); // 답변 내용
    const listItem = button.closest("li"); // 문의 항목 전체를 감싸는 <li> 요소
    // 입력값 검증
    if (!responseContent) {
      alert("답변 내용을 입력하세요.");
      return;
    }

    // AJAX 요청
    fetch(`/manage/answer/${questionNo}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: responseContent,
      
    })
      .then((res) => res.text())
      .then((data) => {
        alert(data == '답변 성공' ? "답변 등록 완료" : "답변 등록 실패");
        listItem.remove();
      })
      .catch(() => {
        alert("오류가 발생했습니다.");
      });
  }
});
// 1대 1문의 삭제하기
document.addEventListener("click", (event) => {
  if(event.target.classList.contains("delete-button")){
    questionNo = event.target.dataset.questionNo;

    if(confirm("정말로 삭제하시겠습니까?")){
      fetch(`manage/delete/${questionNo}`, {
        method : "POST",
        headers : {
          "Content-Type" : "application/json",
        },
      })
      .then((response) => {
       if(response.ok){
        alert("삭제 성공");
        location.reload();
       }else{
        throw new Error("삭제 실패");
       }
      })
      .catch(error => alert(`삭제 실패: ${error.message}`));
    }
  }
})


// 데이터 표시 함수
function displayContents(code, contents) {
  const { containerId } = codeSettings[code] || {};
  if (!containerId) return; // 해당 code에 대한 설정이 없으면 처리 중단

  const container = document.getElementById(containerId);
  container.innerHTML = ''; // 기존 콘텐츠 초기화

  contents.forEach(content => {
    const item = document.createElement('div');
    item.classList.add(code === 1 ? 'artist-item' : 'content-card');

    // 동적으로 템플릿 선택 및 렌더링
    const template = templates[code];
    if (template) {
      item.innerHTML = template(content);
    } else {
      console.warn(`템플릿이 없습니다. Code: ${code}`);
    }

    container.appendChild(item);
  });
}



// 리스트 가져오기 함수
function getList(code, page) {
  fetch(`/manage/getList?code=${code}&cp=${page}`)
    .then(response => {
      if (response.ok) return response.json();
      throw new Error("AJAX 통신 실패");
    })
    .then(result => {

      if (code === 1) {
        page1 = page;
        displayArtistList(result.resultList); // 아티스트 리스트 렌더링
        setupPagination(result.pg, code, "paginationBoxArtist"); // 아티스트 페이지네이션 설정
      } else if (code === 2) {
        page2 = page;
        displayMemberList(result.resultList); // 회원 목록 리스트 렌더링
        setupPagination(result.pg, code, "paginationBoxMember"); // 회원 목록 페이지네이션 설정
      } else if (code === 3) {
        page3 = page;
        displayReportContents(result.resultList); // 콘텐츠 리스트 렌더링
        setupPagination(result.pg, code, "paginationBoxContent"); // 콘텐츠 페이지네이션 설정
      } else if (code === 4) {
        page4 = page;
        displayRequestContents(result.resultList); // 승인요청내역 리스트 렌더링
        setupPagination(result.pg, code, "paginationBoxRequest"); // 승인요청내역 페이지네이션 설정
      } else if (code === 5) {
        page5 = page;
        displayNoticeContents(result.resultList); // 공지사항 리스트 렌더링
        setupPagination(result.pg, code, "paginationBoxNotice"); // 공지사항 페이지네이션 설정
      } else if (code === 6) {
        page6 = page;
        displayquestionContents(result.resultList); // 1대1문의 리스트 렌더링
        setupPagination(result.pg, code, "paginationBoxQuestion"); // 1대1문의 페이지네이션 설정
      } else if (code === 6) {
        page7 = page;
        displayDeliveryContents(result.resultList); // 배송 상태 변경 페이지네이션 렌더링
        setupPagination(result.pg, code, "paginationDelivery"); // 배송 상태 변경 페이지네이션 설정
      } else {
        console.log("기타 코드값을 불러와 실행됨");
        console.error("알 수 없는 코드:", code);
      }
    })
    .catch(err => console.error(err));
}
// 페이지네이션 설정 함수
function setupPagination(pg, code, paginationContainerId) {

  const paginationContainer = document.getElementById(paginationContainerId);

  if (!paginationContainer) {
    console.error("페이지네이션 컨테이너를 찾을 수 없습니다:", paginationContainerId);
    return;
  }
  paginationContainer.innerHTML = ""; // 기존 버튼 초기화
  const createPageButton = (page, text, isActive = false, isDisabled = false) => {
    const btn = document.createElement("a");
    btn.href = "#";
    btn.textContent = text;
    btn.classList.add("page-btn");
    if (isActive) btn.classList.add("active");
    if (isDisabled) btn.classList.add("disabled");

    if (!isDisabled) {
      btn.addEventListener("click", (event) => {
        event.preventDefault();
        getList(code, page); // 해당 페이지 데이터 로드
      });
    }

    return btn;
  };

  // << 버튼 (첫 페이지로 이동)
  paginationContainer.appendChild(createPageButton(1, "<<", false, pg.currentPage === 1));

  // < 버튼 (이전 페이지로 이동)
  paginationContainer.appendChild(createPageButton(pg.prevPage, "<", false, pg.currentPage === 1));


  // 페이지 번호 버튼
  for (let i = pg.startPage; i <= pg.endPage; i++) {
    paginationContainer.appendChild(createPageButton(i, i, i === pg.currentPage));
  }

  // > 버튼 (다음 페이지로 이동)
  paginationContainer.appendChild(createPageButton(pg.nextPage, ">", false, pg.currentPage === pg.totalPageCount));

  // >> 버튼 (마지막 페이지로 이동)
  paginationContainer.appendChild(createPageButton(pg.totalPageCount, ">>", false, pg.currentPage === pg.totalPageCount));
}



function toggleContent(element) {
  const content = element.nextElementSibling;
  const isVisible = content.classList.contains("open");

  // 모든 notice-content를 닫기
  document.querySelectorAll(".notice-content").forEach(item => {
    if (item !== content) {
      item.style.height = "0px";
      item.classList.remove("open");
      item.previousElementSibling.classList.remove("open");
    }
  });

  // 클릭한 항목에 애니메이션 적용
  if (!isVisible) {
    element.classList.add("open");
    content.classList.add("open");

    // 높이를 계산하여 설정
    const scrollHeight = content.scrollHeight + "px";
    content.style.height = scrollHeight;

    // 애니메이션이 끝난 후 height를 auto로 설정
    content.addEventListener("transitionend", function handler() {
      content.style.height = "auto";
      content.removeEventListener("transitionend", handler);
    });
  } else {
    content.style.height = content.scrollHeight + "px";
    // 강제로 리플로우(Reflow) 시켜 애니메이션 효과 적용
    content.offsetHeight;
    content.style.height = "0px";
    element.classList.remove("open");
    content.classList.remove("open");
  }
}











//---------------------------------------------------------------------------
// /* /* 콘텐츠 관리 */
// document.addEventListener('DOMContentLoaded', () => {
//   getList(1)
//   getList(3,1); // 첫 번째 페이지 로드
// });

// // 콘텐츠 표시 함수
// function displayReportContents(contents) {
//   const contentGrid = document.getElementById('contentGrid');
//   contentGrid.innerHTML = ''; // 기존 콘텐츠 초기화

//   contents.forEach(content => {
//     const contentCard = document.createElement('div');
//     contentCard.classList.add('content-card');
//     contentCard.innerHTML = `
//       <img src="/images/profile/${content.artistNickname || 'default.jpg'}" alt="${content.artistNickname}" class="content-image">
//       <div class="content-info">
//           <h2>${content.artistNickname}</h2>
//           <p>작품명: ${content.pieceName}</p>
//           <p>낙찰가: ₩${content.auctionPrice.toLocaleString()}</p>
//           <p>크기: ${content.pieceSize}</p>
//           <div class="buttons">
//               <button class="view-button">상세보기</button>
//               <button class="warn-button">정지</button>
//               <button class="release-button">해제</button>
//           </div>
//       </div>`;
//     contentGrid.appendChild(contentCard);
//   });
// }

// // 리스트 가져오기 함수
// function getList(code, page) {
//   fetch(`/manage/getList?code=${code}&cp=${page}`)
//     .then(response => {
//       if (response.ok) return response.json();
//       throw new Error("AJAX 통신 실패");
//     })
//     .then(result => {
//       console.log("응답데이터:", result);

//       // 데이터 렌더링
//       displayReportContents(result.resultList); // 콘텐츠 표시
//       setupPagination(result.pg, code); // 페이지네이션 설정

//     })
//     .catch(err => console.error(err));
// }

// // 페이지네이션 설정 함수
// function setupPagination(pg, code) {
//   const paginationContainer = document.getElementById("paginationBox2");
//   paginationContainer.innerHTML = ""; // 기존 버튼 초기화

//   const createPageButton = (page, text, isActive = false, isDisabled = false) => {
//     const btn = document.createElement("a");
//     btn.href = "#";
//     btn.textContent = text;
//     btn.classList.add("page-btn");
//     if (isActive) btn.classList.add("active");
//     if (isDisabled) btn.classList.add("disabled");

//     if (!isDisabled) {
//       btn.addEventListener("click", (event) => {
//         event.preventDefault();
//         getList(code, page); // 해당 페이지 데이터 로드
//       });
//     }

//     return btn;
//   };

//   // << 버튼 (첫 페이지로 이동)
//   paginationContainer.appendChild(createPageButton(1, "<<", false, pg.currentPage === 1));

//   // < 버튼 (이전 페이지로 이동)
//   paginationContainer.appendChild(createPageButton(pg.prevPage, "<", false, pg.currentPage === 1));

//   // 페이지 번호 버튼
//   for (let i = pg.startPage; i <= pg.endPage; i++) {
//     paginationContainer.appendChild(createPageButton(i, i, i === pg.currentPage));
//   }

//   // > 버튼 (다음 페이지로 이동)
//   paginationContainer.appendChild(createPageButton(pg.nextPage, ">", false, pg.currentPage === pg.totalPageCount));

//   // >> 버튼 (마지막 페이지로 이동)
//   paginationContainer.appendChild(createPageButton(pg.totalPageCount, ">>", false, pg.currentPage === pg.totalPageCount));
// }
// document.addEventListener('DOMContentLoaded', () => {
//   // 초기 데이터 로드 (작가 목록과 콘텐츠 목록)
//   getList(1); // 작가 목록
//   getList(3, 1); // 콘텐츠 목록 (첫 번째 페이지)
// });

// // 코드별 컨테이너 및 설정 매핑
// const codeSettings = {
//   1: { containerId: 'artist-list', paginationId: 'artistPagination' },
//   3: { containerId: 'contentGrid', paginationId: 'paginationBox2' },

// };

// // 템플릿 설정 객체
// const templates = {
//   1: (content) => `
//     <img src="/images/profile/${content.artistProfile || 'default.jpg'}" alt="${content.artistNickname}" class="content-image">
//     <div class="artist-info">
//       <h3>${content.artistNickname} | 작가</h3>
//       <p>경매 금액: ₩${(content.auctionPrice).toLocaleString()}</p>
//       <p>판매 금액: ₩${(content.sellPrice).toLocaleString()}</p>
//     </div>
//     <div class="artist-actions">
//       <button class="btn suspend-btn">정지</button>
//       <button class="btn withdraw-btn">탈퇴</button>
//     </div>
//   `,
//   3: (content) => `
//     <img src="/images/profile/${content.artistNickname || 'default.jpg'}" alt="${content.artistNickname}" class="content-image">
//     <div class="content-info">
//       <h2>${content.artistNickname}</h2>
//       <p>작품명: ${content.pieceName}</p>
//       <p>낙찰가: ₩${content.auctionPrice.toLocaleString()}</p>
//       <p>크기: ${content.pieceSize}</p>
//       <div class="buttons">
//         <button class="view-button">상세보기</button>
//         <button class="warn-button">정지</button>
//         <button class="release-button">해제</button>
//       </div>
//     </div>
//   `
// };

//-------------------------------------------------------------------
const selectMonthInput = document.getElementById('selectMonth');
const artistIdInput = document.getElementById('artist-id');
const salesTableBody = document.getElementById('sales-table-body');
const totalListDiv = document.getElementById('total-list');
const totalCountDiv = document.getElementById('total-count');
const waitCountDiv = document.getElementById('wait-count');
const completedCountDiv = document.getElementById('completed-count');
const holdCountDiv = document.getElementById('hold-count');
const slaesExcelBtn = document.getElementById('slaes-excelBtn');
const salesCompletedBtn = document.getElementById('sales-completedBtn');
let currentMonth = '';
let getListResult;

// 페이지 로드시 현재월에 해당하는 매출표 가져오기
document.addEventListener("DOMContentLoaded", () => {
  const now = new Date();

  // 현재 연도와 월을 "YYYY-MM" 형식으로 설정
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1
  currentMonth = `${year}-${month}`;
  selectMonthInput.value = currentMonth;

  getWithdrawList(currentMonth);
})

// 월 선택시 해당하는 매출표 가져오기
selectMonthInput.addEventListener("change", () => {
  const selectedMonth = selectMonthInput.value;

  getWithdrawList(selectedMonth);
})

// 작가 검색중 무의식적인 엔터입력 감지
artistIdInput.addEventListener("keyup", e => {
  if (e.key === "Enter") {
    getWithdrawList(selectMonthInput.value);
  }
})

// 전체목록 클릭시
totalListDiv.addEventListener("click", () => {
  renderingWithdrawList(getListResult, 'A');
})

// 전체 클릭시
totalCountDiv.addEventListener("click", () => {
  renderingWithdrawList(getListResult, 'A');
})

// 대기 클릭시
waitCountDiv.addEventListener("click", () => {
  renderingWithdrawList(getListResult, 'W');
})

// 완료 클릭시
completedCountDiv.addEventListener("click", () => {
  renderingWithdrawList(getListResult, 'C');
})

// 보류 클릭시
holdCountDiv.addEventListener("click", () => {
  renderingWithdrawList(getListResult, 'H');
})

const getWithdrawList = (selectMonth) => {
  const artistId = artistIdInput.value;
  artistIdInput.value = '';

  fetch("/withdraw/getWithdrawList?selectMonth=" + selectMonth + "&artistNickname=" + artistId)
    .then(response => {
      if (response.ok) return response.json();
      throw new Error("AJAX 통신 실패");
    })
    .then(result => {
      getListResult = result;
      renderingWithdrawList(getListResult, 'A', selectMonth);

    })
    .catch(err => console.error(err));

}

const renderingWithdrawList = (list, flag, selectMonth) => {
  // 전달받은 작가님네임, 판매작품수, 은행이름, 계좌번호, 총판매금액, 수수료, 입금상태 추가하기
  salesTableBody.innerHTML = '';

  if(selectMonth === undefined){
    selectMonth = selectMonthInput.value;
  }

  let totalCount = 0;
  let waitCount = 0;
  let completedCount = 0;
  let holdCount = 0;

  list.forEach(withdraw => {
    totalCount++;
    if (withdraw.priceFl === 'W') waitCount++;
    else if (withdraw.priceFl === 'C') completedCount++;
    else holdCount++;

    if (flag === 'A' || flag === withdraw.priceFl) {
      const tr = document.createElement('tr');
      tr.innerHTML = `
              <td><input ${withdraw.priceFl === 'W' && selectMonth != currentMonth ? 'class="wait-checkbox" data-member-no="' + withdraw.memberNo + '"' : 'disabled'} type="checkbox"></td>
              <td>${withdraw.artistNickname}</td>
              <td>${withdraw.allPieceCount}</td>
              <td>${withdraw.bankName}</td>
              <td>${withdraw.bankNo}</td>
              <td>${withdraw.priceSum}</td>
              <td>10.1 (%)</td>
              <td>${withdraw.priceFl === 'W' ? "대기" : withdraw.priceFl === 'C' ? "완료" : "보류"}</td>
            `;
      salesTableBody.appendChild(tr);

    }
  });

  totalCountDiv.innerText = totalCount + '건';
  waitCountDiv.innerText = waitCount + '건';
  completedCountDiv.innerText = completedCount + '건';
  holdCountDiv.innerText = holdCount + '건';
}

// 전체체크기능 지원
const selectAll = document.querySelector("#sales-selectAll");
selectAll?.addEventListener("change", () => {
  const inputTags = document.querySelectorAll(".wait-checkbox");

  inputTags.forEach(e => {
    e.checked = selectAll.checked;
  })
});

// 엑셀출력 버튼 클릭시
slaesExcelBtn.addEventListener("click", () => {
  const inputTags = document.querySelectorAll(".wait-checkbox");

  const memberNo = [];

  let iCount = 0;
  inputTags.forEach(e => {
    if (e.checked) {
      memberNo.push(e.dataset.memberNo);
      iCount++;
    }
  })
  if (iCount === 0) {
    alert("선택된 회원을 찾을 수 없습니다.");
    return;
  }

  const secdObj = {
    "memberNo": memberNo,
    "selectMonth": selectMonthInput.value
  }

  fetch("/withdraw/download", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(secdObj)
  })
    .then(response => {
      if (response.ok) return response.text();
      throw new Error("AJAX 통신 실패");
    })
    .then(result => {
      if (result > 0) {
        alert("파일을 출력하였습니다.\nC:/uploadFiles/withdraw.xlsx");
      } else {
        alert("파일 출력에 실패하였습니다.");
      }
    })
    .catch(err => console.error(err));
});

// 선택 완료처리 클릭시
salesCompletedBtn.addEventListener("click", () => {
  const inputTags = document.querySelectorAll(".wait-checkbox");

  const memberNo = [];

  let iCount = 0;
  inputTags.forEach(e => {
    if (e.checked) {
      memberNo.push(e.dataset.memberNo);
      iCount++;
    }
  })
  if (iCount === 0) {
    alert("선택된 회원을 찾을 수 없습니다.");
    return;
  }

  const secdObj = {
    "memberNo": memberNo,
    "selectMonth": selectMonthInput.value
  }

  fetch("/withdraw/saveWithdrawData", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(secdObj)
  })
    .then(response => {
      if (response.ok) return response.text();
      throw new Error("AJAX 통신 실패");
    })
    .then(result => {
      if (result > 0) {
        alert("해당 회원들의 결제데이터를 저장하였습니다.");
        getWithdrawList(selectMonthInput.value);
      } else {
        alert("데이터저장에 실패하였습니다.");
      }
    })
    .catch(err => console.error(err));
});