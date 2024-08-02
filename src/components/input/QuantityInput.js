import * as React from 'react';
import {Unstable_NumberInput as BaseNumberInput} from '@mui/base/Unstable_NumberInput';
import {styled} from '@mui/system';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';

const NumberInput = React.forwardRef(function CustomNumberInput(props, ref) {
    const {onChange, ...otherProps} = props;

    const handleChange = (event, newValue) => {
        if (onChange) {
            onChange(event, newValue);
        }
    };

    return (
        <BaseNumberInput
            {...otherProps}
            slots={{
                root: StyledInputRoot,
                input: StyledInput,
                incrementButton: StyledButton,
                decrementButton: StyledButton,
            }}
            slotProps={{
                incrementButton: {
                    children: <AddIcon fontSize="small"/>,
                    className: 'increment',
                },
                decrementButton: {
                    children: <RemoveIcon fontSize="small"/>,
                },
            }}
            ref={ref}
            onChange={handleChange}
        />
    );
});

export default function QuantityInput() {
    return (
        <NumberInput
            aria-label="Quantity Input"
            min={1}
            max={99}
            onChange={(event, newValue) =>
                console.log(`${event.type} event: the new value is ${newValue}`)
            }
        />
    );
}

const grey = {
    50: '#F3F6F9',
    100: '#E5EAF2',
    200: '#DAE2ED',
    300: '#C7D0DD',
    400: '#B0B8C4',
    500: '#9DA8B7',
    600: '#6B7A90',
    700: '#434D5B',
    800: '#303740',
    900: '#1C2025',
};

const StyledInputRoot = styled('div')`
    font-family: 'IBM Plex Sans', sans-serif;
    font-weight: 400;
    color: ${grey[500]};
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
`;

const StyledInput = styled('input')`
    font-size: 0.875rem;
    font-family: inherit;
    font-weight: 400;
    line-height: 1.375;
    color: #151515;
    background: #ffffff;
    border: 1px solid ${grey[200]};
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.05);
    border-radius: 8px;
    margin: 0 8px;
    padding: 10px 12px;
    outline: 0;
    min-width: 0;
    width: 8rem;
    text-align: center;

    &:hover {
        border-color: #151515;
    }

    &:focus {
        border-color: #151515;
        box-shadow: 0 0 0 3px rgba(21, 21, 21, 0.3);
    }

    &:focus-visible {
        outline: 0;
    }
`;

const StyledButton = styled('button')`
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
    box-sizing: border-box;
    line-height: 1.5;
    border: 1px solid;
    border-radius: 999px;
    border-color: ${grey[200]};
    background: ${grey[50]};
    color: #151515;
    width: 32px;
    height: 32px;
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
    transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 120ms;

    &:hover {
        cursor: pointer;
        background: #151515;
        border-color: #151515;
        color: #ffffff;
    }

    &:focus-visible {
        outline: 0;
    }

    &.increment {
        order: 1;
    }
`;
