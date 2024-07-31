import { useEffect, useRef } from 'react';

import socketIO from 'socket.io-client';

const useMessagesSocket = (allMessages,setAllMessages) => {



    const socketRef = useRef(null);

    useEffect(() => {
        socketRef.current = socketIO("http://localhost:8000", {
            query: { clientId: "messageUpdated" }
        });

        socketRef.current.on("messageUpdated", (allMessages) => {
             console.log(allMessages)
             setAllMessages(previous => [...previous, allMessages])
        });

        return () => {
            socketRef.current.disconnect();
        };
    }, [setAllMessages]);

    const updateMessagesFromClient = () => {
        try {
            socketRef.current.emit("messageUpdated");
        } catch (error) {
            console.log(error);
        }
    };

    return { updateMessagesFromClient };
};

export default useMessagesSocket;
