import Typography from "@mui/material/Typography";
import {Link} from 'react-router-dom'
import React from "react";

export default function Logo() {
    return (
        <Link to="/">
            <Typography variant='h1' sx={{
                fontWeight: 700,
                color: '#151515',
                fontSize: '30px',
                marginBottom: '50px',
                cursor: 'pointer',
                mt: '30px',
                ml: '50px'
            }}>
                ORICÂND
            </Typography>
        </Link>
    );
}
