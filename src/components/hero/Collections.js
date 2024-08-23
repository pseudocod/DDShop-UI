import React, {lazy, useEffect, useState} from 'react'
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

    useEffect(() => {
        const fetchProductData = async () => {
            try {
                setLoading(true);
                const response = await axios.get('http://localhost:8080/products/origins');
                setCollectionProducts(response.data)
                setError(null);
            } catch (error) {
                setError('Could not fetch collection products.');
            } finally {
                setLoading(false)
            }
        }
        fetchProductData();
    }, []);

    if (error) {
        return <Typography>{error}</Typography>
    }

    if (loading) {
        return <Typography>Loading...</Typography>
    }
    return (
        <>
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
                        <Button style={{
                            color: '#151515',
                            border: '1px solid #151515',
                            borderRadius: '50%',
                            padding: '12px',
                            fontWeight: 700
                        }}><ArrowBackRoundedIcon fontSize={'large'}/>
                        </Button>
                        <Button style={{
                            color: '#151515',
                            border: '1px solid #151515',
                            borderRadius: '50%',
                            padding: '12px',
                            fontWeight: 700
                        }}><ArrowForwardIcon fontSize='large'/></Button>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}


// {collectionProducts.map((product) => (
//         <Typography variant='h3'>{product.name}</Typography>
//     )
// )}