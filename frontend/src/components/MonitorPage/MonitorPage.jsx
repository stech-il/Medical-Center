import React, { useState, useEffect } from 'react';
import './MonitorPage.css';
import RoomMonitorQueue from './roomMonitorQueue';
import { getAllRooms } from '../../clientServices/RoomService';
import useMonitorSocket from '../../clientServices/MonitorSocket';
import MonitorMessages from './MonitorMessages';

const MonitorPage = () => {
    const [rooms, setRooms] = useState([]);
    const socketUrl = "http://localhost:8000";  // Replace with your server address
    const { subscribeToRoom, queuesByRoom,socket } = useMonitorSocket(socketUrl);

    useEffect(() => {
        console.log("monitorPage");
        const fetchRooms = async () => {
            try {
                const response = await getAllRooms();
                console.log(response.data);
                setRooms(response.data);
            } catch (error) {
                console.error('Error fetching rooms:', error);
            }
        };

        fetchRooms();
    }, []);

    return (
        <div className='monitorPageContainer'>
            <div className='queuesRoomsMonitorContainer'>
                {rooms.length > 0 ? (
                    rooms.map((room) => (
                        <div
                            key={room.ID}
                            className='roomMonitorContainer'
                        >
                            <RoomMonitorQueue
                                id={room.ID}
                                name={room.Name}
                                subscribeToRoom={subscribeToRoom}
                                queuesByRoom={queuesByRoom}
                                socket={socket}
                            />
                        </div>
                    ))
                ) : (
                    <p>No rooms available.</p>
                )}
            </div>
            <MonitorMessages />
        </div>
    );
};

export default MonitorPage;