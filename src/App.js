import React, {useEffect, useState} from 'react';
import {RouterProvider, createBrowserRouter, Navigate} from "react-router-dom";
import {ThemeProvider} from "@mui/material";
import {theme} from "./theme/theme";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import RootLayout from "./routes/RootLayout";
import Register from "./pages/Register";
import {UserContext} from "./context/UserContext";
import Account from "./pages/Account";
import UserEdit from "./pages/UserEdit";

const createRouter = (user) => {
    return createBrowserRouter([
        {
            path: '/',
            element: <RootLayout/>,
            children: [
                {path: '/', element: <HomePage/>},
                {path: '/login', element: user ? <Navigate to="/account"/> : <Login/>},
                {path: '/register', element: user ? <Navigate to="/account"/> : <Register/>},
                {path: '/account', element: user ? <Account/> : <Navigate to="/login"/>},
                {path: '/edit-user', element: user ? <UserEdit/> : <Navigate to="/login"/>},
            ],
        },
    ]);
}


function App() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const loggedInUser = localStorage.getItem('user');
        if (loggedInUser) {
            const foundUser = JSON.parse(loggedInUser);
            setUser(foundUser);
        }
    }, []);

    console.log("User state in App:", user);

    const router = createRouter(user);

    return (
        <ThemeProvider theme={theme}>
            <UserContext.Provider value={{user, setUser}}>
                <RouterProvider router={router}/>
            </UserContext.Provider>
        </ThemeProvider>
    );
}

export default App;