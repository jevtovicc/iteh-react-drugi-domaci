import React, { createContext, useContext, useState, ReactNode } from 'react';
import { BookFormat } from '../types';


interface CartItem extends BookFormat {
    quantity: number;
}

interface CartContextType {
    cart: CartItem[];
    addToCart: (bookFormat: BookFormat) => void;
    removeFromCart: (bookFormatId: number) => void;
    increaseQuantity: (bookFormatId: number) => void;
    decreaseQuantity: (bookFormatId: number) => void;
    clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [cart, setCart] = useState<CartItem[]>([]);

    const addToCart = (bookFormat: BookFormat) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.bookFormatId === bookFormat.bookFormatId);
            if (existingItem) {
                return prevCart.map(item =>
                    item.bookFormatId === bookFormat.bookFormatId ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prevCart, { ...bookFormat, quantity: 1 }];
        });
    };

    const increaseQuantity = (bookFormatId: number) => {
        setCart(prevCart => (
            prevCart.map(item => item.bookFormatId === bookFormatId ? { ...item, quantity: item.quantity + 1 } : item))
        )
    }

    const decreaseQuantity = (bookFormatId: number) => {
        const itemToDecrease = cart.find(item => item.bookFormatId === bookFormatId)
        if (itemToDecrease) {
            if (itemToDecrease.quantity === 1) {
                removeFromCart(bookFormatId)
            } else {
                setCart(prevCart => (
                    prevCart.map(item => item.bookFormatId === bookFormatId ? { ...item, quantity: item.quantity - 1 } : item))
                )
            }
        }
    }

    const removeFromCart = (bookFormatId: number) => {
        setCart(prevCart => prevCart.filter(item => item.bookFormatId !== bookFormatId));
    };

    const clearCart = () => {
        setCart([]);
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, increaseQuantity, decreaseQuantity }}>
            {children}
        </CartContext.Provider>
    );
};