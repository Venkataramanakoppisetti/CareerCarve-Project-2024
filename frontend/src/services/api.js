// src/services/api.js

export const fetchMentors = async () => {
    try {
        const response = await fetch('https://career-carve-backend-2024.onrender.com/mentors');
        if (!response.ok) {
            throw new Error('Failed to fetch mentors');
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        return [];
    }
};

export const fetchMentorById = async (mentorId) => {
    try {
        const response = await fetch(`https://career-carve-backend-2024.onrender.com/mentors/${mentorId}`);
        if (!response.ok) {
            throw new Error('Failed to fetch mentor details');
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
};


export const createBooking = async (bookingData) => {
    try {
        const response = await fetch('https://career-carve-backend-2024.onrender.com/bookings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bookingData),
        });
        if (!response.ok) {
            throw new Error('Failed to create booking');
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        return {};
    }
};

export const fetchAllBookings = async () => {
    try {
        const response = await fetch('https://career-carve-backend-2024.onrender.com/bookings');
        if (!response.ok) {
            throw new Error('Failed to fetch bookings');
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        return [];
    }
};
