import {Box, CircularProgress, FormControl, InputLabel, NativeSelect} from "@mui/material";
import Typography from "@mui/material/Typography";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import ProductBoxPresentation from "../components/product/ProductBoxPresentation";
import Divider from "@mui/material/Divider";

export default function AllProducts() {
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('1');


    useEffect(() => {
        async function fetchData() {
            try {
                const [productsResponse, categoriesResponse] = await Promise.all([
                    axios.get('http://localhost:8080/products'),
                    axios.get('http://localhost:8080/categories')
                ]);
                setProducts(productsResponse.data);
                setCategories(categoriesResponse.data);
                setError(null);
            } catch (error) {
                setError('Error fetching data');
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);


    function handleChange(e) {
        setSelectedCategory(e.target.value);
    }

    const filteredProducts = selectedCategory === '1'
        ? products
        : products.filter(product => product.category.id === parseInt(selectedCategory));

    if (loading) {
        return (
            <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
                <CircularProgress/>
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
                <Typography variant='h6'>{error}</Typography>
            </Box>
        );
    }


    return (
        <Box sx={{backgroundColor: '#FFFFFF'}}>
            <Box sx={{
                backgroundImage: `url('/resurseProiect/AllProducts.webp')`,
                height: '60vh',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
            }}>
                <Link to="/">
                    <Typography variant='h1' sx={{color: '#FFFFFF'}}>ORICÂND</Typography>
                </Link>
                <Box sx={{
                    display: 'flex',
                    paddingRight: '100px',
                    flexDirection: 'column',
                    alignItems: 'flex-end',
                    marginBottom: '100px',
                }}>
                    <Divider sx={{background: '#ffffff', height: '0.1px', width: '300px', display: 'block'}}/>
                    <FormControl sx={{backgroundColor: 'transparent', width: '300px',}}>
                        <InputLabel sx={{color: '#FFFFFF'}} variant="standard" htmlFor="uncontrolled-native">
                            Filter
                        </InputLabel>
                        <NativeSelect
                            defaultValue={selectedCategory}
                            inputProps={{
                                category: 'category',
                                id: 'uncontrolled-native',
                            }}
                            sx={{
                                color: '#FFFFFF',
                                backgroundColor: 'transparent',
                                '& .MuiNativeSelect-select:focus': {
                                    backgroundColor: '#ffffff',
                                    color: '#151515'
                                }
                            }}
                            onChange={handleChange}
                        >
                            <option value={1}>All</option>
                            {categories.map(category => (
                                <option key={category.id} value={category.id}>{category.name}</option>
                            ))}
                        </NativeSelect>
                    </FormControl>
                    <Divider sx={{background: '#ffffff', height: '0.5px', width: '300px', display: 'block'}}/>
                </Box>
            </Box>
            <Typography sx={{fontSize: '8rem', fontWeight: 600, color: '#151515'}}>ALL PRODUCTS</Typography>
            <Box sx={{display: 'flex', flexWrap: 'wrap', gap: '10px', padding: 1}}>
                {filteredProducts.map(product => (
                    <ProductBoxPresentation key={product.id} product={product}/>
                ))}
            </Box>
        </Box>
    );
}