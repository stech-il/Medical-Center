import { useState, useEffect, useRef } from 'react';
import socketIO from 'socket.io-client';

const useRoomSocket = (roomId,currentPatient,setCurrentPatient,nextPatient,setNextPatient) => {    
    const socketRef = useRef(null);

    useEffect(() => {
        socketRef.current = socketIO("http://localhost:8000", {
            query: { clientId:roomId }
        });

        socketRef.current.on("updateCurrentPatient", (newPatient) => {
            setCurrentPatient(newPatient);
            console.log("current patient", newPatient);
        });

        socketRef.current.on("updateNextPatient", (newPatient) => {
            setNextPatient(newPatient);
            console.log("next patient", newPatient);
        });

        socketRef.current.on("message", (message) => {
            console.log(message);
        });

        return () => {
            socketRef.current.disconnect();
        };
    }, [roomId]);

    const moveRoom = (roomId) => {
        try {
            if (currentPatient == null)
                console.log("not valid");
            else {
                console.log("move client ", currentPatient.ID, " to room ", roomId);
                const place = true;
                socketRef.current.emit("moveClientToAnotherRoom", currentPatient.ID, roomId, place);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return { currentPatient, nextPatient, moveRoom };
};

export default useRoomSocket;