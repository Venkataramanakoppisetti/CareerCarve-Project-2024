import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Select } from 'antd';
import { getMentors, createBooking } from '../services/api';

const BookingForm = () => {
    const [mentors, setMentors] = useState([]);
    
    useEffect(() => {
        async function fetchMentors() {
            const data = await getMentors();
            setMentors(data);
        }
        fetchMentors();
    }, []);
    
    const onFinish = async (values) => {
        const response = await createBooking(values);
        console.log('Booking Success:', response);
    };

    return (
        <Form layout="vertical" onFinish={onFinish}>
            <Form.Item name="studentName" label="Your Name" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item name="areaOfInterest" label="Area of Interest" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item name="mentorId" label="Choose Mentor" rules={[{ required: true }]}>
                <Select>
                    {mentors.map(mentor => (
                        <Select.Option key={mentor.id} value={mentor.id}>
                            {mentor.name} ({mentor.areas_of_expertise.join(', ')})
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item>
            <Button type="primary" htmlType="submit">Book Session</Button>
        </Form>
    );
};

export default BookingForm;
