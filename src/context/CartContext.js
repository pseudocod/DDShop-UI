import React, {createContext, useContext, useEffect, useState} from 'react';
import {UserContext} from "./UserContext";
import axios from "axios";

export const CartContext = createContext();

export default function CartProvider({children}) {
    const {user} = useContext(UserContext);
    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (user && user.userCarts[0].id) {
            fetchCart(user.userCarts[0].id);
        }
    }, [user]);

    const fetchCart = async (cartId) => {
        try {
            const response = await axios.get(`http://localhost:8080/carts/${cartId}`);
            const sortedEntries = response.data.cartEntries.sort((a, b) => a.id - b.id);
            setCart({...response.data, cartEntries: sortedEntries});
            setError(null);
        } catch (error) {
            setError('Failed to fetch cart');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const addToCart = async (productId, quantity) => {
        if (!cart || !cart.id) {
            console.error('No cart found');
            return;
        }

        try {
            setLoading(true);
            const response = await axios.post(`http://localhost:8080/carts/${cart.id}/add-to-cart`,
                {
                    productId,
                    quantity,
                });
            const updatedCart = response.data;
            setCart(updatedCart);
            setError(null);
        } catch (error) {
            setError('Failed to add product to cart');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const clearCart = () => {
        if (cart) {
            setCart({...cart, totalPrice: 0, cartEntries: []});
        }
    }

    return (
        <CartContext.Provider value={{cart, loading, error, addToCart, setCart, clearCart}}>
            {children}
        </CartContext.Provider>
    );

}