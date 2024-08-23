import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {
    Box,
    Button,
    Modal,
    Typography,
    FormControl,
    Select,
    MenuItem,
    Checkbox,
    ListItemText,
} from '@mui/material';

const FilterComponent = () => {
    const [filters, setFilters] = useState({});
    const [uniqueAttributes, setUniqueAttributes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [open, setOpen] = useState(false);
    const [selectedFilters, setSelectedFilters] = useState({}); // For dropdown selection

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

    const handleChange = (attributeName, value) => {
        setFilters(prevFilters => {
            const currentValues = prevFilters[attributeName] || new Set();
            if (currentValues.has(value)) {
                currentValues.delete(value);
            } else {
                currentValues.add(value);
            }
            return {
                ...prevFilters,
                [attributeName]: currentValues,
            };
        });
    };

    const handleDropdownChange = (attributeName, event) => {
        setSelectedFilters({
            ...selectedFilters,
            [attributeName]: event.target.value,
        });
    };

    const handleApplyFilters = () => {
        setFilters(selectedFilters);
        setOpen(false);
    };

    const handleClose = () => setOpen(false);

    if (loading) return <Typography>Loading...</Typography>;
    if (error) return <Typography color="error">{error}</Typography>;

    return (
        <Box>
            <Button variant="contained" onClick={() => setOpen(true)}>Advanced Filters</Button>
            <Modal open={open} onClose={handleClose}>
                <Box sx={{
                    padding: 4,
                    backgroundColor: 'white',
                    borderRadius: '8px',
                    maxWidth: '500px',
                    margin: 'auto',
                    marginTop: '100px'
                }}>
                    <Typography variant="h6">Filter Options</Typography>
                    {uniqueAttributes.map((attribute) => (
                        <FormControl key={attribute.name} fullWidth sx={{marginBottom: 2}}>
                            <Typography variant="subtitle1">{attribute.name}</Typography>
                            <Select
                                multiple
                                value={selectedFilters[attribute.name] || []}
                                onChange={(event) => handleDropdownChange(attribute.name, event)}
                                renderValue={(selected) => selected.join(', ')}
                            >
                                {attribute.values.map((value) => (
                                    <MenuItem key={value} value={value}>
                                        <Checkbox checked={selectedFilters[attribute.name]?.includes(value) || false}/>
                                        <ListItemText primary={value}/>
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    ))}
                    <Button variant="contained" onClick={handleApplyFilters}>Apply Filters</Button>
                </Box>
            </Modal>
        </Box>
    );
};

export default FilterComponent;
