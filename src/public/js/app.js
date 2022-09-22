const socket = io();

const welcome = document.getElementById("welcome");
const form = welcome.querySelector("form");
const room = document.getElementById("room");

room.hidden = true;

let roomName;

const showRoom = (msg) => {
  welcome.hidden = true;
  room.hidden = false;
  const h3 = room.querySelector("h3");
  h3.innerText = `${roomName} 에 입장하였습니다.`;
};

const handleRoomSubmit = (evnet) => {
  evnet.preventDefault();
  const input = form.querySelector("input");
  socket.emit("enter_room", { payload: input.value }, showRoom);
  roomName = input.value;
  input.value = "";
};

form.addEventListener("submit", handleRoomSubmit);
