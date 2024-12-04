document.addEventListener('DOMContentLoaded', () => {
  const chatbotContainer = document.getElementById('chatbot-container');
  const chatbotIcon = document.getElementById('chatbot-icon');
  const chatbotClose = document.getElementById('chatbot-close');
  const sendButton = document.getElementById('send-button');
  const chatInput = document.getElementById('chat-input');
  const chatMessages = document.getElementById('chat-messages');

 
  // 챗봇 아이콘 클릭 시 창 열기/닫기 토글
  chatbotIcon.addEventListener('click', () => {
    chatbotContainer.classList.toggle('hidden');
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
        body: JSON.stringify({ message }),
      })
        .then((response) => response.json())
        .then((data) => {

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

    // 사용자와 챗봇 메시지의 정렬 및 추가
    if (sender === 'user') {
      messageDiv.appendChild(text); // 사용자 메시지에는 텍스트만
    } else {
      messageDiv.appendChild(text); // 챗봇 메시지에 텍스트 추가
    }

    chatMessages.appendChild(messageDiv);

    // DOM 업데이트 수행 후 자동 스크롤
    setTimeout(() => {
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 0);
  }

  function addLoading() {

    const loadingDiv = document.createElement('div');
    loadingDiv.className = 'chat-message bot loading';

    const loadingIcon = document.createElement('div');
    loadingIcon.className = 'loading-indicator';
    loadingIcon.textContent = '...'; // 로딩 표시

    loadingDiv.appendChild(loadingIcon);
    chatMessages.appendChild(loadingDiv);

    // 스크롤 위치 최신메시지가 보이도록 자동 조정
    chatMessages.scrollTop = chatMessages.scrollHeight;

    return loadingDiv;
  }

  function removeLoading(loadingElement) {
    // 'loadingElement'가 존재하고, 그것이 DOM 트리에 붙어 있을 경우 실행
    // loadingElement가 parentNode 부무요소를 가지고 있는지 확인
    if (loadingElement && loadingElement.parentNode) {
      loadingElement.parentNode.removeChild(loadingElement);
    }
  }
});
