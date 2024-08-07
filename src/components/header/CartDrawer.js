import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";
import {Link} from "react-router-dom";
import {Button, ListItemButton} from "@mui/material";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import * as React from "react";
import {UserContext} from "../../context/UserContext";
import {useContext, useEffect, useState} from "react";
import CartEntryBox from "./CartEntryBox";

export default function CartDrawer({open, handleClose, theme}) {
    const {user} = useContext(UserContext);
    const [cart, setCart] = useState(user?.userCarts[0] || {});

    useEffect(() => {
        setCart(user?.userCarts[0] || {});
    }, [user]);

    if (!user) {
        return null;
    }

    return (
        <Drawer
            variant="temporary"
            anchor="right"
            open={open}
            onClose={handleClose}
            sx={{
                '& .MuiDrawer-paper': {
                    width: '550px',
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
            <Box sx={{overflow: 'auto', flex: 1, pr: 8, paddingLeft: '16px', paddingTop: '50px'}}>
                <Typography variant="body2" sx={{fontSize: '18px', fontWeight: 600}}>
                    CART
                </Typography>
                <Divider/>
                <List>
                    {cart.cartEntries.length === 0 ?
                        <ListItem sx={{mb: 3}}>
                            <Typography variant="body2" sx={{fontSize: '22px', fontWeight: 500}}>
                                Your cart is empty
                            </Typography>
                        </ListItem>
                        :
                        cart.cartEntries.map((entry) => (
                            <ListItem key={entry.id} sx={{mb: 3}}>
                                <CartEntryBox cartEntry={entry}/>
                            </ListItem>
                        ))
                    }
                    <Divider/>
                    <ListItem>
                        <Box sx={{display: 'flex', flexDirection: 'column'}}>
                            <Box>
                                <Typography sx={{fontWeight: 500, fontSize: '1.25rem'}}>
                                    {cart.cartEntries.length === 0 ? '' : `SUBTOTAL: \u20ac${cart.totalPrice.toFixed(2)}`}
                                </Typography>
                            </Box>
                            <Typography>
                                Taxes and shipping calculated at checkout
                            </Typography>
                        </Box>
                    </ListItem>

                    <ListItemButton fullWidth
                                    variant="contained"
                                    sx={{
                                        mb: 2,
                                        fontWeight: 600,
                                        fontSize: 22,
                                        backgroundColor: '#151515',
                                        color: '#FFFFFF',
                                        boxShadow: 'none',
                                        display: 'flex',
                                        justifyContent: 'center', // Centers horizontally
                                        alignItems: 'center',     // Centers vertically
                                        textAlign: 'center',
                                        '&:hover': {
                                            backgroundColor: '#FFFFFF',
                                            color: '#151515',
                                            boxShadow: 'none',
                                        },
                                    }}>
                        CHECK OUT
                    </ListItemButton>
                </List>
            </Box>
        </Drawer>
    )
}