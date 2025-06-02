import React from 'react';
import MealItem from './MealItem';
import useHttp from '../hooks/useHttp';
import ErrorText from './ErrorText';

const initialConfig = {};
const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';

function Meals() {
    const { isLoading, error, data: meals } = useHttp(`${apiUrl}/meals`, initialConfig, []);
    
    if (isLoading) {
        return (
            <p className='center'>Loading meals...</p>
        );
    }

    if (error) {
        return (
            <ErrorText title='Failed to fetch meals' message={error} />
        );
    }

    return (
        <ul id='meals'>
            {meals.map((meal) => (
                <MealItem key={meal.id} meal={meal} src={`${apiUrl}/${meal.image}`} />
            ))}
        </ul>
    );
}

export default Meals;
