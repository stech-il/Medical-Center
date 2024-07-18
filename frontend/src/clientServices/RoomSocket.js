import { useState, useEffect, useRef } from 'react';
import socketIO from 'socket.io-client';

const useRoomSocket = (roomId, currentPatient, setCurrentPatient, nextPatient, setNextPatient) => {
    const socketRef = useRef(null);

    useEffect(() => {
        socketRef.current = socketIO("http://localhost:8000", {
            query: { clientId: roomId }
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
            alert(message);
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

    const emergencyAlertToDoctor = (patientId, roomId) => {
        try {
            if (patientId == null || roomId == null)
                alert("not valid");
            else {
                console.log("emergencyAlertToRoom", roomId, "for patient ", patientId);
                socketRef.current.emit("EmergencyAlertToRoom", roomId, patientId);
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    const endOfTreatment = (patientId) => {
        try {
            if (patientId != null) {
                socketRef.current.emit("deletePatient", patientId);
                console.log("end of treatment of patient: ", patientId);
            }
            else {
                alert("not valid");
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    return { emergencyAlertToDoctor, endOfTreatment, currentPatient, nextPatient, moveRoom };
};

export default useRoomSocket;