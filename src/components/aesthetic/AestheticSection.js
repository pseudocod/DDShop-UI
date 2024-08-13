import React from 'react'
import {Link} from "react-router-dom";
import Typography from "@mui/material/Typography";
import {Box, useMediaQuery} from "@mui/material";
import {useTheme} from "@mui/material/styles";

export default function AestheticSection() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    return (
        <>
            <Box sx={{backgroundColor: '#151515', height: '100vh', overflow: 'hidden', position: 'relative'}}>
                <Link to={'/about'}>
                    <Typography variant='h1'
                                sx={{
                                    fontWeight: 700,
                                    zIndex: 1,
                                    fontSize: isMobile ? '50px' : '100px',
                                    color: '#F5F4F2',
                                    lineHeight: 0.9,
                                    top: '50%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)',
                                    position: 'absolute',
                                    textAlign: 'center'
                                }}>
                        ABOUT ORICÂND
                    </Typography>
                </Link>
                <img
                    src="/resurseProiect/About.webp"
                    style={{
                        width: '100%',
                        minHeight: '100%',
                        objectFit: 'cover',
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                    }}
                />
            </Box>
        </>
    )
}