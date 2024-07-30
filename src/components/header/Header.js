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
import {ListItemButton} from '@mui/material';

export default function Header() {
    const [open, setOpen] = React.useState(false);
    const theme = useTheme();

    const handleDrawerToggle = () => {
        setOpen(!open);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <AppBar
            position="fixed"
            sx={{
                width: '80px',
                backgroundColor: '#FFFFFF',
                color: '#151515',
                boxShadow: 'none',
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'center',
                height: '100vh',
                zIndex: theme.zIndex.drawer + 1,
            }}
        >
            <Toolbar sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                padding: '8px 0',
            }}>
                <IconButton
                    size="large"
                    color="inherit"
                    aria-label="menu icon for opening drawer"
                    sx={{mb: 2}}
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
                <Box sx={{display: 'flex', flexDirection: 'column'}}>
                    <IconButton
                        size="large"
                        aria-label="shopping cart of user"
                        color="inherit"
                    >
                        <LocalMallOutlinedIcon/>
                    </IconButton>
                    <IconButton
                        size="large"
                        aria-label="account of current user"
                        color="inherit"
                        sx={{mb: 2}}
                    >
                        <AccountCircleOutlinedIcon/>
                    </IconButton>
                </Box>
            </Toolbar>

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
                    <List>
                        <ListItem sx={{mb: 3}}>
                            <Typography variant="body2" sx={{fontSize: '18px', fontWeight: 600}}>
                                SHOP
                            </Typography>
                        </ListItem>
                        <ListItemButton>
                            <Typography variant="body2" sx={{fontSize: '22px', fontWeight: 500}}>
                                All Products
                            </Typography>
                        </ListItemButton>
                        <ListItemButton>
                            <Typography variant="body2" sx={{fontSize: '22px', fontWeight: 500}}>
                                Flashbrew
                            </Typography>
                        </ListItemButton>
                        <ListItemButton sx={{mb: 40}}>
                            <Typography variant="body2" sx={{fontSize: '22px', fontWeight: 500}}>
                                Gift Card
                            </Typography>
                        </ListItemButton>
                        <Divider/>
                        <ListItemButton>
                            <Typography variant="body2" sx={{fontSize: '18px', fontWeight: 600}}>
                                ABOUT ORICÂND
                            </Typography>
                        </ListItemButton>
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
        </AppBar>
    );
}
