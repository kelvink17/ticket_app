import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export default function TicketList({ tickets, onUpdateStatus }) {
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString();
    };
    const getPriorityClass = (priority) => {
        return `priority-${priority.toLowerCase()}`;
    };
    if (tickets.length === 0) {
        return _jsx("p", { className: "no-tickets", children: "No tickets found" });
    }
    return (_jsx("div", { className: "ticket-list", children: _jsxs("table", { className: "tickets-table", children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { children: "Ticket ID" }), _jsx("th", { children: "Title" }), _jsx("th", { children: "Category" }), _jsx("th", { children: "Priority" }), _jsx("th", { children: "Status" }), _jsx("th", { children: "Created By" }), _jsx("th", { children: "Date" }), _jsx("th", { children: "Action" })] }) }), _jsx("tbody", { children: tickets.map(ticket => (_jsxs("tr", { children: [_jsx("td", { className: "ticket-id", children: ticket.ticketId }), _jsx("td", { className: "ticket-title", title: ticket.description, children: ticket.title }), _jsx("td", { children: ticket.category }), _jsx("td", { children: _jsx("span", { className: `priority-badge ${getPriorityClass(ticket.priority)}`, children: ticket.priority }) }), _jsx("td", { children: _jsx("span", { className: `status-badge status-${ticket.status.toLowerCase().replace(' ', '-')}`, children: ticket.status }) }), _jsx("td", { children: ticket.createdBy }), _jsx("td", { children: formatDate(ticket.createdAt) }), _jsx("td", { children: _jsxs("select", { value: ticket.status, onChange: (e) => onUpdateStatus(ticket._id, e.target.value), className: "status-select", children: [_jsx("option", { children: "Open" }), _jsx("option", { children: "In Progress" }), _jsx("option", { children: "Resolved" }), _jsx("option", { children: "Closed" })] }) })] }, ticket._id))) })] }) }));
}
