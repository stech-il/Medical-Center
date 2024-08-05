import React, { useState, useEffect, useRef } from 'react';
import './ReportsPage.css';
import Sidebar from '../sidebar/sidebar';
import { BarChart } from '@mui/x-charts/BarChart';
import { getAllReports, getTodayReports, generateDailyReport } from '../../clientServices/ReportsService';
import GenerateReportModal from './generateNewReportModal';
import { DownloadTableExcel } from 'react-export-table-to-excel';

const ReportsPage = () => {
    const [allReports, setAllReports] = useState([]);
    const [todayReportData, setTodayReportData] = useState([]);
    const [totalPatients, setTotalPatients] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [isTableVisible, setIsTableVisible] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const tableRef = useRef(null);

    const fetchAllReports = async () => {
        try {
            const response = await getAllReports();
            setAllReports(response.data);
        } catch (error) {
            console.error('Error fetching all reports:', error);
        }
    };

    const fetchTodayReports = async () => {
        try {
            const response = await getTodayReports();
            setTodayReportData(response.data);
        } catch (error) {
            console.error('Error fetching today\'s reports:', error);
        }
    };

    useEffect(() => {
        fetchAllReports();
        fetchTodayReports();
    }, []);

    useEffect(() => {
        const total = todayReportData.reduce((sum, report) => sum + report.amountOfPatients, 0);
        setTotalPatients(total);
    }, [todayReportData]);

    const handleGenerateReport = async (date) => {
        try {
            await generateDailyReport(date);
            setSuccessMessage(`הדוח לתאריך ${date} נוצר בהצלחה`);
            fetchAllReports();
        } catch (error) {
            console.error('Error generating report:', error);
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSuccessMessage('');
    };

    const handleToggleTableView = () => {
        setIsTableVisible(!isTableVisible);
        setSelectedDate(null);
    };

    const handleSelectDate = (date) => {
        setSelectedDate(date);
    };

    const groupedReports = groupReportsByDate(allReports);

    // Filtered report data based on selected date
    const filteredReportData = selectedDate
        ? allReports.filter(report => report.currentDate === selectedDate)
        : [];


    return (
        <div className='ReportsPageContainer'>
            <Sidebar />
            <div>
                <table ref={tableRef} style={{ display: 'none' }}>
                    <thead>
                        <tr>
                            <th>תאריך</th>
                            <th>קופת חולים</th>
                            <th>מספר מטופלים</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allReports.map((report, index) => (
                            <tr key={index}>
                                <td>{report.currentDate}</td>
                                <td>{report.HMO?.Name || 'Unknown'}</td>
                                <td>{report.amountOfPatients}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {!isTableVisible ? (
                <>
                    <div className='chartCont'>
                        <div className='totalAmountContainer'>
                            <div className='totalAmountTitle'>מספר מטופלים שנכנסו למוקד היום</div>
                            <div className='totalAmount'>{totalPatients}</div>
                        </div>
                        <div className='report-btn-cont'>
                            <button className='report-btn' onClick={() => setIsModalOpen(true)}>הפק דוח</button>
                            <button className='report-btn' onClick={handleToggleTableView}>
                                {isTableVisible ? 'הסתר דוחות' : 'צפייה בדוחות'}
                            </button>
                        </div>
                    </div>
                    <div className='chartCont'>
                        <BarChart
                            series={[
                                { data: todayReportData.map(report => report.amountOfPatients), color: '#3766ff' }
                            ]}
                            height={290}
                            width={500}
                            xAxis={[{ data: todayReportData.map(report => report.HMO?.Name || 'Unknown'), scaleType: 'band' }]}
                            margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
                        />
                    </div>
                </>
            ) : (
                <div>
                    <DownloadTableExcel
                        filename="דוחות"
                        sheet="Reports"
                        currentTableRef={tableRef.current}
                    >
                        <button style={{ direction: 'rtl' }} className='report-btn'>יצא ל-Excel</button>
                    </DownloadTableExcel>
                    <div className='reportsTableContainer'>
                        <table>
                            <thead>
                                <tr>
                                    <th>תאריך</th>
                                    <th>סך כל המטופלים</th>
                                </tr>
                            </thead>
                            <tbody>
                                {groupedReports.map((report, index) => (
                                    <tr key={`${report.currentDate}-${index}`} onClick={() => handleSelectDate(report.currentDate)}>
                                        <td>{report.currentDate}</td>
                                        <td>{report.amountOfPatients}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {selectedDate && (
                            <div className='chartCont'>
                                <h3>נתוני דוח לתאריך {selectedDate}</h3>
                                <BarChart
                                    series={[
                                        { data: filteredReportData.map(report => report.amountOfPatients), color: '#3766ff' }
                                    ]}
                                    height={290}
                                    width={500}
                                    xAxis={[{ data: filteredReportData.map(report => report.HMO?.Name || 'Unknown'), scaleType: 'band' }]}
                                    margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
                                />
                            </div>
                        )}
                    </div>
                </div>
            )}

            <GenerateReportModal
                open={isModalOpen}
                handleClose={handleCloseModal}
                onSubmit={handleGenerateReport}
                successMessage={successMessage}
            />
        </div>
    );
};

const groupReportsByDate = (reports) => {
    const groupedReports = reports.reduce((acc, report) => {
        const date = report.currentDate;
        if (!acc[date]) {
            acc[date] = { currentDate: date, amountOfPatients: 0 };
        }
        acc[date].amountOfPatients += report.amountOfPatients;
        return acc;
    }, {});

    return Object.values(groupedReports);
};

export default ReportsPage;
