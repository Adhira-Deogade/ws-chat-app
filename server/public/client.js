const socket = io('ws://localhost:3500');

const activity = document.querySelector('.activity')
const msgInput = document.querySelector('input')


function sendMessage(e) {
    // e is for event
    // Submit the document without reloading the page
    e.preventDefault();
    if (msgInput.value) {
        socket.emit('message', msgInput.value);
        msgInput.value = '';
    }
    // Put the focus back on the input
    msgInput.focus();
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

// Start monitoring keyboard key presses
msgInput.addEventListener('keypress', () => {
    socket.emit('activity', socket.id.substring(0,5))
})

let activityTimer
socket.on('activity', (name) => {
    activity.textContent = `${name} is typing...`

    // Clear after 3 seconds
    clearTimeout(activityTimer)
    activityTimer = setTimeout(() => {
        activity.textContent = ''
    }, 3000)
}) 