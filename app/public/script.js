const ws = new WebSocket('wss://my-nodejs-app-32u7.onrender.com');
var username;
var currentGroup;
ShowChat();

ws.onmessage = (event) => {
    StoreReadedText(JSON.parse(event.data))
};

function sendMessage() {
    if (username == undefined) {
        username = "user"+ Math.floor(Math.random() * 1000);
    }
    if (currentGroup != undefined) {
        const inputElement = document.getElementById('messageInput');
        const message = {
            type : "message",
            groupName : currentGroup,
            user : username,
            content : inputElement.value
        };
        ws.send(JSON.stringify(message));
        inputElement.value = '';
    }
    else{
        alert("No groups selected")
    }
}

function StoreReadedText(text){
    console.log(text)
    switch (text.type) {
        case "message":
            if (currentGroup == text.groupName) {
                const messagesElement = document.getElementById('messages');
                const li = document.createElement('li');
                li.innerHTML = "<span id='username-txt'>"+ text.user +": </span>" + text.content ;
                messagesElement.appendChild(li);
                let divElement = document.querySelector('.chat-messages');
                divElement.scrollTop = divElement.scrollHeight;
            }
            break;
        case "log":
            console.log(text.content);
            break;
        case "CreateGroup":
            var groupContainer = document.createElement("div");
            groupContainer.className = "group";
            groupContainer.setAttribute("id", text.name);
            document.querySelector(".groups").appendChild(groupContainer);
            document.getElementById(text.name).innerHTML += "<p id='group-name'>"+ text.name +"</p>";
            document.getElementById(text.name).onclick = function()
            {   currentGroup = this.id; 
                document.getElementById("info-groupName").innerText = this.id;
                document.getElementById("messages").innerHTML = "";
            }
            default:
                break;
            }
        }
        
function setUsername(){
    username = document.getElementById("setName").value;
    notification.classList.remove('hidden');
    notification.classList.add('show');

    setTimeout(() => {
        notification.classList.remove('show');
        notification.classList.add('hidden');
    }, 3000);
}
function showPopup() {document.getElementById("myPopup").style.display = "block";}
function hidePopup() {document.getElementById("myPopup").style.display = "none";}


function sendmsgOnEnter(){
    var textInput = document.getElementById("messageInput");
    const onClick = () => {
        if (event.key === "Enter") {
          // Cancel the default action, if needed
          event.preventDefault();
          // Trigger the button element with a click
          document.getElementById("send_btn").click();
        }
    }
    textInput.addEventListener("keypress", onClick);
}

function createGroup(){
    var grName = document.getElementById("groupName").value;
    if(document.getElementById(grName)){
        grName += Math.floor(Math.random() * 1000)
    }
    var groupDetails = {
        type : "CreateGroup",
        name : grName.replace(" ", "-"),
        password : document.getElementById("groupPwd").value
    };
    ws.send(JSON.stringify(groupDetails));
}


function ShowChat(){
    (async () => {
        const text = await (await fetch("/chat.html")).text();
        document.querySelector(".right-container").innerHTML = text;
    })();
}
function ShowSettings(){
    (async () => {
        const text = await (await fetch("/settings.html")).text();
        document.querySelector(".right-container").innerHTML = text;
    })();
}
