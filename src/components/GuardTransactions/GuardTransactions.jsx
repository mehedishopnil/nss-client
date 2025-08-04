import React, { useEffect, useRef } from 'react';
import { useLocation, useParams, Link } from 'react-router-dom';
import { format } from 'date-fns';
import { Chart, BarController, BarElement, LinearScale, CategoryScale, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
Chart.register(BarController, BarElement, LinearScale, CategoryScale, Tooltip, Legend);

const GuardTransactions = () => {
    const { id } = useParams();
    const location = useLocation();
    const chartRef = useRef(null);
    const chartInstance = useRef(null);

    // Get transactions from location state or empty array
    const transactions = location.state?.transactions || [];
    
    // Process transaction data for the chart
    const processChartData = () => {
        const labels = [];
        const salaryData = [];
        const advanceData = [];
        const depositData = [];

        // Sort transactions by date
        const sortedTransactions = [...transactions].sort((a, b) => 
            new Date(a.date) - new Date(b.date)
        );

        sortedTransactions.forEach(txn => {
            const dateLabel = format(new Date(txn.date), 'MMM d, yyyy');
            labels.push(dateLabel);
            
            if (txn.type === 'salary') {
                salaryData.push(txn.amount);
                advanceData.push(0);
                depositData.push(0);
            } else if (txn.type === 'advance') {
                salaryData.push(0);
                advanceData.push(txn.amount);
                depositData.push(0);
            } else if (txn.type === 'deposit') {
                salaryData.push(0);
                advanceData.push(0);
                depositData.push(txn.amount);
            }
        });

        return { labels, salaryData, advanceData, depositData };
    };

    // Initialize chart
    useEffect(() => {
        if (transactions.length > 0 && chartRef.current) {
            const { labels, salaryData, advanceData, depositData } = processChartData();

            if (chartInstance.current) {
                chartInstance.current.destroy();
            }

            const ctx = chartRef.current.getContext('2d');
            chartInstance.current = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels,
                    datasets: [
                        {
                            label: 'Salary',
                            data: salaryData,
                            backgroundColor: 'rgba(54, 162, 235, 0.7)',
                            borderColor: 'rgba(54, 162, 235, 1)',
                            borderWidth: 1
                        },
                        {
                            label: 'Advance',
                            data: advanceData,
                            backgroundColor: 'rgba(255, 99, 132, 0.7)',
                            borderColor: 'rgba(255, 99, 132, 1)',
                            borderWidth: 1
                        },
                        {
                            label: 'Deposit',
                            data: depositData,
                            backgroundColor: 'rgba(75, 192, 192, 0.7)',
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 1
                        }
                    ]
                },
                options: {
                    responsive: true,
                    scales: {
                        x: {
                            stacked: true,
                        },
                        y: {
                            stacked: false,
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: 'Amount (৳)'
                            }
                        }
                    },
                    plugins: {
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    return `${context.dataset.label}: ৳${context.raw.toLocaleString()}`;
                                }
                            }
                        },
                        legend: {
                            position: 'top',
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
    }, [transactions]);

    // Calculate totals
    const totalSalary = transactions
        .filter(t => t.type === 'salary')
        .reduce((sum, t) => sum + t.amount, 0);

    const totalAdvances = transactions
        .filter(t => t.type === 'advance')
        .reduce((sum, t) => sum + t.amount, 0);

    const totalDeposits = transactions
        .filter(t => t.type === 'deposit')
        .reduce((sum, t) => sum + t.amount, 0);

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Transaction History</h1>
                <Link 
                    to={`/admin-panel/single-guard/${id}`}
                    className="btn btn-outline btn-primary"
                >
                    Back to Guard Profile
                </Link>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="card bg-blue-50 border border-blue-200">
                    <div className="card-body">
                        <h3 className="card-title text-blue-800">Total Salary</h3>
                        <p className="text-2xl font-bold">৳{totalSalary.toLocaleString()}</p>
                        <p className="text-sm text-blue-600">
                            {transactions.filter(t => t.type === 'salary').length} payments
                        </p>
                    </div>
                </div>
                <div className="card bg-red-50 border border-red-200">
                    <div className="card-body">
                        <h3 className="card-title text-red-800">Total Advances</h3>
                        <p className="text-2xl font-bold">৳{totalAdvances.toLocaleString()}</p>
                        <p className="text-sm text-red-600">
                            {transactions.filter(t => t.type === 'advance').length} advances
                        </p>
                    </div>
                </div>
                <div className="card bg-green-50 border border-green-200">
                    <div className="card-body">
                        <h3 className="card-title text-green-800">Total Deposits</h3>
                        <p className="text-2xl font-bold">৳{totalDeposits.toLocaleString()}</p>
                        <p className="text-sm text-green-600">
                            {transactions.filter(t => t.type === 'deposit').length} deposits
                        </p>
                    </div>
                </div>
            </div>

            {/* Chart Section */}
            <div className="card bg-white shadow-md mb-8">
                <div className="card-body">
                    <h2 className="card-title text-xl mb-4">Transaction Trends</h2>
                    <div className="h-96">
                        <canvas ref={chartRef}></canvas>
                    </div>
                </div>
            </div>

            {/* Transaction Table */}
            <div className="card bg-white shadow-md">
                <div className="card-body">
                    <h2 className="card-title text-xl mb-4">All Transactions</h2>
                    <div className="overflow-x-auto">
                        <table className="table table-zebra w-full">
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Type</th>
                                    <th>Amount</th>
                                    <th>Note</th>
                                </tr>
                            </thead>
                            <tbody>
                                {transactions.length > 0 ? (
                                    [...transactions]
                                        .sort((a, b) => new Date(b.date) - new Date(a.date))
                                        .map((txn, index) => (
                                            <tr key={index}>
                                                <td>{format(new Date(txn.date), 'MMM d, yyyy')}</td>
                                                <td>
                                                    <span className={`badge ${
                                                        txn.type === 'salary' ? 'badge-primary' :
                                                        txn.type === 'advance' ? 'badge-secondary' :
                                                        'badge-accent'
                                                    }`}>
                                                        {txn.type}
                                                    </span>
                                                </td>
                                                <td>৳{txn.amount.toLocaleString()}</td>
                                                <td>{txn.note || '-'}</td>
                                            </tr>
                                        ))
                                ) : (
                                    <tr>
                                        <td colSpan="4" className="text-center py-4 text-gray-500">
                                            No transactions found
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

export default GuardTransactions;