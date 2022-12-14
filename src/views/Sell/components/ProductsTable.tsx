import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { RootState, storeDispatch } from '../../../redux-toolkit';
import { updateCurrentBillProducts } from '../../../redux-toolkit/slices/bills';
import { convertNumberToCurrencyString, removeAccents } from '../../../utils/converter';
import { IProduct } from '../../../utils/types';

const ProductsTable = () => {
  const allProducts = useSelector((state: RootState) => state.products.products);
  const chosenItems = useSelector((state: RootState) => state.bills.currentBill.products).map(
    (item) => item.product._id
  );
  const [rows, setRows] = useState(allProducts);

  useEffect(() => {
    setRows(allProducts);
  }, [allProducts]);

  const requestSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchedVal = e.target.value;
    const filteredRows = allProducts.filter((row) => {
      const rowFilter = removeAccents(row.name.toLowerCase()) + row.code.toLowerCase();
      return rowFilter.includes(removeAccents(searchedVal.toLowerCase()));
    });
    setRows(filteredRows);
  };

  const handleAddProduct = (product: IProduct) => {
    storeDispatch(updateCurrentBillProducts({ product }));
  };

  return (
    <div style={{ height: '100%' }}>
      <div
        style={{
          height: '15%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <Typography
          sx={{ verticalAlign: 'middle', my: 1 }}
          variant="h2"
          gutterBottom
          component="div"
        >
          T???o ????n h??ng m???i
        </Typography>
        <Box
          sx={{
            width: '40%',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <TextField
            sx={{ width: '100%', my: 2 }}
            label="T??m ki???m"
            variant="outlined"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                </InputAdornment>
              )
            }}
            onChange={requestSearch}
          />
        </Box>
      </div>

      <div style={{ height: '85%', overflow: 'auto' }}>
        <TableContainer component={Paper}>
          <Table size="small">
            <TableHead sx={{ bgcolor: '#e3e1e1', p: 0, m: 0 }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 700, width: '45%' }}>T??n SP</TableCell>
                <TableCell sx={{ fontWeight: 700 }} align="center">
                  ????n v???
                </TableCell>
                <TableCell sx={{ fontWeight: 700 }} align="right">
                  ????n gi??
                </TableCell>
                <TableCell sx={{ fontWeight: 700 }} align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  hover
                  key={row.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <Typography>{row.name}</Typography>
                    <Typography sx={{ fontSize: '12px', color: '#949494' }}>{row.code}</Typography>
                  </TableCell>
                  <TableCell align="center">{row.unit}</TableCell>
                  <TableCell align="right">{convertNumberToCurrencyString(row.price)} ??</TableCell>
                  <TableCell align="center">
                    {!chosenItems.includes(row._id) ? (
                      <Button
                        variant="contained"
                        size="small"
                        sx={{ color: 'white', fontWeight: 700, width: '100%' }}
                        color="info"
                        onClick={() => {
                          handleAddProduct(row);
                        }}
                      >
                        CH???N
                      </Button>
                    ) : (
                      <Button
                        variant="outlined"
                        size="small"
                        sx={{ fontWeight: 700, width: '100%' }}
                        color="info"
                        onClick={() => {
                          handleAddProduct(row);
                        }}
                      >
                        HU???
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default ProductsTable;
