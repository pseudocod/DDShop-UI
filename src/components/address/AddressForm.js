import {Box, Button, Modal, TextField} from "@mui/material";
import Typography from "@mui/material/Typography";
import React, {useContext, useEffect, useState} from "react";
import {UserContext} from "../../context/UserContext";

export default function AddressForm({open, handleModalClose, handleAddressSave, formType}) {
    const {user} = useContext(UserContext);
    const [address, setAddress] = useState({
        streetLine: '',
        postalCode: '',
        city: '',
        county: '',
        country: ''
    });
    const [isFormValid, setIsFormValid] = useState(true);

    useEffect(() => {
        if (formType === 'billing' && user.defaultBillingAddress) {
            setAddress(user.defaultBillingAddress);
        } else if (formType === 'delivery' && user.defaultDeliveryAddress) {
            setAddress(user.defaultDeliveryAddress);
        }
    }, [formType, user]);

    const handleAddressChange = (event) => {
        const {name, value} = event.target;
        setAddress(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const validateForm = () => {
        const isValid = Object.values(address).every(value => {
            if (typeof value === 'string') {
                return value.trim() !== '';
            }
            return String(value).trim() !== '';
        });
        setIsFormValid(isValid);
        return isValid;
    }

    const handleSave = () => {
        if (validateForm()) {
            handleAddressSave(address);
            handleModalClose();
        } else {
            alert('All fields are required');
        }
    }

    return (
        <Modal open={open} onClose={() => {
            if (window.confirm("You have unsaved changes. Are you sure you want to close?")) {
                handleModalClose();
            }
        }}>
            <Box
                component="form"
                sx={{
                    position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                    width: 700, bgcolor: 'background.paper',
                    boxShadow: 24, p: 4,
                }}>
                <Typography variant='h1'
                            sx={{fontWeight: 500, color: '#151515', fontSize: '16px', textAlign: 'center'}}>
                    {formType === 'billing' ? 'Edit Billing address' : 'Edit Delivery address'}
                </Typography>
                <TextField margin="normal"
                           required
                           fullWidth
                           id="streetLine"
                           label="Street Line"
                           name="streetLine"
                           value={address.streetLine}
                           autoComplete="street-address"
                           sx={{
                               color: '#151515',
                               backgroundColor: '#F5F4F2',
                               borderRadius: '10px',
                           }}
                           onChange={handleAddressChange}
                />
                <TextField margin="normal"
                           required
                           fullWidth
                           id="postalCode"
                           label="Postal Code"
                           name="postalCode"
                           value={address.postalCode}
                           autoComplete="postal-code"
                           sx={{
                               color: '#151515',
                               backgroundColor: '#F5F4F2',
                               borderRadius: '10px',
                           }}
                           onChange={handleAddressChange}
                />
                <TextField margin="normal"
                           required
                           fullWidth
                           id="City"
                           label="City"
                           name="city"
                           value={address.city}
                           sx={{
                               color: '#151515',
                               backgroundColor: '#F5F4F2',
                               borderRadius: '10px',
                           }}
                           onChange={handleAddressChange}
                />
                <TextField margin="normal"
                           required
                           fullWidth
                           id="County"
                           label="County"
                           value={address.county}
                           name="county"
                           sx={{
                               color: '#151515',
                               backgroundColor: '#F5F4F2',
                               borderRadius: '10px',
                           }}
                           onChange={handleAddressChange}
                />
                <TextField margin="normal"
                           required
                           fullWidth
                           id="Country"
                           label="Country"
                           value={address.country}
                           name="country"
                           autoComplete="billing country"
                           sx={{
                               color: '#151515',
                               backgroundColor: '#F5F4F2',
                               borderRadius: '10px',
                           }}
                           onChange={handleAddressChange}
                />
                <Button
                    onClick={handleSave}
                    fullWidth
                    variant="contained"
                    sx={{
                        mt: 3,
                        mb: 2,
                        fontWeight: 600,
                        fontSize: 22,
                        backgroundColor: '#151515',
                        color: '#FFFFFF',
                        boxShadow: 'none',
                        '&:hover': {
                            backgroundColor: '#FFFFFF',
                            color: '#151515',
                            boxShadow: 'none',
                        },
                    }}
                >
                    SAVE
                </Button>
            </Box>
        </Modal>
    );
}