import React, { useState } from 'react';
import { format, differenceInMinutes } from 'date-fns';
import axios from 'axios';
import './SetGoal.css';

const GoalSetter = () => {
    const [goal, setGoal] = useState('');
    const [deadline, setDeadline] = useState(format(new Date(), "yyyy-MM-dd'T'HH:mm"));
    const userData = JSON.parse(localStorage.getItem('userData'));

    const handleGoalChange = (e) => {
        setGoal(e.target.value);
    };

    const handleDeadlineChange = (e) => {
        setDeadline(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const minutesDifference = differenceInMinutes(new Date(deadline), new Date());
        console.log('Minutes difference:', minutesDifference);

        try {
            const response = await axios.post('http://localhost:3000/addGoal', {
                username: userData.username,
                goal,
                time: minutesDifference,
            });
            setGoal('');
            console.log('Goal set:', response.data);
            // Optionally, fetch goals again after adding a new one
        } catch (error) {
            console.error('Error setting goal:', error);
            // Optionally, handle error scenarios here
        }
    };

    return (
        <div className="container mx-auto flex justify-center items-center h-screen">
            <form className="w-full max-w-sm border-4 border-maingreen p-4 rounded-lg text-lg">
                <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3">
                        <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-full-name">
                            Enter your Goal
                        </label>
                    </div>
                    <div className="md:w-2/3">
                        <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                            id="inline-full-name"
                            type="text"
                            value={goal}
                            onChange={handleGoalChange} />
                    </div>
                </div>
                <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3">
                        <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-deadline">
                            Deadline
                        </label>
                    </div>
                    <div className="md:w-2/3">
                        <input
                            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                            id="inline-deadline"
                            type="datetime-local"
                            onChange={handleDeadlineChange}
                            value={deadline}
                        />
                    </div>
                </div>
                <div className="md:flex md:items-center">
                    <div className="md:w-1/3"></div>
                    <div className="md:w-2/3">
                        <button className="shadow bg-maingreen hover:bg-maingreen focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                            type="button"
                            onClick={handleSubmit}>
                            Add Goal
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default GoalSetter;
