import { useState } from 'react';

import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CloseIcon from '@mui/icons-material/Close';
import Timeline from '@mui/lab/Timeline';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Paper from '@mui/material/Paper';
import { useTheme } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';

import {
  convertDate,
  convertNumberToCurrencyString,
  convertPhoneNumber
} from '../../../../utils/converter';
import { IBill, ICustomer } from '../../../../utils/types';

type Props = {
  bills: IBill[];
  customer: ICustomer;
};

const BillTable: React.FC<{ bill: IBill }> = ({ bill }) => {
  const subtotal = bill.products.reduce((acc, obj) => {
    return acc + obj.product.price * obj.quantity;
  }, 0);
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small">
        <TableHead sx={{ bgcolor: '#e3e1e1' }}>
          <TableRow>
            <TableCell sx={{ fontWeight: 700, width: '40%' }}>Tên Sản phẩm</TableCell>
            <TableCell sx={{ fontWeight: 700 }} align="center">
              Đơn vị
            </TableCell>
            <TableCell sx={{ fontWeight: 700 }} align="center">
              Đơn Giá
            </TableCell>
            <TableCell sx={{ fontWeight: 700 }} align="center">
              Số lượng
            </TableCell>
            <TableCell sx={{ fontWeight: 700 }} align="center">
              Thành tiền
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {bill.products.map((product) => (
            <TableRow hover key={product.product.code}>
              <TableCell component="th" scope="row">
                <Typography>{product.product.name}</Typography>
                <Typography sx={{ fontSize: '12px', color: '#949494' }}>
                  {product.product.code}
                </Typography>
              </TableCell>
              <TableCell align="center">{product.product.unit}</TableCell>
              <TableCell align="right">
                {convertNumberToCurrencyString(product.product.price)} đ
              </TableCell>
              <TableCell align="center">{product.quantity}</TableCell>
              <TableCell align="right">
                {convertNumberToCurrencyString(product.product.price * product.quantity)} đ
              </TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell rowSpan={3} colSpan={2} />
            <TableCell colSpan={2} sx={{ pr: 1, fontWeight: 700 }}>
              Tổng cộng
            </TableCell>
            <TableCell align="right">{convertNumberToCurrencyString(subtotal)} đ</TableCell>
          </TableRow>
          <TableRow>
            <TableCell sx={{ pr: 1, fontWeight: 700 }}>Khuyến mãi</TableCell>
            <TableCell align="center">
              {bill.discount ? `${(bill.discount * 100).toFixed(0)} %` : 'Không'}
            </TableCell>
            <TableCell align="right">{bill.discount ? subtotal * bill.discount : 0}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={2} sx={{ pr: 1, fontWeight: 700 }}>
              Thành tiền
            </TableCell>
            <TableCell align="right" sx={{ fontWeight: 700 }}>
              {convertNumberToCurrencyString(bill.total)} đ
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const BillsDetailModal: React.FC<Props> = ({ bills, customer }) => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button
        variant="text"
        onClick={handleOpen}
        sx={{ color: '#9c9c9c', '&:hover': { opacity: 0.8 } }}
      >
        Xem chi tiết
      </Button>
      <Modal open={open}>
        <Box
          sx={{
            position: 'absolute' as 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 900,
            bgcolor: 'background.paper',
            borderRadius: 4,
            boxShadow: 24,
            pt: 1,
            px: 4
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              margin: '16px 0'
            }}
          >
            <div>
              <Typography variant="h2" component="div">
                Chi tiết hoá đơn
              </Typography>
              <Typography variant="h4" component="div" sx={{ mt: 1 }}>
                <span style={{ fontWeight: 300 }}>Khách hàng:</span> {customer.name} -{' '}
                {convertPhoneNumber(customer.phone || '')}
              </Typography>
            </div>
            <Button
              variant="outlined"
              sx={{
                height: '30px',
                p: 0,
                borderRadius: 2,
                color: 'gray',
                borderColor: 'gray',
                '&:hover': { opacity: 0.8, color: 'gray', borderColor: 'gray' }
              }}
              onClick={handleClose}
            >
              <CloseIcon fontSize="small" />
            </Button>
          </div>
          <div
            style={{
              maxHeight: '80vh',
              overflow: 'auto',
              padding: '0 5px',
              marginBottom: '25px'
            }}
          >
            <Timeline>
              {bills.map((bill) => (
                <TimelineItem key={bill._id}>
                  <TimelineOppositeContent
                    sx={{ maxWidth: '1px', paddingLeft: '0px', paddingRight: '0px' }}
                  />
                  <TimelineSeparator>
                    <TimelineDot color="primary">
                      <CalendarMonthIcon />
                    </TimelineDot>
                    <TimelineConnector />
                  </TimelineSeparator>
                  <TimelineContent>
                    <Typography
                      variant="h3"
                      sx={{ my: 2, color: theme.palette.primary.dark, fontWeight: 700 }}
                      gutterBottom
                      component="div"
                    >
                      {bill.createdAt ? convertDate(bill.createdAt) : 'Không rõ ngày'}
                    </Typography>
                    <BillTable bill={bill} />
                  </TimelineContent>
                </TimelineItem>
              ))}
            </Timeline>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default BillsDetailModal;
