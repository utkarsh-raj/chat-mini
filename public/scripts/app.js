var socket = io.connect("https://urs-app-utkarshraj.c9users.io/");

var output = document.querySelector("#output");
var handle = document.querySelector("#handle");
var message = document.querySelector("#message");
var button = document.querySelector("#button");
var feedback = document.querySelector("#feedback");

button.addEventListener("click", function() {
    socket.emit("chat", {
        handle: handle.value,
        message: message.value
    });
});

socket.on("chat", function(data) {
    feedback.innerHTML = "";
    output.innerHTML += "<p><strong>" + data.handle + " :</strong> " + data.message + "</p>";
    message.focus();
});

message.addEventListener("keypress", function(event) {
    socket.emit("typing", {
        handle: handle.value
    });
    if (event.which === 13 || event.keyCode === 13) {
        button.click();
    }
});

socket.on("typing", function(data) {
    feedback.innerHTML = "<p><em>" + data.handle + " is typing a message...</em></p>";
});

button.addEventListener("click", function() {
    message.value = "";
});
