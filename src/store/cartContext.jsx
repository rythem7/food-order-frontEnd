import React, { createContext, useReducer, useCallback } from "react";

const CartContext = createContext({
    items: [],
    addItem: (item) => {},
    removeItem: (itemId) => {},
    clearCart: () => {},
    totalAmount: 0,
});

function cartReducer(state, action) {
    switch (action.type) {
        case 'ADD_ITEM':                    
            const existingCartItemIndex = state.items.findIndex((item) => item.id === action.item.id);
            const updatedItems = [...state.items];

            if (existingCartItemIndex >= 0) {
                const existingItem = state.items[existingCartItemIndex];
                const updatedItem = {
                    ...existingItem,
                    quantity: existingItem.quantity + 1,
                };
                updatedItems[existingCartItemIndex] = updatedItem;
            } else {
                updatedItems.push({...action.item, quantity: 1}); // Add new item with quantity 1
            }
            return {
                ...state,
                items: updatedItems,
            };
        case 'REMOVE_ITEM':
            const existingCartItemIndexToRemove = state.items.findIndex((item) => item.id === action.item.id);
            const existingItem = state.items[existingCartItemIndexToRemove];
            if (existingItem.quantity === 1) {
                return {
                    ...state,
                    items: state.items.filter(item => item.id !== action.item.id),
                };
            } else {
                const updatedItems = [...state.items];
                updatedItems[existingCartItemIndexToRemove].quantity -= 1;
                return {
                    ...state,
                    items: updatedItems,
                };
            }
        case 'CLEAR_CART':
            return {
                ...state,
                items: [],
            };
        default:
        return state;
    }
}

export const CartProvider = ({ children }) => {
    const [cart, dispatchCartAction] = useReducer(cartReducer, {items: []});

    function addItem(item) {
        dispatchCartAction({ type: 'ADD_ITEM', item });
    }

    const removeItem = useCallback((item) => {
        dispatchCartAction({ type: 'REMOVE_ITEM', item });
    }, [dispatchCartAction]);

    function clearCart() {
        dispatchCartAction({ type: 'CLEAR_CART' });
    }

    const totalAmount = cart.items.reduce((total, item) => total + (item.price * item.quantity), 0);

    const cartContext = {
        items: cart.items,
        addItem,
        removeItem,
        clearCart,
        totalAmount
    };

    return (
        <CartContext.Provider value={cartContext}>
            {children}
        </CartContext.Provider>
    );
}

export default CartContext;