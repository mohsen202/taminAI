async function sendMessage() {
    const userInput = document.getElementById('user-input').value;
    if (userInput.trim() === '') return;

    // Display user message
    const chatBox = document.getElementById('chat-box');
    const userMessage = document.createElement('div');
    userMessage.className = 'message user-message';
    userMessage.innerHTML = `<div class="message-text">${userInput}</div>`;
    chatBox.appendChild(userMessage);

    // Clear input field
    document.getElementById('user-input').value = '';

    // Send request to Gradio server
    try {
        const response = await fetch('https://71bf507d2731ca29d7.gradio.live/api/predict', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                data: [userInput]
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        console.log('Response from Gradio:', result);

        // Assuming the response format is { data: [botResponse] }
        const botResponse = result.data[0];

        // Display bot message
        const botMessage = document.createElement('div');
        botMessage.className = 'message bot-message';
        botMessage.innerHTML = `<div class="message-text">${botResponse}</div>`;
        chatBox.appendChild(botMessage);
        chatBox.scrollTop = chatBox.scrollHeight; // Scroll to bottom
    } catch (error) {
        console.error('Error sending message:', error);
        const botMessage = document.createElement('div');
        botMessage.className = 'message bot-message';
        botMessage.innerHTML = `<div class="message-text">Error: Unable to process your request. Please try again later.</div>`;
        chatBox.appendChild(botMessage);
        chatBox.scrollTop = chatBox.scrollHeight; // Scroll to bottom
    }
}
