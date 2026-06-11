async function sendMessage() {

const input = document.getElementById("userInput");
const chatBox = document.getElementById("chatBox");

const message = input.value.trim();

if(!message) return;

chatBox.innerHTML += `
<div class="user">${message}</div>
`;

input.value = "";

chatBox.innerHTML += `
<div class="bot" id="typing">Typing...</div>
`;

chatBox.scrollTop = chatBox.scrollHeight;

try{

const response = await fetch("/chat",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
message:message
})
});

const data = await response.json();

document.getElementById("typing").remove();

chatBox.innerHTML += `
<div class="bot">${data.reply}</div>
`;

chatBox.scrollTop = chatBox.scrollHeight;

}catch(error){

document.getElementById("typing").remove();

chatBox.innerHTML += `
<div class="bot">Error connecting server.</div>
`;

}

}

document.getElementById("userInput")
.addEventListener("keypress",function(e){
if(e.key==="Enter"){
sendMessage();
}
});