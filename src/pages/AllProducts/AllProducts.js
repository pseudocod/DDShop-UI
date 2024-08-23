import {Box, CircularProgress, FormControl, InputLabel, NativeSelect, useMediaQuery} from "@mui/material";
import Typography from "@mui/material/Typography";
import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import ProductBoxPresentation from "../../components/product/ProductBoxPresentation";
import Divider from "@mui/material/Divider";
import {TransitionGroup, CSSTransition} from "react-transition-group";
import './AllProducts.css';
import {useTheme} from "@mui/material/styles";
import Logo from "../../components/logo/Logo";
import FilterComponentV2 from "../../components/product/FilterComponentV2";

export default function AllProducts() {
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('1');
    const [sortOption, setSortOption] = useState('default');
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [filters, setFilters] = useState({});

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
        const selectedCategoryId = e.target.value;
        setSelectedCategory(selectedCategoryId);
        const categoryName = selectedCategoryId === '1'
            ? 'all'
            : categories.find(category => category.id === parseInt(selectedCategoryId))?.name;
        navigate(`/collections/${categoryName}`);
    }

    const handleSortChange = (e) => {
        setSortOption(e.target.value);
    }

    const filteredProducts = selectedCategory === '1'
        ? products
        : products.filter(product => product.category.id === parseInt(selectedCategory));

    const sortedAndFilteredProducts = filteredProducts.sort((a, b) => {
        if (sortOption === 'priceAsc') {
            return a.price - b.price;
        }
        if (sortOption === 'priceDesc') {
            return b.price - a.price;
        }
        if (sortOption === 'dateAsc') {
            return a.addedDate - b.addedDate;
        }
        return a.availableQuantity === 0 ? 1 : -1;
    })

    const sortedAndAdvancedFilteredProducts = sortedAndFilteredProducts.filter(product => {
        return Object.entries(filters).every(([filterKey, filterValues]) => {

            const matchingAttributes = product.attributes.filter(attr => attr.attributeName === filterKey);

            if (Array.isArray(filterValues)) {
                return matchingAttributes.some(attr => filterValues.includes(attr.attributeValue));
            } else {
                return matchingAttributes.some(attr => attr.attributeValue === filterValues);
            }
        });
    });
    console.log(sortedAndAdvancedFilteredProducts);

    const selectedCategoryObject = categories.find(category => category.id === parseInt(selectedCategory));
    const backgroundUrl = selectedCategory === '1'
        ? '/resurseProiect/AllProducts.webp'
        : `/resurseProiect/${selectedCategoryObject?.name}.webp`;

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
    console.log(filters);
    return (
        <Box sx={{backgroundColor: '#F9F9F9', width: '100%'}}>
            <Box sx={{
                backgroundImage: `url(${backgroundUrl})`,
                minHeight: '60vh',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
            }}>
                <Box sx={{width: 'auto'}}>
                    <Logo logoColor='#F5F4F2'/>
                </Box>
                <Box sx={{padding: '1rem 3rem', color: '#fff'}}>
                    {filters && Object.keys(filters).length > 0 ? (
                        <Typography sx={{fontWeight: 300}}>
                            <Typography sx={{fontSize: '30px'}}>Filters:</Typography>
                            {Object.entries(filters).map(([key, value]) => (
                                <Box key={key}>
                                    {key}: {Array.isArray(value) ? value.join(', ') : value}
                                </Box>
                            ))}
                        </Typography>
                    ) : null}
                </Box>
                <Box sx={{
                    display: 'flex',
                    paddingRight: isMobile ? '0' : '100px',
                    flexDirection: 'column',
                    alignItems: 'flex-end',
                    marginBottom: isMobile ? '20px' : '40px',
                }}>
                    <Box>
                        <Divider sx={{
                            background: '#ffffff',
                            height: '0.1px',
                            width: isMobile ? '150px' : '300px',
                            display: 'block'
                        }}/>
                        <FormControl sx={{backgroundColor: 'transparent', width: isMobile ? '150px' : '300px',}}>
                            <InputLabel sx={{color: '#FFFFFF'}} variant="standard" htmlFor="uncontrolled-native">
                                Filter by Category
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
                        <Divider sx={{
                            background: '#ffffff',
                            height: '0.5px',
                            width: isMobile ? '150px' : '300px',
                            display: 'block'
                        }}/>

                        <FormControl
                            sx={{
                                backgroundColor: 'transparent',
                                width: isMobile ? '150px' : '300px',
                                marginTop: '10px'
                            }}>
                            <InputLabel sx={{color: '#FFFFFF'}} variant="standard" htmlFor="uncontrolled-native">
                                Sort by
                            </InputLabel>
                            <NativeSelect
                                defaultValue={""}
                                inputProps={{
                                    id: 'sort-native',
                                }}
                                sx={{
                                    color: '#FFFFFF',
                                    backgroundColor: 'transparent',
                                    '& .MuiNativeSelect-select:focus': {
                                        backgroundColor: '#ffffff',
                                        color: '#151515'
                                    }
                                }}
                                onChange={handleSortChange}
                            >
                                <option value="default">Default</option>
                                <option value="priceAsc">Price, low to high</option>
                                <option value="priceDesc">Price, high to low</option>
                                <option value="dateAsc">Date, new to old</option>

                            </NativeSelect>
                        </FormControl>
                        <Divider sx={{
                            background: '#ffffff',
                            height: '0.5px',
                            width: isMobile ? '150px' : '300px',
                            display: 'block'
                        }}/>
                        <FilterComponentV2 filters={filters} setFilters={setFilters}/>
                    </Box>
                </Box>
            </Box>
            <Typography sx={{
                fontSize: isMobile ? '2em' : '7em',
                fontWeight: 600,
                color: '#151515'
            }}>{selectedCategory === '1' ? 'ALL PRODUCTS' : selectedCategoryObject?.name.toUpperCase()}
            </Typography>

            <Box sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(150px,550px))',
                justifyContent: 'space-around',
                padding: 1,
                paddingRight: isMobile ? '0px' : '100px',
                rowGap: '20px'
            }}>
                <TransitionGroup component={null}>
                    {sortedAndAdvancedFilteredProducts.length > 0 ? (
                            sortedAndAdvancedFilteredProducts.map(product => (
                                <CSSTransition
                                    key={product.id}
                                    timeout={300}
                                    classNames="fade"
                                >
                                    <ProductBoxPresentation key={product.id} product={product}/>
                                </CSSTransition>
                            ))
                        ) :
                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'flex-start'
                        }}>
                            <Typography sx={{
                                fontSize: isMobile ? '2em' : '3em',
                                fontWeight: 300,
                                color: '#151515',
                                whiteSpace: 'nowrap'
                            }}>
                                NO PRODUCTS FOUND.
                            </Typography>
                        </Box>
                    }
                </TransitionGroup>
            </Box>
        </Box>
    );
}