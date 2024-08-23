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

export default function UserEdit() {
    const {user, setUser} = useContext(UserContext);
    const [editedUser, setEditedUser] = useState({
        firstName: user.firstName,
        lastName: user.lastName,
        phoneNumber: user.phoneNumber || '',
    });
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

    const isAddressPresent = (address) => {
        return address.streetLine.trim() !== '' &&
            address.postalCode.trim() !== '' &&
            address.city.trim() !== '' &&
            address.county.trim() !== '' &&
            address.country.trim() !== '';
    };

    const handleDeliveryAddressChange = (newAddress) => {
        setDeliveryAddress(newAddress)
    };

    const handleBillingAddressChange = (newAddress) => {
        setBillingAddress(newAddress);
    };

    const handleUserChange = (event) => {
        const {name, value} = event.target;
        setEditedUser({...editedUser, [name]: value});
        console.log(editedUser);
        console.log(deliveryAddress);
        console.log(billingAddress);
        console.log(useDeliveryAddress)
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const userData = {
            firstName: editedUser.firstName,
            lastName: editedUser.lastName,
            phoneNumber: editedUser.phoneNumber,
            defaultDeliveryAddress: isAddressPresent(deliveryAddress) ? deliveryAddress : user.defaultDeliveryAddress,
            defaultBillingAddress: useDeliveryAddress ? (isAddressPresent(deliveryAddress) ? deliveryAddress : user.defaultDeliveryAddress) : (isAddressPresent(billingAddress) ? billingAddress : user.defaultBillingAddress)
        }
        try {
            const response = await axios.put('http://localhost:8080/user/update/' + user.id, userData)
            console.log(response.data);
            setUser(response.data);
            localStorage.setItem('user', JSON.stringify(response.data));
            setError(null);
            navigate('/account');
        } catch (error) {
            console.error(error);
            setError('Edit failed. Please try again.')
        } finally {
            setLoading(false);
        }
    }

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
                    <Link to="/">
                        <Typography variant='h1' sx={{
                            fontWeight: 300,
                            color: '#151515',
                            fontSize: '80px',
                            cursor: 'pointer',
                        }}>
                            BACK HOME
                        </Typography>
                    </Link>
                </Box>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: '50px',
                }}
                >
                    <Typography variant='h1'
                                sx={{fontWeight: 500, color: '#151515', fontSize: '16px'}}>
                        Edit User
                    </Typography>
                    <Link to="/account">
                        <Typography variant='h1'
                                    sx={{
                                        fontWeight: 500,
                                        color: '#151515',
                                        fontSize: '16px',
                                        marginBottom: '50px',
                                        textDecoration: 'underline'
                                    }}>
                            Return to Account details
                        </Typography>
                    </Link>
                </Box>

                <Box sx={{padding: "20px", paddingRight: '100px'}}>
                    <Box sx={{display: 'flex', gap: 2}}></Box>
                    <TextField margin="normal"
                               required
                               id="firstName"
                               label="First name"
                               name="firstName"
                               autoComplete="name"
                               value={editedUser.firstName}
                               sx={{
                                   color: '#151515',
                                   backgroundColor: '#F5F4F2',
                                   borderRadius: '10px',
                                   width: '50%'
                               }}
                               onChange={handleUserChange}
                    />
                    <TextField margin="normal"
                               required
                               id="lastName"
                               label="Last name"
                               name="lastName"
                               value={editedUser.lastName}
                               autoComplete="family-name"
                               sx={{
                                   color: '#151515',
                                   backgroundColor: '#F5F4F2',
                                   borderRadius: '10px',
                                   width: '50%'
                               }}
                               onChange={handleUserChange}
                    />
                    <Box sx={{display: 'block'}}>
                        <TextField margin="normal"
                                   required
                                   id="phoneNumber"
                                   label="Phone number"
                                   name="phoneNumber"
                                   value={editedUser.phoneNumber}
                                   autoComplete="tel"
                                   sx={{
                                       color: '#151515',
                                       backgroundColor: '#F5F4F2',
                                       borderRadius: '10px',
                                       width: '50%'
                                   }}
                                   onChange={handleUserChange}
                        />
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
                            onClick={handleSubmit}
                        >
                            SAVE
                        </Button>
                    </Box>
                </Box>
            </ThemeProvider>

        </>
    )
}

