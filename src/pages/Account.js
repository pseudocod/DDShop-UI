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
    return (
        <>
            <Box sx={{mb: '50px'}}>
                <Box sx={{
                    mt: '30px',
                    ml: '50px',
                }}>
                    <Typography variant="h6">Account</Typography>
                    <Box sx={{display: 'flex', cursor: 'pointer', alignItems: 'center'}} onClick={handleLogout}>
                        <PersonOutlineIcon fontSize='large'/>
                        <Typography sx={{textDecoration: 'underline'}}>Log out</Typography>
                    </Box>
                </Box>
                <Box sx={{
                    mt: '100px',
                    ml: '50px',
                    paddingRight: '150px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap'
                }}>
                    <Box>
                        <Typography sx={{fontWeight: 600, fontSize: '1.1rem', mb: 2}}>ACCOUNT DETAILS</Typography>

                        <Typography
                            sx={{
                                fontWeight: 500,
                                fontSize: '1rem',
                                mb: 1
                            }}>Name: {user.firstName} {user.lastName}</Typography>
                        <Typography sx={{fontWeight: 500, fontSize: '1rem', mb: 1}}>Email: {user.email}</Typography>
                        <Typography sx={{fontWeight: 500, fontSize: '1rem', mb: 1}}>Phone
                            Number: {user.phoneNumber || 'N/A'}</Typography>
                        <Typography sx={{fontWeight: 500, fontSize: '1rem', mb: 1}}>
                            Default Delivery Address: {addressString(user.defaultDeliveryAddress)}
                        </Typography>
                        <Typography sx={{fontWeight: 500, fontSize: '1rem', mb: 5}}>
                            Default Billing Address: {addressString(user.defaultBillingAddress)}
                        </Typography>
                        <Box>
                            <Typography sx={{fontWeight: 600, fontSize: '1.1rem', mb: 2, textAlign: 'center'}}>ORDER
                                HISTORY</Typography>
                            <Box sx={{height: '150px', overflow: 'auto'}}>
                                {sortedOrders.map((order) => (
                                    <Box
                                        key={order.id}
                                        sx={{
                                            display: 'grid',
                                            gridTemplateColumns: 'repeat(3, auto)',
                                            columnGap: '20px',
                                            alignItems: 'center',
                                            mb: 2,
                                        }}
                                    >
                                        <Typography sx={{fontWeight: 500, fontSize: '1rem'}}>
                                            Order Number: #{order.id}
                                        </Typography>
                                        <Typography sx={{fontWeight: 500, fontSize: '1rem'}}>
                                            Date: {order.orderDate}
                                        </Typography>
                                        <Link to={`/order/${order.id}`} state={{order}}
                                              style={{textDecoration: 'underline'}}>
                                            <Typography sx={{fontWeight: 500, fontSize: '1rem'}}>
                                                VIEW ORDER DETAILS
                                            </Typography>
                                        </Link>
                                    </Box>
                                ))}
                            </Box>
                        </Box>
                    </Box>

                    <Box sx={{display: 'flex', flexDirection: 'column'}}>
                        <Link to="/edit-user">
                            <Button
                                variant="text"
                                sx={{
                                    mt: 3,
                                    mb: 2,
                                    fontWeight: 600,
                                    fontSize: '1.1rem',
                                    background: 'none',
                                    border: 'none',
                                    margin: 0,
                                    padding: 0,
                                    cursor: 'pointer',
                                    color: '#151515',
                                    boxShadow: 'none',
                                    textDecoration: 'underline',
                                    '&:hover': {
                                        background: 'none',
                                        border: 'none',
                                        color: '#151515',
                                        boxShadow: 'none',
                                        margin: 0,
                                        padding: 0,
                                        textDecoration: 'underline',
                                    },
                                }}
                            >
                                EDIT USER DETAILS
                            </Button>
                        </Link>
                        <Button
                            variant="text"
                            sx={{
                                mt: 3,
                                mb: 2,
                                fontWeight: 600,
                                fontSize: '1.1rem',
                                background: 'none',
                                border: 'none',
                                margin: 0,
                                padding: 0,
                                cursor: 'pointer',
                                color: '#151515',
                                boxShadow: 'none',
                                textDecoration: 'underline',
                                '&:hover': {
                                    background: 'none',
                                    border: 'none',
                                    color: '#151515',
                                    boxShadow: 'none',
                                    margin: 0,
                                    padding: 0,
                                    textDecoration: 'underline',
                                },
                            }}
                        >
                            CHANGE PASSWORD
                        </Button>
                    </Box>

                    {/*<PasswordForm/>*/}
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
                        HOME
                    </Typography>
                </Link>
                <img
                    src="/resurseProiect/pexels-biasousa-22679426.jpg"
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

