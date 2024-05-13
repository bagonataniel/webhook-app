const ws = new WebSocket('ws://192.168.1.6:3000');
var username;

ws.onmessage = (event) => {
    readData(event)
};

function sendMessage() {
    const inputElement = document.getElementById('messageInput');
    const message = username + "|" + inputElement.value;
    ws.send(message);
    inputElement.value = '';
}

function readData(DataToRead){
    const blob = DataToRead.data;
    const reader = new FileReader();
    let message;

    reader.readAsText(blob)
    reader.onload = () => {
        message = reader.result;
        StoreReadedText(message);
    };
}

function StoreReadedText(text){
    const messagesElement = document.getElementById('messages');
    const li = document.createElement('li');
    li.innerHTML = "<span id='username-txt'>"+ text.split('|')[0] +": </span>" + text.split('|')[1] ;
    messagesElement.appendChild(li);
}
function setUsername(){
    username = document.getElementById("setName").value;
    document.querySelector(".setNameContainer").style.display = "none";
}