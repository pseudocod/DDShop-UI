import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Box, useMediaQuery} from "@mui/material";
import Typography from "@mui/material/Typography";
import LocalCafeOutlinedIcon from '@mui/icons-material/LocalCafeOutlined';
import {Link} from "react-router-dom";
import {useTheme} from "@mui/material/styles";

export default function ProductBox() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isMedium = useMediaQuery(theme.breakpoints.between('sm', 'md'));

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
        }
        fetchData();
    }, []);

    if (loading) {
        return <div>Loading...</div>
    }
    if (error) {
        return <div>{error}</div>
    }

    return (
        <>
            {!isMobile &&
                <Box sx={{
                    textAlign: 'center',
                    flex: '1 0 300px',
                    padding: '16px',
                    color: '#F5F4F2',
                }}>
                    <Typography sx={{fontSize: isMedium ? '4rem' : '7rem', fontWeight: 700}}>
                        NEW ARRIVALS
                    </Typography>
                </Box>
            }
            <Box sx={{
                display: 'flex',
                color: '#F5F4F2',
                width: '100%',
                flexWrap: 'wrap',
                alignItems: 'stretch',
                gap: '20px'
            }}>
                {products.map((product) => (
                    <Box key={product.id} sx={{
                        border: '0.3px solid #F5F4F2',
                        borderRadius: '2px',
                        flex: '1 0 300px',
                        cursor: 'pointer',
                        padding: '5px',
                        transition: '0.3s',
                        '&:hover': {
                            backgroundColor: '#FFFFFF',
                            color: '#151515',
                            boxShadow: 'none',
                        },
                    }}>
                        <Link key={product.id} to={`/products/${product.id}`} sx={{width: '100%'}}>
                            <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                                <Typography variant={isMobile ? 'h5' : 'h4'}
                                            sx={{fontWeight: 300}}>{product.name.toUpperCase()}</Typography>
                                <Typography variant='h6'>&#8364;{product.price.toFixed(2)}</Typography>
                            </Box>
                            <Box sx={{display: 'flex', flexDirection: 'column', marginTop: '10px'}}>
                                {product.attributes.map((attribute) => (
                                    <Box key={`${attribute.attributeName}-${attribute.attributeValue}`}
                                         sx={{marginBottom: '2px'}}>
                                        {attribute.attributeName === 'Size' && (
                                            <Typography sx={{fontWeight: 200}} variant='h5'>
                                                {attribute.attributeName}: {attribute.attributeValue}
                                            </Typography>
                                        )}
                                    </Box>
                                ))}
                            </Box>
                        </Link>
                    </Box>
                ))}
            </Box>
        </>

    );
}