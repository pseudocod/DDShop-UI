import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Box} from "@mui/material";
import Typography from "@mui/material/Typography";
import LocalCafeOutlinedIcon from '@mui/icons-material/LocalCafeOutlined';
import {Link} from "react-router-dom";

export default function ProductBox() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


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
        <Box sx={{display: 'flex', color: '#F5F4F2', width: '99%'}}>
            <Box sx={{
                border: '1px solid #F5F4F2',
                borderRadius: '8px',
                textAlign: 'center',
                flex: 1
            }}>
                <Typography sx={{fontSize: '2rem', fontWeight: 500}}>
                    A Romanian specialty <br/> coffee company
                </Typography>
                <LocalCafeOutlinedIcon sx={{mt: 1, fontSize: '3rem'}}/>
            </Box>
            {products.map((product) => (
                <Box key={product.id} sx={{
                    border: '1px solid #F5F4F2',
                    borderRadius: '10px',
                    flex: 1,
                    cursor: 'pointer',
                    padding: '5px',
                    transition: '0.3s',
                    '&:hover': {
                        backgroundColor: '#FFFFFF',
                        color: '#151515',
                        boxShadow: 'none',
                    },
                    boxSizing: 'border-box'
                }}>
                    <Link key={product.id} to={`/products/${product.id}`} sx={{width: '100%'}}>
                        <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                            <Typography variant='h5' sx={{fontWeight: 600}}>{product.name}</Typography>
                            <Typography variant='h6'>&#8364;{product.price.toFixed(2)}</Typography>
                        </Box>
                        <Box sx={{display: 'flex', flexDirection: 'column', marginTop: '10px'}}>
                            {product.attributes.map((attribute) => (
                                <Box key={attribute.attributeName} sx={{marginBottom: '2px'}}>
                                    {attribute.attributeName === 'Size' && (
                                        <Typography variant='body1'>
                                            <strong>{attribute.attributeName}:</strong> {attribute.attributeValue}
                                        </Typography>
                                    )}
                                    {attribute.attributeName === 'Origin' && (
                                        <Typography variant='body1'>
                                            <strong>{attribute.attributeName}:</strong> {attribute.attributeValue}
                                        </Typography>
                                    )}
                                </Box>
                            ))}
                        </Box>
                    </Link>
                </Box>
            ))}
        </Box>
    );
}