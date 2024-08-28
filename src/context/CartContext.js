import React, {createContext, useContext, useEffect, useState} from 'react';
import {UserContext} from "./UserContext";
import axios from "axios";

export const CartContext = createContext();

export default function CartProvider({children}) {
    const {user} = useContext(UserContext);
    const [cart, setCart] = useState({
        id: null,
        totalPrice: 0, // Assuming totalPrice should start at 0
        cartEntries: [] // Empty array as the default for cart entries
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [stockError, setStockError] = useState(null);

    useEffect(() => {
        if (user && user.userCarts[0].id) {
            fetchCart(user.userCarts[0].id);
        }
    }, [user]);

    const fetchCart = async (cartId) => {
        try {
            setLoading(true);
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
            setStockError(null);
        } catch (error) {
            if (error.response.status === 409) {
                setStockError('Not enough stock available for the selected quantity.');
                setError('Not enough stock available for the selected quantity.');
            } else {
                setError('Failed to add product to cart');
            }
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
        <CartContext.Provider value={{cart, loading, error, addToCart, setCart, clearCart, stockError, setStockError}}>
            {children}
        </CartContext.Provider>
    );

}