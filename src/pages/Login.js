import React, {useContext, useEffect, useState} from 'react';
import Box from "@mui/material/Box";
import {Button, Container, createTheme, TextField, ThemeProvider} from "@mui/material";
import Typography from "@mui/material/Typography";
import {theme} from "../theme/theme";
import Logo from '../components/logo/Logo'
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import {UserContext} from "../context/UserContext";
import {formTheme} from "../theme/formTheme";
import PasswordForgotForm from "../components/password/PasswordForgotForm";


export default function Login() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState({
        email: '',
        password: ''
    });
    const [openPasswordForgot, setOpenPasswordForgot] = useState(false);
    const {setUser} = useContext(UserContext);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const email = formData.get('email');
        const password = formData.get('password');

        setLoading(true);
        setError(null);

        try {
            const response = await axios.post('http://localhost:8080/user/login',
                {
                    email: email,
                    password: password
                });

            setUser(response.data);
            localStorage.setItem('user', JSON.stringify(response.data));
            console.log(response.data);
            setError(null);
            navigate('/account');
        } catch (error) {
            console.error(error);
            setError('Login failed. Please try again.');
        } finally {
            setLoading(false);
        }

    }


    const handleChange = (event) => {
        const value = event.target.value;
        setData(
            {
                ...data,
                [event.target.name]: value
            }
        );
    }
    const handleClose = () => {
        setOpenPasswordForgot(false);
    }
    const handleOpen = () => {
        setOpenPasswordForgot(true);
    }
    return (
        <>
            <Box sx={{padding: '30px 0 0 30px'}}>
                <Logo/>
            </Box>
            <ThemeProvider theme={formTheme}>
                <Box sx={{
                    paddingBottom: '50px',
                }}>
                    <Container component="main" maxWidth='lg' sx={{
                        backgroundColor: '#FFFFFF',
                        color: '#151515',
                        borderRadius: '5px',
                        paddingBottom: '20px',
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
                                LOGIN
                            </Typography>
                            <TextField margin="normal"
                                       fullWidth
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
                                       onChange={handleChange}
                            />
                            <Typography variant='p'
                                        onClick={handleOpen}
                                        sx={{
                                            fontWeight: 600,
                                            alignSelf: 'flex-start',
                                            textDecoration: 'underline',
                                            cursor: 'pointer',
                                            mb: 3
                                        }}>
                                Forgot your password?
                            </Typography>
                            <PasswordForgotForm open={openPasswordForgot} handleClose={handleClose}/>
                            {error && <Typography>{error}</Typography>}
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
                            >
                                SIGN IN
                            </Button>
                            {loading && <Typography>LOADING...</Typography>}
                            <Link to="/register">
                                <Button
                                    variant="contained"
                                    sx={{
                                        mt: 3,
                                        mb: 2,
                                        fontWeight: 600,
                                        fontSize: 22,
                                        background: 'none',
                                        border: 'none',
                                        margin: 0,
                                        padding: 0,
                                        cursor: 'pointer',
                                        color: '#151515',
                                        boxShadow: 'none',
                                        textDecoration: 'underline',
                                        '&:hover': {
                                            background: 'none',
                                            border: 'none',
                                            color: '#151515',
                                            boxShadow: 'none',
                                            margin: 0,
                                            padding: 0,
                                            textDecoration: 'underline',
                                        },
                                    }}
                                >
                                    CREATE ACCOUNT
                                </Button>
                            </Link>
                        </Box>
                    </Container>
                </Box>
            </ThemeProvider>
        </>
    );
}