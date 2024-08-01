import {Box, Button, Modal, TextField} from "@mui/material";
import Typography from "@mui/material/Typography";
import React, {useContext, useEffect, useState} from "react";
import {UserContext} from "../../context/UserContext";

export default function PasswordForm() {
    const {user} = useContext(UserContext);
    const [address, setAddress] = useState({
        streetLine: '',
        postalCode: '',
        city: '',
        county: '',
        country: ''
    });
    const [isFormValid, setIsFormValid] = useState(true);


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

    return (
        <Modal>
            <Box
                component="form"
                sx={{
                    position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                    width: 700, bgcolor: 'background.paper',
                    boxShadow: 24, p: 4,
                }}>
                <Typography variant='h1'
                            sx={{fontWeight: 500, color: '#151515', fontSize: '16px', textAlign: 'center'}}>
                </Typography>
                <TextField margin="normal"
                           fullWidth
                           id="password"
                           label="Password"
                           name="password"
                           autoComplete="password"
                           type="password"
                           sx={{
                               color: '#151515',
                               backgroundColor: '#F5F4F2',
                               borderRadius: '10px',
                           }}
                />
                <TextField margin="normal"
                           fullWidth
                           id="confirmPassword"
                           label="Confirm Password"
                           name="confirmPassword"
                           type="password"
                           sx={{
                               color: '#151515',
                               backgroundColor: '#F5F4F2',
                               borderRadius: '10px',
                           }}
                />
                <Button
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
                    CHANGE PASSWORD
                </Button>
            </Box>
        </Modal>
    );
}