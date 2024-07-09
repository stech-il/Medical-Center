import { useState, useEffect, useCallback } from 'react';
import socketIO from 'socket.io-client';

const useMonitorSocket = (socketUrl) => {
    const [socket, setSocket] = useState(null);
    const [queuesByRoom, setQueuesByRoom] = useState({});

    useEffect(() => {
        const newSocket = socketIO(socketUrl, {
            query: { clientId:"monitor" }
        });
        setSocket(newSocket);

        newSocket.on('connect', () => {
            console.log('Connected to WebSocket server');
        });

        newSocket.on('disconnect', (reason) => {
            console.log('Disconnected from WebSocket server:', reason);
        });

        newSocket.on(`queueUpdate`, (roomId, newQueue ) => {
            console.log("queue update in client");            
            setQueuesByRoom(prevQueues => ({
                ...prevQueues,
                [roomId]: newQueue
            }));
        });

        // Clean up on component unmount
        return () => {
            newSocket.disconnect();
        };
    }, [socketUrl]);

    const subscribeToRoom = useCallback((roomId) => {
        if (socket&&!queuesByRoom[roomId]) {
            console.log(`Subscribing to room ${roomId}`);
            socket.emit('subscribeToQueue', roomId);
        }
    },[socket]);

    return { subscribeToRoom, queuesByRoom,socket };
};

export default useMonitorSocket;