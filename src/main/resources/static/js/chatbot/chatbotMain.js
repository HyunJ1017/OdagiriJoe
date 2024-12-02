
document.addEventListener('DOMContentLoaded', () => {
  const chatbotContainer = document.getElementById('chatbot-container');
  const chatbotIcon = document.getElementById('chatbot-icon');
  const chatbotClose = document.getElementById('chatbot-close');
  const sendButton = document.getElementById('send-button');
  const chatInput = document.getElementById('chat-input');
  const chatMessages = document.getElementById('chat-messages');

  // 웰컴 메시지 요청 여부를 확인하는 플래그
  let isWelcomeMessageSent = false;

  // 챗봇 아이콘 클릭 시 창 열기/닫기 토글
  chatbotIcon.addEventListener('click', () => {
    // 토글 함수 : 클래스가 있으면 제거 없으면 추가
    chatbotContainer.classList.toggle('hidden');

    // 챗봇 창이 열릴 때 웰컴 메시지 요청
    // 히든 클래스가 없고 웰컴메시지 true이면 웰컴메시지 요청
    if (!chatbotContainer.classList.contains('hidden') && !isWelcomeMessageSent) {
      requestWelcomeMessage();
      isWelcomeMessageSent = true; // 웰컴 메시지 요청 완료 상태로 설정
    }
  });

  // x 버튼 클릭 시 창 닫기
  chatbotClose.addEventListener('click', () => {
    chatbotContainer.classList.add('hidden');
  });

  // 메시지 전송 버튼 클릭 시
  sendButton.addEventListener('click', sendMessage);

  // Enter 키로 메시지 전송
  chatInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      sendMessage();
    }
  });

  function sendMessage() {
    // input 공백 제거
    const message = chatInput.value.trim();

    if (message) {
      addMessage(message, 'user'); // 사용자 메시지 추가
      chatInput.value = '';

      // 로딩 표시 추가
      const loadingIndicator = addLoading();

      // Call backend API
      fetch('/chatbot/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }), // 사용자 메시지 전송
      })
        .then((response) => response.json())
        .then((data) => {

          console.log(data);

          const botResponse = data.response || '챗봇 응답 오류';

          // 로딩 표시 제거 후 챗봇 응답 추가
          removeLoading(loadingIndicator);
          addMessage(botResponse, 'bot');
        })
        .catch((error) => {
          console.error('Error:', error);

          // 로딩 표시 제거 후 오류 메시지 추가
          removeLoading(loadingIndicator);
          addMessage('챗봇과 연결할 수 없습니다. 잠시 후 다시 시도해 주세요.', 'bot');
        });
    }
  }

  function requestWelcomeMessage() {

    // 웰컴 메시지 요청
    const loadingIndicator = addLoading(); // 로딩 표시 추가

    fetch('/chatbot/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: '' }), // 빈 메시지로 웰컴 요청
    })
      .then((response) => response.json())

      // map 타입으로 결과 받기
      .then((data) => {
        
        // json 타입으로 결과 받기
        const botResponse = data.response || '챗봇 응답 오류';

        // 로딩 표시 제거 후 챗봇 응답 추가
        removeLoading(loadingIndicator);
        addMessage(botResponse, 'bot');
      })
      .catch((error) => {
        console.error('Error:', error);

        // 로딩 표시 제거 후 오류 메시지 추가
        removeLoading(loadingIndicator);
        addMessage('챗봇과 연결할 수 없습니다. 잠시 후 다시 시도해 주세요.', 'bot');
      });
  }

  function addMessage(message, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${sender}`;

    // 아이콘 추가
    if (sender === 'bot') {
      const icon = document.createElement('img'); // img 태그 생성
      icon.className = 'icon';
      icon.alt = 'Bot Icon';
      icon.src = '/images/howto/chatbot2.png'; // 챗봇 아이콘 경로
      messageDiv.appendChild(icon); // 아이콘 추가
    }

    // 메시지 텍스트 추가
    const text = document.createElement('div');
    text.className = 'message-text';
    text.textContent = message;

    // 메시지 추가
    messageDiv.appendChild(text);
    chatMessages.appendChild(messageDiv);

    // DOM 수행 후 스크롤 위치 조정
    setTimeout(() => {
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 0);
  }

  function addLoading() {

    // 태그 생성
    const loadingDiv = document.createElement('div');
    // 클래스 추가
    loadingDiv.className = 'chat-message bot loading';

    const loadingIcon = document.createElement('div');
    loadingIcon.className = 'loading-indicator';
    loadingIcon.textContent = '...'; // 로딩 표시

    loadingDiv.appendChild(loadingIcon);
    chatMessages.appendChild(loadingDiv);

    // 스크롤 위치 마지막 대화 위치로 자동으로 이동
    chatMessages.scrollTop = chatMessages.scrollHeight;

    return loadingDiv;
  }

  function removeLoading(loadingElement) {
    if (loadingElement && loadingElement.parentNode) {
      loadingElement.parentNode.removeChild(loadingElement);
    }
  }
  
});
