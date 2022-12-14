import { useState } from "react";

import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";

import {
    convertDate, convertNumberToCurrencyString, convertPhoneNumber
} from "../../../utils/converter";
import { IExamination } from "../../../utils/types";

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
    <Box sx={{ maxWidth: '100%' }}>
      <Typography sx={{ my: 1, fontSize: '18px', fontWeight: 700 }}>{title}</Typography>
      <TableContainer component={Paper}>
        <Table
          size="small"
          sx={{
            maxWidth: '100%',
            [`& .${tableCellClasses.body}`]: {
              borderColor: '#e0e0e0',
              borderBottomWidth: '0.5px',
              padding: '5px'
            },
            [`& .${tableCellClasses.head}`]: {
              borderColor: '#e0e0e0',
              borderBottomWidth: '0.5px',
              fontWeight: 700,
              padding: '8px',
              lineHeight: '16px'
            }
          }}
        >
          <TableHead sx={{ bgcolor: '#e3e1e1' }}>
            <TableRow>
              <TableCell />
              <TableCell sx={{ width: '12%' }} align="center">
                C???U <div style={{ fontWeight: 400 }}>(SPH)</div>
              </TableCell>
              <TableCell sx={{ width: '12%' }} align="center">
                TR??? <div style={{ fontWeight: 400 }}>(CYL)</div>
              </TableCell>
              <TableCell sx={{ width: '12%' }} align="center">
                TR???C <div style={{ fontWeight: 400 }}>(AX)</div>
              </TableCell>
              <TableCell sx={{ width: '12%' }} align="center">
                TLCK
              </TableCell>
              <TableCell sx={{ width: '12%' }} align="center">
                TLKK
              </TableCell>
              <TableCell sx={{ width: '12%' }} align="center">
                KC??T <div style={{ fontWeight: 400 }}>(PD)</div>
              </TableCell>
              <TableCell sx={{ width: '12%' }} align="center">
                ADD
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <StyledTableCell component="th" scope="row" align="center">
                M???T PH???I
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
                M???T TR??I
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
          <Typography sx={{ my: 1 }}>C??c ch??? s??? kh??c</Typography>
          {data.otherProperties.map((prop: any) => (
            <Box
              key={`${prop.key}=${prop.value}`}
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
        <TableCell align="left">{row.customer?.name}</TableCell>
        <TableCell align="center">
          {row.customer?.phone ? convertPhoneNumber(row.customer?.phone) : ''}
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
                        {row.customer?.name || ''}
                      </Grid>

                      <Grid item xs={4}>
                        S??T
                      </Grid>
                      <Grid item xs={8} sx={{ fontWeight: 600 }}>
                        {row.customer?.phone ? convertPhoneNumber(row.customer?.phone) : ''}
                      </Grid>

                      <Grid item xs={4}>
                        ?????a ch???
                      </Grid>
                      <Grid item xs={8} sx={{ fontWeight: 600 }}>
                        {row.customer?.address || ''}
                      </Grid>

                      <Grid
                        item
                        xs={12}
                        sx={{ height: '10px', borderBottom: '2px solid #e3e1e1' }}
                      />

                      <Grid item xs={4}>
                        B??c s??
                      </Grid>
                      <Grid item xs={8} sx={{ fontWeight: 600 }}>
                        {row.doctor || ''}
                      </Grid>

                      <Grid item xs={4}>
                        Ph?? kh??m
                      </Grid>
                      <Grid item xs={8} sx={{ fontWeight: 600 }}>
                        {row.fee ? convertNumberToCurrencyString(row.fee) + ' ??' : ''}
                      </Grid>

                      <Grid item xs={4}>
                        Ng??y kh??m
                      </Grid>
                      <Grid item xs={8} sx={{ fontWeight: 600 }}>
                        {row.createdAt ? convertDate(row.createdAt, true) : ''}
                      </Grid>
                    </Grid>
                  </Item>
                </Grid>

                <Grid item xs={8}>
                  <Item>
                    <Box sx={{ mb: 3 }}>{renderExamTable('T???t kh??c x???', row.eyes)}</Box>
                    {renderExamTable('K??nh ??i???u ch???nh', row.glasses)}
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
                        IN HO?? ????N
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
