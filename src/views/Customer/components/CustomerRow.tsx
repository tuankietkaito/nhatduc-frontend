import { useEffect, useState } from 'react';

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import TableCell from '@mui/material/TableCell';
import Grid from '@mui/material/Grid';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import LoadingButton from '@mui/lab/LoadingButton';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Man from '@mui/icons-material/Man';
import Woman from '@mui/icons-material/Woman';

import DeleteModal from './modals/DeleteModal';
import EditModal from './modals/EditModal';
import BillsDetailModal from './modals/BillsDetailModal';
import ExaminationsDetailModal from './modals/ExaminationsDetailModal';

import { IBill, ICustomer } from '../../../utils/types';
import { Gender } from '../../../utils/constants';
import {
  convertDate,
  convertNumberToCurrencyString,
  convertPhoneNumber
} from '../../../utils/converter';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.primary.light,
  height: '100%',
  padding: theme.spacing(2),
  color: theme.palette.text.primary
}));

const CustomerRow = (props: { row: ICustomer }) => {
  const { row } = props;
  const [bills, setBills] = useState<IBill[]>([]);
  const [totalBills, setTotalBills] = useState<number>(0);
  const [exam, setExam] = useState<IBill[]>([]);
  const [totalExam, setTotalExam] = useState<number>(0);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setTotalBills(
      bills.reduce((acc, obj) => {
        return acc + obj.total;
      }, 0)
    );
  }, [bills]);

  const onClickExpand = async () => {
    setLoading(true);
    setTimeout(() => {
      setBills([
        {
          customer: { name: 'Tuấn Kiệt' },
          products: [
            { product: { name: 'Mắt kính A', code: 'A', unit: 'cái', price: 800000 }, quantity: 1 },
            { product: { name: 'Mắt kính B', code: 'B', unit: 'cái', price: 650000 }, quantity: 1 }
          ],
          total: 1450000,
          createdAt: new Date('2022-03-02T00:00:00')
        },
        {
          customer: { name: 'Tuấn Kiệt' },
          products: [
            {
              product: { name: 'Mắt kính D', code: 'D', unit: 'cái', price: 1000000 },
              quantity: 1
            },
            { product: { name: 'Mắt kính F', code: 'F', unit: 'cái', price: 900000 }, quantity: 1 },
            { product: { name: 'Mắt kính B', code: 'B', unit: 'cái', price: 650000 }, quantity: 1 }
          ],
          total: 2550000,
          createdAt: new Date('2021-12-22T00:00:00')
        }
      ]);
      setLoading(false);
    }, 2000);
  };

  return (
    <>
      <TableRow hover sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => {
              setOpen(!open);
              onClickExpand();
            }}
          >
            {open ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="center">
          {row.gender === Gender.MALE ? (
            <Man sx={{ color: '#6566ba' }} />
          ) : (
            <Woman sx={{ color: '#cc70c4' }} />
          )}
        </TableCell>
        <TableCell align="center">{convertPhoneNumber(row.phone || '')}</TableCell>
        <TableCell align="center">{convertDate(row.birthday || new Date())}</TableCell>
        <TableCell align="left">{row.address}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell
          style={{ paddingBottom: 0, paddingTop: 0, backgroundColor: '#FAFAFA' }}
          colSpan={6}
        >
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ my: 2 }}>
              <Typography variant="h5" gutterBottom component="div">
                Thông Tin Chi Tiết
              </Typography>
              {!loading && (
                <Grid container spacing={2}>
                  <Grid item xs={2} sx={{ textAlign: 'center', position: 'relative' }}>
                    <AccountCircleIcon
                      sx={{
                        fontSize: 60,
                        position: 'absolute' as 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        color: row.gender === Gender.MALE ? '#6566ba' : '#cc70c4'
                      }}
                    />
                  </Grid>

                  <Grid item xs={5}>
                    <Item>
                      <Grid container spacing={1}>
                        <Grid item xs={6} sx={{ textAlign: 'right' }}>
                          Tổng tiền khám mắt
                        </Grid>
                        <Grid item xs={6} sx={{ fontWeight: 600 }}>
                          {convertNumberToCurrencyString(totalExam)} VNĐ
                        </Grid>

                        <Grid item xs={6} sx={{ textAlign: 'right' }}>
                          Tổng tiền mua kính
                        </Grid>
                        <Grid item xs={6} sx={{ fontWeight: 600 }}>
                          {convertNumberToCurrencyString(totalBills)} VNĐ
                        </Grid>

                        <Grid item xs={6} sx={{ textAlign: 'right', fontWeight: 600 }}>
                          Tổng cộng
                        </Grid>
                        <Grid item xs={6} sx={{ fontWeight: 600, color: 'red' }}>
                          {convertNumberToCurrencyString(totalExam + totalBills)} VNĐ
                        </Grid>
                      </Grid>
                    </Item>
                  </Grid>

                  <Grid item xs={5}>
                    <Item>
                      <Grid container spacing={1}>
                        <Grid item xs={4} sx={{ textAlign: 'right' }}>
                          Khám Mắt
                        </Grid>
                        <Grid item xs={4} sx={{ textAlign: 'center' }}>
                          {exam.length} lần
                        </Grid>
                        <ExaminationsDetailModal customerId="abc" />

                        <Grid item xs={4} sx={{ textAlign: 'right' }}>
                          Mua Kính
                        </Grid>
                        <Grid item xs={4} sx={{ textAlign: 'center' }}>
                          {bills.length} lần
                        </Grid>
                        <BillsDetailModal bills={bills} customer={row} />
                      </Grid>
                    </Item>
                  </Grid>
                </Grid>
              )}
              {loading && (
                <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                  <LoadingButton
                    sx={{ alignItems: 'center', height: '50px', margin: '5px 0' }}
                    loading
                    variant="text"
                  />
                </div>
              )}

              <Box
                sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', my: 1 }}
              >
                <EditModal customer={row} />
                <DeleteModal custId={row._id!} />
              </Box>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export default CustomerRow;
