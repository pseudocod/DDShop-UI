import React from 'react';
import {Box, Button, Typography, useMediaQuery} from '@mui/material';
import {Link, useLocation} from 'react-router-dom';
import {useTheme} from '@mui/material/styles';
import ProductBox from '../product/ProductBox';
import Logo from "../logo/Logo";
import CardMedia from '@mui/material/CardMedia';
import ProductBoxV2 from "../product/ProductBoxV2";

const HeroSection = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isMedium = useMediaQuery(theme.breakpoints.between('sm', 'md'));

    const headingStyle = {
        fontWeight: 700,
        fontSize: isMobile ? '3rem' : '6rem',
        color: '#F5F4F2',
        lineHeight: 0.9,
        mb: 3,
    };

    return (
        <>
            <Box
                sx={{
                    paddingTop: isMobile ? '80px' : (isMedium ? '100px' : '30px'),
                    paddingLeft: isMobile ? theme.spacing(2) : theme.spacing(6),
                    paddingRight: isMobile ? theme.spacing(0) : theme.spacing(12),
                    backgroundImage: `url('/resurseProiect/HomePage.webp')`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    minHeight: 'auto',
                    paddingBottom: '100px'
                }}
            >
                <Box sx={{
                    marginBottom: isMobile ? '50px' : '100px',
                }}>
                    <Logo logoColor='#F5F4F2'/>
                </Box>
                <Typography variant="h1" sx={headingStyle}>
                    START NOW
                </Typography>
                <Typography variant="h1" sx={headingStyle}>
                    FOLLOW YOUR DREAMS
                </Typography>
                <Typography variant="h1" sx={headingStyle}>
                    BE YOURSELF
                </Typography>
                <Typography
                    variant="h1"
                    sx={{
                        ...headingStyle,
                        fontSize: isMobile ? '4rem' : (isMedium ? '6rem' : '11.25rem'),
                        letterSpacing: '0.04em',
                    }}
                >
                    ANYTIME
                </Typography>

                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: (isMobile || isMedium) ? 'center' : 'flex-end',
                        flexDirection: (isMobile || isMedium) ? 'column' : 'row',
                        paddingRight: (isMobile || isMedium) ? 0 : '100px',
                        paddingTop: (isMobile || isMedium) ? '40px' : '80px',
                        marginBottom: (isMobile || isMedium) ? '50px' : '80px',
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: theme.spacing(2),
                            padding: theme.spacing(1),
                            borderRadius: '5px',
                            transition: '0.3s',
                            color: '#FFFFFF',
                        }}
                    >
                        <Typography
                            variant="h4"
                            sx={{
                                fontWeight: 500,
                                lineHeight: 1.1,
                                fontSize: isMobile ? '1.5rem' : '2.50rem',
                                textAlign: (isMobile || isMedium) ? 'center' : 'left',
                            }}
                        >
                            Surrender to the moment with
                            <br/>
                            each sip and every cup of our
                            <br/>
                            wide and varied specialty coffee
                            <br/>
                            selection.
                        </Typography>
                        <Link to="/collections/all">
                            <Button
                                fullWidth
                                variant="contained"
                                sx={{
                                    fontWeight: 500,
                                    fontSize: isMobile ? 16 : 25,
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
};

export default HeroSection;
