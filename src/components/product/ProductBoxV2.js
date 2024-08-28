import React, {useEffect, useState} from 'react';
import {useTheme} from "@mui/material/styles";
import {Box, useMediaQuery, Typography, CircularProgress, Grid} from "@mui/material";
import axios from "axios";
import {Card, CardContent} from '@mui/material';

export default function ProductBoxV2() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await axios.get('http://localhost:8080/products/home');
                setProducts(response.data);
            } catch (error) {
                setError('Failed to fetch home products');
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) {
        return (
            <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
                <CircularProgress color="inherit"/>
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{textAlign: 'center', mt: 4}}>
                <Typography sx={{color: '#F5F4F2', fontWeight: 600}} variant="h6">{error}</Typography>
            </Box>
        );
    }

    return (
        <Box sx={{padding: isMobile ? '20px' : '40px', backgroundColor: theme.palette.background.default}}>
            <Typography sx={{color: '#F5F4F2', fontWeight: 700, mb: '20px'}} variant="h3">
                NEWEST COFFEES
            </Typography>

            <Grid container spacing={2}>
                {products.map((product) => (
                    <Grid item xs={12} sm={6} md={4} key={product.id}>
                        <Card sx={{
                            backgroundColor: '#151515',
                            color: '#F5F4F2',
                            borderRadius: '10px',
                            boxShadow: 'none'
                        }}>
                            <CardContent>
                                <Typography sx={{fontWeight: 600}} variant='h5'>
                                    {product.name.toUpperCase()}
                                </Typography>
                                <Typography sx={{mt: 1}} variant='body2'>
                                    {product.category.name}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}
