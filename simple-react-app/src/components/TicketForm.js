import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
export default function TicketForm({ onSubmit }) {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: 'IT',
        priority: 'Medium',
        createdBy: ''
    });
    const [submitted, setSubmitted] = useState(false);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.title.trim() || !formData.description.trim() || !formData.createdBy.trim()) {
            alert('Please fill in all fields');
            return;
        }
        onSubmit(formData);
        setFormData({
            title: '',
            description: '',
            category: 'IT',
            priority: 'Medium',
            createdBy: ''
        });
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 3000);
    };
    return (_jsxs("form", { className: "ticket-form", onSubmit: handleSubmit, children: [submitted && _jsx("div", { className: "success-message", children: "Ticket created successfully!" }), _jsxs("div", { className: "form-group", children: [_jsx("label", { htmlFor: "title", children: "Title *" }), _jsx("input", { id: "title", type: "text", name: "title", value: formData.title, onChange: handleChange, placeholder: "Brief issue title", required: true })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { htmlFor: "description", children: "Description *" }), _jsx("textarea", { id: "description", name: "description", value: formData.description, onChange: handleChange, placeholder: "Detailed description", rows: 4, required: true })] }), _jsxs("div", { className: "form-row", children: [_jsxs("div", { className: "form-group", children: [_jsx("label", { htmlFor: "category", children: "Category *" }), _jsxs("select", { id: "category", name: "category", value: formData.category, onChange: handleChange, children: [_jsx("option", { children: "IT" }), _jsx("option", { children: "HR" }), _jsx("option", { children: "Finance" }), _jsx("option", { children: "Facilities" }), _jsx("option", { children: "General" })] })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { htmlFor: "priority", children: "Priority *" }), _jsxs("select", { id: "priority", name: "priority", value: formData.priority, onChange: handleChange, children: [_jsx("option", { children: "Low" }), _jsx("option", { children: "Medium" }), _jsx("option", { children: "High" }), _jsx("option", { children: "Critical" })] })] })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { htmlFor: "createdBy", children: "Your Name *" }), _jsx("input", { id: "createdBy", type: "text", name: "createdBy", value: formData.createdBy, onChange: handleChange, placeholder: "Your name", required: true })] }), _jsx("button", { type: "submit", className: "btn-primary", children: "Create Ticket" })] }));
}
