import React, { useState, useEffect } from 'react';
import { format, differenceInMinutes } from 'date-fns';
import axios from 'axios';
import './SetGoal.css';

const GoalSetter = () => {
    const [goal, setGoal] = useState('');
    const [deadline, setDeadline] = useState(new Date());
    const [goals, setGoals] = useState([]);
    const userData = JSON.parse(localStorage.getItem('userData'));

    useEffect(() => {
        // Fetch goals from the backend when the component mounts
        fetchGoals();
    }, []);

    const fetchGoals = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/goals/${userData.username}`);
            setGoals(response.data.goals);
        } catch (error) {
            console.error('Error fetching goals:', error);
            // Optionally, handle error scenarios here
        }
    };

    const handleGoalChange = (e) => {
        setGoal(e.target.value);
    };

    const handleDeadlineChange = (e) => {
        setDeadline(new Date(e.target.value));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Format the deadline in the required format
        const minutesDifference = differenceInMinutes(deadline, new Date());
        console.log('Minutes difference:', minutesDifference);

        try {
            const response = await axios.post('http://localhost:3000/addGoal', {
                username: userData.username,
                goal,
                time: minutesDifference,
            });
            console.log('Goal set:', response.message);
            // Fetch goals again after adding a new one
            fetchGoals();
        } catch (error) {
            console.error('Error setting goal:', error);
            // Optionally, handle error scenarios here
        }
    };

    return (
        <div className="goal-setter">
            <form className="add-form" onSubmit={handleSubmit}>
                <div className="form-control">
                    <label>Name</label>
                    <input
                        type="text"
                        placeholder='Enter your goal'
                        value={goal}
                        onChange={handleGoalChange}
                    />
                    <input type="datetime-local" id="deadline" value={format(deadline, "yyyy-MM-dd'T'HH:mm")} onChange={handleDeadlineChange} />
                </div>
                <button type="submit">Set Goal</button>
            </form>

            <div className="goals-list">
                <h2>Goals:</h2>
                <ul>
                    {goals.map((goal, index) => (
                        <li key={index}>{goal}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default GoalSetter;
