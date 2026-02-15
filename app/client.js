const socket = new WebSocket('ws://localhost:3000');

function sendMessage(e) {
    // e is for event
    // Submit the document without reloading the page
    e.preventDefault();
    const input = document.querySelector('input');
    if (input.value) {
        socket.send(input.value);
        input.value = '';
    }
    // Put the focus back on the input
    // input.focus();
}

document.querySelector('form').addEventListener(
    'submit', sendMessage
)

// Listen for messages
socket.addEventListener("message", ({ data }) => {
    const li = document.createElement('li');
    li.textContent = data;
    document.querySelector('ul').appendChild(li)

})