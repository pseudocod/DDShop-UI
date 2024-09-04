import React, {useContext, useState} from 'react'
import {UserContext} from "../context/UserContext";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {Box, Button, CircularProgress, TextField} from "@mui/material";
import Logo from "../components/logo/Logo";
import Typography from "@mui/material/Typography";

export default function UserForgotPassword() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            setLoading(true);
            const response = await axios.put(`http://localhost:8080/user/update/forgot-password`, {
                email: email,
                newPassword: newPassword
            });
            setError(null);
            navigate('/login');
        } catch (error) {
            console.error(error);
            setError('Could not change password');
        } finally {
            setLoading(false);
        }
    }
    return (
        <>
            <Box sx={{padding: '100px'}}>
                <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <Logo/>
                </Box>
                <Box
                    sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
                    <Typography variant={'h4'}>Change Password</Typography>
                    <TextField margin="normal"
                               required
                               id="email"
                               label="Confirm Email"
                               name="email"
                               autoComplete="email"
                               type="email"
                               sx={{
                                   color: '#151515',
                                   backgroundColor: '#F5F4F2',
                                   borderRadius: '10px',
                                   width: '50%'
                                   
                               }}
                               onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField margin="normal"
                               required
                               id="newPassword"
                               label="New Password"
                               name="newPassword"
                               type="password"
                               onChange={(e) => setNewPassword(e.target.value)}
                               sx={{
                                   color: '#151515',
                                   backgroundColor: '#F5F4F2',
                                   borderRadius: '10px',
                                   width: '50%'
                               }}
                    />
                    <TextField margin="normal"
                               required
                               id="confirmPassword"
                               label="Confirm Password"
                               name="confirmPassword"
                               type="password"
                               onChange={(e) => setConfirmPassword(e.target.value)}
                               sx={{
                                   color: '#151515',
                                   backgroundColor: '#F5F4F2',
                                   borderRadius: '10px',
                                   width: '50%'
                               }}
                    />
                    {error && <Typography variant={'h6'} sx={{color: 'red'}}>{error}</Typography>}
                    {loading ?
                        (
                            <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                <CircularProgress/>
                            </Box>
                        )
                        :
                        (
                            <Button
                                type="submit"
                                variant="contained"
                                onClick={handleSubmit}
                                sx={{
                                    mt: 3,
                                    mb: 2,
                                    fontWeight: 600,
                                    fontSize: 22,
                                    backgroundColor: '#151515',
                                    color: '#FFFFFF',
                                    boxShadow: 'none',
                                    width: '50%',
                                    '&:hover': {
                                        backgroundColor: '#FFFFFF',
                                        color: '#151515',
                                        boxShadow: 'none',
                                    },
                                }}
                            >
                                CHANGE PASSWORD
                            </Button>
                        )}
                </Box>
            </Box>
        </>
    );
}