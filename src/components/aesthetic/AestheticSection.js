import React from 'react'
import {Link} from "react-router-dom";
import Typography from "@mui/material/Typography";
import {Box} from "@mui/material";

export default function AestheticSection() {
    return (
        <>
            <Box sx={{backgroundColor: '#151515', height: '100vh', overflow: 'hidden', position: 'relative'}}>
                <Link to={'/about'}>
                    <Typography variant='h1'
                                sx={{
                                    fontWeight: 700,
                                    zIndex: 1,
                                    fontSize: '100px',
                                    color: '#F5F4F2',
                                    lineHeight: 0.9,
                                    top: '50%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)',
                                    position: 'absolute',
                                    whiteSpace: 'nowrap',
                                }}>
                        ABOUT ORICÂND
                    </Typography>
                </Link>
                <img
                    src="/resurseProiect/About.webp"
                    style={{
                        width: '100%',
                        height: '100%',
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