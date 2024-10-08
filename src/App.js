import React, {useEffect, useState} from 'react';
import {RouterProvider, createBrowserRouter, Navigate} from "react-router-dom";
import {Box, ThemeProvider} from "@mui/material";
import {theme} from "./theme/theme";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import RootLayout from "./routes/RootLayout";
import Register from "./pages/Register";
import {UserContext} from "./context/UserContext";
import Account from "./pages/Account";
import UserEdit from "./pages/UserEdit";
import ProductDetails from "./pages/ProductDetails";
import AllProducts from "./pages/AllProducts/AllProducts";
import About from "./pages/About";
import CartProvider from "./context/CartContext";
import Checkout from "./pages/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation";
import OrderSuccess from "./pages/OrderSuccess";
import OrderDetails from "./pages/OrderDetails";
import {CartDrawerProvider} from "./context/CartDrawerContext";
import UserChangePassword from "./pages/UserChangePassword";
import UserForgotPassword from "./pages/UserForgotPassword";


const createRouter = (user) => {
    return createBrowserRouter([
        {
            path: '/',
            element: <RootLayout/>,
            children: [
                {path: '/', element: <HomePage/>},
                {path: '/login', element: <Login/>},
                {path: '/register', element: user ? <Navigate to="/account"/> : <Register/>},
                {path: '/account', element: user ? <Account/> : <Navigate to="/login"/>},
                {path: '/edit-user', element: user ? <UserEdit/> : <Navigate to="/login"/>},
                {path: '/products/:id', element: <ProductDetails/>},
                {path: '/collections/all', element: <AllProducts/>},
                {path: '/collections/:categoryName', element: <AllProducts/>},
                {path: '/about', element: <About/>},
                {path: '/checkout', element: <Checkout/>},
                {path: '/order-confirmation', element: <OrderConfirmation/>},
                {path: '/order-success', element: <OrderSuccess/>},
                {path: '/order/:orderId', element: <OrderDetails/>},
                {path: '/change-password', element: <UserChangePassword/>},
                {path: '/forgot-password', element: <UserForgotPassword/>},
            ],
        },
    ]);
}


function App() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loggedInUser = localStorage.getItem('user');
        if (loggedInUser) {
            const foundUser = JSON.parse(loggedInUser);
            setUser(foundUser);
        }
        setLoading(false);
    }, []);

    console.log("User state in App:", user);

    if (loading) {
        return <Box>Loading...</Box>;
    }

    const router = createRouter(user);

    return (
        <ThemeProvider theme={theme}>
            <UserContext.Provider value={{user, setUser}}>
                <CartProvider>
                    <CartDrawerProvider>
                        <RouterProvider router={router}/>
                    </CartDrawerProvider>
                </CartProvider>
            </UserContext.Provider>
        </ThemeProvider>
    );
}

export default App;