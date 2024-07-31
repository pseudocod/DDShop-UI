import React, {useEffect, useState} from 'react';
import Box from "@mui/material/Box";
import {Button, Container, createTheme, TextField, ThemeProvider} from "@mui/material";
import Typography from "@mui/material/Typography";
import {theme} from "../theme/theme";
import Logo from '../components/logo/Logo'
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {formTheme} from "../theme/formTheme";

export default function Register() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });

    const handleChange = (event) => {
        const value = event.target.value;
        setData({
            ...data,
            [event.target.name]: value
        });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const userData = {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            password: data.password,
        }
        try {
            const response = await axios.post('http://localhost:8080/user/register', userData)
            console.log(response.data);
            setError(null);
            navigate('/');
        } catch (error) {
            console.error(error);
            setError('Registration failed. Please try again.')
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Logo/>
            <ThemeProvider theme={formTheme}>
                <Container component="main" maxWidth='lg' sx={{
                    backgroundColor: '#FFFFFF',
                    color: '#151515',
                    borderRadius: '5px',
                }}>
                    <Box sx={{
                        marginTop: 8, display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        padding: '55px'
                    }}
                         component="form"
                         onSubmit={handleSubmit}
                    >
                        <Typography variant='h6' sx={{fontWeight: 600}}>
                            CREATE ACCOUNT
                        </Typography>
                        <TextField margin="normal"
                                   fullWidth
                                   required
                                   id="firstName"
                                   label="First name"
                                   name="firstName"
                                   autoComplete="name"
                                   sx={{
                                       color: '#151515',
                                       backgroundColor: '#F5F4F2',
                                       borderRadius: '10px',
                                   }}
                                   onChange={handleChange}
                        />
                        <TextField margin="normal"
                                   fullWidth
                                   required
                                   id="lastName"
                                   label="Last name"
                                   name="lastName"
                                   autoComplete="family-name"
                                   sx={{
                                       color: '#151515',
                                       backgroundColor: '#F5F4F2',
                                       borderRadius: '10px',
                                   }}
                                   onChange={handleChange}
                        />
                        <TextField margin="normal"
                                   fullWidth
                                   required
                                   id="email"
                                   label="Email"
                                   name="email"
                                   autoComplete="email"
                                   sx={{
                                       color: '#151515',
                                       backgroundColor: '#F5F4F2',
                                       borderRadius: '10px',
                                   }}
                                   onChange={handleChange}
                        />
                        <TextField
                            type="password"
                            margin="normal"
                            fullWidth
                            required
                            id="password"
                            label="Password"
                            name="password"
                            autoComplete="current-password"
                            sx={{
                                color: '#151515',
                                backgroundColor: '#F5F4F2',
                                borderRadius: '10px',
                            }}
                            onChange={handleChange}
                        />
                        {error && <Typography color="error">{error}</Typography>}
                        <Button
                            type="submit"
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
                            disabled={loading}
                        >
                            {loading ? 'CREATING...' : 'CREATE'}
                        </Button>
                    </Box>
                </Container>
            </ThemeProvider>
        </>
    );
}