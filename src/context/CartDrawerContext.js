import React, {createContext, useContext, useState} from 'react';

// Create CartContext
const CartDrawerContext = createContext();

export const useCartDrawer = () => {
    return useContext(CartDrawerContext);
};

export const CartDrawerProvider = ({children}) => {
    const [open, setOpen] = useState(false);

    const toggleCartDrawer = () => {
        setOpen((prev) => !prev);
    };

    const closeCartDrawer = () => {
        setOpen(false);
    };

    return (
        <CartDrawerContext.Provider value={{open, toggleCartDrawer, closeCartDrawer}}>
            {children}
        </CartDrawerContext.Provider>
    );
};
