import { useState, useEffect, useRef } from 'react';
import socketIO from 'socket.io-client';

const useSocket = (roomId) => {
    const [currentPatient, setCurrentPatient] = useState({ID:0,FirstName:"anyone",LastName:"anyone",UniqueNumber:"XXXXX"});
    const [nextPatient, setNextPatient] = useState({ID:0,FirstName:"anyone",LastName:"anyone",UniqueNumber:"XXXXX"});
    const socketRef = useRef(null);

    useEffect(() => {
        socketRef.current = socketIO("http://localhost:8000", {
            query: { roomId }
        });

        socketRef.current.on("updateCurrentPatient", (newPatient) => {            
            setCurrentPatient(newPatient);
            console.log("current patient",newPatient);
        });
        
        socketRef.current.on("updateNextPatient", (newPatient) => {            
            setNextPatient(newPatient);
            console.log("next patient",newPatient);
        });

        socketRef.current.on("message", (message) => {
            console.log(message);
        });

        return () => {
            socketRef.current.disconnect();
        };
    }, []);

    const moveRoom = (roomId) => {
        try {
            console.log("move client ",currentPatient.ID, " to room ",roomId);
            const place = true;
            socketRef.current.emit("moveClientToAnotherRoom", currentPatient.ID, roomId, place);
        } catch (error) {
            console.log(error);
        }
    };

    return { currentPatient,nextPatient, moveRoom };
};

export default useSocket;