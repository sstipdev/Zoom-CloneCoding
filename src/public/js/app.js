const socket = io();

const welcome = document.getElementById("welcome");
const form = welcome.querySelector("form");

const handleRoomSubmit = (evnet) => {
  evnet.preventDefault();
  const input = form.querySelector("input");
  socket.emit("enter_room", { payload: input.value }, () => console.log("서버 성공 !"));
  input.value = "";
};

form.addEventListener("submit", handleRoomSubmit);
