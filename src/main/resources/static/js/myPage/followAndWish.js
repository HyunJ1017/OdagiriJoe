function hideLoader(imgElement) {
  const loader = imgElement.nextElementSibling; // loader div
  loader.style.display = 'none'; // 로딩 이미지 숨기기
  imgElement.style.display = 'block'; // 실제 이미지 보이기
}

/* url 모음 */
const urls = {
  /* 상세보기 */ "detail" : "/auction/main",
  /* 경매진행작 */ "detailCurrent" : "/auction/auctionDetail?pieceNo=",
  /* 경매대기작 */ "detailUpcommig" : "/auction/auctionDetail?pieceNo=",
  /* 배달정보 */ "delivery" : "/",
  /* 작가정보 */ "artist" : "/artist/artistDetail?memberNo=",
  /* 작성하기 */ "rewrite" : "/piece/upload?pieceNo=",
  /* 삭제하기 */ "remove" : "/piece/removeTemp?pieceNo="
}

const detaileBtnAddEvent = () => {
  const commingAuctions = document.querySelectorAll('.commingAuction');
  commingAuctions?.forEach(btn => {
    btn.addEventListener('click', () => {
      location.href = urls.detailUpcommig + btn.dataset.pieceNo;
    })
  })

  const currentAuctions = document.querySelectorAll('.currentAuction');
  currentAuctions?.forEach(btn => {
    btn.addEventListener('click', () => {
      location.href = urls.detailCurrent + btn.dataset.pieceNo;
    })
  })
}
const followAddEvent = () => {
  const followBtns = document.querySelectorAll('.following');
  followBtns?.forEach(btn => {
    btn.addEventListener('click', () => {
      location.href = urls.artist + btn.dataset.memberNo;
    })
  })
}


// console.log(wishPagination);

/* 페이지네이션 */
let listType = '';
let cp = 1;
const pagenationEventAdd = () => {

  const wishPaginations = document.querySelectorAll('#paginationBox1 .page-btn');
  const followPaginations = document.querySelectorAll('#paginationBox2 .page-btn');

  wishPaginations?.forEach(page => {
    page.addEventListener('click', () => {
      if(page.classList.contains('current')) return;

      listType = 'wishList';

      switch(page.innerText){
        case '<<' :
          cp =  "1";
          break;

        case  '<' :
          cp =  wishPagination.prevPage;
          break;

        case  '>' :
          cp =  wishPagination.nextPage;
          break;

        case '>>' :
          cp =  wishPagination.maxPage;
          break;

        default :  cp =  page.innerText;
      }

      pagenationCall();
    });
  });

  followPaginations?.forEach(page => {
    page.addEventListener('click', () => {
      if(page.classList.contains('current')) return;

      listType = 'followList';

      switch(page.innerText){
        case '<<' :
          cp =  "1";
          break;

        case  '<' :
          cp =  followPagination.prevPage;
          break;

        case  '>' :
          cp =  followPagination.nextPage;
          break;

        case '>>' :
          cp =  followPagination.maxPage;
          break;

        default :  cp =  page.innerText;
      }

      pagenationCall();
    });
  });

}; // pagenationEventAdd end


const pagenationCall = () => {

  const obj = {
    "memberNo" : memberNo,
    "listType" : listType,
    "cp" : cp
  };

  fetch("/member/myPage/paginationCall", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(obj)
  })
  .then(response => {
    if (response.ok) return response.json();
    throw new Error("AJAX 통신 실패");
  })
  .then(result => {
    // console.log("응답데이터:", result);
    const listType = result.listType;
    const getList = result.getList;
    const getPagination = result.getPagination;
    // console.log(result);
    // console.log(listType);
    // console.log(getList);
    // console.log(getPagination);

    if(listType === 'wishList'){
      renderingWishList(getList, getPagination);
    } else if(listType === 'followList'){
      renderingFollowList(getList, getPagination);
    }
  })
  .catch(err => console.error(err));
} // pagenationCall end

