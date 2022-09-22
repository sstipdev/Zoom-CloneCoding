import http from "http";
import SocketIO from "socket.io";
import express from "express";

const app = express();
const PORT = 3000;

app.set("view engine", "pug");
app.set("views", __dirname + "/views");

app.use("/public", express.static(__dirname + "/public"));
app.get("/", (req, res) => res.render("home"));
app.get("/*", (req, res) => res.redirect("/"));

const handleListen = () => console.log(`🚀 Listening on http://localhost:${PORT}`);

const httpServer = http.createServer(app);
const io = SocketIO(httpServer);

io.on("connection", (socket) => {
  socket.onAny((event) => console.log("소켓 이벤트 :", event));
  socket.on("enter_room", (roomName, done) => {
    socket.join(roomName);
    done();
  });
});

// const wss = new WebSocket.Server({ server });

// const fakeDatabase = [];

// wss.on("connection", (socket) => {
//   fakeDatabase.push(socket);
//   socket["nickname"] = "익명";
//   console.log("Connected to Browser ✅");
//   socket.on("close", () => console.log("Disconnected from the Browser ❌"));
//   socket.on("message", (msg) => {
//     const message = JSON.parse(msg);
//     switch (message.type) {
//       case "new_message":
//         fakeDatabase.forEach((aSocket) => aSocket.send(`${socket.nickname}: ${message.payload}`));
//       case "nickname":
//         socket["nickname"] = message.payload;
//     }
//   });
// });

httpServer.listen(PORT, handleListen);
