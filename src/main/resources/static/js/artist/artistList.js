// 아티스트 목록 로드
function loadArtists(cp) {
  const url = `/artist/list?cp=${cp}`;

  fetch(url)
    .then(response => {
      if (response.ok) return response.json();
      throw new Error("AJAX 통신 실패");
    })
    .then(data => {
      console.log(data.pagination);
      console.log(data.rookieArtists);
      console.log(data.popularArtists);
      console.log(data.allArtists);

      renderAllLists(data); // 모든 리스트 렌더링
      renderPagination(data.pagination, "paginationBox");
      addArtistClickEvents(); // 클릭 이벤트 추가
    })
    .catch(error => console.error("Error fetching artist data:", error));
}

// 모든 리스트 렌더링
function renderAllLists(data) {
  const mappings = [
    { artists: data.rookieArtists, containerId: "newArtistsContainer" },
    { artists: data.popularArtists, containerId: "popularArtistsContainer" },
    { artists: data.allArtists, containerId: "allArtistsContainer" }
  ];

  mappings.forEach(({ artists, containerId }) => {
    renderArtistList(artists || [], containerId);
  });
}

// 아티스트 목록 렌더링
function renderArtistList(artists = [], containerId) {
  const container = document.getElementById(containerId);

  container.innerHTML = artists.map(artist => `
    <article class="artist-card">
       <div class="artist-profile" data-id=${artist.memberNo}>
        <img src="${artist.artistProfile}">
      </div>
      
      <div class="artist-name"> <p>${artist.artistNickname}</p></div>
    </article>
  `).join("");
}



function addArtistClickEvents() {
  const artistProfiles = document.querySelectorAll(".artist-profile");
  artistProfiles.forEach(profile => {
    profile.addEventListener("click", (event) => {
      const artistId = event.currentTarget.dataset.id; // data-id 값 가져오기
      if (artistId) {
        console.log(`Redirecting to artist ID: ${artistId}`);
        location.href = `/artist/artistDetail?memberNo=${artistId}`;
      } else {
        console.error("Artist ID is missing!");
      }
    });
  });
}



// 페이지네이션 렌더링
function renderPagination(pagination, containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = '';

  const createPageButton = (page, text, isActive = false) => {
    const button = document.createElement("a");
    button.href = "#";
    button.classList.add("page-btn");
    button.dataset.page = page;
    button.textContent = text;

    if (isActive) button.classList.add("active");

    button.addEventListener("click", (event) => {
      event.preventDefault();
      const cp = parseInt(event.target.dataset.page);
      loadArtists(cp);
    });

    return button;
  };

  // <<, < 버튼 추가 (첫 페이지가 아닌 경우에만 추가)
 
    container.appendChild(createPageButton(1, "<<"));
    container.appendChild(createPageButton(pagination.prevPage, "<"));
  

  // 동적 페이지 번호 버튼 생성
  for (let i = pagination.startPage; i <= pagination.endPage; i++) {
    container.appendChild(createPageButton(i, i, i === pagination.currentPage));
  }

  // >>, > 버튼 추가 (마지막 페이지가 아닌 경우에만 추가)
  
    container.appendChild(createPageButton(pagination.nextPage, ">"));
    container.appendChild(createPageButton(pagination.maxPage, ">>"));
  
}

document.addEventListener("DOMContentLoaded", () => {
  loadArtists(1); // 초기 로드 시 첫 페이지 요청

});
