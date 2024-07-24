import React from 'react';
import {Box} from '@mui/material';
import Typography from "@mui/material/Typography";


const HeroSection = () => {
    return (
        <Box sx={{
            wordWrap: 'break-word',
            paddingRight: '80px',
            paddingTop: '30px',
            paddingBottom: '70px',
            paddingLeft: '50px',
            backgroundImage: `url('/resurseProiect/hero-section.jpg')`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '150vh'
        }}>
            <Typography variant='h1' sx={{
                fontWeight: 700,
                color: '#F5F4F2',
                fontSize: '30px',
                marginBottom: '100px',
                cursor: 'pointer',
                // display: 'flex',
                // alignItems: 'center'
            }}>
                {/*<img src="/resurseProiect/logo-icon.svg" alt="Coffee Icon"*/}
                {/*     style={{height: '40px', width: 'auto', marginRight: '16px', color: '#F5F4F2'}}/>*/}
                ORICÂND
            </Typography>

            <Typography variant='h1' sx={{fontWeight: 700, fontSize: '180px', color: '#F5F4F2', lineHeight: 0.9}}>
                GO<br/>
                AGAINST<br/>
                THE<br/>
                GRAIN<br/>
            </Typography>
        </Box>
    );
}

export default HeroSection;
