import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers';
import NavigationScroll from './layout/NavigationScroll';
import AppRoutes from './routes';
import type {} from '@mui/x-date-pickers/themeAugmentation';
import theme from './theme';
import { useEffect } from 'react';
import { setAllProducts } from './redux-toolkit/slices/products';
import { setAllCustomers } from './redux-toolkit/slices/customers';
import { data } from './utils/fake-data';
import { storeDispatch } from './redux-toolkit';

function App() {
  useEffect(() => {
    const fetchData = async () => {
      storeDispatch(setAllProducts(data.products));
      storeDispatch(setAllCustomers(data.customers));
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
}

export default App;
