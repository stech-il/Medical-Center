import React, { useState } from 'react';
import './MessagePage.css';


const NewMessageModal = ({ onClose, onSave }) => {
    const [content, setContent] = useState('');
    const [status, setStatus] = useState(true); // Default to true (פעיל)

    const handleSave = () => {
        onSave(content, status);
        onClose();
    };

    return (
        <div className='message-modal'>
            <div className='message-modal-content'>
                <div className='close' onClick={onClose}>&times;</div>
                <div className='form-group'>
                    <div>תוכן ההודעה</div>
                    <textarea value={content} onChange={(e) => setContent(e.target.value)} />
                </div>
                <div className='form-group'>
                    <div className='chooseActivityCont'>
                        <label>סטטוס פעילות</label>

                        <div >

                            <label>פעיל</label>
                            <input className='chooseActivity'
                                type='radio'
                                value={true}
                                checked={status === true}
                                onChange={() => setStatus(true)}
                            />
                        </div>

                        <div >
                            <label>לא פעיל</label>
                            <input className='chooseActivity'
                                type='radio'
                                value={false}
                                checked={status === false}
                                onChange={() => setStatus(false)}
                            />
                        </div>
                    </div>
                </div>
                <button className='newMsgSubmit-Btn' onClick={handleSave}>שמור</button>
            </div>
        </div>
    );
};

export default NewMessageModal;
