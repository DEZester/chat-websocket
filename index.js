function showMessage(text,isMine = false) {
  document.getElementById("messages").innerHTML += `
            <div class="message-row ${isMine?'mine':'theirs'}">
                <div class="bubble">${text}</div>
            </div>
          `;
}

const ws = new WebSocket('ws://localhost:8080');
ws.addEventListener('message', ev => {
  ev.data.text().then(showMessage);
});

document.querySelector('form').onsubmit = ev => {
  ev.preventDefault();
  const input = document.querySelector('input');
  ws.send(input.value);
  showMessage(input.value, true);
  input.value = '';
}