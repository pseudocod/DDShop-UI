import {Link, useLocation} from "react-router-dom";
import {Box} from "@mui/material";
import Typography from "@mui/material/Typography";
import React from "react";

export default function OrderSuccess() {
    const location = useLocation();
    const {state} = location;
    const {order} = state || {};

    const addressString = (address) => {
        if (!address) {
            return 'N/A';
        }
        return `${address.streetLine}, ${address.postalCode}, ${address.city}, ${address.county}, ${address.country}`;
    };
    return (
        <>
            <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh'}}>
                <Box sx={{padding: '20px'}}>

                    <Link to={'/'}>
                        <Typography variant={'h6'} sx={{textAlign: 'center'}}>
                            BACK HOME
                        </Typography>
                    </Link>

                    <Box>
                        <Typography variant={'h1'}>Thank you!</Typography>
                        <Typography variant={'h4'}>Your order has been successfully placed.</Typography>
                        <Typography variant={'h5'}>Order Number: #{order.id}</Typography>
                    </Box>

                    <Box>
                        <Typography>
                            Order Summary:
                        </Typography>
                        <Typography>
                            Date: {order.orderDate}
                        </Typography>
                        <Typography>
                            Delivery Address: {addressString(order.deliveryAddress)}
                        </Typography>
                        <Typography>
                            Invoice Address: {addressString(order.invoiceAddress)}
                        </Typography>
                        <Typography>
                            Total: €{order.totalPrice}
                        </Typography>
                    </Box>
                </Box>
            </Box>
            <Box sx={{backgroundColor: '#151515', height: '60vh', overflow: 'hidden', position: 'relative'}}>
                <Link to={'/'}>
                    <Typography variant='h1'
                                sx={{
                                    fontWeight: 700,
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
                    src="/resurseProiect/smile.jpg"
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                    }}
                />
            </Box>
        </>
    );
}