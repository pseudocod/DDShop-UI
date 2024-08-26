import React, {useContext, useEffect, useState} from "react";
import {Box, Button, Container} from "@mui/material";
import Typography from "@mui/material/Typography";
import {UserContext} from "../context/UserContext";
import {Link, useNavigate} from "react-router-dom";
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import PasswordForm from "../components/Address/PasswordForm";
import axios from "axios";

export default function Account() {
    const {user, setUser} = useContext(UserContext);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();
    const [openPasswordForm, setOpenPasswordForm] = useState(false);


    useEffect(() => {
            async function fetchUserOrderData() {
                try {
                    setLoading(true);
                    const response = await axios.get(`http://localhost:8080/orders/user/${user.id}`);
                    setOrders(response.data);
                    console.log(response.data);
                    setError(null);
                } catch (error) {
                    setError('Could not fetch user orders.');
                } finally {
                    setLoading(false);
                }
            }

            fetchUserOrderData();
        }
        , []);


    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem('user');
        navigate('/');
    }
    if (!user) {
        return <Typography variant="h6">You must be logged in to view this page.</Typography>;
    }

    const addressString = (address) => {
        if (!address) {
            return 'N/A';
        }
        return `${address.streetLine}, ${address.postalCode}, ${address.city}, ${address.county}, ${address.country}`;
    }

    const sortedOrders = orders.sort((a, b) => {
        const dateDifference = new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime();

        if (dateDifference === 0) {
            return b.id - a.id;
        }

        return dateDifference;
    });

    const isAddressPresent = (address) => {
        return address?.streetLine?.trim() !== '' &&
            address?.postalCode?.trim() !== '' &&
            address?.city?.trim() !== '' &&
            address?.county.trim() !== '' &&
            address?.country.trim() !== '';
    };

    const handlePasswordFormButtonOpenClick = () => {
        setOpenPasswordForm(true);
    }
    const handlePasswordFormClose = () => {
        setOpenPasswordForm(false);
    }
    return (
        <>
            <Box sx={{
                backgroundImage: `url('/resurseProiect/ACCOUNT.jpg')`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                color: '#FFFFFF',
                height: '35vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-around',
                flexDirection: 'column',
            }}
            >
                <Box sx={{
                    position: 'absolute',
                    left: '50px',
                    top: '30px'
                }}>
                    <Box sx={{display: 'flex', cursor: 'pointer', alignItems: 'center'}} onClick={handleLogout}>
                        <PersonOutlineIcon fontSize='large'/>
                        <Typography sx={{textDecoration: 'underline'}}>LOG OUT</Typography>
                    </Box>
                </Box>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <Typography variant='h1' sx={{
                        fontWeight: 300,
                        fontSize: '80px',
                    }}>
                        ACCOUNT
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
                                    sx={{fontWeight: 500, fontSize: '40px'}}>
                            HOME
                        </Typography>
                    </Link>
                    {/*<Link to="/edit-user">*/}
                    {/*    <Typography variant='h1'*/}
                    {/*                sx={{fontWeight: 500, fontSize: '25px'}}>*/}
                    {/*        EDIT USER DETAILS*/}
                    {/*    </Typography>*/}
                    {/*</Link>*/}
                </Box>
            </Box>
            <Box sx={{mb: '50px'}}>
                <Box sx={{
                    mt: '30px',
                    paddingLeft: '50px',
                    paddingRight: '150px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap'
                }}>
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        flexDirection: 'column'
                    }}>
                        <Typography sx={{fontWeight: 300, fontSize: '2rem', mb: 2}}>ACCOUNT DETAILS</Typography>
                        <Typography
                            sx={{
                                fontWeight: 300, fontSize: '1.3rem',
                                mb: 1
                            }}>Name: {user.firstName} {user.lastName}</Typography>
                        <Typography sx={{fontWeight: 300, fontSize: '1.3rem', mb: 1}}>Email: {user.email}</Typography>
                        <Typography sx={{fontWeight: 300, fontSize: '1.3rem', mb: 1}}>Phone
                            Number: {user.phoneNumber || 'N/A'}</Typography>
                        <Typography sx={{fontWeight: 300, fontSize: '1.3rem', mb: 1}}>
                            Default Delivery
                            Address: {isAddressPresent(user?.defaultDeliveryAddress) ? addressString(user.defaultDeliveryAddress) : 'N/A'}
                        </Typography>
                        <Typography sx={{fontWeight: 300, fontSize: '1.3rem', mb: 5}}>
                            Default Billing
                            Address: {isAddressPresent(user?.defaultBillingAddress) ? addressString(user.defaultBillingAddress) : 'N/A'}
                        </Typography>
                    </Box>


                    <Box sx={{display: 'flex', flexDirection: 'column'}}>
                        <Link to="/edit-user">
                            <Button
                                variant="text"
                                sx={{
                                    mt: 3,
                                    mb: 2,
                                    fontWeight: 300,
                                    fontSize: '2rem',
                                    background: 'none',
                                    border: 'none',
                                    margin: 0,
                                    padding: 0,
                                    cursor: 'pointer',
                                    color: '#151515',
                                    boxShadow: 'none',
                                    textDecorationLine: 'underline',
                                    textDecorationThickness: '1px',
                                    transition: 'all 0.3s',
                                    '&:hover': {
                                        background: 'none',
                                        border: 'none',
                                        color: '#151515',
                                        boxShadow: 'none',
                                        margin: 0,
                                        padding: 0,
                                        textDecorationLine: 'underline',
                                        textDecorationThickness: '1.5px',
                                    },
                                }}
                            >
                                EDIT USER DETAILS
                            </Button>
                        </Link>
                        <Button
                            variant="text"
                            onClick={handlePasswordFormButtonOpenClick}
                            sx={{
                                mt: 3,
                                mb: 2,
                                fontWeight: 300,
                                fontSize: '2rem',
                                background: 'none',
                                border: 'none',
                                margin: 0,
                                padding: 0,
                                cursor: 'pointer',
                                color: '#151515',
                                boxShadow: 'none',
                                textDecorationLine: 'underline',
                                textDecorationThickness: '1px',
                                '&:hover': {
                                    background: 'none',
                                    border: 'none',
                                    color: '#151515',
                                    boxShadow: 'none',
                                    margin: 0,
                                    padding: 0,
                                    textDecorationLine: 'underline',
                                    textDecorationThickness: '1.5px',
                                },
                            }}
                        >
                            CHANGE PASSWORD
                        </Button>
                    </Box>
                    <PasswordForm open={openPasswordForm} handleClose={handlePasswordFormClose}/>
                </Box>
                <Box>
                    <Typography
                        sx={{fontWeight: 300, fontSize: '2rem', mb: 2, paddingLeft: '50px', paddingRight: '150px',}}>ORDER
                        HISTORY</Typography>
                    <Box sx={{
                        height: '150px', overflow: 'auto', paddingLeft: '50px',
                        paddingRight: '150px',
                    }}>
                        {sortedOrders.length > 0 ?
                            (
                                sortedOrders.map((order) => (
                                    <Box
                                        key={order.id}
                                        sx={{
                                            display: 'grid',
                                            maxWidth: '700px',
                                            gridTemplateColumns: 'repeat(3, auto)',
                                            columnGap: '20px',
                                            alignItems: 'center',
                                            mb: 2,
                                        }}
                                    >
                                        <Typography sx={{fontWeight: 300, fontSize: '1.3rem',}}>
                                            Order Number: #{order.id}
                                        </Typography>
                                        <Typography sx={{fontWeight: 300, fontSize: '1.3rem',}}>
                                            Date: {order.orderDate}
                                        </Typography>
                                        <Link to={`/order/${order.id}`} state={{order}}
                                              style={{
                                                  textDecorationLine: 'underline',
                                                  textDecorationThickness: '1px',
                                              }}>
                                            <Typography sx={{fontWeight: 300, fontSize: '1.3rem',}}>
                                                VIEW ORDER DETAILS
                                            </Typography>
                                        </Link>
                                    </Box>
                                )))
                            : <Typography sx={{fontWeight: 300, fontSize: '1.3rem',}}>No orders found.</Typography>
                        }
                    </Box>
                </Box>
            </Box>

        </>
    );
}

