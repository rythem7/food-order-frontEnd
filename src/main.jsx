import React from 'react'
import ReactDOM from 'react-dom/client'
import { CartProvider } from './store/cartContext.jsx'
import App from './App.jsx'
import './index.css'
import { UserProgressProvider } from './store/UserProgress.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
    // <React.StrictMode>
        <UserProgressProvider>
            <CartProvider>
                <App />
            </CartProvider>
        </UserProgressProvider>
    // </React.StrictMode>,
)
