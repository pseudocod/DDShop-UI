import {Link, useLocation} from "react-router-dom";
import React, {useContext, useEffect, useState} from "react";
import {Box, Button, CircularProgress} from "@mui/material";
import Typography from "@mui/material/Typography";
import CartEntryBoxOrderDetails from "../components/cart/CartEntryBoxOrderDetails";
import {UserContext} from "../context/UserContext";
import axios from "axios";

export default function OrderDetails() {
    const location = useLocation();
    const {order} = location.state || {};
    const {user, setUser} = useContext(UserContext);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const compareAddresses = (address1, address2) => {
        return (
            address1?.city === address2?.city &&
            address1?.country === address2?.country &&
            address1?.county === address2?.county &&
            address1?.postalCode === address2?.postalCode &&
            address1?.streetLine === address2?.streetLine
        );
    };

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

        switch (paymentType) {
            case 'CREDIT_CARD':
                return 'Credit Card';
            case 'PAYPAL':
                return 'PayPal';
            case 'CASH_ON_DELIVERY':
                return 'Cash on Delivery';
            case 'BANK_TRANSFER':
                return 'Bank Transfer';
            default:
                return 'N/A';
        }
    };

    const handleAddressChange = async (address, addressType) => {
        try {
            setLoading(true);
            const {id, ...addressData} = address;
            const response = await axios.put(`http://localhost:8080/user/update/${user.id}/default-${addressType}-address`, addressData);
            setUser(response.data);
            localStorage.setItem('user', JSON.stringify(response.data));
            setError(null);
        } catch (error) {
            setError(`Failed to update default ${addressType} address`);
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Box sx={{backgroundColor: '#151515', height: '35vh', overflow: 'hidden', position: 'relative'}}>
                <Link to={'/'}>
                    <Typography variant='h1'
                                sx={{
                                    fontWeight: 100,
                                    zIndex: 1,
                                    fontSize: '100px',
                                    color: '#F5F4F2',
                                    lineHeight: 0.9,
                                    top: '50%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)',
                                    position: 'absolute'
                                }}>
                        ORICÂND
                    </Typography>
                </Link>
                <img
                    src="/resurseProiect/Decaf3.jpg"
                    style={{
                        width: '100%',
                        objectFit: 'cover',
                        display: 'block',
                        position: 'absolute',
                        top: -250,
                        left: 0,
                    }}
                />
            </Box>
            <Box sx={{padding: '30px'}}>
                <Typography variant={'h2'} sx={{mb: 3}}>Order Details</Typography>
                <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
                    <Typography variant={'h6'}>Order Number: #{order.id}</Typography>
                    <Typography variant={'h6'}>Order Date: {order.orderDate}</Typography>
                    <Typography variant={'h6'}>
                        User Details: {order.user.firstName} {order.user.lastName} ({order.user.email})
                    </Typography>

                    <Box sx={{mt: 3,}}>
                        <Typography variant={'h5'}>Delivery Address:</Typography>
                        <Typography sx={{fontWeight: '400'}}
                                    variant={'h6'}>{addressString(order.deliveryAddress)}</Typography>
                        <Box sx={{display: 'flex', flexDirection: 'column', gap: 1}}>
                            {!compareAddresses(order.deliveryAddress, user.defaultDeliveryAddress) && (
                                <Box>
                                    <Button
                                        variant="contained"
                                        sx={{
                                            fontWeight: 400,
                                            fontSize: 15,
                                            backgroundColor: '#151515',
                                            color: '#FFFFFF',
                                            boxShadow: 'none',
                                            '&:hover': {
                                                backgroundColor: '#FFFFFF',
                                                color: '#151515',
                                                boxShadow: 'none',
                                            },
                                        }}
                                        onClick={() => handleAddressChange(order.deliveryAddress, 'delivery')}
                                    >
                                        SET AS DEFAULT DELIVERY ADDRESS
                                    </Button>
                                </Box>
                            )}
                            {!compareAddresses(order.deliveryAddress, user.defaultBillingAddress) && (
                                <Box>
                                    <Button
                                        variant="contained"
                                        sx={{
                                            fontWeight: 400,
                                            fontSize: 15,
                                            backgroundColor: '#151515',
                                            color: '#FFFFFF',
                                            boxShadow: 'none',
                                            '&:hover': {
                                                backgroundColor: '#FFFFFF',
                                                color: '#151515',
                                                boxShadow: 'none',
                                            },
                                        }}
                                        onClick={() => handleAddressChange(order.deliveryAddress, 'billing')}
                                    >
                                        SET AS DEFAULT BILLING ADDRESS
                                    </Button>
                                </Box>
                            )}
                        </Box>
                    </Box>

                    <Box sx={{mt: 3, mb: 3}}>
                        <Typography variant={'h5'}>Invoice Address:</Typography>
                        <Typography sx={{fontWeight: '400'}}
                                    variant={'h6'}>{addressString(order.invoiceAddress)}</Typography>
                        <Box sx={{display: 'flex', flexDirection: 'column', gap: 1}}>
                            {!compareAddresses(order.invoiceAddress, user.defaultDeliveryAddress) && (
                                <Box>
                                    <Button
                                        variant="contained"
                                        sx={{
                                            fontWeight: 400,
                                            fontSize: 15,
                                            backgroundColor: '#151515',
                                            color: '#FFFFFF',
                                            boxShadow: 'none',
                                            '&:hover': {
                                                backgroundColor: '#FFFFFF',
                                                color: '#151515',
                                                boxShadow: 'none',
                                            },
                                        }}
                                        onClick={() => handleAddressChange(order.invoiceAddress, 'delivery')}
                                    >
                                        SET AS DEFAULT DELIVERY ADDRESS
                                    </Button>
                                </Box>
                            )}
                            {!compareAddresses(order.invoiceAddress, user.defaultBillingAddress) && (
                                <Box>
                                    <Button
                                        variant="contained"
                                        sx={{
                                            fontWeight: 400,
                                            fontSize: 15,
                                            backgroundColor: '#151515',
                                            color: '#FFFFFF',
                                            boxShadow: 'none',
                                            '&:hover': {
                                                backgroundColor: '#FFFFFF',
                                                color: '#151515',
                                                boxShadow: 'none',
                                            },
                                        }}
                                        onClick={() => handleAddressChange(order.invoiceAddress, 'billing')}
                                    >
                                        SET AS DEFAULT BILLING ADDRESS
                                    </Button>
                                </Box>
                            )}
                        </Box>
                    </Box>

                    {loading && <CircularProgress color={"inherit"}/>}

                    <Typography sx={{mb: 5}} variant={'h6'}>
                        Payment Type: {paymentTypeString(order.paymentType)}
                    </Typography>
                    <Box>
                        <Typography variant={'h5'}>Ordered Products:</Typography>
                        <Box sx={{height: 'auto', maxHeight: '300px', overflow: 'auto', margin: '20px 0'}}>
                            {order.cart.cartEntries.map(cartEntry => (
                                <Box key={cartEntry.id}>
                                    <CartEntryBoxOrderDetails cartEntry={cartEntry}/>
                                </Box>
                            ))}
                        </Box>
                        <Typography variant={'h6'}>Total Price: &#8364;{order.totalPrice.toFixed(2)}</Typography>
                    </Box>
                </Box>
            </Box>
        </>
    );
}
