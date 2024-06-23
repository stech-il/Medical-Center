import React, { useState, useEffect } from 'react';
import './MonitorMessages.css';
import { getAllMessages } from '../../clientServices/MessagesService';

const MonitorMessages = () => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await getAllMessages();
                setMessages(response.data.data);
                console.log(response.data)
            } catch (error) {
                console.error('Error fetching messages:', error);
            }
        };

        fetchMessages();
    }, []);


    const activeMessages = messages.filter(message => message.Status);

    return (
        <>
            {messages.length > 0 && (
                <div className='messagesMonitorContainer'>
                    <div className='roomMonitorTitle'>הודעות</div>

                    <div className='messageList'>
                        {activeMessages.map(message => (
                            <div key={message.ID} className='messageItem'>
                                {message.Message}
                            </div>
                        ))}
                    </div>

                </div>)}
        </>
    );
};

export default MonitorMessages;
