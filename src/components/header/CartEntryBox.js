import Typography from "@mui/material/Typography";
import * as React from "react";
import {Box} from "@mui/material";
import {Link} from "react-router-dom";

export default function CartEntryBox({cartEntry}) {
    console.log(cartEntry);
    const product = cartEntry.product;
    return (
        <>
            <Link to={`/products/${product.id}`}>
                <Box sx={{display: 'flex'}}>
                    <img
                        src={`/resurseProiect/${product.name}.webp`}
                        style={{
                            objectFit: 'contain',
                            height: 'auto',
                            maxWidth: '30%',
                        }}
                        alt={product.name}
                    />
                    <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', ml: 2}}>
                        <Typography variant="body2" sx={{fontSize: '20px', fontWeight: 500}}>
                            {product.name}
                        </Typography>
                        <Typography variant="body1" sx={{fontWeight: 500}}>
                            Quantity: {cartEntry.quantity}
                        </Typography>
                        <Typography variant="body1" sx={{fontWeight: 500}}>
                            Price: &#8364;{cartEntry.totalPriceEntry.toFixed(2)}
                        </Typography>
                    </Box>
                </Box>
            </Link>
        </>
    )
}