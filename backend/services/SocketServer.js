const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const queueService = require("./QueueService.js");
const PatientsService = require("./PatientsService.js");
const { nextTick } = require("process");

const getKeyByValue = (map, value) => {
    if (map instanceof Map) {
        for (let [key, val] of map.entries()) {
            if (val == value) {
                return key;
            }
        }
    }
    return null; // Return null if the value is not found or the Map is empty
};

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
    io.on("connection", async (socket) => {
        try {
            numberOfClients++;
            const roomId = socket.handshake.query.clientId; // Access the roomId query parameter
            clientRooms.set(socket.id, roomId);
            console.log("A new user has connected", socket.id, "room number", roomId);
            if (roomId!="monitor") {
                let currentClient = await queueService.getFirstInQueueByRoom(roomId);
                let nextClient = await queueService.getSecondInQueueByRoom(roomId);
                console.log("current client: ",currentClient ? currentClient.ID : null);                
                socket.emit("updateCurrentPatient", currentClient ? currentClient.patient : null);
                socket.emit("updateNextPatient", nextClient ? nextClient.patient : null);
            }
            //listening to calls from a client
            socket.on("moveClientToAnotherRoom", async (currentPatient, newRoomId, place) => {
                try {
                    //update in the db
                    await queueService.moveBetweenRooms(currentPatient, newRoomId, place);
                    //return approval to the caller
                    socket.emit("message", "moved Client To Another Room successfully");
                    //update the new room next client- if the movement is to the beginning of the queue
                    nextClient = await queueService.getSecondInQueueByRoom(newRoomId);
                    io.to(getKeyByValue(clientRooms,newRoomId)).emit("updateNextPatient",nextClient ? nextClient.patient : null);
                    //update the monitor- 2 rooms
                    const updatedQueue1 = await queueService.getQueueListByRoom(newRoomId);
                    io.to(getKeyByValue(clientRooms, "monitor")).emit("queueUpdate", newRoomId, updatedQueue1);
                    const updatedQueue2 = await queueService.getQueueListByRoom(clientRooms.get(socket.id));
                    io.to(getKeyByValue(clientRooms, "monitor")).emit("queueUpdate", clientRooms.get(socket.id), updatedQueue2);
                    //update the room - the next and the next-next clients                 
                    currentClient = await queueService.getFirstInQueueByRoom(clientRooms.get(socket.id));
                    nextClient = await queueService.getSecondInQueueByRoom(clientRooms.get(socket.id));
                    socket.emit("updateCurrentPatient", currentClient ? currentClient.patient : null);
                    socket.emit("updateNextPatient", nextClient ? nextClient.patient : null);
                } catch (error) {
                    console.log(error.message);
                    console.error('Stack Trace:', error.stack);
                    throw new Error(error.message);
                }
            });

            socket.on("subscribeToQueue", async (roomId) => {
                try {
                    const queue = await queueService.getQueueListByRoom(roomId);
                    console.log(roomId, " subscribed");
                    socket.emit(`queueUpdate`, roomId, queue);
                }
                catch (error) {
                    console.log(error.message);
                    console.error('Stack Trace:', error.stack);
                    throw new Error(error.message);
                }
            })


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