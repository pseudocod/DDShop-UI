import {Box} from "@mui/material";
import {Link} from "react-router-dom";
import Typography from "@mui/material/Typography";
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
            <Box sx={{backgroundColor: '#151515', color: '#ffffff', padding: '20px 50px'}}>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-around',
                    padding: '20px 0',
                    alignItems: 'center',
                }}>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '150px'
                    }}>
                        <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '50px'}}>
                            <Typography sx={{
                                fontSize: '2rem',
                                borderBottom: '2px solid white',
                                paddingBottom: '2px',
                                transition: 'all 0.5s',
                                '&:hover': {
                                    borderBottom: '2px solid #A5C5E9',
                                },
                                cursor: 'pointer'
                            }} variant='body1'>
                                <Link to='/products' style={{textDecoration: 'none', color: 'inherit'}}>Products</Link>
                            </Typography>
                            <Typography sx={{
                                fontSize: '2rem',
                                borderBottom: '2px solid white',
                                paddingBottom: '2px',
                                transition: 'all 0.5s',
                                '&:hover': {
                                    borderBottom: '2px solid #A5C5E9',
                                },
                                cursor: 'pointer'
                            }} variant='body1'>
                                <Link to='/account' style={{textDecoration: 'none', color: 'inherit'}}>Account</Link>
                            </Typography>
                            <Typography sx={{
                                fontSize: '2rem',
                                borderBottom: '2px solid white',
                                paddingBottom: '2px',
                                transition: 'all 0.5s',
                                '&:hover': {
                                    borderBottom: '2px solid #A5C5E9',
                                },
                                cursor: 'pointer'
                            }} variant='body1'>
                                <Link to='/about' style={{textDecoration: 'none', color: 'inherit'}}>About</Link>
                            </Typography>
                        </Box>
                        <Box>
                            <Typography sx={{fontWeight: 200}} variant={'h4'}>
                                CRAFTED FOR EVERY MOMENT
                            </Typography>
                        </Box>
                    </Box>
                    <Box sx={{height: '60vh', width: '40vw', overflow: 'hidden', position: 'relative'}}>
                        <Box sx={{textAlign: 'center'}}>
                            <Typography
                                variant="h1"
                                onClick={scrollToTop}
                                sx={{
                                    fontWeight: 100,
                                    color: '#FFFFFF',
                                    fontSize: '6rem',
                                    cursor: 'pointer',
                                    transition: 'all 1s',
                                    display: 'inline-block',
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
                    <Typography variant='body1'>
                        &copy; 2024 ORICÂND CAFE
                    </Typography>
                </Box>
            </Box>
        </>
    );
}
