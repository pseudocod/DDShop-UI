import React, {useContext, useEffect} from "react";
import {Box, Button, Container} from "@mui/material";
import Typography from "@mui/material/Typography";
import {UserContext} from "../context/UserContext";
import {Link, useNavigate} from "react-router-dom";

export default function Account() {
    const {user, setUser} = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem('user');
        navigate('/');
    }
    const handleEditUser = () => {
        navigate('/edit-user');
    }

    if (!user) {
        return <Typography variant="h6">You must be logged in to view this page.</Typography>;
    }

    return (
        <>
            <Link to="/">
                <Typography variant='h1' sx={{
                    fontWeight: 700,
                    color: '#151515',
                    fontSize: '30px',
                    marginBottom: '50px',
                    cursor: 'pointer',
                    mt: '30px',
                    ml: '50px'
                }}>
                    ORICÂND
                </Typography>
            </Link>
            <Container>
                <Box>
                    <Typography variant="h4">Account Information</Typography>
                    <Typography variant="h6">Name: {user.firstName} {user.lastName}</Typography>
                    <Typography variant="h6">Email: {user.email}</Typography>
                    <Typography variant="h6">Phone Number: {user.phoneNumber || 'N/A'}</Typography>
                    <Typography variant="h6">Default Delivery
                        Address: {user.defaultDeliveryAddress ? user.defaultDeliveryAddress.address : 'N/A'}</Typography>
                    <Typography variant="h6">Default Billing
                        Address: {user.defaultBillingAddress ? user.defaultBillingAddress.address : 'N/A'}</Typography>
                    <Button onClick={handleLogout}>Log out</Button>
                    <Button onClick={handleEditUser}>Edit User Details</Button>
                </Box>
            </Container>
        </>
    );
}