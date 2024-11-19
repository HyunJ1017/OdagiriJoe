let page1 = 1;
let page2 = 1;
let page3 = 1;
let page4 = 1;

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
document.querySelectorAll(".inquiry-section .inquiry-row").forEach(row => {
  row.addEventListener("click", () => {
    const details = row.nextElementSibling;
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
    paginationBoxArtist.style.display = "flex";
    memberList.style.display = "none";
    paginationBoxMember.style.display = "none"; 
    console.log("작가 보기 활성화");
    getList(1,1)
  });

  // "회원 보기" 버튼 클릭 이벤트
  showMemberBtn.addEventListener("click", () => {
    artistList.style.display = "none";
    paginationBoxArtist.style.display = "none";
    memberList.style.display = "flex";
    paginationBoxMember.style.display = "flex";
    console.log("회원 보기 활성화");
    getList(2,1)
  });

  getList(1,1); // 작가목록

  getList(3,1); // 콘텐츠관리
  getList(4,1) // 승인 요청 내역
});

// 작가 목록 표시 함수
function displayArtistList(contents) {
  const artistList  = document.getElementById('artist-list'); // 작가 목록을 표시할 컨테이너
  if (!artistList) {
    console.error("artist-list 요소를 찾을 수 없습니다.");
    return;
  }
  
  artistList.innerHTML = ''; // 기존 콘텐츠 초기화

  contents.forEach(content => {
    const artistItem = document.createElement('div');
    artistItem.classList.add('artist-item');
    artistItem.dataset.memberNo= content.memberNo;
    artistItem.innerHTML = `
      <img src="/images/profile/profile1.jpg" alt="작가 이미지">
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
      <img src="" class="content-image">
      <div class="content-info">
          <h2>${content.artistNickname}</h2>
          <p>작품명: ${content.pieceName}</p>
          <p>낙찰가: ₩${content.auctionPrice}</p>
          <p>크기: ${content.pieceSize}</p>
          <div class="buttons">
              <button class="view-button">상세보기</button>
              <button class="warn-button">정지</button>
              <button class="release-button">해제</button>
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
    requestCard.innerHTML = `
      <img src="" class="profile-image">
      <div class="info">
          <h2>${content.artistNickname}</h2>
          <div class="action-buttons">
              <div class="detail-btn">
                  <button class="detail-button">정보 상세보기</button>
              </div>    
              <div class="two-btn">
                  <button class="approve-button">승인</button>
                  <button class="reject-button">거절</button>
              </div>    
          </div>    
      </div>`;    
    requestGrid.appendChild(requestCard);  
  });  
}  


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
      console.log("응답데이터:", result);
      console.log("응답데이터:", result.pg);

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