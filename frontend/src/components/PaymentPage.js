import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // Import useNavigate
import { fetchAllBookings, fetchMentors } from '../services/api';
import './PaymentPage.css'; // Assuming you have a CSS file for styling

const PaymentPage = () => {
    const location = useLocation();
    const navigate = useNavigate(); // Initialize useNavigate
    const { mentor, duration, bookingId } = location.state || {};
    const [bookings, setBookings] = useState([]);
    const [mentors, setMentors] = useState({});

    useEffect(() => {
        const fetchMentorsAndBookings = async () => {
            const mentorsData = await fetchMentors();
            const mentorsMap = mentorsData.reduce((acc, mentor) => {
                acc[mentor.id] = mentor.name;
                return acc;
            }, {});

            setMentors(mentorsMap);

            const studentId = 1; // Replace with actual student ID or context
            const bookingsData = await fetchAllBookings({ student_id: studentId });
            setBookings(bookingsData);
        };

        fetchMentorsAndBookings();
    }, []);

    const hourlyRate = mentor?.is_premium ? 10 : 5;
    const totalCost = hourlyRate * duration;

    if (!mentor) return <p>No mentor selected</p>;

    const handleConfirmPayment = () => {
        alert(`Payment confirmed for booking ID: ${bookingId}. Total cost: $${totalCost}.`);
        // Add further payment handling logic here
    };

    return (
        <div className="payment-page-container">
            <h1>Payment Confirmation</h1>
            <h2>Selected Mentor</h2>
            <p>Mentor: {mentor.name}</p>
            <p>Availability: {mentor.availability}</p>
            <p>Expertise: {mentor.areas_of_expertise}</p>
            <p>Premium: {mentor.is_premium ? 'Yes' : 'No'}</p>
            <p>Session Duration: {duration} hour(s)</p>
            <p>Total Cost: ${totalCost}</p>
            <button onClick={handleConfirmPayment}>Confirm Payment</button>
            
            <h2>Booking History</h2>
            <ul>
                {bookings.map(booking => (
                    <li key={booking.id}>
                        Mentor: {mentors[booking.mentor_id] || 'Unknown Mentor'}, 
                        Date: {booking.session_date}, 
                        Duration: {booking.session_duration} hours, 
                        Status: {booking.status}
                    </li>
                ))}
            </ul>

            <button 
                className="back-home-button" 
                onClick={() => navigate('/')} // Navigate to home page
            >
                Back to Home
            </button>
        </div>
    );
};

export default PaymentPage;
