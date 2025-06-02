import React from 'react';
import Modal from './Modal';
import { useContext } from 'react';
import CartContext from '../store/cartContext';
import CartItem from './CartItem';
import Button from '../UI/Button';
import UserProgressContext from '../store/UserProgress';
function Cart() {
    const { items: cart, totalAmount, addItem, removeItem } = useContext(CartContext);

    const userProgressCtx = useContext(UserProgressContext);

    function handleCloseCart() {
        userProgressCtx.hideCart();
    }

    function handleGoToCheckout() {
        userProgressCtx.showCheckout();
    }
    
    return (
            <Modal className='cart' open={userProgressCtx.progress === 'cart'} onClose={userProgressCtx.progress === 'cart' ? handleCloseCart : null}>
            <h2>Your Cart</h2>
            <ul>
                {cart.map((meal) => (
                    <CartItem 
                        key={meal.id} 
                        name={meal.name} 
                        quantity={meal.quantity} 
                        price={meal.price} 
                        onIncrement={() => addItem(meal)}
                        onDecrement={() => removeItem(meal)}    
                    />
                ))}
            </ul>
            <p className='cart-total'>Total: ${totalAmount}</p>
            
            <p className='modal-actions'>
                <Button onClick={handleCloseCart} textOnly>Close</Button>
                {cart.length > 0 && <Button onClick={handleGoToCheckout}>
                    Go to Checkout
                </Button>}
            </p>
        </Modal>
    )
}

export default Cart;
