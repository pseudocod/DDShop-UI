import {createTheme} from "@mui/material";
import {theme} from "./theme";

export const formTheme = createTheme({
    ...theme,
    components: {
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: '#FFFFFF', // Default border color
                        },
                        '&:hover fieldset': {
                            borderColor: '#FFFFFF', // Hovered border color
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: '#151515', // Border color when focused
                        },
                    },
                    '& .MuiInputLabel-root': {
                        color: 'gray', // Default label color
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                        color: 'gray', // Label color when focused
                    },
                },
            },
        },
    },
});