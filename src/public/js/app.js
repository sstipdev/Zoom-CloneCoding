const messageList = document.querySelector("ul");
const messageForm = document.querySelector("form");

const socket = new WebSocket(`ws://${window.location.host}`);

socket.addEventListener("open", () => {
  console.log("서버에 연결 되었습니다. ✅");
});

socket.addEventListener("message", (message) => {
  console.log(`새 메세지 [ ${message.data} ]`);
});

socket.addEventListener("close", () => {
  console.log("서버로부터 연결이 종료되었습니다. ❌");
});

const handleSubmit = (event) => {
  event.preventDefault();
  const input = messageForm.querySelector("input");
  socket.send(input.value);
  input.value = "";
};

messageForm.addEventListener("submit", handleSubmit);
