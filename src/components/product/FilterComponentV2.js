import React, {useEffect, useState} from "react";
import axios from "axios";
import {Box, Button, Checkbox, FormControl, ListItemText, MenuItem, Modal, Select} from "@mui/material";
import Typography from "@mui/material/Typography";
import {CheckBox} from "@mui/icons-material";
import CloseIcon from '@mui/icons-material/Close';
import {useLocation, useNavigate} from "react-router-dom";

export default function FilterComponentV2({filters, setFilters}) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [productAttribute, setProductAttribute] = useState({
        name: "",
        value: []
    });
    const [openModal, setOpenModal] = useState(false);

    const [uniqueAttributes, setUniqueAttributes] = useState([]);
    const [selectedFilters, setSelectedFilters] = useState({});
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/attribute-values-concrete');
                const data = response.data;

                const attributes = {};
                data.forEach(item => {
                    const {name} = item.productAttributeGenericSummaryDto;
                    const {value} = item.attributeValueGenericResponseDto;

                    if (!attributes[name]) {
                        attributes[name] = new Set();
                    }
                    attributes[name].add(value);
                });

                const formattedAttributes = Object.entries(attributes).map(([key, values]) => ({
                    name: key,
                    values: Array.from(values),
                }));

                setUniqueAttributes(formattedAttributes);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError('Failed to load data');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const newSelectedFilters = {};

        params.forEach((value, key) => {
            if (key.startsWith('filter_')) {
                const attributeName = key.replace('filter_', '');
                newSelectedFilters[attributeName] = value.split(',');
            }
        });

        setSelectedFilters(newSelectedFilters);
    }, [location.search]);

    const handleButtonClick = () => {
        setOpenModal(true);
    }

    const handleClose = () => setOpenModal(false);

    const handleApplyFilters = () => {
        setFilters(selectedFilters);
        setOpenModal(false);

        const params = new URLSearchParams(location.search);

        Object.entries(selectedFilters).forEach(([key, values]) => {
            params.set(`filter_${key}`, values.join(','));
        });

        navigate(`${location.pathname}?${params.toString()}`);
    };

    const handleResetFilters = () => {

        const params = new URLSearchParams(location.search);

        Object.keys(selectedFilters).forEach(key => {
            params.delete(`filter_${key}`);
        });

        setSelectedFilters({});
        setFilters({});

        navigate(`${location.pathname}?${params.toString()}`);
    }
    const handleDropdownChange = (attributeName, event) => {
        if (event.target.value.length === 0) {
            const newFilters = {...selectedFilters};

            delete newFilters[attributeName];

            setSelectedFilters(newFilters);
        } else {
            setSelectedFilters({
                ...selectedFilters,
                [attributeName]: event.target.value,
            });
        }
    };

    if (loading) return <Typography>Loading...</Typography>;
    if (error) return <Typography color="error">{error}</Typography>;

    return (
        <>
            <Button
                type="submit"
                variant="text"
                sx={{
                    mt: 2,
                    fontWeight: 400,
                    fontSize: '20px',
                    backgroundColor: 'transparent',
                    color: '#FFFFFF',
                    boxShadow: 'none',
                    '&:hover': {
                        backgroundColor: '#FFFFFF',
                        color: '#151515',
                        boxShadow: 'none',
                    },
                }}
                onClick={handleButtonClick}
            >
                ADVANCED FILTERS
            </Button>


            <Modal open={openModal} onClose={handleClose}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '90%',
                        maxWidth: '700px',
                        maxHeight: '90vh',
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 4,
                        overflowY: 'auto',
                    }}
                >
                    <CloseIcon sx={{position: 'absolute', right: '5%', cursor: 'pointer'}}
                               onClick={handleClose}
                    />

                    <Typography
                        variant='h5'
                        sx={{
                            fontWeight: 400,
                            color: '#151515',
                            textAlign: 'center',
                            marginBottom: 2,
                        }}
                    >
                        Filter Options
                    </Typography>
                    {uniqueAttributes.map((attribute) => (
                        <FormControl key={attribute.name} fullWidth sx={{marginBottom: 2}}>
                            <Typography variant='subtitle1'>{attribute.name}</Typography>
                            <Select
                                multiple
                                value={selectedFilters[attribute.name] || []}
                                onChange={(event) => handleDropdownChange(attribute.name, event)}
                                renderValue={(selected) => selected.join(', ')}
                            >
                                {attribute.values.map((value) => (
                                    <MenuItem key={value} value={value}>
                                        <Checkbox
                                            checked={selectedFilters[attribute.name]?.includes(value) || false}
                                        />
                                        <ListItemText primary={value}/>
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    ))}
                    <Box
                        sx={{
                            display: 'flex',
                            mt: 2,
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 2,
                        }}
                    >
                        <Button
                            type="submit"
                            variant="text"
                            sx={{
                                fontWeight: 400,
                                fontSize: '20px',
                                backgroundColor: '#151515',
                                color: '#FFFFFF',
                                boxShadow: 'none',
                                '&:hover': {
                                    backgroundColor: '#FFFFFF',
                                    color: '#151515',
                                    boxShadow: 'none',
                                },
                            }}
                            onClick={handleApplyFilters}
                        >
                            Apply Filters
                        </Button>
                        <Button
                            type="submit"
                            variant="text"
                            sx={{
                                fontWeight: 400,
                                fontSize: '20px',
                                backgroundColor: 'transparent',
                                color: '#151515',
                                boxShadow: 'none',
                            }}
                            onClick={handleResetFilters}
                        >
                            Reset Filters
                        </Button>
                    </Box>

                </Box>
            </Modal>

        </>
    )
}