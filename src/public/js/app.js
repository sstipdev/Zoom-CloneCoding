const socket = io();

const welcome = document.getElementById("welcome");
const form = welcome.querySelector("form");
const room = document.getElementById("room");

room.hidden = true;

let roomName;

const addMessage = (message) => {
  const ul = room.querySelector("ul");
  const li = document.createElement("li");
  li.innerText = message;
  ul.appendChild(li);
};

const handleMessageSubmit = (event) => {
  event.preventDefault();
  const input = room.querySelector("input");
  const value = input.value;
  socket.emit("new_message", value, roomName, () => {
    addMessage(`당신: ${value}`);
  });
  input.value = "";
};

const showRoom = (msg) => {
  welcome.hidden = true;
  room.hidden = false;
  const h3 = room.querySelector("h3");
  h3.innerText = `${roomName} 에 입장하였습니다.`;
  const form = room.querySelector("form");
  form, addEventListener("submit", handleMessageSubmit);
};

const handleRoomSubmit = (evnet) => {
  evnet.preventDefault();
  const input = form.querySelector("input");
  socket.emit("enter_room", input.value, showRoom);
  roomName = input.value;
  input.value = "";
};

form.addEventListener("submit", handleRoomSubmit);

socket.on("welcome", () => {
  addMessage("어서오세요 !");
});

socket.on("bye", () => {
  addMessage("안녕히 가세요 !");
});

socket.on("new_message", addMessage);
