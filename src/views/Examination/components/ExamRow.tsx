import { useState } from 'react';

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

import { IExamination } from '../../../utils/types';
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

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.body}`]: {
    border: '0.5px solid #e3e1e1'
  }
}));

export const renderExamTable = (title: string, data: any) => {
  return (
    <Box>
      <Typography sx={{ my: 1, fontSize: '18px', fontWeight: 700 }}>{title}</Typography>
      <TableContainer component={Paper}>
        <Table
          sx={{
            minWidth: 650,
            [`& .${tableCellClasses.body}`]: {
              borderColor: '#e0e0e0',
              borderBottomWidth: '0.5px',
              padding: '5px'
            },
            [`& .${tableCellClasses.head}`]: {
              borderColor: '#e0e0e0',
              borderBottomWidth: '0.5px',
              fontWeight: 700,
              padding: '5px'
            }
          }}
        >
          <TableHead sx={{ bgcolor: '#e3e1e1' }}>
            <TableRow>
              <TableCell />
              <TableCell sx={{ width: '12%' }} align="center">
                CẦU <div style={{ fontWeight: 400 }}>(SPH)</div>
              </TableCell>
              <TableCell sx={{ width: '12%' }} align="center">
                TRỤ <div style={{ fontWeight: 400 }}>(CYL)</div>
              </TableCell>
              <TableCell sx={{ width: '12%' }} align="center">
                TRỤC <div style={{ fontWeight: 400 }}>(AX)</div>
              </TableCell>
              <TableCell sx={{ width: '12%' }} align="center">
                TLCK
              </TableCell>
              <TableCell sx={{ width: '12%' }} align="center">
                TLKK
              </TableCell>
              <TableCell sx={{ width: '12%' }} align="center">
                KCĐT <div style={{ fontWeight: 400 }}>(PD)</div>
              </TableCell>
              <TableCell sx={{ width: '12%' }} align="center">
                ADD
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <StyledTableCell component="th" scope="row" align="center">
                MẮT PHẢI
              </StyledTableCell>
              <StyledTableCell align="center">{data.sphere?.right || ''}</StyledTableCell>
              <StyledTableCell align="center">{data.cylinder?.right || ''}</StyledTableCell>
              <StyledTableCell align="center">{data.axis?.right || ''}</StyledTableCell>
              <StyledTableCell align="center">
                {data.visualAcuityGlasses?.right || ''}
              </StyledTableCell>
              <StyledTableCell align="center">{data.visualAcuity?.right || ''}</StyledTableCell>
              <StyledTableCell align="center">
                {data.pupillaryDistance?.right || ''}
              </StyledTableCell>
              <StyledTableCell align="center" rowSpan={2}>
                {data.addition || ''}
              </StyledTableCell>
            </TableRow>

            <TableRow>
              <StyledTableCell component="th" scope="row" align="center">
                MẮT TRÁI
              </StyledTableCell>
              <StyledTableCell align="center">{data.sphere?.left || ''}</StyledTableCell>
              <StyledTableCell align="center">{data.cylinder?.left || ''}</StyledTableCell>
              <StyledTableCell align="center">{data.axis?.left || ''}</StyledTableCell>
              <StyledTableCell align="center">
                {data.visualAcuityGlasses?.left || ''}
              </StyledTableCell>
              <StyledTableCell align="center">{data.visualAcuity?.left || ''}</StyledTableCell>
              <StyledTableCell align="center">{data.pupillaryDistance?.left || ''}</StyledTableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      {data.otherProperties?.length && (
        <>
          <Typography sx={{ my: 1 }}>Ghi chú khác</Typography>
          {data.otherProperties.map((prop: any) => (
            <Box
              component="span"
              sx={{ bgcolor: 'white', borderRadius: 1, mr: 2, py: 1, px: 2 }}
            >{`${prop.key}: ${prop.value}`}</Box>
          ))}
        </>
      )}
    </Box>
  );
};

const ExamRow = (props: { row: IExamination }) => {
  const { row } = props;
  const [open, setOpen] = useState(false);

  return (
    <>
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
        <TableCell align="center">{row.doctor}</TableCell>
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
                Thông Tin Chi Tiết
              </Typography>

              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <Item>
                    <Grid container spacing={1}>
                      <Grid item xs={4}>
                        Họ và tên
                      </Grid>
                      <Grid item xs={8} sx={{ fontWeight: 600 }}>
                        {row.customer.name || ''}
                      </Grid>

                      <Grid item xs={4}>
                        SĐT
                      </Grid>
                      <Grid item xs={8} sx={{ fontWeight: 600 }}>
                        {row.customer.phone ? convertPhoneNumber(row.customer.phone) : ''}
                      </Grid>

                      <Grid item xs={4}>
                        Địa chỉ
                      </Grid>
                      <Grid item xs={8} sx={{ fontWeight: 600 }}>
                        {row.customer.address || ''}
                      </Grid>

                      <Grid
                        item
                        xs={12}
                        sx={{ height: '10px', borderBottom: '2px solid #e3e1e1' }}
                      />

                      <Grid item xs={4}>
                        Bác sĩ
                      </Grid>
                      <Grid item xs={8} sx={{ fontWeight: 600 }}>
                        {row.doctor || ''}
                      </Grid>

                      <Grid item xs={4}>
                        Phí khám
                      </Grid>
                      <Grid item xs={8} sx={{ fontWeight: 600 }}>
                        {row.fee ? convertNumberToCurrencyString(row.fee) + ' VNĐ' : ''}
                      </Grid>

                      <Grid item xs={4}>
                        Ngày khám
                      </Grid>
                      <Grid item xs={8} sx={{ fontWeight: 600 }}>
                        {row.createdAt ? convertDate(row.createdAt, true) : ''}
                      </Grid>
                    </Grid>
                  </Item>
                </Grid>

                <Grid item xs={8}>
                  <Item>
                    <Box sx={{ mb: 3 }}>{renderExamTable('Tật khúc xạ', row.eyes)}</Box>
                    {renderExamTable('Kính điều chỉnh', row.glasses)}
                    {/* <Box
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
                        IN HOÁ ĐƠN
                      </Button>
                      <DeleteModal />
                    </Box> */}
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

export default ExamRow;
