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
import AddressForm from "../components/address/AddressForm";
import axios from "axios";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import Logo from "../components/logo/Logo";

export const editFormTheme = createTheme({
    ...theme,
    components: {
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: '#151515',
                        },
                        '&:hover fieldset': {
                            borderColor: '151515',
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: '#151515',
                        },
                    },
                    '& .MuiInputLabel-root': {
                        color: 'gray',
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                        color: 'gray',
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
                    height: '40vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    gap: '20px'
                }}
                >
                    <Typography variant='h1'
                                sx={{fontWeight: 100, color: '#151515', fontSize: '80px'}}>
                        EDIT USER
                    </Typography>
                    <Link to="/">
                        <Typography variant='h1' sx={{
                            fontWeight: 300,
                            color: '#151515',
                            fontSize: '30px',
                            cursor: 'pointer',
                        }}>
                            BACK HOME
                        </Typography>
                    </Link>
                </Box>


                <Box sx={{padding: "0 20px"}}>
                    <Box
                        sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
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
                                       width: '30%'
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
                                       width: '30%'
                                   }}
                                   onChange={handleUserChange}
                        />
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
                                       width: '30%'
                                   }}
                                   onChange={handleUserChange}
                        />
                        <Button
                            onClick={handleOpen}
                            variant="contained"
                            sx={{
                                mt: 3,
                                mb: 2,
                                fontWeight: 500,
                                fontSize: '20px',
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
                                    fontSize: '20px',
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
                    </Box>
                    <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{
                                mt: 3,
                                mb: 2,
                                fontWeight: 500,
                                fontSize: '32px',
                                backgroundColor: '#2c2c2c',
                                color: '#F5F4F2',
                                boxShadow: 'none',
                                padding: '2px 10px',
                                '&:hover': {
                                    backgroundColor: '#F5F4F2',
                                    color: '#2c2c2c',
                                    boxShadow: 'none',
                                },
                                width: '30%',
                                display: 'inline-block'
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

