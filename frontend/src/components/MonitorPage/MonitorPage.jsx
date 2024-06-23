import React, { useState, useEffect } from 'react';
import './MonitorPage.css';
import RoomMonitorQueue from './roomMonitorQueue';
import { getAllRooms } from '../../clientServices/RoomService';

import MonitorMessages from './MonitorMessages'

const MonitorPage = () => {
    const [rooms, setRooms] = useState([]);


    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const response = await getAllRooms();
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
                            <RoomMonitorQueue id={room.ID} name={room.Name} />
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