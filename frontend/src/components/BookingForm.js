// src/components/BookingForm.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MentorList from './MentorList'; // Import the MentorList component
import { fetchMentors, createBooking } from '../services/api'; // Import API functions
import './BookingForm.css'; // Import custom styling

const BookingForm = () => {
    const [mentors, setMentors] = useState([]);
    const [selectedMentorId, setSelectedMentorId] = useState('');
    const [duration, setDuration] = useState(1);
    const [sessionDate, setSessionDate] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchMentors();
            setMentors(data);
        };
        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const mentor = mentors.find(m => m.id === parseInt(selectedMentorId));
        if (mentor) {
            // Create booking in the backend
            const response = await createBooking({
                student_id: 1, // Replace with actual student_id from context or auth
                mentor_id: mentor.id,
                session_date: sessionDate,
                session_duration: duration,
            });
            if (response.booking_id) {
                // Navigate to the payment page with booking details
                navigate('/payment', { state: { mentor, duration, bookingId: response.booking_id } });
            } else {
                console.error("Failed to create booking");
            }
        }
    };

    return (
        <div className="booking-form-container">
            <h1>Book a Session</h1>
            <MentorList mentors={mentors} setSelectedMentorId={setSelectedMentorId} />
            <form onSubmit={handleSubmit} className="booking-form">
                <label>
                    Select Date:
                    <input 
                        type="date" 
                        value={sessionDate} 
                        onChange={(e) => setSessionDate(e.target.value)} 
                        required
                    />
                </label>
                <label>
                    Duration (hours):
                    <input 
                        type="number" 
                        min="1" 
                        value={duration} 
                        onChange={(e) => setDuration(e.target.value)} 
                        required
                    />
                </label>
                <button type="submit">Proceed to Payment</button>
            </form>
        </div>
    );
};

export default BookingForm;
