import {Link, useLocation, useParams} from "react-router-dom";
import React, {useEffect} from "react";
import {Box} from "@mui/material";
import Typography from "@mui/material/Typography";
import CartEntryBoxCheckout from "../components/header/CartEntryBoxCheckout";
import CartEntryBoxOrderDetails from "../components/header/CartEntryBoxOrderDetails";

export default function OrderDetails() {
    const location = useLocation();
    const {order} = location.state || {};

    console.log("Order state in OrderDetails:", order);

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
                        // height: '100%',
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
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                }}>
                    <Typography variant={'h6'}>Order Number: #{order.id}</Typography>
                    <Typography variant={'h6'}>Order Date: {order.orderDate}</Typography>
                    <Typography variant={'h6'}>
                        User Details: {order.user.firstName} {order.user.lastName} ({order.user.email})
                    </Typography>
                    <Typography variant={'h6'}>Delivery
                        Address: {addressString(order.deliveryAddress)}</Typography>
                    <Typography variant={'h6'}>
                        Invoice Address: {addressString(order.invoiceAddress)}
                    </Typography>
                    <Typography sx={{mb: 5}} variant={'h6'}>
                        Payment Type: {paymentTypeString(order.paymentType)}
                    </Typography>
                    <Box>
                        <Typography variant={'h5'}>Ordered Products:</Typography>
                        <Box sx={{height: 'auto', maxHeight: '300px', overflow: 'auto', margin: '20px 0'}}>
                            {order.cart.cartEntries.map(cartEntry => (
                                <>
                                    <Box key={cartEntry.id}>
                                        <CartEntryBoxOrderDetails cartEntry={cartEntry}/>
                                    </Box>
                                </>
                            ))}
                        </Box>
                        <Typography variant={'h6'}>Total Price: &#8364;{order.totalPrice.toFixed(2)}</Typography>
                    </Box>
                </Box>
            </Box>
        </>
    )
}