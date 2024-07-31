import React, { useState, useEffect } from 'react';
import './ReportsPage.css';
import Sidebar from '../sidebar/sidebar';
import { BarChart } from '@mui/x-charts/BarChart';
import { getAllReports } from '../../clientServices/ReportsService';

const ReportsPage = () => {
    const [allReports, setAllReports] = useState([]);

    // Function to fetch all reports and set state
    const fetchAllReports = async () => {
        try {
            const response = await getAllReports();
            setAllReports(response.data.data);
        } catch (error) {
            console.error('Error fetching reports:', error);
        }
    };

    // Effect to fetch reports on component mount
    useEffect(() => {
        fetchAllReports();
    }, []);

    // Map data for the chart
    const chartData = allReports.map(report => ({
        label: `Report ${report.ID}`,
        amountOfPatients: report.amountOfPatients,
    }));

    return (
        <div className='ReportsPageContainer'>
            <Sidebar />
            <div className='chartCont'>
                <BarChart
                    series={[{ data: chartData.map(data => data.amountOfPatients) }]}
                    height={290}
                    width={500}
                    xAxis={[{ data: chartData.map(data => data.label), scaleType: 'band' }]}
                    margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
                />
            </div>
            <button className='report-btn'>הפק דוח</button>
            <button className='report-btn'>צפייה בדוחות</button>
        </div>
    );
};

export default ReportsPage;
