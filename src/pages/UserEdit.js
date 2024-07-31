import React, {useContext, useState} from 'react'
import {UserContext} from "../context/UserContext";
import {
    Box,
    Button,
    Checkbox,
    createTheme,
    FormControlLabel,
    Modal,
    TextField,
    ThemeProvider
} from "@mui/material";
import Typography from "@mui/material/Typography";
import {Link} from "react-router-dom";
import {theme} from "../theme/theme";
import AddressForm from "../../src/components/Address/AddressForm";

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
    const [open, setOpen] = useState(false);
    const [openBillingModal, setOpenBillingModal] = useState(false);
    const [useDeliveryAddress, setUseDeliveryAddress] = useState(false);

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

    const handleDeliveryAddressChange = (event) => {
        const {name, value} = event.target;
        setDeliveryAddress({...deliveryAddress, [name]: value});
        console.log(deliveryAddress);
    };

    const handleBillingAddressChange = (event) => {
        const {name, value} = event.target;
        setBillingAddress({...billingAddress, [name]: value});
        console.log(deliveryAddress);
        console.log(billingAddress);
    };

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleBillingModalOpen = () => setOpenBillingModal(true);
    const handleBillingModalClose = () => setOpenBillingModal(false);

    const handleCheckboxChange = (event) => setUseDeliveryAddress(event.target.checked);

    return (
        <>
            <ThemeProvider theme={editFormTheme}>

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

                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: '50px'
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
                    <TextField margin="normal"
                               required
                               id="firstName"
                               label="First name"
                               name="firstName"
                               autoComplete="name"
                               sx={{
                                   color: '#151515',
                                   backgroundColor: '#F5F4F2',
                                   borderRadius: '10px',
                                   width: '50%'
                               }}
                    />
                    <TextField margin="normal"

                               required
                               id="lastName"
                               label="Last name"
                               name="lastName"
                               autoComplete="family-name"
                               sx={{
                                   color: '#151515',
                                   backgroundColor: '#F5F4F2',
                                   borderRadius: '10px',
                                   width: '50%'
                               }}
                    />
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
                                 handleAddressChange={handleDeliveryAddressChange}
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
                                 handleAddressChange={handleBillingAddressChange}
                                 formType="billing"
                    />
                </Box>
            </ThemeProvider>
        </>
    )
}