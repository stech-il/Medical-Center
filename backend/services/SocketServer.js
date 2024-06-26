const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const queueService=require("./QueueService.js");

const createSocketServer = (app) => {
    const server = http.createServer(app);
    const io = new Server(server, {
        cors: {
            origin: "*",
            credentials: true,
        },
    });

    var numberOfClients=0;


    // Handle WebSocket connections here
    io.on("connection", (socket) => {
        numberOfClients++;

        console.log("A new user has connected", socket.id);

        

        // Handle disconnections
        socket.on("disconnect", () => {
            console.log(socket.id, " disconnected");
        });
    });

    io.on("moveClientToAnotherRoom",(patientId, nextRoomId,place)=>{
        const updatedRecord=queueService.moveBetweenRooms(patientId,nextRoomId,place);
        console.log(updatedRecord);
    });
    return server;
}

module.exports = createSocketServer;

// server.listen(8000, () => {
//   console.log("Server is running on port 8000");
// });
