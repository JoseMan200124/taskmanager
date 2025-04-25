import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
    palette: {
        primary:   { main: '#1976d2' },
        secondary: { main: '#9c27b0' }
    },
    components: {
        MuiAppBar:    { defaultProps: { elevation: 2 } },
        MuiDrawer:    { defaultProps: { variant: 'permanent' } },
        MuiAccordion: { defaultProps: { square: true } }
    }
});
