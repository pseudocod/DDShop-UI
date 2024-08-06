import React from 'react';
import HeroSection from "../components/hero/HeroSection";
import AestheticSection from "../components/aesthetic/AestheticSection";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {Link} from "react-router-dom";

export default function HomePage() {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <>
            <HeroSection/>
            <Box sx={{textAlign: 'center', my: 4}}>
                <Typography variant="h5" sx={{fontWeight: 300, color: '#666', mt: 2}}>
                    <span style={{cursor: 'pointer'}}
                          onClick={scrollToTop}>ANYTIME is the right time to start believing in yourself.</span>
                </Typography>
            </Box>
            <AestheticSection/>
        </>
    );
}
