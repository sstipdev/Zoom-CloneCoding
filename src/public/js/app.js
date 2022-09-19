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

setTimeout(() => {
  socket.send("브라우저로부터 메세지가 왔다 !");
}, 10000);
