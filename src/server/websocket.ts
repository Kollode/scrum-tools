import * as io from "socket.io";
import { Server } from "http";

function initializeWebsocket(server: Server): SocketIO.Server {
  const websocketServer = io(server);
  websocketServer.on("connection", socket => {
    const clientId = socket.id;
    socket.on("disconnect", () => {
      console.log("a user left", clientId);
      websocketServer.emit("reciveMessage", `Client ${clientId} left`);
    });

    socket.on("sendMessage", message => {
      console.log("Got message from client", message);
      websocketServer.emit("reciveMessage", `Client ${clientId}: ${message}`);
    });

    console.log("a user connected", clientId);
    websocketServer.emit("reciveMessage", `Client ${clientId} joined`);
  });

  return websocketServer;
}

export { initializeWebsocket };
