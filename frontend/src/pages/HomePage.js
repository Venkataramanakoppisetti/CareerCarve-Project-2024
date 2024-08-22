import React from 'react';
import BookingForm from '../components/BookingForm';
import MentorList from '../components/MentorList';

const HomePage = () => {
    return (
        <div>
            <h1>Book a 1x1 Session with a Mentor</h1>
            <BookingForm />
            <MentorList />
        </div>
    );
};

export default HomePage;
