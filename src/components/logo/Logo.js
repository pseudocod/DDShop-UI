import Typography from "@mui/material/Typography";
import {Link, useLocation} from 'react-router-dom'
import React from "react";
import {useMediaQuery} from "@mui/material";
import {useTheme} from "@mui/material/styles";

export default function Logo({logoColor}) {
    const location = useLocation();
    const isHomepage = location.pathname === '/';
    const [isHovered, setIsHovered] = React.useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const handleLogoClick = (event) => {
        if (isHomepage) {
            event.preventDefault();
            window.location.reload();
        }
    };

    return (
        <Link style={{display: 'inline-block'}} to="/" onClick={handleLogoClick}>
            <Typography
                variant="h1"
                sx={{
                    fontWeight: 200,
                    color: logoColor,
                    fontSize: isMobile ? '3rem' : '6rem',
                    cursor: 'pointer',
                    transition: 'all 1s',
                    display: 'inline-block',
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {isHovered ? 'ANYTIME' : 'ORICÂND'}
            </Typography>
        </Link>
    );
}
