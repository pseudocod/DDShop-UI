import React, {useEffect, useState} from 'react';
import {Box, Button, Grid} from "@mui/material";
import Typography from "@mui/material/Typography";
import axios from "axios";
import {Link} from "react-router-dom";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';

export default function Collection() {
    const [collectionProducts, setCollectionProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [inTransition, setInTransition] = useState(false);
    const [transitionDirection, setTransitionDirection] = useState('');

    useEffect(() => {
        const fetchProductData = async () => {
            try {
                setLoading(true);
                const response = await axios.get('http://localhost:8080/products/origins');
                setCollectionProducts(response.data.slice(0, 3));
                setError(null);
            } catch (error) {
                setError('Could not fetch collection products.');
            } finally {
                setLoading(false);
            }
        };
        fetchProductData();
    }, []);

    const handleNext = () => {
        if (!inTransition) {
            setInTransition(true);
            setTransitionDirection('right');
            setTimeout(() => {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % collectionProducts.length);
                setInTransition(false);
            }, 700);
        }
    };

    const handlePrev = () => {
        if (!inTransition) {
            setInTransition(true);
            setTransitionDirection('left');
            setTimeout(() => {
                setCurrentIndex((prevIndex) => (prevIndex - 1 + collectionProducts.length) % collectionProducts.length);
                setInTransition(false);
            }, 700);
        }
    };

    if (error) {
        return <Typography>{error}</Typography>;
    }

    if (loading) {
        return <Typography>Loading...</Typography>;
    }

    const currentProduct = collectionProducts[currentIndex];
    const originAttribute = currentProduct?.attributes.find(attr => attr.attributeName === 'Origin')?.attributeValue.toUpperCase();
    // sx={{paddingRight: {xs: '120px', md: '0'}}}
    return (
        <Box sx={{
            margin: {xs: '50px 0', md: '100px 0'},
            padding: {xs: '0 20px', md: '0 52px'},
        }}>
            <Grid container spacing={2} alignItems="center">
                <Grid item xs={8} sm={7} md={6} lg={7} xl={8}>
                    <Typography variant='h4'>Collections</Typography>
                </Grid>
                <Grid item xs={4} sm={2} md={2} lg={2} xl={2} sx={{textAlign: 'center'}}>
                    <Link to={'/collections/all'} style={{textDecoration: 'underline'}}>View All</Link>
                </Grid>
                <Grid item xs={12} sm={3} md={4} lg={2} xl={2}
                      sx={{textAlign: {xs: 'center', sm: 'right'}, mt: {xs: 2, sm: 0}}}>
                    <Box sx={{display: 'flex', justifyContent: {xs: 'center', sm: 'flex-start'}, gap: '15px'}}>
                        <Button onClick={handlePrev} sx={{
                            color: '#151515',
                            border: '1px solid #151515',
                            borderRadius: '50%',
                            padding: '12px',
                            fontWeight: 700
                        }}>
                            <ArrowBackRoundedIcon fontSize={'large'}/>
                        </Button>
                        <Button onClick={handleNext} sx={{
                            color: '#151515',
                            border: '1px solid #151515',
                            borderRadius: '50%',
                            padding: '12px',
                            fontWeight: 700
                        }}>
                            <ArrowForwardIcon fontSize='large'/>
                        </Button>
                    </Box>
                </Grid>
            </Grid>

            {currentProduct && (
                <Box sx={{
                    display: 'grid',
                    gridTemplateColumns: {xs: '1fr', md: 'repeat(12, 1fr)'},
                    paddingTop: '50px',
                    columnGap: {xs: '0px', md: '30px'},
                    rowGap: {xs: '20px', md: '0px'},
                    marginBottom: '50px',
                    opacity: inTransition ? 0 : 1,
                    transform: inTransition
                        ? (transitionDirection === 'left' ? 'translateX(-100%)' : 'translateX(100%)')
                        : 'translateX(0)',
                    transition: 'opacity 0.7s ease, transform 0.7s ease-in-out',
                }}>
                    <Box sx={{
                        backgroundImage: `url('/resurseProiect/collections-${currentIndex + 1}.webp')`,
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        minHeight: {xs: '50vh', md: '150vh'},
                        gridColumn: {xs: 'span 1', md: 'span 7'},
                        position: 'relative',
                    }}>
                        <Box sx={{
                            color: '#ffffff',
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            textAlign: 'center',
                            px: 2,
                        }}>
                            <Typography sx={{fontWeight: 100, fontSize: {xs: '60px', md: '80px', lg: '120px'}}}>
                                {originAttribute}
                            </Typography>
                        </Box>
                    </Box>

                    <Box sx={{
                        gridColumn: {xs: 'span 1', md: 'span 4'},
                        height: 'auto',
                        padding: {xs: '0 20px', md: '0'}
                    }}>
                        <Box sx={{display: 'flex', flexDirection: 'column'}}>
                            <Box sx={{backgroundColor: '#efecec', borderRadius: '5px', mb: '20px'}}>
                                <img
                                    src={`/resurseProiect/${currentProduct.name}.webp`}
                                    style={{
                                        objectFit: 'contain',
                                        width: '100%',
                                    }}
                                    alt={currentProduct.name}
                                />
                            </Box>
                        </Box>
                        <Box>
                            <Typography sx={{mb: '30px', fontSize: {xs: '2rem', md: '2.5rem'}}}
                                        variant='h2'>{currentProduct.name.toUpperCase()}</Typography>
                            <Typography variant='body1'>{currentProduct.description}</Typography>
                            <Link to={`products/${currentProduct.id}`}>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{
                                        mt: 5,
                                        mb: 2,
                                        fontWeight: 600,
                                        fontSize: {xs: '1rem', md: '1.375rem'},
                                        backgroundColor: '#151515',
                                        color: '#FFFFFF',
                                        boxShadow: 'none',
                                        '&:hover': {
                                            backgroundColor: '#FFFFFF',
                                            color: '#151515',
                                            boxShadow: 'none',
                                        },
                                    }}
                                >
                                    LEARN MORE
                                </Button>
                            </Link>
                        </Box>
                    </Box>
                </Box>
            )}
        </Box>
    );
}
