import {Box, Button, CircularProgress, Modal, TextField} from "@mui/material";
import Typography from "@mui/material/Typography";
import React, {useContext, useState} from "react";
import {UserContext} from "../../context/UserContext";
import axios from "axios";

export default function PasswordForm({open, handleClose}) {
    const {user} = useContext(UserContext);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            const response = await axios.get(`http://localhost:8080/email/password-reset/${user.id}`);
            setError(null);
        } catch (error) {
            console.error(error);
            setError('Could not send password change link');
        } finally {
            setLoading(false);
            handleClose();
        }
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
                    Change Password
                </Typography>
                <TextField margin="normal"
                           fullWidth
                           id="email"
                           label="Email"
                           name="email"
                           autoComplete="email"
                           type="email"
                           value={user.email}
                           InputProps={{
                               readOnly: true,
                           }}
                           sx={{
                               color: '#151515',
                               backgroundColor: '#F5F4F2',
                               borderRadius: '10px',
                           }}
                />
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
