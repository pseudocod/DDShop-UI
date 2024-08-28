import {Box} from "@mui/material";
import Typography from "@mui/material/Typography";
import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";

export default function ProductBoxPresentation({product}) {

    const groupedAttributes = product.attributes.reduce((acc, attribute) => {
        const {attributeName, attributeValue} = attribute;

        if (!acc[attributeName]) {
            acc[attributeName] = [];
        }
        acc[attributeName].push(attributeValue);
        return acc;
    }, {});

    return (
        <>
            <Box sx={{
                backgroundColor: '#F5F4F2',
                padding: '20px',
                borderRadius: '2px',
                cursor: 'pointer',
                transition: '1s',
                '&:hover': {
                    backgroundColor: '#151515',
                    '& img': {
                        opacity: 0.1,
                    },
                    '& .product-details': {
                        opacity: 1,
                    },
                    '& .product-name': {
                        color: '#FFFFFF',
                    },
                    '& .out-of-stock': {
                        color: '#FFFFFF',
                    }
                },
                position: 'relative',
            }}>
                <Link to={`/products/${product.id}`}>
                    <Box className='product-details'
                         sx={{
                             opacity: 0,
                             position: 'absolute',
                             color: '#FFFFFF',
                             padding: '20px',
                             display: 'flex',
                             flexDirection: 'column',
                             gap: '20px',
                         }}>
                        <Box>
                            <Typography variant='h1'>{product.category.name}</Typography>
                        </Box>
                        <Box>
                            {Object.entries(groupedAttributes).map(([attributeName, attributeValues], index) => {
                                return (
                                    <Typography key={index}>
                                        {attributeName + ': ' + attributeValues.join(', ')}
                                    </Typography>
                                )
                            })}
                        </Box>
                    </Box>
                    <img
                        src={`/resurseProiect/${product.name}.webp`}
                        style={{
                            objectFit: 'contain',
                            height: 'auto',
                            maxWidth: '80%',
                            margin: 'auto',
                            display: 'block',
                            borderRadius: '5px'
                        }}
                        alt={product.name}
                    />
                    <Box className='product-name'
                         sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 3}}>
                        <Typography variant='h6' sx={{fontWeight: 600}}>{product.name}</Typography>
                        <Typography>&#8364;{product.price}</Typography>
                    </Box>

                    {product.availableQuantity === 0 && (
                        <Box
                            className='out-of-stock'
                            sx={{
                                position: 'absolute',
                                top: '10px',
                                right: '10px',
                                backgroundColor: 'transparent',
                                color: '#333',
                                fontWeight: 700,
                                padding: '5px 10px',
                                borderRadius: '5px',
                                zIndex: 2,
                                fontSize: '0.9em',
                            }}>
                            <Typography>OUT OF STOCK</Typography>
                        </Box>
                    )}
                </Link>
            </Box>
        </>
    );
}