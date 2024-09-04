import Typography from "@mui/material/Typography";
import * as React from "react";
import {Box, Button, TextField} from "@mui/material";
import {Link} from "react-router-dom";
import axios from "axios";
import {useCallback, useContext, useEffect, useState} from "react";
import {CartContext} from "../../context/CartContext";
import CloseIcon from '@mui/icons-material/Close';
import debounce from 'lodash/debounce'

export default function CartEntryBoxCheckout({cartEntry}) {
    console.log(cartEntry);
    const product = cartEntry.product;
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const {cart, loading: loadingCart, error: errorCart, setCart} = useContext(CartContext);
    const [quantity, setQuantity] = useState(cartEntry.quantity);

    useEffect(() => {
        setQuantity(cartEntry.quantity);
    }, [cartEntry.quantity]);

    const handleQuantityChange = async (quantity) => {
        if (isNaN(quantity) || quantity < 0 || quantity > 20) {
            setError('Quantity must be between 1 and 20.');
            return;
        }

        try {
            setLoading(true);
            const response = await axios.put(`http://localhost:8080/carts/${cart.id}/update-cart-entry-quantity`,
                {
                    cartEntryId: cartEntry.id,
                    quantity: quantity,
                });
            const sortedEntries = response.data.cartEntries.sort((a, b) => a.id - b.id);
            setCart({...response.data, cartEntries: sortedEntries});
            console.log(response.data);
            console.log('Updated quantity to:', quantity);
            console.log('Cart:', cart);
            setError(null);
        } catch (error) {
            setError('Failed to update quantity');
            console.error(error);
        } finally {
            setLoading(false);
        }

        if (quantity === 0) {
            return null;
        }
    }

    const handleQuantityChangeDebounced = useCallback(debounce(handleQuantityChange, 1000), []);

    const handleInputChange = (event) => {
        const quantity = Number(event.target.value);

        setQuantity(quantity);
        handleQuantityChangeDebounced(quantity);
    }


    if (loadingCart) {
        return (
            <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
                <Typography>
                    Loading cart...
                </Typography>
            </Box>
        )
    }

    if (errorCart) {
        return null;
    }

    const handleCartEntryDelete = async (event) => {
        try {
            setLoading(true);
            const response = await axios.delete(`http://localhost:8080/carts/${cart.id}/delete-cart-entry/${cartEntry.id}`);
            const sortedEntries = response.data.cartEntries.sort((a, b) => a.id - b.id);
            setCart({...response.data, cartEntries: sortedEntries});
            setError(null);
        } catch (error) {
            setError('Failed to delete cart entry');
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return (
            <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
                <Typography>
                    Loading update quantity...
                </Typography>
            </Box>
        )
    }

    if (error) {
        return null;
    }

    return (
        <>
            <Box sx={{display: 'flex', mb: '1rem'}}>
                <Link to={`/products/${product.id}`}>
                    <img
                        src={`/resurseProiect/${product.name}.webp`}
                        style={{
                            objectFit: 'contain',
                            width: '150px',
                        }}
                        alt={product.name}
                    />
                </Link>
                <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', ml: 2}}>
                    <Box sx={{display: 'flex', alignItems: 'center'}}>
                        <Link to={`/products/${product.id}`}>
                            <Typography variant="body2" sx={{fontSize: '20px', fontWeight: 500}}>
                                {product.name}
                            </Typography>
                        </Link>
                        <Button onClick={handleCartEntryDelete} sx={{color: '#151515'}}>
                            <CloseIcon/>
                        </Button>
                    </Box>
                    <Box sx={{display: 'flex', alignItems: 'center'}}>
                        <Typography variant="body1" sx={{fontWeight: 500}}>
                            Quantity:&nbsp;
                        </Typography>
                        <TextField
                            type="number"
                            value={quantity}
                            variant="outlined"
                            size="small"
                            min={1}
                            max={20}
                            sx={{textAlign: 'center', width: '60px'}}
                            onChange={handleInputChange}
                        />
                    </Box>
                    <Typography variant="body1" sx={{fontWeight: 500}}>
                        Price: &#8364;{cartEntry.totalPriceEntry.toFixed(2)}
                    </Typography>
                </Box>
            </Box>
        </>
    )
}