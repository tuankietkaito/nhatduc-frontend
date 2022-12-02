import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';

import { RootState } from '../../../redux-toolkit';
import { storeDispatch } from '../../../redux-toolkit/index';
import {
    updateCurrentBillProducts, updateProductQuantity
} from '../../../redux-toolkit/slices/bills';
import { checkPromotion, convertNumberToCurrencyString } from '../../../utils/converter';
import { IProduct } from '../../../utils/types';

const ChosenList = () => {
  const currentBill = useSelector((state: RootState) => state.bills.currentBill);
  const [subTotal, setSubTotal] = useState<number>(
    currentBill.products
      .map((item) => (item.quantity || 1) * item.product.price)
      .reduce((prev, curr) => prev + curr, 0)
  );
  const [promotion, setPromotion] = useState<number>(0);

  useEffect(() => {
    setSubTotal(
      currentBill.products
        .map((item) => (item.quantity || 1) * item.product.price)
        .reduce((prev, curr) => prev + curr, 0)
    );
  }, [currentBill.products]);

  useEffect(() => {
    if (currentBill.customer && currentBill.customer.totalSpend)
      setPromotion(checkPromotion(currentBill.customer.totalSpend));
    else setPromotion(0);
  }, [currentBill.customer]);

  const handleChangeQuantity = (item: { product: IProduct; quantity: number }) => {
    storeDispatch(updateProductQuantity(item));
  };

  const renderItem = (item: { product: IProduct; quantity: number }, idx: number) => {
    const defaultQuantity = item.quantity ? item.quantity : 1;
    return (
      <TableRow key={item.product._id} sx={{ verticalAlign: 'top' }}>
        <TableCell>
          <Typography>{item.product.name}</Typography>
          <Typography sx={{ fontSize: '12px', color: '#949494' }}>{item.product.code}</Typography>
        </TableCell>
        <TableCell align="right">{convertNumberToCurrencyString(item.product.price)} đ</TableCell>
        <TableCell
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-evenly'
          }}
        >
          <IconButton
            size="small"
            sx={{ color: '#f74f43', m: 0, p: 0 }}
            disabled={item.quantity === 1}
            onClick={() => {
              handleChangeQuantity({ ...item, quantity: defaultQuantity - 1 });
            }}
          >
            <RemoveCircleIcon />
          </IconButton>
          <span style={{ margin: '0 5px' }}>{item.quantity}</span>
          <IconButton
            size="small"
            sx={{ color: '#6895f7', m: 0, p: 0 }}
            onClick={() => {
              handleChangeQuantity({ ...item, quantity: defaultQuantity + 1 });
            }}
          >
            <AddCircleIcon />
          </IconButton>
        </TableCell>
        <TableCell align="right">
          {convertNumberToCurrencyString((item.quantity || 1) * item.product.price)} đ
        </TableCell>
        <TableCell align="center">
          <IconButton
            size="small"
            sx={{ color: 'gray', m: 0, p: 0 }}
            onClick={() => {
              storeDispatch(updateCurrentBillProducts({ product: item.product }));
            }}
          >
            <DeleteIcon />
          </IconButton>
        </TableCell>
      </TableRow>
    );
  };

  return (
    <Box
      sx={{
        width: '100%',
        height: '80%',
        mb: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}
    >
      <Box sx={{ height: '70%', overflowY: 'auto' }}>
        <TableContainer component={Paper}>
          <Table
            size="small"
            sx={{
              [`& .${tableCellClasses.root}`]: {
                borderBottom: 'none'
              }
            }}
          >
            <TableHead sx={{ bgcolor: '#e3e1e1' }}>
              <TableRow>
                <TableCell sx={{ width: '35%', fontWeight: 700 }} align="left">
                  Sản phẩm
                </TableCell>
                <TableCell sx={{ width: '20%', fontWeight: 700 }} align="center">
                  Đơn giá
                </TableCell>
                <TableCell sx={{ width: '20%', fontWeight: 700 }} align="center">
                  Số lượng
                </TableCell>
                <TableCell sx={{ width: '20%', fontWeight: 700 }} align="center">
                  Tổng
                </TableCell>
                <TableCell sx={{ width: '5%', fontWeight: 700 }} align="center" />
              </TableRow>
            </TableHead>
            <TableBody>{currentBill.products.map((item, idx) => renderItem(item, idx))}</TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Box sx={{ height: '25%', border: '1px solid #e3e1e1', borderRadius: 2 }}>
        <TableContainer component={Paper}>
          <Table
            size="small"
            sx={{
              [`& .${tableCellClasses.root}`]: {
                borderBottom: 'none'
              }
            }}
          >
            <TableBody>
              <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell align="right">Tổng cộng</TableCell>
                <TableCell align="right" colSpan={2}>
                  {convertNumberToCurrencyString(subTotal)} đ
                </TableCell>
              </TableRow>

              <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell align="right">Khuyến mãi</TableCell>
                <TableCell align="right">{promotion ? `${promotion * 100}%` : `Không`}</TableCell>
                <TableCell align="right">
                  {convertNumberToCurrencyString(promotion * subTotal)} đ
                </TableCell>
              </TableRow>

              <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell align="right">Thành tiền</TableCell>
                <TableCell align="right" colSpan={2} sx={{ fontSize: '20px', fontWeight: 700 }}>
                  {convertNumberToCurrencyString(subTotal * (1 - promotion))} đ
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default ChosenList;
