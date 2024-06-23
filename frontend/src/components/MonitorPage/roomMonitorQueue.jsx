import React, { useState, useEffect } from 'react';
import './RoomMonitorQueue.css';
import { getQueueListByRoom } from '../../clientServices/QueueService';

const RoomMonitorQueue = ({ id, name }) => {
    const [queue, setQueue] = useState([]);

    useEffect(() => {
        const fetchQueue = async () => {
            try {
                const response = await getQueueListByRoom(id);
                console.log(response.data);
                setQueue(response.data);
            } catch (error) {
                console.error('Error fetching queue:', error);
            }
        };

        fetchQueue();
    }, [id]);

    return (
        <div className='RoomMonitorQueueContainer'>
            <div className='roomMonitorTitle'>{name}</div>
            {queue.length > 0 ? (
                <>
                    <div className='currentMonitorPatient'>
                        <div className='currentPatientNumber'>  {queue[0] && <div>{queue[0].patient.UniqeNumber}</div>}</div>

                    </div>
                    <div className='nextPatientsContainer'>

                        <div className='next3MonitorPatients'>
                            <div>הבאים בתור:</div>
                            {queue[1] && <div>{queue[1].patient.UniqeNumber}</div>}
                            {queue[2] && <div>{queue[2].patient.UniqeNumber}</div>}
                            {queue[3] && <div>{queue[3].patient.UniqeNumber}</div>}
                        </div>
                    </div>
                    <div className='numOfWaitPatientsContainer'>
                        <div>מספר ממתינים</div>
                        <div className='numOfWaitPatients'>{queue.length}</div>
                    </div>
                </>
            ) : (
                <p>תור ריק</p>
            )}
        </div>
    );
};

export default RoomMonitorQueue;
