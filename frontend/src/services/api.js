export const getMentors = async () => {
    const response = await fetch('https://career-carve-backend-2024.onrender.com/mentors');
    return await response.json();
};

export const createBooking = async (bookingData) => {
    const response = await fetch('https://career-carve-backend-2024.onrender.com/bookings', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
    });
    return await response.json();
};
