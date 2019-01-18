var socket = io();

socket.on("connect", function() {
  console.log("Connected to server");
});

socket.on("disconnect", function() {
  console.log("Disconnected from server");
});

socket.on("newMessage", function(message) {
  console.log("New Message", message);
  const li = document.createElement('li');
  li.innerText = `${message.from}: ${message.text}`;
  document.getElementById("messages").appendChild(li)
});

const form = document.getElementById("message-form")
const input = document.querySelector("[name=message]")
form.addEventListener("submit", (e) => {
  e.preventDefault();
  socket.emit('createMessage', {
    from: 'User',
    text: input.value
  }, function() {

  })
})