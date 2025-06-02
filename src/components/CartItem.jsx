import React from 'react'

function CartItem({ name, quantity, price, onIncrement, onDecrement }) {
  return (
    <li className='cart-item'>
        <p>
            {name} - {quantity} * {price}
        </p>
        <p className='cart-item-actions'>
            <button onClick={onDecrement}>-</button>
            <span>{quantity}</span>
            <button onClick={onIncrement}>+</button>
        </p>
    </li>
  )
}

export default CartItem;