const renderingWishList = (getList, getPagination) => {
  // console.log("위시리스트 초시화 시작 : " + getList);
  wishPagination = getPagination;
  const wishListContent = document.querySelector('#wishList-content');
  const wishPaginationBox = document.querySelector('#paginationBox1');

  // 컨탠츠 재생성
  wishListContent.innerHTML = '';
  getList.forEach(piece => {
    const contentDiv = document.createElement('div');
    contentDiv.className = 'content-div';

    let btnclass = '';
    if(piece.pieceStatus === 'A') btnclass = 'commingAuction';
    else btnclass = 'currentAuction';

    contentDiv.innerHTML = `
      <div>
        <h3>${piece.pieceTitle}</h3>
        <p>오픈일 ${piece.openDate}</p>
        <p>프리뷰 ${piece.previewStartDate} ~ ${piece.previewEndDate}</p>
        <p>경매일 ${piece.startDate}</p>
        <div class="piece-detales ` + btnclass + `" data-set-piece-no="${piece.pieceNo}">상세보기</div>
      </div>
      <div class="image-container">
        <img src="${piece.pieceRename}" alt="사진" class="content-img" onload="hideLoader(this)">
        <div class="loader"></div>
      </div>
    `;

    wishListContent.appendChild(contentDiv);
  });

  // 페이지네이션 재생성
  // 기존 내용을 초기화
  wishPaginationBox.innerHTML = '';

  // 이전 페이지 버튼
  if (getPagination.maxPage > getPagination.pageSize) {
    const prevPageBtn = document.createElement('li');
    prevPageBtn.innerHTML = '<a href="#" class="page-btn">&lt;&lt;</a>';
    wishPaginationBox.appendChild(prevPageBtn);

    const prevBtn = document.createElement('li');
    prevBtn.innerHTML = '<a href="#" class="page-btn">&lt;</a>';
    wishPaginationBox.appendChild(prevBtn);
  }

  // 페이지 번호 버튼들
  for (let i = getPagination.startPage; i <= getPagination.endPage; i++) {
    const pageBtn = document.createElement('li');

    if (i === getPagination.currentPage) {
      pageBtn.innerHTML = `<a href="#" class="current page-btn">${i}</a>`;
    } else {
      pageBtn.innerHTML = `<a href="#" class="page-btn">${i}</a>`;
    }

    wishPaginationBox.appendChild(pageBtn);
  }

  // 다음 페이지 버튼
  if (getPagination.maxPage > getPagination.pageSize) {
    const nextBtn = document.createElement('li');
    nextBtn.innerHTML = '<a href="#" class="page-btn">&gt;</a>';
    wishPaginationBox.appendChild(nextBtn);

    const nextPageBtn = document.createElement('li');
    nextPageBtn.innerHTML = '<a href="#" class="page-btn">&gt;&gt;</a>';
    wishPaginationBox.appendChild(nextPageBtn);
  }

  // 페이지네이션 이벤트 추가
  pagenationEventAdd();
  detaileBtnAddEvent();
} // renderingWishList end

const renderingFollowList = (getList, getPagination) => {
  // console.log("팔로우리스트 초시화 시작 : " + getList);
  followPagination = getPagination;
  const followListContent = document.querySelector('#followList-content');
  const followPaginationBox = document.querySelector('#paginationBox2');

  // 컨탠츠 재생성
  followListContent.innerHTML = '';
  getList.forEach(member => {
    const contentDiv = document.createElement('div');
    contentDiv.className = 'following';
    contentDiv.dataset.memberNo = member.memberNo;

    contentDiv.innerHTML = `
      <div class="image-container">
        <img src="${member.artistProfile}" alt="사진" class="artist-img" onload="hideLoader(this)">
        <div class="loader"></div>
      </div>
      <p>${member.artistNickname}</p>
    `;

    followListContent.appendChild(contentDiv);
  });

  // 페이지네이션 재생성
  // 기존 내용을 초기화
  followPaginationBox.innerHTML = '';

  // 이전 페이지 버튼
  if (getPagination.maxPage > getPagination.pageSize) {
    const prevPageBtn = document.createElement('li');
    prevPageBtn.innerHTML = '<a href="#" class="page-btn">&lt;&lt;</a>';
    followPaginationBox.appendChild(prevPageBtn);

    const prevBtn = document.createElement('li');
    prevBtn.innerHTML = '<a href="#" class="page-btn">&lt;</a>';
    followPaginationBox.appendChild(prevBtn);
  }

  // 페이지 번호 버튼들
  for (let i = getPagination.startPage; i <= getPagination.endPage; i++) {
    const pageBtn = document.createElement('li');

    if (i === getPagination.currentPage) {
      pageBtn.innerHTML = `<a href="#" class="current page-btn">${i}</a>`;
    } else {
      pageBtn.innerHTML = `<a href="#" class="page-btn">${i}</a>`;
    }

    followPaginationBox.appendChild(pageBtn);
  }

  // 다음 페이지 버튼
  if (getPagination.maxPage > getPagination.pageSize) {
    const nextBtn = document.createElement('li');
    nextBtn.innerHTML = '<a href="#" class="page-btn">&gt;</a>';
    followPaginationBox.appendChild(nextBtn);

    const nextPageBtn = document.createElement('li');
    nextPageBtn.innerHTML = '<a href="#" class="page-btn">&gt;&gt;</a>';
    followPaginationBox.appendChild(nextPageBtn);
  }

  // 페이지네이션 이벤트 추가
  pagenationEventAdd();
  followAddEvent();
} // renderingFollowList end

























document.addEventListener('DOMContentLoaded', () => {
  // 버튼 이벤트 추가
  pagenationEventAdd();
  detaileBtnAddEvent();
  followAddEvent();
});