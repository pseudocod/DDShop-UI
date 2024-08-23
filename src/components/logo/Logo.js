import Typography from "@mui/material/Typography";
import {Link, useLocation} from 'react-router-dom';
import React from "react";
import {Box, useMediaQuery} from "@mui/material";
import {useTheme} from "@mui/material/styles";

export default function Logo({logoColor}) {
    const location = useLocation();
    const isHomepage = location.pathname === '/';
    const isLoginRegister = location.pathname === '/login' || location.pathname === '/register';
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const handleLogoClick = (event) => {
        if (isHomepage) {
            event.preventDefault();
            window.location.reload();
        }
    };
    
    return (
        <Link style={{display: 'inline-block', textAlign: 'center'}} to="/" onClick={handleLogoClick}>
            <Box sx={{

                width: isMobile || isLoginRegister ? '240px' : '470px',
                '&:hover': {
                    '& .logoAnytime': {
                        display: 'inline-block',
                    },

                    '& .logoOricand': {
                        display: 'none',
                    }
                }
            }}>
                <Typography
                    className='logoOricand'
                    variant="h1"
                    sx={{
                        fontWeight: 200,
                        color: logoColor,
                        fontSize: isMobile || isLoginRegister ? '3rem' : '6rem',
                        cursor: 'pointer',
                        transition: 'all 1s',
                        display: 'inline-block',
                    }}
                >
                    ORICÂND
                </Typography>
                <Typography
                    variant="h1"
                    className='logoAnytime'
                    sx={{
                        fontWeight: 200,
                        color: logoColor,
                        fontSize: isMobile || isLoginRegister ? '3rem' : '6rem',
                        cursor: 'pointer',
                        transition: 'all 1s',
                        display: 'none',
                    }}
                >
                    ANYTIME
                </Typography>
            </Box>
        </Link>
    );
}
