import React, {useContext, useState} from 'react';
import Typography from "@mui/material/Typography";
import {Box, Button, CircularProgress} from "@mui/material";
import {Link, useLocation, useNavigate} from "react-router-dom";
import CartEntryBoxCheckout from "../components/header/CartEntryBoxCheckout";
import axios from "axios";
import {CartContext} from "../context/CartContext";
import CartEntryBoxOrderDetails from "../components/header/CartEntryBoxOrderDetails";

export default function OrderConfirmation() {
    const location = useLocation();
    const {state} = location;
    const {user, cart, deliveryAddress, billingAddress, paymentType} = state || {};
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const {clearCart} = useContext(CartContext);
    const navigate = useNavigate();
    console.log(user);
    console.log(cart);

    if (!user || !cart) {
        return (
            <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
                <Typography variant="h4" color="error">
                    Error: No order data found.
                </Typography>
            </Box>
        );
    }
    const addressString = (address) => {
        if (!address) {
            return 'N/A';
        }
        return `${address.streetLine}, ${address.postalCode}, ${address.city}, ${address.county}, ${address.country}`;
    };

    const paymentTypeString = (paymentType) => {
        if (!paymentType) {
            return 'N/A';
        }

        if (paymentType === 'CREDIT_CARD') {
            return 'Credit Card';
        }

        if (paymentType === 'PAYPAL') {
            return 'PayPal';
        }

        if (paymentType === 'CASH_ON_DELIVERY') {
            return 'Cash on Delivery';
        }

        if (paymentType === 'BANK_TRANSFER') {
            return 'Bank Transfer';
        }

        return 'N/A';
    }
    const isUsingNonDefaultDeliveryAddress = deliveryAddress && (user.defaultDeliveryAddress !== deliveryAddress);
    const isUsingNonDefaultBillingAddress = billingAddress && (user.defaultBillingAddress !== billingAddress);

    const handleSubmit = async () => {
        if (loading) return;
        try {
            setLoading(true);
            const response = await axios.post('http://localhost:8080/orders', {
                userId: user.id,
                cartId: cart.id,
                paymentType: paymentType,
                deliveryAddress: isUsingNonDefaultDeliveryAddress ? deliveryAddress : user.defaultDeliveryAddress,
                invoiceAddress: isUsingNonDefaultBillingAddress ? billingAddress : user.defaultBillingAddress,
            })
            console.log(response.data);
            clearCart();
            navigate('/order-success', {state: {order: response.data}});
        } catch (error) {
            console.error(error);
            setError('Order placement failed. Please try again.');
        } finally {
            setLoading(false);
        }
    }
    return (
        <>
            <Box sx={{
                backgroundImage: `url('/resurseProiect/Decaf2.jpg')`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'bottom',
                color: '#FFFFFF',
                padding: '20px'
            }}
            >
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <Typography variant='h1' sx={{
                        fontWeight: 300,
                        fontSize: '80px',
                    }}>
                        CONFIRM ORDER
                    </Typography>
                </Box>

                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                }}
                >
                    <Link to="/">
                        <Typography variant='h1'
                                    sx={{fontWeight: 500, fontSize: '25px'}}>
                            BACK HOME
                        </Typography>
                    </Link>
                    <Link to="/edit-user">
                        <Typography variant='h1'
                                    sx={{fontWeight: 500, fontSize: '25px'}}>
                            EDIT USER DETAILS
                        </Typography>
                    </Link>
                </Box>
            </Box>

            <Box sx={{padding: '20px'}}>
                <Typography variant="h4" gutterBottom>
                    Order Confirmation
                </Typography>

                <Box sx={{mb: 4}}>
                    <Typography variant="h6">User Details:</Typography>
                    <Typography>Name: {user.firstName} {user.lastName}</Typography>
                    <Typography>Email: {user.email}</Typography>
                    <Typography>Phone Number: {user.phoneNumber}</Typography>
                    <Typography>Delivery
                        Address: {isUsingNonDefaultDeliveryAddress ? addressString(deliveryAddress) : addressString(user.defaultDeliveryAddress)}
                    </Typography>

                    <Typography>
                        Billing
                        Address: {isUsingNonDefaultBillingAddress ? addressString(billingAddress) : addressString(user.defaultBillingAddress)}
                    </Typography>
                    <Typography>
                        Payment Type: {paymentTypeString(paymentType)}
                    </Typography>
                </Box>

                <Typography variant="h6">Order Summary:</Typography>
                <Box sx={{
                    display: 'flex',
                    paddingRight: '100px',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    gap: '20px'
                }}>
                    {cart.cartEntries.length > 0 ? (
                        cart.cartEntries.map(entry => (
                            <>
                                <CartEntryBoxOrderDetails key={entry.id} cartEntry={entry}/>
                            </>
                        ))
                    ) : (
                        <Typography>No items in cart.</Typography>
                    )}
                </Box>
                <Typography variant="h2" sx={{textAlign: 'center'}}>Total Price: &#8364;{cart.totalPrice}</Typography>
                <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    {loading ? <CircularProgress/> : (
                        <Button
                            type="submit"
                            variant="contained"
                            disabled={loading}
                            sx={{
                                mt: 3,
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
                                width: '50%'
                            }}
                            onClick={handleSubmit}
                        >
                            PLACE ORDER
                        </Button>
                    )}
                </Box>

            </Box>
        </>
    );
}