var socket = io();

socket.on("connect", function() {
  console.log("Connected to server");
});

socket.on("disconnect", function() {
  console.log("Disconnected from server");
});

socket.on("newMessage", function(message) {
  const formattedTime = moment(message.createdAt).format("h:mm a");
  var template = document.getElementById("message-template").innerHTML;
  var html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    createdAt: formattedTime
  });
  const li = document.createElement("li");
  li.innerHTML = html;
  document.getElementById("messages").appendChild(li);
});

socket.on("newLocationMessage", function(message) {
  const formattedTime = moment(message.createdAt).format("h:mm a");
  var template = document.getElementById("location-message-template").innerHTML;
  var html = Mustache.render(template, {
    from: message.from,
    createdAt: formattedTime,
    url: message.url
  });
  const li = document.createElement("li");
  li.innerHTML = html;
  document.getElementById("messages").appendChild(li);
});

const form = document.getElementById("message-form");
const messageTextbox = document.querySelector("[name=message]");
form.addEventListener("submit", e => {
  e.preventDefault();
  socket.emit(
    "createMessage",
    {
      from: "User",
      text: messageTextbox.value
    },
    function() {
      messageTextbox.value = "";
    }
  );
});

var locationButton = document.getElementById("send-location");
locationButton.addEventListener("click", () => {
  if (!navigator.geolocation) {
    return alert("Geolocation not supported");
  }

  locationButton.setAttribute("disabled", "disabled");
  locationButton.innerText = "Sending location...";

  navigator.geolocation.getCurrentPosition(
    function(position) {
      locationButton.removeAttribute("disabled");
      locationButton.innerText = "Send location";
      socket.emit("createLocationMessage", {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });
    },
    function() {
      locationButton.removeAttribute("disabled");
      locationButton.innerText = "Send location";
      alert("Unable to fetch location.");
    }
  );
});
