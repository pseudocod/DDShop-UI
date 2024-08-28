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

    return (
        <Box sx={{margin: '100px 0', padding: '0 52px'}}>
            <Grid container spacing={2} alignItems="center">
                <Grid item xs={8}>
                    <Typography variant='h4'>Collections</Typography>
                </Grid>
                <Grid item xs={1}>
                    <Link to={'/collections/all'} style={{textDecoration: 'underline'}}>View All</Link>
                </Grid>
                <Grid item xs={1}></Grid>
                <Grid item xs={1} style={{display: 'flex', justifyContent: 'flex-end', gap: '15px'}}>
                    <Button onClick={handlePrev} style={{
                        color: '#151515',
                        border: '1px solid #151515',
                        borderRadius: '50%',
                        padding: '12px',
                        fontWeight: 700
                    }}>
                        <ArrowBackRoundedIcon fontSize={'large'}/>
                    </Button>
                    <Button onClick={handleNext} style={{
                        color: '#151515',
                        border: '1px solid #151515',
                        borderRadius: '50%',
                        padding: '12px',
                        fontWeight: 700
                    }}>
                        <ArrowForwardIcon fontSize='large'/>
                    </Button>
                </Grid>
            </Grid>

            {currentProduct && (
                <Box sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(12, 1fr)',
                    paddingTop: '50px',
                    columnGap: '30px',
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
                        minHeight: '150vh',
                        gridColumn: 'span 7',
                        position: 'relative',
                    }}>
                        <Box sx={{
                            color: '#ffffff',
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                        }}>
                            <Typography sx={{fontWeight: 100, fontSize: '130px'}}>
                                {originAttribute}
                            </Typography>
                        </Box>
                    </Box>

                    <Box sx={{gridColumn: 'span 4', height: '50%'}}>
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
                            <Typography sx={{mb: '30px'}} variant='h2'>{originAttribute}</Typography>
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
                                        fontSize: 22,
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
