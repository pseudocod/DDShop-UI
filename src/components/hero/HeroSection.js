import React, {useContext} from 'react';
import {Box} from '@mui/material';
import Typography from "@mui/material/Typography";
import {Link, useLocation} from "react-router-dom";
import {UserContext} from "../../context/UserContext";

const HeroSection = () => {
    const location = useLocation();
    const isHomepage = location.pathname === '/';
    const {user} = useContext(UserContext);

    const handleLogoClick = (event) => {
        if (isHomepage) {
            event.preventDefault(); // Prevent the default link behavior
            window.location.reload(); // Refresh the page
        }
    };
    return (
        <Box sx={{
            marginRight: '80px',   // Space for the fixed header
            paddingTop: '30px',
            paddingBottom: '70px',
            paddingLeft: '50px',
            backgroundImage: `url('/resurseProiect/hero-section.jpg')`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '150vh'
        }}>
            <Link to="/" onClick={handleLogoClick}>
                <Typography variant='h1' sx={{
                    fontWeight: 700,
                    color: '#F5F4F2',
                    fontSize: '30px',
                    marginBottom: '100px',
                    cursor: 'pointer',
                }}>
                    ORICÂND
                </Typography>
            </Link>
            <Typography variant='h1' sx={{fontWeight: 700, fontSize: '180px', color: '#F5F4F2', lineHeight: 0.9}}>
                GO<br/>
                AGAINST<br/>
                THE<br/>
                GRAIN<br/>
            </Typography>
        </Box>
    );
}

export default HeroSection;
