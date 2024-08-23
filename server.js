const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  })
);

app.use(express.static("public"));

io.on("connection", (socket) => {
  console.log("user connected");
  socket.on("message", (data) => {
    console.log("Message, recieved from client: ", data);
    socket.broadcast.emit("message", data);
  });

  socket.on("disconnect", () => {
    console.log("User disconnect");
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
