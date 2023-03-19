import { createTheme } from '@mui/material';

const theme = createTheme({
  typography: {
    fontFamily: ['Nunito', 'Roboto', 'sans-serif'].join(','),
  },
  palette: {
    primary: {
      main: '#519799',
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 800,
      md: 1200,
      lg: 1400,
      xl: 1600,
    },
  },
});

export default theme;
