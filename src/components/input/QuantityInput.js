import React from 'react';
import {TextField} from '@mui/material';

export default function QuantityInput({value, onChange, min = 1, max = 20}) {
    return (
        <TextField
            type="number"
            value={value} idk
            onChange={(e) => onChange(Number(e.target.value))}
            inputProps={{min, max}}
            variant="outlined"
            sx={{width: '100px', textAlign: 'center'}}
        />
    );
}
