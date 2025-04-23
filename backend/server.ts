// backend/server.ts
import http from "http";
import { setupSocket } from "./socket/socket.js";

let io: any;

async function startServer() {
  const { default: app } = await import("./src/index.js");

  const server = http.createServer(app);

  io = setupSocket(server);

  if (process.env.NODE_ENV !== "test") {
    const PORT = process.env.PORT || 9000;
    server.listen(PORT, () => {
      console.log(` Server running on http://localhost:${PORT}`);
    });
  }
}

startServer();

export { io };
