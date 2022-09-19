import http from "http";
import WebSocket from "ws";
import express from "express";

const app = express();
const PORT = 3000;

app.set("view engine", "pug");
app.set("views", __dirname + "/views");

app.use("/public", express.static(__dirname + "/public"));
app.get("/", (req, res) => res.render("home"));
app.get("/*", (req, res) => res.redirect("/"));

const handleListen = () => console.log(`🚀 Listening on http://localhost:${PORT}`);

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const fakeDatabase = [];

wss.on("connection", (socket) => {
  fakeDatabase.push(socket);
  console.log("Connected to Browser ✅");
  socket.on("close", () => console.log("Disconnected from the Browser ❌"));
  socket.on("message", (message) => {
    fakeDatabase.forEach((aSocket) => aSocket.send(message));
    console.log(message.toString("utf8"));
  });
});

server.listen(PORT, handleListen);
