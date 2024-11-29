// Toggle Chatbot Window
function toggleChatbot() {
  const chatbot = document.getElementById('chatbot-container');
  chatbot.classList.toggle('hidden');
}

// Send Message to Backend
function sendMessage() {
  const input = document.getElementById('chat-input');
  const message = input.value.trim();

  if (message) {
      addMessage(message, 'user');
      input.value = '';

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
              console.log(data);
              const botResponse = data.response || '에러';
              addMessage(botResponse, 'bot');
          })
          .catch((error) => {
              console.error('Error:', error);
              addMessage('Error communicating with chatbot.', 'bot');
          });
  }
}

// Add Message to Chat Window
function addMessage(message, sender) {
  const chatMessages = document.getElementById('chat-messages');
  const messageDiv = document.createElement('div');
  messageDiv.className = `chat-message ${sender}`;
  messageDiv.textContent = message;
  chatMessages.appendChild(messageDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight; // Auto-scroll to the latest message
}

// Send Message on Enter Key
function handleKeyPress(event) {
  if (event.key === 'Enter') {
      sendMessage();
  }
}
