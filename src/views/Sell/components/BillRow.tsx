import { useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import PrintIcon from '@mui/icons-material/Print';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';

import {
    convertDate, convertNumberToCurrencyString, convertPhoneNumber
} from '../../../utils/converter';
import { IBill } from '../../../utils/types';
import ComponentToPrint from '../ComponentToPrint';
import DeleteModal from './DeleteModal';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.primary.light,
  height: '100%',
  padding: theme.spacing(2),
  color: theme.palette.text.primary
}));

const BillRow = (props: { row: IBill }) => {
  const { row } = props;
  const [open, setOpen] = useState(false);

  const subtotal = row.products.reduce((acc, obj) => {
    return obj.product ? acc + obj.product.price * obj.quantity : acc + 0;
  }, 0);

  const componentRef: any = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current
  });

  return (
    <>
      <div style={{ display: 'none' }}>
        <div style={{ height: '210mm', width: '148.5mm', position: 'relative' }} ref={componentRef}>
          <ComponentToPrint bill={row} />
        </div>
      </div>
      <TableRow hover sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => {
              setOpen(!open);
            }}
          >
            {open ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell align="left">{row.customer.name}</TableCell>
        <TableCell align="center">
          {row.customer.phone ? convertPhoneNumber(row.customer.phone) : ''}
        </TableCell>
        <TableCell align="center">{row.discount ? `${row.discount * 100}%` : 'Kh??ng'}</TableCell>
        <TableCell align="right">{convertNumberToCurrencyString(row.total)} ??</TableCell>
        <TableCell align="center">
          {row.createdAt ? convertDate(row.createdAt, true) : ''}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell
          style={{ paddingBottom: 0, paddingTop: 0, backgroundColor: '#FAFAFA' }}
          colSpan={6}
        >
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ my: 2 }}>
              <Typography variant="h5" gutterBottom component="div">
                Th??ng Tin Chi Ti???t
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <Item>
                    <Grid container spacing={1}>
                      <Grid item xs={4}>
                        H??? v?? t??n
                      </Grid>
                      <Grid item xs={8} sx={{ fontWeight: 600 }}>
                        {row.customer.name || ''}
                      </Grid>

                      <Grid item xs={4}>
                        S??T
                      </Grid>
                      <Grid item xs={8} sx={{ fontWeight: 600 }}>
                        {row.customer.phone ? convertPhoneNumber(row.customer.phone) : ''}
                      </Grid>

                      <Grid item xs={4}>
                        ?????a ch???
                      </Grid>
                      <Grid item xs={8} sx={{ fontWeight: 600 }}>
                        {row.customer.address || ''}
                      </Grid>
                    </Grid>
                  </Item>
                </Grid>

                <Grid item xs={8}>
                  <Item>
                    <TableContainer component={Paper}>
                      <Table sx={{ minWidth: 650 }}>
                        <TableHead sx={{ bgcolor: '#e3e1e1' }}>
                          <TableRow>
                            <TableCell sx={{ fontWeight: 700, width: '45%' }}>
                              T??n S???n ph???m
                            </TableCell>
                            <TableCell sx={{ fontWeight: 700 }} align="center">
                              ????n v???
                            </TableCell>
                            <TableCell sx={{ fontWeight: 700 }} align="center">
                              ????n Gi??
                            </TableCell>
                            <TableCell sx={{ fontWeight: 700 }} align="center">
                              S??? l?????ng
                            </TableCell>
                            <TableCell sx={{ fontWeight: 700 }} align="center">
                              Th??nh ti???n
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {row.products.map((product) =>
                            product.product ? (
                              <TableRow hover key={product.product.code}>
                                <TableCell component="th" scope="row">
                                  <Typography>{product.product.name}</Typography>
                                  <Typography sx={{ fontSize: '12px', color: '#949494' }}>
                                    {product.product.code}
                                  </Typography>
                                </TableCell>
                                <TableCell align="center">{product.product.unit}</TableCell>
                                <TableCell align="right">
                                  {convertNumberToCurrencyString(product.product.price)} ??
                                </TableCell>
                                <TableCell align="center">{product.quantity}</TableCell>
                                <TableCell align="right">
                                  {convertNumberToCurrencyString(
                                    product.product.price * product.quantity
                                  )}{' '}
                                  ??
                                </TableCell>
                              </TableRow>
                            ) : (
                              <TableRow hover>
                                <TableCell colSpan={6} align="center">
                                  S???n ph???m kh??ng t???n t???i
                                </TableCell>
                              </TableRow>
                            )
                          )}
                          <TableRow>
                            <TableCell rowSpan={3} colSpan={2} />
                            <TableCell colSpan={2} sx={{ pr: 1, fontWeight: 700 }}>
                              T???ng c???ng
                            </TableCell>
                            <TableCell align="right">
                              {convertNumberToCurrencyString(subtotal)} ??
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell sx={{ pr: 1, fontWeight: 700 }}>Khuy???n m??i</TableCell>
                            <TableCell align="center">
                              {row.discount ? `${(row.discount * 100).toFixed(0)} %` : 'Kh??ng'}
                            </TableCell>
                            <TableCell align="right">
                              {convertNumberToCurrencyString(
                                row.discount ? subtotal * row.discount : 0
                              )}{' '}
                              ??
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell colSpan={2} sx={{ pr: 1, fontWeight: 700 }}>
                              Th??nh ti???n
                            </TableCell>
                            <TableCell align="right" sx={{ fontWeight: 700 }}>
                              {convertNumberToCurrencyString(row.total)} ??
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                    <Box
                      sx={{
                        my: 1,
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'flex-end'
                      }}
                    >
                      <Button
                        variant="contained"
                        onClick={handlePrint}
                        startIcon={<PrintIcon />}
                        sx={{ mr: 1 }}
                      >
                        IN HO?? ????N
                      </Button>
                      <DeleteModal billId={row._id!} />
                    </Box>
                  </Item>
                </Grid>
              </Grid>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export default BillRow;
