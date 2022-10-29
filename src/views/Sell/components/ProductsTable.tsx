import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import SearchIcon from '@mui/icons-material/Search';

import { RootState, storeDispatch } from '../../../redux-toolkit';
import { convertNumberToCurrencyString, removeAccents } from '../../../utils/converter';
import { updateCurrentBillProducts } from '../../../redux-toolkit/slices/bills';
import { IProduct } from '../../../utils/types';

const ProductsTable = () => {
  const allProducts = useSelector((state: RootState) => state.products.products);
  const chosenItems = useSelector((state: RootState) => state.bills.currentBill.products).map(
    (item) => item.product._id
  );
  const [rows, setRows] = useState(allProducts);

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
          Tạo đơn hàng mới
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
            label="Tìm kiếm"
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
          <Table>
            <TableHead sx={{ bgcolor: '#e3e1e1' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 700 }}>Tên SP</TableCell>
                <TableCell sx={{ fontWeight: 700 }} align="center">
                  Mã SP
                </TableCell>
                <TableCell sx={{ fontWeight: 700 }} align="center">
                  Đơn vị
                </TableCell>
                <TableCell sx={{ fontWeight: 700 }} align="right">
                  Đơn giá
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
                    {row.name}
                  </TableCell>
                  <TableCell align="center">{row.code}</TableCell>
                  <TableCell align="center">{row.unit}</TableCell>
                  <TableCell align="right">
                    {convertNumberToCurrencyString(row.price)} VNĐ
                  </TableCell>
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
                        CHỌN
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
                        HUỶ
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
