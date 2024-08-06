import React, {useContext} from 'react';
import {Box, Button} from '@mui/material';
import Typography from "@mui/material/Typography";
import {Link, useLocation} from "react-router-dom";
import ProductBox from "../product/ProductBox";

const HeroSection = () => {
    const location = useLocation();
    const isHomepage = location.pathname === '/';
    const [isHovered, setIsHovered] = React.useState(false);

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
                backgroundImage: `url('/resurseProiect/Specialty.webp')`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '180vh'
            }}>
                <Link to="/" onClick={handleLogoClick}>
                    <Typography variant='h1' sx={{
                        fontWeight: 200,
                        color: '#F5F4F2',
                        fontSize: '100px',
                        marginBottom: '100px',
                        cursor: 'pointer',
                        transition: 'all 1s',
                        display: 'inline-block',
                    }}
                                onMouseEnter={() => setIsHovered(true)}
                                onMouseLeave={() => setIsHovered(false)}>
                        {isHovered ? 'ANYTIME' : 'ORICÂND'}
                    </Typography>
                </Link>
                <Typography variant='h1' sx={{
                    fontWeight: 700,
                    fontSize: '100px',
                    color: '#F5F4F2',
                    lineHeight: 0.9,
                    mb: 3,
                }}>
                    START NOW
                </Typography>
                <Typography variant='h1' sx={{
                    fontWeight: 700,
                    fontSize: '100px',
                    color: '#F5F4F2',
                    lineHeight: 0.9,
                    mb: 3,
                }}>
                    FOLLOW YOUR DREAMS
                </Typography>
                <Typography variant='h1' sx={{
                    fontWeight: 700,
                    fontSize: '100px',
                    color: '#F5F4F2',
                    lineHeight: 0.9,
                    mb: 3,
                }}>
                    BE YOURSELF
                </Typography>
                <Typography variant='h1' sx={{
                    fontWeight: 700,
                    fontSize: '180px',
                    color: '#F5F4F2',
                    lineHeight: 0.9,
                    mb: 3,
                }}>
                    ANYTIME
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
                            fontSize: '40px',
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
