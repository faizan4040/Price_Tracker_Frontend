// src/socket.js
import { io } from "socket.io-client";

// ⚙️ Replace this with your backend address
const SOCKET_URL = "http://localhost:5000";

const socket = io(SOCKET_URL, {
  transports: ["websocket"],
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 2000,
});

socket.on("connect", () => console.log("✅ Connected to Flask backend"));
socket.on("disconnect", () => console.log("❌ Disconnected from backend"));

export default socket;
