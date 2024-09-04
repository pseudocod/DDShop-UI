import {Box, Button, CircularProgress, Modal, TextField} from "@mui/material";
import Typography from "@mui/material/Typography";
import React, {useContext, useState} from "react";
import {UserContext} from "../../context/UserContext";
import axios from "axios";

export default function PasswordForgotForm({open, handleClose}) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [email, setEmail] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (email === '') {
            setError('Email is required');
            return;
        }

        try {
            setLoading(true);
            const response = await axios.post(`http://localhost:8080/email/forgot-password`,
                email,
                {
                    headers: {
                        'Content-Type': 'text/plain'
                    }
                }
            );
            setError(null);
        } catch (error) {
            console.error(error);
            setError('Could not send password change link');
        } finally {
            setLoading(false);
            handleClose();
        }
    }

    const handleChange = (e) => {
        setEmail(e.target.value);
    }

    return (
        <Modal open={open} onClose={() => {
            if (window.confirm("Are you sure you want to close?")) {
                handleClose();
            }
        }}>
            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                    width: 400, bgcolor: 'background.paper',
                    boxShadow: 24, p: 4,
                }}>
                <Typography variant='h1'
                            sx={{fontWeight: 500, color: '#151515', fontSize: '16px', textAlign: 'center', mb: 2}}>
                    Forgot Password
                </Typography>
                <TextField margin="normal"
                           fullWidth
                           id="email"
                           label="Email"
                           name="email"
                           autoComplete="email"
                           type="email"
                           sx={{
                               color: '#151515',
                               backgroundColor: '#F5F4F2',
                               borderRadius: '10px',
                           }}
                           onChange={handleChange}
                />
                {error ? <Typography>{error}</Typography> : null}
                {loading ?
                    (
                        <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                            <CircularProgress/>
                        </Box>
                    )
                    :
                    (
                        <Button
                            fullWidth
                            type="submit"
                            variant="contained"
                            sx={{
                                mt: 3,
                                mb: 2,
                                fontWeight: 600,
                                fontSize: 18,
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
                            Send Password Reset Link
                        </Button>
                    )}
            </Box>
        </Modal>
    );
}
