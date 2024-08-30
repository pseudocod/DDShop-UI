import {Box, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";

export default function Footer() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [fade, setFade] = useState(true);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    const images = [
        '/resurseProiect/thank-you.jpg',
        '/resurseProiect/checkout.jpg',
        '/resurseProiect/pexels-pratikgupta-2748537.jpg',
        '/resurseProiect/userEdit.jpg',
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setFade(false);
            setTimeout(() => {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
                setFade(true);
            }, 500);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <Box sx={{backgroundColor: '#151515', color: '#ffffff', padding: '20px 10%'}}>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    flexDirection: {xs: 'column', md: 'column', lg: 'row'}, // Change here
                    padding: '20px 0',
                    alignItems: 'center',
                }}>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: {xs: '50px', md: '50px', lg: '150px'} // Use different gaps for lg
                    }}>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: {xs: 'column', md: 'column', lg: 'row'}, // Use column for xs and md
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: {xs: '20px', md: '20px', lg: '50px'} // Adjust gap for lg
                        }}>
                            <Typography sx={{
                                fontSize: {xs: '1.5rem', md: '1.5rem', lg: '2rem'},
                                borderBottom: '2px solid white',
                                paddingBottom: '2px',
                                transition: 'all 0.5s',
                                '&:hover': {
                                    borderBottom: '2px solid #A5C5E9',
                                },
                                cursor: 'pointer'
                            }} variant='body1'>
                                <Link to={`/collections/all`}
                                      style={{textDecoration: 'none', color: 'inherit'}}>
                                    Products
                                </Link>
                            </Typography>
                            {['Account', 'About'].map((text) => (
                                <Typography key={text} sx={{
                                    fontSize: {xs: '1.5rem', md: '1.5rem', lg: '2rem'},
                                    borderBottom: '2px solid white',
                                    paddingBottom: '2px',
                                    transition: 'all 0.5s',
                                    '&:hover': {
                                        borderBottom: '2px solid #A5C5E9',
                                    },
                                    cursor: 'pointer'
                                }} variant='body1'>
                                    <Link to={`/${text.toLowerCase()}`}
                                          style={{textDecoration: 'none', color: 'inherit'}}>
                                        {text}
                                    </Link>
                                </Typography>
                            ))}
                        </Box>
                        <Box>
                            <Typography sx={{fontWeight: 200, textAlign: 'center'}} variant={'h4'}>
                                CRAFTED FOR EVERY MOMENT
                            </Typography>
                        </Box>
                    </Box>
                    <Box sx={{textAlign: 'center'}}>
                        {/* You can add more content here if needed */}
                    </Box>
                    <Box sx={{
                        height: {xs: '60vh', md: '60vh', lg: '70vh'},
                        width: {xs: '80vw', md: '70vw', lg: '35vw'},
                        overflow: 'hidden',
                        position: 'relative',
                        mt: {xs: '20px', md: '20px', lg: 0}
                    }}>
                        <Box sx={{
                            textAlign: 'center',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden'
                        }}>
                            <Typography
                                variant="h1"
                                onClick={scrollToTop}
                                sx={{
                                    fontWeight: 100,
                                    color: '#FFFFFF',
                                    fontSize: {xs: '3rem', md: '3rem', lg: '3.8rem', xl: '5rem'},
                                    cursor: 'pointer',
                                    transition: 'all 1s',
                                    display: 'inline-block',
                                    mb: '20px',
                                    '&:hover': {
                                        color: '#A5C5E9',
                                    }
                                }}>
                                BACK TO TOP
                            </Typography>
                        </Box>
                        <img
                            src={images[currentIndex]}
                            alt="Slide"
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                position: 'absolute',
                                opacity: fade ? 1 : 0,
                                transition: 'opacity 0.5s ease',
                            }}
                        />
                        {!fade && (
                            <img
                                src={images[(currentIndex + 1) % images.length]}
                                alt="Next Slide"
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    position: 'absolute',
                                    opacity: 0,
                                    transition: 'opacity 0.5s ease',
                                }}
                            />
                        )}
                    </Box>
                </Box>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    padding: '20px 0',
                    alignItems: 'center',
                }}>
                    <Typography variant='body1' sx={{fontSize: {xs: '0.875rem', md: '0.875rem', lg: '1rem'}}}>
                        &copy; 2024 ORICÂND CAFE
                    </Typography>
                </Box>
            </Box>
        </>
    );
}
