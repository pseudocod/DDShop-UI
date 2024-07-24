// src/components/layout/Layout.js
import React from 'react';
import Header from '../header/Header';
import Box from '@mui/material/Box';

const Layout = ({children}) => {
    return (
        <Box sx={{display: 'flex', flexDirection: 'column', minHeight: '100vh'}}>
            <Header/>
            <Box component="main" sx={{flex: 1, padding: '16px'}}>
                {children}
            </Box>
        </Box>
    );
};

export default Layout;
