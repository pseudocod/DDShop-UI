import Typography from "@mui/material/Typography";
import * as React from "react";
import {Box} from "@mui/material";
import {Link} from "react-router-dom";

export default function CartEntryBoxOrderDetails({cartEntry}) {
    const product = cartEntry.product;

    return (
        <>
            <Box sx={{display: 'flex', mb: '1rem'}}>
                <Link to={`/products/${product.id}`}>
                    <img
                        src={`/resurseProiect/${product.name}.webp`}
                        style={{
                            objectFit: 'contain',
                            width: '150px',
                        }}
                        alt={product.name}
                    />
                </Link>
                <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', ml: 2}}>
                    <Box sx={{display: 'flex', alignItems: 'center'}}>
                        <Link to={`/products/${product.id}`}>
                            <Typography variant="body2" sx={{fontSize: '20px', fontWeight: 500}}>
                                {product.name}
                            </Typography>
                        </Link>
                    </Box>
                    <Box sx={{display: 'flex', alignItems: 'center'}}>
                        <Typography variant="body1" sx={{fontWeight: 500}}>
                            Quantity:&nbsp; {cartEntry.quantity}
                        </Typography>
                    </Box>
                    <Typography variant="body1" sx={{fontWeight: 500}}>
                        Price: &#8364;{cartEntry.totalPriceEntry.toFixed(2)}
                    </Typography>
                </Box>
            </Box>
        </>
    )
}