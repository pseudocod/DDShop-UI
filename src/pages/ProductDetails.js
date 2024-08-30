import {
    Alert,
    Box,
    Button,
    CircularProgress,
    FormControl,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select
} from "@mui/material";
import {Link, useParams} from "react-router-dom";
import React, {useContext, useEffect, useState} from "react";
import axios, {toFormData} from "axios";
import Typography from "@mui/material/Typography";
import QuantityInput from "../components/input/QuantityInput";
import CheckIcon from '@mui/icons-material/Check';
import {UserContext} from "../context/UserContext";
import {CartContext} from "../context/CartContext";
import useMediaQuery from "@mui/material/useMediaQuery";
import {useTheme} from "@mui/material/styles";
import Logo from "../components/logo/Logo";
import {useCartDrawer} from "../context/CartDrawerContext";

export default function ProductDetails() {
    const {id} = useParams();
    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState(null);
    const [error, setError] = useState(null);
    const [sizes, setSizes] = useState([]);
    const [size, setSize] = useState('');
    const [quantity, setQuantity] = useState(1);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const {user, setUser} = useContext(UserContext);
    const {addToCart, loading: loadingAddToCart, error: errorCart, stockError} = useContext(CartContext);
    const {toggleCartDrawer} = useCartDrawer();

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
    const handleQuantityInputChange = (newValue) => {
        setQuantity(newValue);
    }
    const handleAddToCart = async () => {
        if (quantity < 1) {
            console.error('Quantity must be at least 1');
            return;
        }
        if (!user || !user.userCarts || user.userCarts.length === 0) {
            console.error('No cart found. Please create or select a cart.');
            return;
        }
        try {
            const success = await addToCart(product.id, quantity);
            if(success) {
                toggleCartDrawer();
            }

        } catch (error) {
            setError('Failed to add product to cart');
            console.error(error);
        }
    }

    if (loading || loadingAddToCart) return <Box>Loading...</Box>;

    const groupedAttributes = product.attributes.reduce((acc, attribute) => {
        const {attributeName, attributeValue} = attribute;

        if (!acc[attributeName]) {
            acc[attributeName] = [];
        }
        acc[attributeName].push(attributeValue);
        return acc;
    }, {});

    return (
        <>
            {!isMobile &&
                <Box sx={{
                    paddingTop: isMobile ? '80px' : '30px',
                    paddingLeft: isMobile ? theme.spacing(2) : theme.spacing(6),
                }}>
                    <Logo logoColor={'#151515'}/>
                </Box>
            }
            <Box sx={{
                display: 'flex',
                padding: '20px 0 100px 0',
                flexWrap: 'wrap',
                justifyContent: isMobile ? 'center' : 'flex-start',
            }}>
                <img
                    src={`/resurseProiect/${product.name}.webp`}
                    style={{
                        objectFit: 'contain',
                        height: 'auto',
                        maxWidth: isMobile ? '80%' : '50%',
                    }}
                    alt={product.name}
                />
                <Box sx={{backgroundColor: '#FFFFFF', flex: 1, marginRight: isMobile ? '0' : '150px', padding: '20px'}}>
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
                    {product.availableQuantity === 0 ?
                        <Typography variant='h3' sx={{mt: '3rem', mb: '3rem'}}>OUT OF STOCK</Typography> :
                        (<>
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
                                    value={quantity}
                                    onChange={handleQuantityInputChange}
                                    min={1}
                                    max={product.availableQuantity}/>
                            </Box>
                            <Button
                                fullWidth
                                variant="contained"
                                sx={{
                                    mt: 10,
                                    mb: !user ? 0.2 : 5,
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
                                onClick={handleAddToCart}
                                disabled={loading, user === null}
                            >
                                {loading ? <CircularProgress color="inherit"/> : 'ADD TO CART'}
                            </Button>
                            {!user &&  <Link style={{display:'inline-block', marginBottom:'20px'}} to='/login'><Typography sx ={{fontStyle:'italic'}} variant={'subtitle'}>Please log in or register to add to cart.</Typography></Link>}

                        </>)}
                    {stockError && <Alert sx={{mb: '30px', fontSize: '1.5rem'}} severity="error">{stockError}</Alert>}
                    <Box sx={{mb: 10}}>
                        <Typography variant='body2'
                                    sx={{
                                        fontWeight: 500,
                                        fontSize: '1.2rem'
                                    }}>{product.category.description}
                        </Typography>
                    </Box>

                    {product.availableQuantity !== 0 ?
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
                        :
                        <Box sx={{display: 'flex', alignItems: 'center'}}>
                            <Typography variant='h4'>
                                Product not available, please check back later.
                            </Typography>
                        </Box>
                    }
                </Box>
            </Box>

            <Box sx={{
                marginRight: isMobile ? '0' : '80px',
                backgroundImage: `url('/resurseProiect/productDetails.webp')`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Box
                    sx={{
                        backgroundColor: '#FFFFFF',
                        padding: '30px',
                        borderRadius: '10px',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                        maxWidth: '800px',
                        margin: '0 auto',
                    }}
                >
                    <Typography
                        variant='h2'
                        sx={{
                            fontWeight: 600,
                            color: '#151515',
                            fontSize: '36px',
                            textAlign: 'center',
                            marginBottom: '20px',
                            textTransform: 'uppercase',
                            letterSpacing: '1.5px',
                        }}
                    >
                        More Product Details
                    </Typography>
                    <Box sx={{mt: 2}}>
                        <Typography
                            variant='h5'
                            sx={{
                                mb: 3,
                                fontWeight: 500,
                                color: '#333333',
                                textAlign: 'center',
                            }}
                        >
                            {product.name}
                        </Typography>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '12px',
                                paddingLeft: '20px',
                            }}
                        >
                            {Object.entries(groupedAttributes).map(([attributeName, attributeValues], index) => (
                                <Typography
                                    variant='body1'
                                    key={index}
                                    sx={{
                                        color: '#555555',
                                        fontWeight: 400,
                                    }}
                                >
                                    <b style={{fontWeight: 600}}>{attributeName}</b>: {attributeValues.join(', ')}
                                </Typography>
                            ))}
                        </Box>
                    </Box>
                </Box>

            </Box>
        </>
    )
}