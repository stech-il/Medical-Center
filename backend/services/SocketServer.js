const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const queueService = require("./QueueService.js");

const createSocketServer = (app) => {
    const server = http.createServer(app);
    const io = new Server(server, {
        cors: {
            origin: "*",
            credentials: true,
        },
    });
    var numberOfClients = 0;

    const clientRooms = new Map();

    // Handle WebSocket connections here
    io.on("connection",async (socket) => {
        try {

            numberOfClients++;
            const roomId = socket.handshake.query.roomId; // Access the roomId query parameter
            clientRooms.set(socket.id, roomId);
            console.log("A new user has connected", socket.id, "to room", roomId);
            const currentClient=await queueService.getFirstInQueueByRoom(clientRooms.get(socket.id));
            const nextClient=await queueService.getSecondInQueueByRoom(clientRooms.get(socket.id));
            io.emit("updateCurrentPatient",currentClient.patient);
            io.emit("updateNextPatient",nextClient.patient);
            //listening to calls from a client
            socket.on("moveClientToAnotherRoom", async (currentPatient, roomId, place) => {
                try {
                                       
                    await queueService.moveBetweenRooms(currentPatient, roomId, place);
                    io.emit("message", "moved Client To Another Room successfully");
                    const updatedQueue=await queueService.findQueueByRoom(roomId);
                    socket.emit("updateQueue",roomId,updatedQueue);
                    const newCurrentPatient=await queueService.getFirstInQueueByRoom(clientRooms.get(socket.id));
                    console.log(newCurrentPatient.patient.UniqueNumber);
                    const newNextPatient=await queueService.getSecondInQueueByRoom(clientRooms.get(socket.id));
                    console.log(newNextPatient.patient.UniqueNumber);
                    io.emit("updateCurrentPatient",newCurrentPatient.patient);    
                    io.emit("updateNextPatient",newNextPatient.patient);                
                } catch (error) {
                    console.log(error.message);
                    throw new Error(error.message);
                }
            });

            // Handle disconnections
            socket.on("disconnect", () => {
                clientRooms.delete(socket.id);
                console.log(socket.id, " disconnected");
            });
        } catch (error) {
            console.log(error);
        }
    });

    return server;
}

module.exports = createSocketServer;