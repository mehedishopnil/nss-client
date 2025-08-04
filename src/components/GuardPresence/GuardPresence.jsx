import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useParams, Link } from 'react-router-dom';
import { format, parseISO, eachDayOfInterval, subMonths, isSameDay, startOfWeek, getDay } from 'date-fns';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Chart, BarController, BarElement, LinearScale, CategoryScale, Tooltip, Legend } from 'chart.js';
import { enGB } from 'date-fns/locale'; // British English locale for Bangladesh

// Register Chart.js components
Chart.register(BarController, BarElement, LinearScale, CategoryScale, Tooltip, Legend);

// Setup calendar localizer for Bangladesh
const localizer = dateFnsLocalizer({
  format,
  parse: parseISO,
  startOfWeek: (date) => startOfWeek(date, { weekStartsOn: 0 }), // Week starts on Sunday
  getDay,
  locales: { 'en-GB': enGB }
});

const GuardPresence = () => {
    const { id } = useParams();
    const location = useLocation();
    const chartRef = useRef(null);
    const chartInstance = useRef(null);
    const [view, setView] = useState('month');
    const [dateRange, setDateRange] = useState({
        start: subMonths(new Date(), 3),
        end: new Date()
    });

    // Get presence data from location state or empty array
    const presenceData = location.state?.presence || [];
    
    // Process presence data for calendar
    const calendarEvents = presenceData.map(presence => ({
        title: presence.status === 'present' ? '✅ Present' : '❌ Absent',
        start: new Date(presence.date),
        end: new Date(presence.date),
        allDay: true,
        status: presence.status
    }));

    // Process data for charts
    const processChartData = () => {
        const last30Days = eachDayOfInterval({
            start: subMonths(new Date(), 1),
            end: new Date()
        });

        const dailyPresence = last30Days.map(date => {
            const dayData = presenceData.find(p => 
                isSameDay(new Date(p.date), date)
            );
            return {
                date,
                status: dayData?.status || 'none'
            };
        });

        const presentCount = dailyPresence.filter(d => d.status === 'present').length;
        const absentCount = dailyPresence.filter(d => d.status === 'absent').length;
        const noRecordCount = dailyPresence.filter(d => d.status === 'none').length;

        return {
            labels: ['Present', 'Absent', 'No Record'],
            data: [presentCount, absentCount, noRecordCount],
            colors: ['#10B981', '#EF4444', '#6B7280']
        };
    };

    // Initialize chart
    useEffect(() => {
        if (presenceData.length > 0 && chartRef.current) {
            const { labels, data, colors } = processChartData();

            if (chartInstance.current) {
                chartInstance.current.destroy();
            }

            const ctx = chartRef.current.getContext('2d');
            chartInstance.current = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels,
                    datasets: [{
                        label: 'Last 30 Days',
                        data,
                        backgroundColor: colors,
                        borderColor: colors.map(c => c.replace('0.7', '1')),
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                precision: 0
                            }
                        }
                    },
                    plugins: {
                        legend: {
                            display: false
                        },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    return `${context.label}: ${context.raw} days`;
                                }
                            }
                        }
                    }
                }
            });
        }

        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    }, [presenceData]);

    // Calculate presence stats
    const totalPresent = presenceData.filter(p => p.status === 'present').length;
    const totalAbsent = presenceData.filter(p => p.status === 'absent').length;
    const presencePercentage = presenceData.length > 0 
        ? Math.round((totalPresent / presenceData.length) * 100) 
        : 0;

    const eventStyleGetter = (event) => {
        const backgroundColor = event.status === 'present' ? '#10B981' : '#EF4444';
        const style = {
            backgroundColor,
            borderRadius: '4px',
            opacity: 0.8,
            color: 'white',
            border: '0px',
            display: 'block'
        };
        return { style };
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Attendance Records</h1>
                <Link 
                    to={`/admin-panel/single-guard/${id}`}
                    className="btn btn-outline btn-primary"
                >
                    Back to Guard Profile
                </Link>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="card bg-green-50 border border-green-200">
                    <div className="card-body">
                        <h3 className="card-title text-green-800">Total Present</h3>
                        <p className="text-2xl font-bold">{totalPresent}</p>
                        <p className="text-sm text-green-600">days recorded</p>
                    </div>
                </div>
                <div className="card bg-red-50 border border-red-200">
                    <div className="card-body">
                        <h3 className="card-title text-red-800">Total Absent</h3>
                        <p className="text-2xl font-bold">{totalAbsent}</p>
                        <p className="text-sm text-red-600">days recorded</p>
                    </div>
                </div>
                <div className="card bg-blue-50 border border-blue-200">
                    <div className="card-body">
                        <h3 className="card-title text-blue-800">Presence Rate</h3>
                        <p className="text-2xl font-bold">{presencePercentage}%</p>
                        <p className="text-sm text-blue-600">based on {presenceData.length} records</p>
                    </div>
                </div>
            </div>

            {/* Chart Section */}
            <div className="card bg-white shadow-md mb-8">
                <div className="card-body">
                    <h2 className="card-title text-xl mb-4">Last 30 Days Summary</h2>
                    <div className="h-64">
                        <canvas ref={chartRef}></canvas>
                    </div>
                </div>
            </div>

            {/* Calendar View */}
            <div className="card bg-white shadow-md mb-8">
                <div className="card-body">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="card-title text-xl">Attendance Calendar</h2>
                        <div className="flex gap-2">
                            <button 
                                onClick={() => setView('month')} 
                                className={`btn btn-sm ${view === 'month' ? 'btn-primary' : 'btn-outline'}`}
                            >
                                Month
                            </button>
                            <button 
                                onClick={() => setView('week')} 
                                className={`btn btn-sm ${view === 'week' ? 'btn-primary' : 'btn-outline'}`}
                            >
                                Week
                            </button>
                        </div>
                    </div>
                    <div className="h-[600px]">
                        <Calendar
                            localizer={localizer}
                            events={calendarEvents}
                            startAccessor="start"
                            endAccessor="end"
                            view={view}
                            onView={setView}
                            eventPropGetter={eventStyleGetter}
                            defaultDate={new Date()}
                            views={['month', 'week']}
                            culture="en-GB" // Using British English format (DD/MM/YYYY)
                            onRangeChange={(range) => {
                                if (Array.isArray(range)) {
                                    setDateRange({
                                        start: range[0],
                                        end: range[range.length - 1]
                                    });
                                } else {
                                    setDateRange({
                                        start: range.start,
                                        end: range.end
                                    });
                                }
                            }}
                        />
                    </div>
                </div>
            </div>

            {/* Detailed Presence Table */}
            <div className="card bg-white shadow-md">
                <div className="card-body">
                    <h2 className="card-title text-xl mb-4">All Attendance Records</h2>
                    <div className="overflow-x-auto">
                        <table className="table table-zebra w-full">
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {presenceData.length > 0 ? (
                                    [...presenceData]
                                        .sort((a, b) => new Date(b.date) - new Date(a.date))
                                        .map((record, index) => (
                                            <tr key={index}>
                                                <td>{format(new Date(record.date), 'dd/MM/yyyy')}</td>
                                                <td>
                                                    <span className={`badge ${
                                                        record.status === 'present' ? 
                                                        'badge-success' : 'badge-error'
                                                    }`}>
                                                        {record.status === 'present' ? 'Present' : 'Absent'}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))
                                ) : (
                                    <tr>
                                        <td colSpan="2" className="text-center py-4 text-gray-500">
                                            No attendance records found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GuardPresence;