import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import GuardCard from '../GuardCard/GuardCard';
import { FiArrowLeft, FiSearch, FiFilter, FiFrown, FiCheckCircle, FiXCircle } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const GuardSearchResultView = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { results = [], searchQuery = '' } = location.state || {};
    const [filter, setFilter] = useState('all');
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const filteredResults = results.filter(guard => {
        if (filter === 'all') return true;
        if (!guard.presence || guard.presence.length === 0) return filter === 'absent';
        
        const latestStatus = guard.presence[guard.presence.length - 1].status;
        return filter === 'present' ? latestStatus === 'present' : latestStatus !== 'present';
    });

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <header className="mb-8">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                        <div>
                            <button 
                                onClick={() => navigate(-1)}
                                className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 transition-colors mb-4"
                            >
                                <FiArrowLeft className="text-lg" />
                                <span className="font-medium">Back to Search</span>
                            </button>
                            
                            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
                                {results.length > 0 ? (
                                    <>
                                        Results for <span className="text-indigo-600">"{searchQuery}"</span>
                                    </>
                                ) : (
                                    'No Results Found'
                                )}
                            </h1>
                        </div>

                        {/* Stats and Filter */}
                        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                            <div className="bg-white rounded-xl shadow-sm p-4 flex items-center gap-4">
                                <div className="text-center">
                                    <div className="text-sm text-gray-500">Total</div>
                                    <div className="text-2xl font-bold text-indigo-600">{results.length}</div>
                                </div>
                                <div className="h-10 w-px bg-gray-200"></div>
                                <div className="text-center">
                                    <div className="text-sm text-gray-500">Filtered</div>
                                    <div className="text-2xl font-bold text-indigo-600">{filteredResults.length}</div>
                                </div>
                            </div>

                            <div className="relative">
                                <button 
                                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                                    className="flex items-center gap-2 bg-white hover:bg-gray-50 rounded-xl shadow-sm px-4 py-3 transition-all"
                                >
                                    <FiFilter />
                                    <span className="font-medium">
                                        {filter === 'all' ? 'All' : filter === 'present' ? 'Present' : 'Absent'}
                                    </span>
                                </button>

                                {isFilterOpen && (
                                    <motion.div 
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10"
                                    >
                                        <div className="py-1">
                                            <button 
                                                onClick={() => {
                                                    setFilter('all');
                                                    setIsFilterOpen(false);
                                                }}
                                                className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50"
                                            >
                                                All Guards
                                            </button>
                                            <button 
                                                onClick={() => {
                                                    setFilter('present');
                                                    setIsFilterOpen(false);
                                                }}
                                                className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50"
                                            >
                                                <FiCheckCircle className="text-green-500" />
                                                Present Today
                                            </button>
                                            <button 
                                                onClick={() => {
                                                    setFilter('absent');
                                                    setIsFilterOpen(false);
                                                }}
                                                className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50"
                                            >
                                                <FiXCircle className="text-red-500" />
                                                Absent Today
                                            </button>
                                        </div>
                                    </motion.div>
                                )}
                            </div>
                        </div>
                    </div>
                </header>

                {/* Results Section */}
                <AnimatePresence>
                    {filteredResults.length > 0 ? (
                        <motion.div 
                            variants={containerVariants}
                            initial="hidden"
                            animate="show"
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                        >
                            {filteredResults.map(guard => (
                                <motion.div
                                    key={guard._id}
                                    variants={itemVariants}
                                    whileHover={{ scale: 1.03 }}
                                >
                                    <GuardCard 
                                        guard={guard}
                                        onClick={() => navigate(`/guards/${guard._id}`)}
                                    />
                                </motion.div>
                            ))}
                        </motion.div>
                    ) : results.length > 0 ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="bg-white rounded-xl shadow-sm p-6 text-center"
                        >
                            <FiFilter className="mx-auto text-3xl text-indigo-400 mb-3" />
                            <h3 className="text-lg font-medium text-gray-800 mb-2">No matching guards</h3>
                            <p className="text-gray-500 mb-4">
                                Your filters didn't match any guards. Try adjusting your filter criteria.
                            </p>
                            <button
                                onClick={() => setFilter('all')}
                                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                            >
                                Reset Filters
                            </button>
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="bg-white rounded-xl shadow-sm p-8 md:p-12 text-center"
                        >
                            <div className="max-w-md mx-auto">
                                <FiFrown className="mx-auto text-5xl text-indigo-300 mb-4" />
                                <h2 className="text-2xl font-bold text-gray-800 mb-3">No guards found</h2>
                                <p className="text-gray-500 mb-6">
                                    Your search for <span className="font-medium">"{searchQuery}"</span> didn't match any guards. 
                                    Try different search terms like name, phone number, or NID.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                                    <button 
                                        onClick={() => navigate(-1)}
                                        className="px-5 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                                    >
                                        Back to Search
                                    </button>
                                    <button 
                                        onClick={() => navigate('/guards')}
                                        className="px-5 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                                    >
                                        Browse All Guards
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default GuardSearchResultView;