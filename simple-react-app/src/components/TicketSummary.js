import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export default function TicketSummary({ tickets }) {
    const totalTickets = tickets.length;
    const openTickets = tickets.filter(t => t.status === 'Open').length;
    const inProgressTickets = tickets.filter(t => t.status === 'In Progress').length;
    const resolvedTickets = tickets.filter(t => t.status === 'Resolved').length;
    const highPriorityTickets = tickets.filter(t => t.priority === 'High' || t.priority === 'Critical').length;
    return (_jsxs("div", { className: "summary-container", children: [_jsxs("div", { className: "summary-card", children: [_jsx("h3", { children: "Total Tickets" }), _jsx("p", { className: "summary-value", children: totalTickets })] }), _jsxs("div", { className: "summary-card", children: [_jsx("h3", { children: "Open" }), _jsx("p", { className: "summary-value", children: openTickets })] }), _jsxs("div", { className: "summary-card", children: [_jsx("h3", { children: "In Progress" }), _jsx("p", { className: "summary-value", children: inProgressTickets })] }), _jsxs("div", { className: "summary-card", children: [_jsx("h3", { children: "Resolved" }), _jsx("p", { className: "summary-value", children: resolvedTickets })] }), _jsxs("div", { className: "summary-card", children: [_jsx("h3", { children: "High Priority" }), _jsx("p", { className: "summary-value", children: highPriorityTickets })] })] }));
}
