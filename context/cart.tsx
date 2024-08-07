'use client'

import { createContext, useContext, useState, ReactNode } from 'react';
import { ProductAddCart } from '@/lib/types';

interface CartContextType {
    cart: ProductAddCart[];
    addToCart: (product: ProductAddCart) => void;
    removeFromCart: (productId: string) => void;
    addQuantity: (productId: string) => void;
    subtractQuantity: (productId: string) => void;
    total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cart, setCart] = useState<ProductAddCart[]>([]);
    const total = cart.reduce((acc, product) => acc + product.price * product.quantity, 0);

    const addToCart = (product: ProductAddCart) => {
        setCart((prevCart) => {
            const productIndex = prevCart.findIndex((p) => p.id === product.id);
            if (productIndex === -1) {
                return [...prevCart, { ...product, quantity: 1 }];
            } else {
                const newCart = [...prevCart];
                newCart[productIndex].quantity += 1;
                return newCart;
            }
        });
    };

    const removeFromCart = (productId: string) => {
        setCart((prevCart) => prevCart.filter((product) => product.id.toString() !== productId));
    };

    const addQuantity = (productId: string) => {
        setCart((prevCart) => {
            const productIndex = prevCart.findIndex((p) => p.id.toString() === productId);
            if (productIndex !== -1) {
                const newCart = [...prevCart];
                newCart[productIndex].quantity += 1;
                return newCart;
            }
            return prevCart;
        });
    };

    const subtractQuantity = (productId: string) => {
        setCart((prevCart) => {
            const productIndex = prevCart.findIndex((p) => p.id.toString() === productId);
            if (productIndex !== -1) {
                const newCart = [...prevCart];
                if (newCart[productIndex].quantity === 1) {
                    return newCart.filter((product) => product.id.toString() !== productId);
                }
                newCart[productIndex].quantity -= 1;
                return newCart;
            }
            return prevCart;
        });
    };

    return (
        <CartContext.Provider value={{ cart, total, addToCart, removeFromCart, addQuantity, subtractQuantity }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};