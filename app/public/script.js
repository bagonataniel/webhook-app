
// const ws = new WebSocket('ws://localhost:3000');
const ws = new WebSocket('wss:/my-nodejs-app-32u7.onrender.com');

var username;

ws.onmessage = (event) => {
    StoreReadedText(JSON.parse(event.data))
};

function sendMessage() {
    const inputElement = document.getElementById('messageInput');
    // const message = username + "|" + inputElement.value;
    const message = {
        type : "message",
        user : username,
        content : inputElement.value
    };
    ws.send(JSON.stringify(message));
    inputElement.value = '';
}

function StoreReadedText(text){
    switch (text.type) {
        case "message":
            const messagesElement = document.getElementById('messages');
            const li = document.createElement('li');
            li.innerHTML = "<span id='username-txt'>"+ text.user +": </span>" + text.content ;
            messagesElement.appendChild(li);
            break;
        case "log":
            console.log(text.content);
        default:
            break;
    }
}

function setUsername(){
    username = document.getElementById("setName").value;
    document.querySelector(".setNameContainer").style.display = "none";
}

var textInput = document.getElementById("messageInput");
textInput.addEventListener("keypress", function(event) {
    // If the user presses the "Enter" key on the keyboard
    if (event.key === "Enter") {
      // Cancel the default action, if needed
      event.preventDefault();
      // Trigger the button element with a click
      document.getElementById("sendBtn").click();
    }
  });
