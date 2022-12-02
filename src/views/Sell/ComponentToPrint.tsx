import React from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';

import {
    convertDate, convertNumberToCurrencyString, convertPhoneNumber
} from '../../utils/converter';
import { IBill, IProduct } from '../../utils/types';

type Props = {
  bill: IBill;
};

const ComponentToPrint: React.FC<Props> = ({ bill }) => {
  const promotion = bill.discount ? bill.discount : 0;
  const subTotal = bill.products
    .map((item) => (item.quantity || 1) * (item.product ? item.product.price : 0))
    .reduce((prev, curr) => prev + curr, 0);

  const renderItem = (item: { product: IProduct; quantity: number }, idx: number) => {
    return item.product ? (
      <TableRow key={item.product._id}>
        <TableCell align="center">{idx + 1}</TableCell>
        <TableCell align="left">
          <div>{item.product.name}</div>
          <div style={{ fontSize: '8px', color: '#949494' }}>{item.product.code}</div>
        </TableCell>
        <TableCell align="center"> {item.product.unit}</TableCell>
        <TableCell align="right">{convertNumberToCurrencyString(item.product.price)} đ</TableCell>
        <TableCell align="center">{item.quantity}</TableCell>
        <TableCell align="right">
          {convertNumberToCurrencyString(item.quantity * item.product.price)} đ
        </TableCell>
      </TableRow>
    ) : (
      <TableRow>
        <TableCell rowSpan={7}>Empty</TableCell>
      </TableRow>
    );
  };

  return (
    <div style={{ padding: '30px' }}>
      <Box
        sx={{
          borderBottom: '1px solid #e3e1e1',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: '15px',
          py: '10px'
        }}
      >
        <div style={{ textAlign: 'center', width: '60%' }}>
          <Typography sx={{ fontWeight: 700, fontSize: '15px' }}>
            PHÒNG KHÁM MẮT NHẬT ĐỨC
          </Typography>
          <Typography sx={{ fontSize: '10px' }}>
            Số 1260 Phạm Văn Thuận, P.Thống Nhất, Tp.Biên Hoà, Đồng Nai
          </Typography>
          <Typography sx={{ fontSize: '10px' }}>Hotline: 0946 386 082</Typography>
        </div>
        <div style={{ width: '40%', textAlign: 'center', fontSize: '10px' }}>
          <Typography sx={{ fontWeight: 700, fontSize: '15px' }}>HOÁ ĐƠN BÁN HÀNG</Typography>
          <Typography sx={{ fontSize: '10px' }}>
            {convertDate(bill.createdAt ? bill.createdAt : new Date(), true)}
          </Typography>
        </div>
      </Box>

      <Box sx={{ border: '1px solid #e3e1e1', padding: '15px', borderRadius: 2 }}>
        <Grid container spacing={1}>
          <Grid item xs={3}>
            <Typography sx={{ fontWeight: 700, fontSize: '10px' }}>Tên khách hàng</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography sx={{ fontSize: '10px' }}>{bill.customer?.name}</Typography>
          </Grid>
          <Grid item xs={1}>
            <Typography sx={{ fontWeight: 700, fontSize: '10px' }}>SĐT</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography sx={{ fontSize: '10px' }}>
              {convertPhoneNumber(bill.customer?.phone || '')}
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography sx={{ fontWeight: 700, fontSize: '10px' }}>Địa chỉ</Typography>
          </Grid>
          <Grid item xs={9}>
            <Typography sx={{ fontSize: '10px' }}>{bill.customer?.address}</Typography>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ marginTop: '30px', fontSize: '10px' }}>
        <TableContainer component={Paper}>
          <Table
            size="small"
            sx={{
              [`& .${tableCellClasses.body}`]: {
                borderColor: '#e0e0e0',
                borderBottomWidth: '0.5px',
                fontSize: '10px',
                padding: '5px'
              },
              [`& .${tableCellClasses.head}`]: {
                borderColor: '#e0e0e0',
                borderBottomWidth: '0.5px',
                fontSize: '10px',
                fontWeight: 700,
                padding: '5px'
              }
            }}
          >
            <TableHead sx={{ bgcolor: '#e3e1e1' }}>
              <TableRow>
                <TableCell align="center">STT</TableCell>
                <TableCell sx={{ width: '30%' }} align="left">
                  Sản phẩm
                </TableCell>
                <TableCell align="center">ĐVT</TableCell>
                <TableCell align="right">Đơn giá</TableCell>
                <TableCell align="center">SL</TableCell>
                <TableCell align="right">Thành tiền</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{bill.products.map((item, idx) => renderItem(item, idx))}</TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Box
        sx={{
          marginTop: '30px',
          height: '25%',
          border: '1px solid #e3e1e1',
          borderRadius: 2,
          padding: '15px'
        }}
      >
        <Grid container spacing={0.5}>
          <Grid item xs={8}>
            <Typography sx={{ fontWeight: 700, textAlign: 'right', fontSize: '10px' }}>
              Tổng cộng
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography sx={{ textAlign: 'right', fontSize: '10px' }}>
              {convertNumberToCurrencyString(subTotal)} đ
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography sx={{ fontWeight: 700, textAlign: 'right', fontSize: '10px' }}>
              Khuyến mãi
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography sx={{ textAlign: 'right', fontSize: '10px' }}>
              {convertNumberToCurrencyString(promotion * subTotal)} đ
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography sx={{ fontWeight: 700, textAlign: 'right', fontSize: '10px' }}>
              THÀNH TIỀN
            </Typography>
          </Grid>
          <Grid item xs={4} sx={{ fontWeight: 700 }}>
            <Typography sx={{ fontWeight: 700, textAlign: 'right', fontSize: '15px' }}>
              {convertNumberToCurrencyString(bill.total ? bill.total : subTotal * (1 - promotion))}{' '}
              đ
            </Typography>
          </Grid>
        </Grid>
      </Box>

      <Box
        sx={{
          marginTop: '30px',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between'
        }}
      >
        <div style={{ width: '40%', textAlign: 'center' }}>
          <Typography sx={{ fontWeight: 700, fontSize: '10px' }}>Chữ ký Người bán</Typography>
          <Typography sx={{ fontStyle: 'italic', fontSize: '10px' }}>
            (Ký và ghi rõ họ tên)
          </Typography>
        </div>
        <div style={{ width: '40%', textAlign: 'center' }}>
          <Typography sx={{ fontWeight: 700, fontSize: '10px' }}>Chữ ký Khách hàng</Typography>
          <Typography sx={{ fontStyle: 'italic', fontSize: '10px' }}>
            (Ký và ghi rõ họ tên)
          </Typography>
        </div>
      </Box>

      <Typography
        sx={{
          fontWeight: 700,
          position: 'absolute',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bottom: '30px',
          textAlign: 'center',
          fontSize: '10px'
        }}
      >
        -- XIN CẢM ƠN QUÝ KHÁCH HÀNG --
      </Typography>
    </div>
  );
};

export default ComponentToPrint;
