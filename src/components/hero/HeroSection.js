import React, {useContext} from 'react';
import {Box, Button} from '@mui/material';
import Typography from "@mui/material/Typography";
import {Link, useLocation} from "react-router-dom";
import ProductBox from "../product/ProductBox";

const HeroSection = () => {
    const location = useLocation();
    const isHomepage = location.pathname === '/';

    const handleLogoClick = (event) => {
        if (isHomepage) {
            event.preventDefault();
            window.location.reload();
        }
    };
    return (
        <>
            <Box sx={{
                marginRight: '80px',
                paddingTop: '30px',
                paddingBottom: '70px',
                paddingLeft: '50px',
                backgroundImage: `url('/resurseProiect/hero-section-1.jpg')`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '200vh'
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
                <Typography variant='h1' sx={{
                    fontWeight: 700,
                    fontSize: '180px',
                    color: '#F5F4F2',
                    lineHeight: 0.9,
                }}>
                    GO<br/>
                    AGAINST<br/>
                    THE<br/>
                    GRAIN<br/>
                </Typography>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    paddingRight: '100px',
                    paddingTop: '80px',
                    marginBottom: '100px'
                }}>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '20px',
                        padding: '10PX',
                        borderRadius: '5px',
                        transition: '0.3s',
                        color: '#FFFFFF',
                    }}>
                        <Typography variant='h4' sx={{
                            fontWeight: 600,
                            lineHeight: 0.9,
                        }}>
                            Surrender to the moment with<br/>
                            each sip and every cup of our<br/>
                            wide and varied specialty coffee<br/>
                            selection.
                        </Typography>
                        <Link to={'/collections/all'}>
                            <Button
                                variant="contained"
                                sx={{
                                    fontWeight: 600,
                                    fontSize: 25,
                                    backgroundColor: '#FFFFFF',
                                    color: '#151515',
                                    boxShadow: 'none',
                                    '&:hover': {
                                        backgroundColor: '#151515',
                                        color: '#FFFFFF',
                                        boxShadow: 'none',
                                    },
                                }}
                            >
                                SHOP NOW
                            </Button>
                        </Link>
                    </Box>
                </Box>
                <ProductBox/>
            </Box>
        </>
    );
}

export default HeroSection;
