import {Box, Button, Modal, TextField} from "@mui/material";
import Typography from "@mui/material/Typography";
import React from "react";

export default function AddressForm({open, handleModalClose, handleAddressChange, formType}) {
    return (
        <Modal open={open} onClose={handleModalClose}>
            <Box
                sx={{
                    position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                    width: 700, bgcolor: 'background.paper',
                    boxShadow: 24, p: 4,
                }}>
                <Typography variant='h1'
                            sx={{fontWeight: 500, color: '#151515', fontSize: '16px', textAlign: 'center'}}>
                    {formType === 'billing' ? 'Edit Billing Address' : 'Edit Delivery Address'}
                </Typography>
                <TextField margin="normal"
                           required
                           fullWidth
                           id="billingStreetLine"
                           label="Street Line"
                           name="streetLine"
                           autoComplete="billing street-address"
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
                           id="billingPostalCode"
                           label="Postal Code"
                           name="postalCode"
                           autoComplete="billing postal-code"
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
                           id="billingCity"
                           label="City"
                           name="city"
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
                           id="billingCounty"
                           label="County"
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
                           id="billingCountry"
                           label="Country"
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
                    onClick={handleModalClose}
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