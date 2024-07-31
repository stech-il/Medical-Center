import React, { useState, useEffect } from 'react';
import './ReportsPage.css';
import Sidebar from '../sidebar/sidebar';
import { BarChart } from '@mui/x-charts/BarChart';
import { getAllReports } from '../../clientServices/ReportsService'
const ReportsPage = () => {
    const [allReports, setAllReports] = useState([]);


    const fetchAllReports = async () => {
        try {
            const response = await getAllReports();
            setAllReports(response.data.data);
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };


    useEffect(() => {
        fetchAllReports();
    }, []);

    return (
        <>
            <div className='ReportsPageContainer'>
                <Sidebar />
                <div className='chartCont'>
                    <BarChart
                        series={[
                            { data: [35] },
                            { data: [51] },
                            { data: [15] },
                            { data: [60] },
                        ]}
                        height={290}
                        width={500}
                        xAxis={[{ data: ['Q1'], scaleType: 'band' }]}
                        margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
                    />
                </div>
                <button className='report-btn'>הפק דוח</button>
                <button className='report-btn'>צפייה בדוחות</button>

            </div>

        </>
    );
};

export default ReportsPage;
