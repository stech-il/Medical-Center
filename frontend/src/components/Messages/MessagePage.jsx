import React, { useState, useEffect } from 'react';
import './MessagePage.css';
import MessageItem from './MessageItem';
import { getAllMessages, createMessage } from '../../clientServices/MessagesService';
import NewMessageModal from './NewMessageModal';
import Sidebar from '../sidebar/sidebar'

const MessagePage = () => {
    const [allMessages, setAllMessages] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const fetchAllMessages = async () => {
        try {
            const response = await getAllMessages();
            setAllMessages(response.data.data);
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    useEffect(() => {
        fetchAllMessages();
    }, []);

    const handleNewMessage = async (content, status) => {
        try {
            await createMessage(content, status);
            await fetchAllMessages(); // Refresh the list of messages
        } catch (error) {
            console.error('Error creating message:', error);
        }
    };

    const handleMessageUpdated = () => {
        fetchAllMessages(); // Refresh the list of messages after an update or delete
    };

    return (
        <div className='MessagePageContainer'>
            <Sidebar />

            {!showModal && (
                <>
                    <h2>הודעות מערכת</h2>

                    <button className='newMsg-Btn' onClick={() => setShowModal(true)}>הודעה חדשה</button>

                    <div className='allMessagesContainer'>
                        {Array.isArray(allMessages) && allMessages.length > 0 ? (
                            allMessages.map((message) => (
                                <MessageItem
                                    key={message.ID}
                                    id={message.ID}
                                    content={message.Message}
                                    status={message.Status}
                                    onMessageUpdated={handleMessageUpdated}
                                />
                            ))
                        ) : (
                            <p>לא נמצאו הודעות</p>
                        )}
                    </div>
                </>
            )}
            {showModal && <NewMessageModal onClose={() => setShowModal(false)} onSave={handleNewMessage} />}
        </div>
    );
};

export default MessagePage;
