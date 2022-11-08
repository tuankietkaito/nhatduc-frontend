import { useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';
import type {} from '@mui/x-date-pickers/themeAugmentation';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers';

import NavigationScroll from './layout/NavigationScroll';
import AppRoutes from './routes';

import theme from './theme';
import { storeDispatch } from './redux-toolkit';
import { fetchAllProducts } from './redux-toolkit/slices/products';
import { fetchAllCustomers } from './redux-toolkit/slices/customers';

const App = () => {
  useEffect(() => {
    const fetchData = async () => {
      storeDispatch(fetchAllProducts());
      storeDispatch(fetchAllCustomers());
    };
    fetchData();
  }, []);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme()}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <CssBaseline />
          <NavigationScroll>
            <AppRoutes />
          </NavigationScroll>
        </LocalizationProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default App;
