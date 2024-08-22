// src/components/MentorList.js
import React from 'react';
import { List, Card } from 'antd';
import './MentorList.css'; // Import custom styling

const MentorList = ({ mentors, setSelectedMentorId }) => {
    return (
        <div className="mentor-list-container">
            <h2>Available Mentors</h2>
            <List
                grid={{ gutter: 16, column: 2 }}
                dataSource={mentors}
                renderItem={mentor => (
                    <List.Item>
                        <Card
                            title={mentor.name}
                            onClick={() => setSelectedMentorId(mentor.id)}
                            style={{ cursor: 'pointer' }}
                        >
                            <p>Availability: {mentor.availability}</p>
                            <p>Expertise: {mentor.areas_of_expertise}</p>
                            <p>Premium: {mentor.is_premium ? 'Yes' : 'No'}</p>
                        </Card>
                    </List.Item>
                )}
            />
        </div>
    );
};

export default MentorList;
