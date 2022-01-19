"use strict"

function handleConnectCB () {
    console.log("WS Connected");
}
function handleCloseCB () {
    console.log("WS was closed");
}
function handleWSErrorCB() {
    console.log("WS got an error");
}
function postMessage(messageArray){
        let userName = messageArray[0];
        let message = "";
        for (let i = 1; i < messageArray.length; i++){
            message += messageArray[i] + " ";
        }

        let messageUsername = document.createTextNode(userName);
        let messageText = document.createTextNode(message);

        let entireMessage = document.createElement("div");
        entireMessage.setAttribute("class", "entireMessage");

        let messageUsernameElement = document.createElement("p");
        messageUsernameElement.setAttribute("class", "messageUsername");
        messageUsernameElement.appendChild(messageUsername);

        let messageTextElement = document.createElement("p");
        messageTextElement.setAttribute("class","messageText")
        messageTextElement.appendChild(messageText);

    if(userNameTA.value  === userName) {
        entireMessage.style.textAlign = "right";
        entireMessage.style.marginRight = "15px";
        entireMessage.style.marginLeft = "auto";
        messageTextElement.style.backgroundColor = "#F6BF4E";
        messageTextElement.style.borderRadius = "10px";
    }
    else{
        entireMessage.style.textAlign = "left";
        entireMessage.style.marginRight = "auto";
        entireMessage.style.marginLeft = "15px";
        messageTextElement.style.backgroundColor = "#EA5246";
        messageTextElement.style.borderRadius = "10px";
    }
    entireMessage.appendChild(messageTextElement);
    entireMessage.appendChild(messageUsernameElement);
    chatBox.appendChild(entireMessage);
    entireMessage.scrollIntoView();
}
function handleReceiveMessage (event){
    let serverResponse = JSON.parse(event.data);

    console.log("Server message: " + event.data );
    switch (serverResponse.command){
        case "fen":
            setBoard(serverResponse.content);
            break;
        case "server":
            //post the server message to chat client
            let roomNameParagraph = document.createElement("p");
            roomNameParagraph.setAttribute("class", "roomName");
            let roomNameJoined = document.createTextNode(serverResponse.content);
            roomNameParagraph.appendChild(roomNameJoined);
            chatBox.appendChild(roomNameParagraph);
            break;
        case "message":
            //post the message
            let messageArray = serverResponse.content.split(" ");
            postMessage(messageArray);
            break;
        case "playerColor":
            playerColor = serverResponse.content;
            break;
        case "leave":
            gameOver = true;
            break;
        default:
            console.log("ERROR with message")
    }
}
function handleSendBtn(){
    if (messageTA.value != "" && inARoom) {
        ws.send("message " + userNameTA.value + " " + messageTA.value);
        messageTA.value = "";
        console.log("Message sent : " + "message " + userNameTA.value + " " + messageTA.value);
    }
    else{
        console.log("Did not send message.");
    }

}
function isValidUserName(userName){
    for(let i = 0; i < userName.length; i++){
        let char = userName[i];
        if(char === " " || char < 'a' || char > 'z' ){
            return false;
        }
    }
    return true;
}
function handleJoinRoom(){
    if(isValidUserName(userNameTA.value)) {
        gameOver = false;
        setBoard("8/8/8/8/8/8/8/8 w KQkq - 0 1");
        ws.send("join " + userNameTA.value);
        inARoom = true;
        document.getElementById("joinGameBtn").textContent = "Leave Game";
        document.getElementById("userNameTA").readOnly = true;

        console.log("Searching for a room...");

        while (chatBox.firstChild) {
            chatBox.removeChild(chatBox.firstChild);
        }
    }
    else{
        alert("Invalid username: only one word allowed")
    }

}
function handleLeaveRoom() {
    ws.send("leave ");
    document.getElementById("joinGameBtn").textContent = "Join Game";
    document.getElementById("userNameTA").readOnly = false;
    gameOver = true;
    inARoom = false;
}
function handleJoinBtnClick(){
    console.log("Clicked join btn");
    if(inARoom){
        handleLeaveRoom()
    }
    else{
        handleJoinRoom();
    }
}

function handleKeyPress(event){
    if(event.keyCode == 13){
        event.preventDefault();
        if(!inARoom)
            handleJoinBtnClick();
        else
            handleSendBtn();
    }
}
////////////////////////////////////

let ws = new WebSocket( "ws://localhost:8080/");
ws.onopen = handleConnectCB;
ws.onmessage = handleReceiveMessage;
ws.onclose = handleCloseCB;
ws.onerror = handleWSErrorCB;

let userNameTA = document.getElementById("userNameTA");
let messageTA = document.getElementById("sendMessageTA");

let joinRoomBtn = document.getElementById("joinGameBtn");
let inARoom = false;
joinRoomBtn.addEventListener("click", handleJoinBtnClick);

let sendMessageBtn = document.getElementById("sendMessageBtn");
sendMessageBtn.addEventListener("click", handleSendBtn);

let chatBox = document.getElementById("messages");
document.addEventListener("keypress", handleKeyPress);

