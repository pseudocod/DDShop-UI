import Header from "../components/header/Header";
import React from 'react';
import {Outlet} from "react-router-dom";
import Typography from "@mui/material/Typography";
import Footer from "../pages/Footer";

export default function RootLayout() {
    return (
        <>
            <Header/>
            <Outlet/>
            <Footer/>
        </>
    );
}