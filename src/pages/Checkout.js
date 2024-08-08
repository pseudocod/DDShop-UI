import React, {useContext, useState} from 'react'
import {UserContext} from "../context/UserContext";
import {
    Box,
    Button,
    Checkbox,
    createTheme,
    FormControlLabel,
    TextField,
    ThemeProvider
} from "@mui/material";
import Typography from "@mui/material/Typography";
import {Link, useNavigate} from "react-router-dom";
import {theme} from "../theme/theme";
import AddressForm from "../../src/components/Address/AddressForm";
import axios from "axios";

export const editFormTheme = createTheme({
    ...theme,
    components: {
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: 'transparent', // Default border color
                        },
                        '&:hover fieldset': {
                            borderColor: 'transparent', // Hovered border color
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: '#151515', // Border color when focused
                        },
                    },
                    '& .MuiInputLabel-root': {
                        color: 'gray', // Default label color
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                        color: 'gray', // Label color when focused
                    },
                },
            },
        },
    },
});

export default function Checkout() {
    const {user, setUser} = useContext(UserContext);
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [openBillingModal, setOpenBillingModal] = useState(false);
    const [useDeliveryAddress, setUseDeliveryAddress] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const [deliveryAddress, setDeliveryAddress] = useState({
        streetLine: '',
        postalCode: '',
        city: '',
        county: '',
        country: ''
    });

    const [billingAddress, setBillingAddress] = useState({
        streetLine: '',
        postalCode: '',
        city: '',
        county: '',
        country: ''
    });

    const handleDeliveryAddressChange = (newAddress) => {
        setDeliveryAddress(newAddress)
    };

    const handleBillingAddressChange = (newAddress) => {
        setBillingAddress(newAddress);
    };


    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleBillingModalOpen = () => setOpenBillingModal(true);
    const handleBillingModalClose = () => setOpenBillingModal(false);

    const handleCheckboxChange = (event) => setUseDeliveryAddress(event.target.checked);

    return (
        <>
            <ThemeProvider theme={editFormTheme}>
                <Box sx={{
                    mt: '30px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Typography variant='h1' sx={{
                        fontWeight: 300,
                        color: '#151515',
                        fontSize: '80px',
                    }}>
                        CHECKOUT
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
                                    sx={{fontWeight: 500, color: '#151515', fontSize: '16px'}}>
                            BACK HOME
                        </Typography>
                    </Link>
                    <Link to="/edit-user">
                        <Typography variant='h1'
                                    sx={{fontWeight: 500, color: '#151515', fontSize: '16px'}}>
                            EDIT USER DETAILS
                        </Typography>
                    </Link>
                </Box>

                <Box sx={{padding: "20px", paddingRight: '100px'}}>
                    <Box sx={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
                        <Typography
                            sx={{
                                color: '#151515',
                                fontSize: '1.5rem'
                            }}>
                            First Name: {user.firstName}
                        </Typography>
                        <Typography
                            sx={{
                                color: '#151515',
                                fontSize: '1.5rem'
                            }}>
                            Last Name: {user.lastName}

                        </Typography>
                        <Box sx={{display: 'block'}}>
                            <Typography
                                sx={{
                                    color: '#151515',
                                    fontSize: '1.5rem'
                                }}>
                                Phone Number: {user.phoneNumber}
                            </Typography>
                        </Box>
                    </Box>
                    <Button
                        onClick={handleOpen}
                        variant="contained"
                        sx={{
                            mt: 3,
                            mb: 2,
                            fontWeight: 500,
                            fontSize: '16px',
                            backgroundColor: '#2c2c2c',
                            color: '#F5F4F2',
                            boxShadow: 'none',
                            '&:hover': {
                                backgroundColor: '#F5F4F2',
                                color: '#2c2c2c',
                                boxShadow: 'none',
                            },
                        }}
                    >
                        Edit Delivery Address
                    </Button>

                    <AddressForm open={open} handleModalClose={handleClose}
                                 handleAddressSave={handleDeliveryAddressChange}
                                 formType="delivery"
                    />

                    <Box sx={{display: 'block'}}>
                        <FormControlLabel
                            control={<Checkbox checked={useDeliveryAddress} onChange={handleCheckboxChange}/>}
                            label='Use delivery address as billing address'
                        />
                    </Box>

                    {!useDeliveryAddress && (
                        <Button
                            onClick={handleBillingModalOpen}
                            variant="contained"
                            sx={{
                                mt: 3,
                                mb: 2,
                                fontWeight: 500,
                                fontSize: '16px',
                                backgroundColor: '#2c2c2c',
                                color: '#F5F4F2',
                                boxShadow: 'none',
                                '&:hover': {
                                    backgroundColor: '#F5F4F2',
                                    color: '#2c2c2c',
                                    boxShadow: 'none',
                                },
                            }}
                        >
                            Edit Billing Address
                        </Button>
                    )}

                    <AddressForm open={openBillingModal} handleModalClose={handleBillingModalClose}
                                 handleAddressSave={handleBillingAddressChange}
                                 formType="billing"
                    />
                    {error && <Typography color="error">{error}</Typography>}
                    {loading && <Typography>Loading...</Typography>}
                    <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{
                                mt: 3,
                                mb: 2,
                                fontWeight: 500,
                                fontSize: '16px',
                                backgroundColor: '#2c2c2c',
                                color: '#F5F4F2',
                                boxShadow: 'none',
                                '&:hover': {
                                    backgroundColor: '#F5F4F2',
                                    color: '#2c2c2c',
                                    boxShadow: 'none',
                                },
                                width: '10%',
                                display: 'block'
                            }}
                        >
                            SAVE
                        </Button>
                    </Box>
                </Box>
            </ThemeProvider>

        </>
    )
}

