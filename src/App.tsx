import { useEffect } from 'react';

import { CssBaseline, StyledEngineProvider } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import NavigationScroll from './layout/NavigationScroll';
import { storeDispatch } from './redux-toolkit';
import { fetchAllBills } from './redux-toolkit/slices/bills';
import { fetchAllCustomers } from './redux-toolkit/slices/customers';
import { fetchAllExams } from './redux-toolkit/slices/examinations';
import { fetchAllProducts } from './redux-toolkit/slices/products';
import AppRoutes from './routes';
import theme from './theme';

import type {} from '@mui/x-date-pickers/themeAugmentation';
const App = () => {
  useEffect(() => {
    const fetchData = async () => {
      storeDispatch(fetchAllProducts());
      storeDispatch(fetchAllCustomers());
      storeDispatch(fetchAllBills());
      storeDispatch(fetchAllExams());
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
