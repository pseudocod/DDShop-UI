import {Alert, Box, Button, FormControl, InputLabel, MenuItem, OutlinedInput, Select} from "@mui/material";
import {Link, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "axios";
import Typography from "@mui/material/Typography";
import QuantityInput from "../components/input/QuantityInput";
import CheckIcon from '@mui/icons-material/Check';

export default function ProductDetails() {
    const {id} = useParams();
    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState(null);
    const [error, setError] = useState(null);
    const [sizes, setSizes] = useState([]);
    const [size, setSize] = useState('');


    useEffect(() => {
        async function getProduct() {
            try {
                console.log('Fetching product with id:', id);
                setLoading(true);
                const response = await axios.get(`http://localhost:8080/products/${id}`);
                console.log(response.data);
                setProduct(response.data);
                setError(null);
            } catch (error) {
                setError('Failed to fetch product');
                console.error(error);
            } finally {
                setLoading(false);
            }
        }

        getProduct();
    }, [id]);

    useEffect(() => {
        if (product) {
            const sizes = product.attributes
                .filter(attribute => attribute.attributeName === 'Size')
                .map(attribute => attribute.attributeValue);

            setSizes(sizes);
        }
        console.log(sizes);
    }, [product]);

    const handleChange = (event) => {
        const {
            target: {value},
        } = event;
        setSize(
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    if (loading) return <Box>Loading...</Box>;
    if (error) return <Alert severity="error">{error}</Alert>;

    return (
        <>
            <Link to="/">
                <Typography variant='h1' sx={{
                    fontWeight: 700,
                    color: '#151515',
                    fontSize: '30px',
                    cursor: 'pointer',
                    mt: '30px',
                    ml: '50px'
                }}>
                    ORICÂND
                </Typography>
            </Link>
            <Box sx={{display: 'flex', padding: '100px 0'}}>
                <img
                    src={`/resurseProiect/${product.name}.webp`}
                    style={{
                        flex: 1,
                        objectFit: 'contain',
                        height: 'auto',
                        maxWidth: '50%',
                    }}
                    alt={product.name}
                />
                <Box sx={{backgroundColor: '#FFFFFF', flex: 1, marginRight: '150px', padding: '20px'}}>
                    <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3}}>
                        <Typography variant='h4' sx={{fontWeight: 600}}>{product.name}</Typography>
                        <Typography variant='h4' sx={{fontWeight: 500}}>&#8364;{product.price.toFixed(2)}</Typography>
                    </Box>
                    <Box>
                        <Typography variant='body2'
                                    sx={{
                                        fontWeight: 500,
                                        fontSize: '1.2rem'
                                    }}>{product.description}
                        </Typography>
                    </Box>
                    <Box sx={{mt: 10, display: 'flex', justifyContent: 'space-between'}}>
                        <FormControl sx={{width: '200px'}}>
                            <InputLabel>Size</InputLabel>
                            <Select
                                multiple
                                value={sizes}
                                onChange={handleChange}
                                input={<OutlinedInput label="Size"/>}
                            >
                                {sizes.map((s) => (
                                    <MenuItem
                                        key={s}
                                        value={s}
                                    >
                                        {s}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <QuantityInput
                            onChange={(event, newValue) => console.log(`${event.type} event: the new value is ${newValue}`)}/>
                    </Box>
                    <Button
                        fullWidth
                        variant="contained"
                        sx={{
                            mt: 10,
                            mb: 5,
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
                        ADD TO CART
                    </Button>
                    <Box sx={{mb: 10}}>
                        <Typography variant='body2'
                                    sx={{
                                        fontWeight: 500,
                                        fontSize: '1.2rem'
                                    }}>{product.category.description}
                        </Typography>
                    </Box>

                    <Box sx={{display: 'flex', alignItems: 'center'}}>
                        <CheckIcon sx={{color: 'green'}}/>
                        <Typography variant='body2'
                                    sx={{
                                        fontWeight: 500,
                                        fontSize: '1.2rem'
                                    }}>
                            Pickup available, usually ready in 2-4 days
                        </Typography>
                    </Box>
                </Box>
            </Box>

            <Box sx={{
                marginRight: '80px',
                paddingTop: '30px',
                paddingBottom: '70px',
                paddingLeft: '50px',
                backgroundImage: `url('/resurseProiect/productDetails.webp')`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Box sx={{
                    backgroundColor: '#FFFFFF',
                    padding: '20px',
                    borderRadius: '5px'

                }}>
                    <Typography variant='h1' sx={{
                        fontWeight: 700,
                        color: '#151515',
                        fontSize: '30px',
                    }}>
                        MORE PRODUCT DETAILS
                    </Typography>
                    <Box sx={{mt: 2}}>
                        <Typography sx={{mb: 2}}>
                            <b>{product.name}</b>
                        </Typography>
                        {product.attributes.map((attribute, index) =>
                            <Typography key={index}>
                                <b>{attribute.attributeName}</b>:&nbsp;{attribute.attributeValue}
                            </Typography>
                        )}
                    </Box>
                </Box>
            </Box>
        </>
    )
}