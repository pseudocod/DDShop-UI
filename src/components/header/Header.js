import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import {useTheme} from '@mui/material/styles';
import {CircularProgress, ListItemButton} from '@mui/material';
import {Link, useLocation} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {UserContext} from "../../context/UserContext";
import CartDrawer from "./CartDrawer";
import useMediaQuery from '@mui/material/useMediaQuery';
import {useCartDrawer} from "../../context/CartDrawerContext";
import {CartContext} from "../../context/CartContext";

export default function Header() {
    const [open, setOpen] = useState(false);
    const theme = useTheme();
    const {user} = useContext(UserContext);
    const [openCart, setOpenCart] = useState(false);
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const location = useLocation();
    const {toggleCartDrawer, closeCartDrawer} = useCartDrawer();
    const {cart, loading: loadingCart, error: errorCart} = useContext(CartContext);

    const handleDrawerToggle = () => {
        setOpen(!open);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        setOpen(false);
        closeCartDrawer();
    }, [location]);

    let cartQuantity = cart.cartEntries.reduce((accumulator, cartEntry) => (accumulator + cartEntry.quantity), 0);
    if (!user) {
        cartQuantity = 0;
    }
    return (
        <Box>
            <AppBar
                position="fixed"
                sx={{
                    width: isMobile ? '100%' : '90px',
                    backgroundColor: '#FFFFFF',
                    color: '#151515',
                    boxShadow: 'none',
                    height: isMobile ? '60px' : '100vh',
                    zIndex: theme.zIndex.drawer + 1,
                }}
            >
                <Toolbar sx={{
                    display: 'flex',
                    flexDirection: isMobile ? 'row' : 'column',
                    alignItems: 'center',
                    justifyContent: isMobile ? 'space-between' : 'center',
                    height: '100vh',
                    padding: '8px 0',
                }}>
                    {isMobile && (
                        <Box component={Link} to="/"
                             sx={{display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit'}}>
                            <Typography
                                variant="h6"
                                sx={{
                                    fontWeight: 300,
                                    fontSize: '20px',
                                    color: '#151515',
                                    padding: '20px'
                                }}
                            >
                                ANYTIME
                            </Typography>
                        </Box>
                    )}
                    {!isMobile && (
                        <>
                            <IconButton
                                size="large"
                                color="inherit"
                                aria-label="menu icon for opening drawer"
                                sx={{mb: isMobile ? 0 : 2}}
                                onClick={handleDrawerToggle}
                            >
                                <MenuIcon/>
                            </IconButton>

                            <Typography variant="body2" component="div" sx={{writingMode: 'vertical-rl', mb: 2}}>
                                Free Shipping
                            </Typography>
                            <Typography variant="body2" component="div" sx={{writingMode: 'vertical-rl', mb: 2}}>
                                London orders 40£+ (by bike)
                            </Typography>
                            <Typography variant="body2" component="div" sx={{writingMode: 'vertical-rl', mb: 2}}>
                                Wales orders 50£+ | <br/>
                                Scotland orders 60£+
                            </Typography>
                        </>
                    )}
                    <Box sx={{display: 'flex', flexDirection: isMobile ? 'row' : 'column'}}>
                        <IconButton
                            size="large"
                            aria-label="shopping cart of user"
                            color="inherit"
                            onClick={toggleCartDrawer}
                            sx={{position: 'relative'}}
                        >
                            <LocalMallOutlinedIcon/>
                            {loadingCart && <CircularProgress color="inherit"/>}
                            {cart.cartEntries.length > 0 && (
                                <Box
                                    sx={{
                                        backgroundColor: 'yellow',
                                        borderRadius: '50%',
                                        width: '20px',
                                        height: '20px',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        position: 'absolute',
                                        top: '0',
                                        right: '0'
                                    }}
                                >
                                    <Typography>{cartQuantity}</Typography>
                                </Box>

                            )
                            }
                        </IconButton>
                        <Link to={user ? "/account" : "/login"}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                color="inherit"
                                sx={{mb: isMobile ? 0 : 2}}
                            >
                                <AccountCircleOutlinedIcon/>
                            </IconButton>
                        </Link>
                        {isMobile && (
                            <IconButton
                                size="large"
                                color="inherit"
                                aria-label="menu icon for opening drawer"
                                sx={{mb: isMobile ? 0 : 2}}
                                onClick={handleDrawerToggle}
                            >
                                <MenuIcon/>
                            </IconButton>
                        )}
                    </Box>
                </Toolbar>
            </AppBar>
            <CartDrawer theme={theme}/>
            <Drawer
                variant="temporary"
                anchor="right"
                open={open}
                onClose={handleClose}
                sx={{
                    '& .MuiDrawer-paper': {
                        width: isMobile ? '100%' : '550px', // Full width on mobile, fixed width on larger screens
                        boxSizing: 'border-box',
                        display: 'flex',
                        flexDirection: 'column',
                        position: 'fixed',
                        zIndex: theme.zIndex.drawer + 1, // Ensure it overlays content
                    },
                    '& .MuiBackdrop-root': {
                        backgroundColor: 'rgba(0, 0, 0, 0.03)',
                    },
                }}
            >
                <Box sx={{
                    overflow: 'auto',
                    flex: 1,
                    padding: '50px 16px 0 16px',
                }}>
                    <List>
                        <ListItem sx={{mb: 3}}>
                            <Typography variant="body2" sx={{fontSize: '18px', fontWeight: 600}}>
                                SHOP
                            </Typography>
                        </ListItem>
                        <Link to='/collections/all'>
                            <ListItemButton sx={{mb: 50}}>
                                <Typography variant="body2" sx={{fontSize: '22px', fontWeight: 500}}>
                                    All Products
                                </Typography>
                            </ListItemButton>
                        </Link>
                        <Divider/>
                        <Link to='/about'>
                            <ListItemButton>
                                <Typography variant="body2"
                                            sx={{fontSize: '18px', fontWeight: 600}}>
                                    ABOUT ORICÂND
                                </Typography>
                            </ListItemButton>
                        </Link>
                        <Divider/>
                        <ListItemButton>
                            <Typography variant="body2" sx={{fontSize: '18px', fontWeight: 600}}>
                                CONTACT
                            </Typography>
                        </ListItemButton>
                        <Divider/>
                    </List>
                </Box>
            </Drawer>
        </Box>
    );
}
