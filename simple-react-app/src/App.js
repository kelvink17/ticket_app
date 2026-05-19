import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import './App.css';
import TicketSummary from './components/TicketSummary';
import TicketForm from './components/TicketForm';
import TicketList from './components/TicketList';
import TicketFilters from './components/TicketFilters';
function App() {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filters, setFilters] = useState({
        status: '',
        priority: '',
        category: ''
    });
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
    useEffect(() => {
        fetchTickets();
    }, []);
    const fetchTickets = async () => {
        try {
            setLoading(true);
            setError(null);
            const params = new URLSearchParams();
            if (filters.status)
                params.append('status', filters.status);
            if (filters.priority)
                params.append('priority', filters.priority);
            if (filters.category)
                params.append('category', filters.category);
            const response = await fetch(`${API_URL}/api/tickets?${params}`);
            if (!response.ok)
                throw new Error('Failed to fetch tickets');
            const data = await response.json();
            setTickets(data);
        }
        catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to load tickets');
        }
        finally {
            setLoading(false);
        }
    };
    const handleCreateTicket = async (formData) => {
        try {
            const response = await fetch(`${API_URL}/api/tickets`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to create ticket');
            }
            fetchTickets();
        }
        catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to create ticket');
        }
    };
    const handleUpdateStatus = async (ticketId, newStatus) => {
        try {
            const response = await fetch(`${API_URL}/api/tickets/${ticketId}/status`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus })
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to update status');
            }
            fetchTickets();
        }
        catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to update ticket');
        }
    };
    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
    };
    useEffect(() => {
        if (filters.status || filters.priority || filters.category) {
            fetchTickets();
        }
    }, [filters]);
    return (_jsxs("div", { className: "app-container", children: [_jsx("header", { className: "app-header", children: _jsx("h1", { children: "Support Ticket Board" }) }), _jsxs("main", { className: "app-main", children: [error && _jsx("div", { className: "error-message", children: error }), _jsx(TicketSummary, { tickets: tickets }), _jsxs("div", { className: "content-grid", children: [_jsxs("section", { className: "form-section", children: [_jsx("h2", { children: "Create New Ticket" }), _jsx(TicketForm, { onSubmit: handleCreateTicket })] }), _jsxs("section", { className: "tickets-section", children: [_jsx("h2", { children: "Tickets" }), _jsx(TicketFilters, { onFilterChange: handleFilterChange, currentFilters: filters }), loading ? (_jsx("p", { className: "loading", children: "Loading tickets..." })) : (_jsx(TicketList, { tickets: tickets, onUpdateStatus: handleUpdateStatus }))] })] })] })] }));
}
export default App;
