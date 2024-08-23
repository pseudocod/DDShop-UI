import React, {useContext, useEffect, useState} from 'react'
import {UserContext} from "../context/UserContext";
import {
    Box,
    Button,
    Checkbox,
    createTheme, FormControl,
    FormControlLabel, InputLabel, MenuItem, Select,
    TextField,
    ThemeProvider
} from "@mui/material";
import Typography from "@mui/material/Typography";
import {Link, useNavigate} from "react-router-dom";
import {theme} from "../theme/theme";
import AddressForm from "../../src/components/Address/AddressForm";
import axios from "axios";
import CartEntryBox from "../components/header/CartEntryBox";
import {CartContext} from "../context/CartContext";
import CartEntryBoxCheckout from "../components/header/CartEntryBoxCheckout";
import {PaymentType} from "../components/paymentType/PaymentType";

export const editFormTheme = createTheme({
    ...theme,
    components: {
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: '#151515', // Default border color
                        },
                        '&:hover fieldset': {
                            borderColor: '#151515', // Hovered border color
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
    const [defaultUserAddresses, setDefaultUserAddresses] = useState(false);
    const {cart, loading: loadingCart, error: errorCart} = useContext(CartContext);
    const [phoneNumber, setPhoneNumber] = useState(null);
    const [selectedPaymentType, setSelectedPaymentType] = useState(PaymentType.CREDIT_CARD);

    const [deliveryAddress, setDeliveryAddress] = useState(user.defaultDeliveryAddress ? user.defaultDeliveryAddress : {
        streetLine: '',
        postalCode: '',
        city: '',
        county: '',
        country: ''
    });

    const [billingAddress, setBillingAddress] = useState(user.defaultBillingAddress ? user.defaultBillingAddress : {
        streetLine: '',
        postalCode: '',
        city: '',
        county: '',
        country: ''
    });

    useEffect(() => {
        if (useDeliveryAddress) {
            setBillingAddress(deliveryAddress);
        }
    }, [useDeliveryAddress, deliveryAddress]);

    if (loadingCart) {
        return (
            <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
                <Typography>
                    Loading cart...
                </Typography>
            </Box>
        )
    }

    if (errorCart) {
        return null;
    }

    const handlePhoneNumberChange = (event) => {
        setPhoneNumber(event.target.value);
        console.log(event.target.value);
    }

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

    const handleDefaultAddressesCheckboxChange = (event) => setDefaultUserAddresses(event.target.checked);

    const addressString = (address) => {
        if (!address) {
            return 'N/A';
        }
        return `${address.streetLine}, ${address.postalCode}, ${address.city}, ${address.county}, ${address.country}`;
    }

    const handlePaymentTypeChange = (event) => {
        setSelectedPaymentType(event.target.value);
        console.log(selectedPaymentType);
    };

    const handleSubmit = async () => {
        // 1
        setLoading(true);
        try {
            if (defaultUserAddresses || !user.phoneNumber) {
                const userData = {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    phoneNumber: user.phoneNumber ? user.phoneNumber : phoneNumber,
                    defaultDeliveryAddress: deliveryAddress,
                    defaultBillingAddress: billingAddress
                };

                const response = await axios.put(`http://localhost:8080/user/update/${user.id}`, userData);
                setUser(response.data);
                // 2
                console.log(user)
                localStorage.setItem('user', JSON.stringify(response.data));
                setError(null);

                navigate('/order-confirmation', {
                    state: {
                        user: response.data, // Use updated data
                        cart,
                        deliveryAddress,
                        billingAddress,
                        paymentType: selectedPaymentType
                    }
                });
            } else {
                navigate('/order-confirmation', {
                    state: {
                        user,
                        cart,
                        deliveryAddress,
                        billingAddress,
                        paymentType: selectedPaymentType
                    }
                });
            }
        } catch (error) {
            console.error(error);
            setError('Edit failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <Box>LOADING</Box>
    }

    const isAddressPresent = (address) => {
        return address.streetLine.trim() !== '' &&
            address.postalCode.trim() !== '' &&
            address.city.trim() !== '' &&
            address.county.trim() !== '' &&
            address.country.trim() !== '';
    };


    return (
        <>
            <ThemeProvider theme={editFormTheme}>
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
                        {/*<Typography variant='subtitle'*/}
                        {/*            sx={{fontWeight: 300}}>*/}
                        {/*    ANYTIME*/}
                        {/*</Typography>*/}
                    </Box>
                </Box>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '20px',
                    height: '100%',
                    flexWrap: 'wrap'
                }}>
                    <Box sx={{
                        backgroundColor: '#F9F9F9',
                        borderRadius: '5px',
                        flex: 1,
                        padding: '20px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between'
                    }}>
                        <Box sx={{padding: "20px"}}>
                            <Box>
                                <Typography sx={{fontWeight: 600, fontSize: '1.1rem', mb: 2}}>
                                    ACCOUNT DETAILS
                                </Typography>

                                <Typography
                                    sx={{
                                        fontWeight: 500,
                                        fontSize: '1rem',
                                        mb: 1
                                    }}>Name: {user.firstName} {user.lastName}</Typography>
                                <Typography
                                    sx={{fontWeight: 500, fontSize: '1rem', mb: 1}}>Email: {user.email}</Typography>
                                {user.phoneNumber ?
                                    (<Typography sx={{fontWeight: 500, fontSize: '1rem', mb: 1}}>
                                            Phone Number: {user.phoneNumber}
                                        </Typography>
                                    ) : (
                                        <>
                                            <Box sx={{display: 'flex', alignItems: 'center', gap: '10px', mb: '10px'}}>
                                                <Typography sx={{fontWeight: 500, fontSize: '1rem'}}>
                                                    Please add a phone number:
                                                </Typography>
                                                <TextField
                                                    required
                                                    id="phoneNumber"
                                                    name="phoneNumber"
                                                    size={'small'}
                                                    autoComplete="tel"
                                                    sx={{
                                                        color: '#151515',
                                                        backgroundColor: '#F5F4F2',
                                                        borderRadius: '10px',
                                                        width: '10rem',
                                                    }}
                                                    onChange={handlePhoneNumberChange}
                                                />
                                            </Box>
                                        </>
                                    )
                                }
                                {deliveryAddress && billingAddress &&
                                    (
                                        <>
                                            <Typography sx={{fontWeight: 500, fontSize: '1rem', mb: 1}}>
                                                Delivery
                                                Address: {isAddressPresent(deliveryAddress) ? addressString(deliveryAddress) : 'Please add a delivery address.'}
                                            </Typography>
                                            <Typography sx={{fontWeight: 500, fontSize: '1rem', mb: 1}}>
                                                Billing
                                                Address: {isAddressPresent(billingAddress) ? addressString(billingAddress) : 'Please add a billing address.'}
                                            </Typography>
                                        </>
                                    )
                                }
                            </Box>
                            <Button
                                onClick={handleOpen}
                                variant="contained"
                                sx={{
                                    alignSelf: 'flex-end',
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
                            <Box sx={{display: 'block'}}>
                                <FormControlLabel
                                    control={<Checkbox checked={defaultUserAddresses}
                                                       onChange={handleDefaultAddressesCheckboxChange}/>}
                                    label='Set addressses as default for future orders'
                                />
                            </Box>
                            <Box sx={{display: 'block', mt: 2}}>
                                <FormControl fullWidth>
                                    <InputLabel id="payment-type-label">Payment Type</InputLabel>
                                    <Select
                                        labelId="payment-type-label"
                                        id="payment-type"
                                        value={selectedPaymentType}
                                        label="Payment Type"
                                        onChange={handlePaymentTypeChange}
                                    >
                                        <MenuItem value={PaymentType.CREDIT_CARD}>Credit Card</MenuItem>
                                        <MenuItem value={PaymentType.PAYPAL}>PayPal</MenuItem>
                                        <MenuItem value={PaymentType.BANK_TRANSFER}>Bank Transfer</MenuItem>
                                        <MenuItem value={PaymentType.CASH_ON_DELIVERY}>Cash on Delivery</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                            <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                <Button
                                    onClick={handleSubmit}
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
                                        width: '50%',
                                        display: 'block',
                                    }}
                                >
                                    CONTINUE
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                    <Box sx={{
                        padding: '20px',
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between'
                    }}>
                        <Box>
                            <Typography sx={{fontSize: '1.5rem', mb: '1rem'}}>Order Summary:</Typography>
                        </Box>
                        <Box sx={{mb: '1rem'}}>
                            {
                                cart.cartEntries.map((entry) => (
                                    <CartEntryBoxCheckout key={entry.id} cartEntry={entry}/>
                                ))
                            }
                        </Box>
                        <Box>
                            <Typography variant={"h5"} sx={{fontWeight: 500}}>Total
                                Price: &#8364;{cart.totalPrice}</Typography>
                        </Box>
                    </Box>
                </Box>
            </ThemeProvider>
        </>
    )
}

