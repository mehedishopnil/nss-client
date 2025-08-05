import React, { useContext, useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProviders';

const GuardSearchEngine = () => {
    const { allGuards, loading } = useContext(AuthContext);
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);
    const searchRef = useRef(null);
    const navigate = useNavigate();


    // Close suggestions when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setShowSuggestions(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Search function with fuzzy matching and priority sorting
    const searchGuards = (term) => {
        if (!allGuards || allGuards.length === 0 || !term.trim()) return [];

        const lowerTerm = term.toLowerCase();
        
        // Score results based on match quality
        return allGuards
            .map(guard => {
                let score = 0;
                
                // Exact matches get highest score
                if (guard.name.toLowerCase() === lowerTerm) score += 100;
                if (guard.phone === term) score += 100;
                if (guard.nid === term) score += 100;
                
                // Partial matches
                if (guard.name.toLowerCase().includes(lowerTerm)) score += 50;
                if (guard.phone.includes(term)) score += 30;
                if (guard.nid.includes(term)) score += 30;
                
                // Beginning matches get bonus
                if (guard.name.toLowerCase().startsWith(lowerTerm)) score += 20;
                if (guard.phone.startsWith(term)) score += 15;
                if (guard.nid.startsWith(term)) score += 15;
                
                return { ...guard, score };
            })
            .filter(guard => guard.score > 0)
            .sort((a, b) => b.score - a.score);
    };

    // Debounced search for suggestions
    useEffect(() => {
        if (!hasSearched && searchTerm.trim() && showSuggestions) {
            const timer = setTimeout(() => {
                const results = searchGuards(searchTerm);
                setSuggestions(results.slice(0, 5));
            }, 200);

            return () => clearTimeout(timer);
        }
    }, [searchTerm, allGuards, showSuggestions, hasSearched]);

    const handleSearch = (e) => {
        e.preventDefault();
        if (!searchTerm.trim()) return;

        setHasSearched(true);
        setShowSuggestions(false);
        const results = searchGuards(searchTerm);
        navigate('/admin-panel/guard-search-result', { state: { results, searchQuery: searchTerm } });
    };

    const handleSuggestionClick = (guard) => {
        setSearchTerm(guard.name);
        setShowSuggestions(false);
        setHasSearched(true);
        navigate('/admin-panel/guard-search-result', { state: { results: [guard], searchQuery: guard.name } });
    };

    return (
        <div className="w-full mx-auto px-4" ref={searchRef}>
            <form onSubmit={handleSearch} className="relative">
                <div className="join w-full">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setShowSuggestions(true);
                            setHasSearched(false);
                        }}
                        placeholder="Search guards by name, phone or NID..."
                        className="input input-bordered join-item w-full focus:outline-none focus:ring-2 focus:ring-primary"
                        aria-label="Search guards"
                        autoComplete="off"
                    />
                    <button 
                        type="submit" 
                        className="btn btn-primary join-item"
                        disabled={loading || !searchTerm.trim()}
                    >
                        {loading ? (
                            <span className="loading loading-spinner"></span>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        )}
                    </button>
                </div>

                {showSuggestions && suggestions.length > 0 && (
                    <div className="absolute z-10 mt-1 w-full">
                        <ul className="menu bg-base-100 rounded-box shadow-lg border border-base-200 max-h-96 overflow-auto">
                            {suggestions.map((guard) => (
                                <li key={guard._id}>
                                    <a onClick={(e) => {
                                        e.preventDefault();
                                        handleSuggestionClick(guard);
                                    }} className="hover:bg-primary hover:text-primary-content">
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <span className="font-bold">{guard.name}</span>
                                                <div className="flex gap-4 text-xs opacity-75">
                                                    <span>Phone: {guard.phone}</span>
                                                    <span>NID: {guard.nid}</span>
                                                </div>
                                            </div>
                                            <span className="badge badge-ghost">{guard.score}% match</span>
                                        </div>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {showSuggestions && searchTerm && !suggestions.length && !hasSearched && (
                    <div className="absolute z-10 mt-1 w-full">
                        <div className="p-4 bg-base-100 rounded-box shadow-lg border border-base-200 text-center text-sm opacity-75">
                            No guards found matching {searchTerm}.
                        </div>
                    </div>
                )}
            </form>
        </div>
    );
};

export default GuardSearchEngine;