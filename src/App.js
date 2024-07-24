// src/App.js
import React from 'react';
import {ThemeProvider} from '@mui/material';
import {theme} from './theme/theme';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import HomePage from './pages/HomePage';
import Header from "./components/header/Header";
import HeroSection from "./components/hero/HeroSection";

function App() {
    return (
        <ThemeProvider theme={theme}>
            <HeroSection/>
            <Header/>
        </ThemeProvider>
    );
}

export default App;
