import React from 'react'
import {Link} from "react-router-dom";
import Typography from "@mui/material/Typography";
import {Box, useMediaQuery} from "@mui/material";
import {useTheme} from "@mui/material/styles";

export default function AestheticSection() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isMedium = useMediaQuery(theme.breakpoints.between('sm', 'md'));

    return (
        <>
            <Box sx={{mt: '100px', mb: '100px', position: 'relative'}}>
                <video
                    src="/resurseProiect/coffee.mp4"
                    autoPlay
                    loop
                    muted
                    style={{
                        width: '100%', height: '30%', maxHeight: '500px', borderRadius: '10px',
                        objectFit: 'cover'
                    }}
                >
                    Your browser does not support the video tag.
                </video>
                <Typography variant='h1'
                            sx={{
                                fontWeight: 300,
                                fontSize: (isMobile || isMedium) ? '50px' : '100px',
                                color: '#ffffff',
                                lineHeight: 0.9,
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                position: 'absolute',
                                textAlign: 'center'
                            }}>
                    ORICÂND.<br/> Your Coffee,<br/> Your Time.
                </Typography>
            </Box>


        </>
    )
}