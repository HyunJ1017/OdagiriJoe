document.addEventListener('DOMContentLoaded', () => {
  const contentContainer = document.getElementById('content-section');
  const loader = document.getElementById('loader');

  let isLoading = false;

  const loadMoreContent = () => {
    if (isLoading) return; // 이미 로딩 중이면 중복 호출 방지
    isLoading = true;
    loader.style.display = 'block';

    // 새 콘텐츠를 시뮬레이션으로 추가 (예: API 호출 대신)
    setTimeout(() => {
      for (let i = 0; i < 6; i++) {
        // 새로운 content-div 생성
        const contentDiv = document.createElement('div');
        contentDiv.classList.add("content-div");

        // 이미지 섹션 생성
        const imgWrapper = document.createElement('div');
        const imgElement = document.createElement('img');
        imgElement.src = '#'; // 실제 이미지 경로로 대체
        imgElement.alt = '사진';
        imgElement.classList.add("content-img");
        imgWrapper.appendChild(imgElement);

        // 텍스트 섹션 생성
        const textWrapper = document.createElement('div');
        const title = document.createElement('h3');
        title.textContent = '무제';
        const author = document.createElement('h4');
        author.textContent = '작가명';
        const price = document.createElement('p');
        price.textContent = '낙찰가 ₩50,000,000';
        const dimensions = document.createElement('p');
        dimensions.textContent = '15 x 30';
        const details = document.createElement('div');
        details.textContent = '상세정보';
        details.classList.add("piece-detales");

        // 텍스트 섹션에 추가
        textWrapper.appendChild(title);
        textWrapper.appendChild(author);
        textWrapper.appendChild(price);
        textWrapper.appendChild(dimensions);
        textWrapper.appendChild(details);

        // content-div에 이미지와 텍스트 섹션 추가
        contentDiv.appendChild(imgWrapper);
        contentDiv.appendChild(textWrapper);

        // 컨테이너에 content-div 추가
        contentContainer.appendChild(contentDiv);
      }
      loader.style.display = 'none';
      isLoading = false;
    }, 1000); // 1초 후 로드 시뮬레이션
  };

  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 50) {
      loadMoreContent();
    }
  };

  window.addEventListener('scroll', handleScroll);
});
