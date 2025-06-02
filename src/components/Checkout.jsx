import React, { useContext } from 'react';
import Modal from './Modal';
import CartContext from '../store/cartContext';
import UserProgressContext from '../store/UserProgress';
import Input from '../UI/Input';
import Button from '../UI/Button';
import useHttp from '../hooks/useHttp';
import ErrorText from './ErrorText';

const requestConfig = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
};

const apiUrl = import.meta.env.VITE_API_URL ?? 'http://localhost:3000';

function Checkout() {
    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);

    const { error, data: orderData, sendRequest, clearData, isLoading: pending } = useHttp(`${apiUrl}/orders`, requestConfig);


    function handleCloseCheckout() {
        userProgressCtx.hideCheckout();
    }

    function handleFinishCheckout() {
        userProgressCtx.hideCheckout();
        cartCtx.clearCart();
        clearData();
    }

    async function handleSubmit(e) {
        e.preventDefault();

        const fd = new FormData(e.target);
        const customerData = Object.fromEntries(fd.entries());

        await sendRequest(
            JSON.stringify({
                order: {
                    items: cartCtx.items,
                    customer: customerData,
                },
            })
        );
    }

    let actions = (
        <>
            <Button type='button' onClick={handleCloseCheckout} textOnly>Close</Button>
            <Button>Submit Order</Button>
        </>
    );

    if (pending) {
        actions = <span>Loading...</span>
    }

    if (orderData && !error) {
        return (
            <Modal open={userProgressCtx.progress === 'checkout'} onClose={handleFinishCheckout}>
                <h2>Order Submitted</h2>
                <p>Thank you for your order!</p>
                <p>We will get back to you with more details via email.</p>
                <p className='modal-actions'>
                <Button onClick={handleFinishCheckout} textOnly>Okay!</Button>
                </p>
            </Modal>
        );
    }
    return (
        <Modal open={userProgressCtx.progress === 'checkout'} onClose={handleCloseCheckout}>
            <form onSubmit={handleSubmit}>
                <h2>Checkout</h2>
                <p>Total Amount: ${cartCtx.totalAmount}</p>
                <Input 
                    label="Full Name" 
                    type="text" 
                    id="name"
                />
                <Input 
                    label="E-Mail Address"
                    type="email" 
                    id="email" 
                />
                <Input 
                    label="Street" 
                    type="text" 
                    id="street" 
                />
                <div className="control-row">
                    <Input 
                        label="Postal Code" 
                        type="text" 
                        id="postal-code" 
                    />
                    <Input 
                        label="City" 
                        type="text" 
                        id="city"
                    />
                </div>

                {error && <ErrorText title="Failed to submit order" message={error} />}

                <p className='modal-actions'>
                    {actions}
                </p>
            </form>
        </Modal>
    )
}

export default Checkout;
