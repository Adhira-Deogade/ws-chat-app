const socket = io('ws://localhost:3500');

function sendMessage(e) {
    // e is for event
    // Submit the document without reloading the page
    e.preventDefault();
    const input = document.querySelector('input');
    if (input.value) {
        socket.emit('message', input.value);
        input.value = '';
    }
    // Put the focus back on the input
    input.focus();
}

document.querySelector('form').addEventListener(
    'submit', sendMessage
)

// Listen for messages
socket.on("message", (data) => {
    const li = document.createElement('li');
    li.textContent = data;
    document.querySelector('ul').appendChild(li)

})