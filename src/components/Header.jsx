import React, { useContext } from 'react';
import logo from '../assets/logo.jpg';
import Button from '../UI/Button';
import CartContext from '../store/cartContext';
import UserProgressContext from '../store/UserProgress';

function Header() {
    const { items } = useContext(CartContext);
    const userProgress = useContext(UserProgressContext);

    const totalItems = items.reduce((total, item) => total + item.quantity, 0);

    function handleShowCart() {
        userProgress.showCart();
    }
  return (
    <header id='main-header'>
        <div id='title'>
            <h1>My Restaurant</h1>
            <img src={logo} alt="logo" />
        </div>
        <nav>
            <Button onClick={handleShowCart} textOnly>Cart ({totalItems})</Button>
        </nav>
    </header>
  )
}

export default Header;
