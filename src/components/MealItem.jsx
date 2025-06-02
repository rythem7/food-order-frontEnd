import React, { useContext } from 'react';
import Button from '../UI/Button';
import CartContext from '../store/cartContext';

function MealItem({ meal, src }) {
    const { addItem } = useContext(CartContext);
    return (
        <li className='meal-item'>
            <article>
                <img src={src} alt={meal.name} />
                <div>
                    <h3>{meal.name}</h3>
                    <p className='meal-item-price'>${meal.price}</p>
                    <p className='meal-item-description'>{meal.description}</p>
                </div>
                <p className='meal-item-actions'>
                    <Button onClick={() => addItem(meal)}>Add to Cart</Button>
                </p>
            </article>
        </li>
    );
}

export default MealItem;
