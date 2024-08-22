import React, { useState, useEffect } from 'react';
import { List, Card } from 'antd';
import { getMentors } from '../services/api';

const MentorList = () => {
    const [mentors, setMentors] = useState([]);
    
    useEffect(() => {
        async function fetchMentors() {
            const data = await getMentors();
            setMentors(data);
        }
        fetchMentors();
    }, []);
    
    return (
        <List
            grid={{ gutter: 16, column: 4 }}
            dataSource={mentors}
            renderItem={mentor => (
                <List.Item>
                    <Card title={mentor.name}>
                        <p>Expertise: {mentor.areas_of_expertise.join(', ')}</p>
                        <p>Availability: {mentor.availability}</p>
                    </Card>
                </List.Item>
            )}
        />
    );
};

export default MentorList;
