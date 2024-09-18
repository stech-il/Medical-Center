import React, { useEffect } from 'react';
import one from '../../sounds/1.mp3';
import two from '../../sounds/2.mp3';
import three from '../../sounds/3.mp3';
import four from '../../sounds/4.mp3';
import five from '../../sounds/5.mp3';
import six from '../../sounds/6.mp3';
import seven from '../../sounds/7.mp3';
import eight from '../../sounds/8.mp3';
import nine from '../../sounds/9.mp3';
import zero from '../../sounds/0.mp3';
import patientNumber from '../../sounds/patientnumber.mp3';
import toRoom from '../../sounds/toroom.mp3';

const CallPatient = ({ queueNumber }) => {
    useEffect(() => {
        if (queueNumber) {
            const queueDigits = queueNumber.toString().split('');
            console.log(queueDigits);

            // Map each digit to its corresponding sound
            const digitSounds = {
                0: zero,
                1: one,
                2: two,
                3: three,
                4: four,
                5: five,
                6: six,
                7: seven,
                8: eight,
                9: nine
            };

            // Function to play sounds sequentially
            const playQueueNumberSounds = async () => {
                // Play "patient number" sound first
                await playAudio(new Audio(patientNumber));

                // Play each digit sound sequentially
                for (let i = 0; i < queueDigits.length; i++) {
                    const digit = queueDigits[i];
                    const audio = new Audio(digitSounds[digit]);  // Get the corresponding sound
                    await playAudio(audio); // Play sound for the current digit
                }

                // Play "to room" sound at the end
                await playAudio(new Audio(toRoom));
            };

            // Helper function to play an audio file and wait for it to finish
            const playAudio = (audio) => {
                return new Promise((resolve, reject) => {
                    audio.play();
                    audio.onended = resolve;
                    audio.onerror = reject;
                });
            };

            playQueueNumberSounds().catch((error) => {
                console.error('Error playing sound:', error);
            });
        }
    }, [queueNumber]);

    return (
        <div>
            <p>Calling patient with queue number: {queueNumber}</p>
        </div>
    );
};

export default CallPatient;
