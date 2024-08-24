const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000", // Allow your React app to connect
    methods: ["GET", "POST"],
  },
});

app.use(
  cors({
    origin: "http://localhost:3000", // Allow your React app to connect
    methods: ["GET", "POST"],
  })
);

io.on("connection", (socket) => {
  console.log(`User connected`);

  socket.on("send-changes", (data) => {
    socket.broadcast.emit("recieve-changes", data);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
