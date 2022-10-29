import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import Paper from '@mui/material/Paper';
import Tooltip from '@mui/material/Tooltip';
import Grid from '@mui/material/Grid';
import { useReactToPrint } from 'react-to-print';

import ProductsTable from './components/ProductsTable';
import ChosenList from './components/ChosenList';
import ComponentToPrint from './ComponentToPrint';
import CustomerSelect, { CustomerSelectType } from '../../components/CustomerSelect';
import { RootState } from '../../redux-toolkit';
import { IBill } from '../../utils/types';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height: 'calc(100vh - 130px)'
}));

const NewBill = () => {
  const componentRef: any = useRef();
  const bill = useSelector((state: RootState) => state.bills.currentBill);
  const [billToPrint, setBillToPrint] = useState<IBill | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current
  });

  const handlePay = () => {
    if (!bill.customer || bill.products.length === 0) return;
    setLoading(true);
    // Call API To create a new bill
    setBillToPrint({
      customer: bill.customer,
      products: bill.products,
      total: bill.products
        .map((item) => (item.quantity || 1) * item.product.price)
        .reduce((prev, curr) => prev + curr, 0)
    });
    setTimeout(() => {
      handlePrint();
      setLoading(false);
    }, 1000);
  };

  return (
    <>
      <div style={{ display: 'none' }}>
        <div style={{ height: '210mm', width: '148.5mm', position: 'relative' }} ref={componentRef}>
          {billToPrint && <ComponentToPrint bill={billToPrint} />}
        </div>
      </div>
      <Box sx={{ width: '100%', height: '100%' }}>
        <Grid container spacing={2} sx={{ height: '100%' }}>
          <Grid item xs={6}>
            <Item>
              <ProductsTable />
            </Item>
          </Grid>
          <Grid item xs={6}>
            <Item>
              <Box
                sx={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <CustomerSelect type={CustomerSelectType.BILL} />
                <ChosenList />
                {bill.customer && bill.products.length > 0 ? (
                  <LoadingButton
                    variant="contained"
                    loading={loading}
                    sx={{ width: '100%', height: '7%', fontWeight: 700 }}
                    onClick={handlePay}
                  >
                    THANH TOÁN
                  </LoadingButton>
                ) : (
                  <Tooltip
                    title={
                      <React.Fragment>
                        <Typography sx={{ fontSize: '12px', textAlign: 'center', m: 2 }}>
                          {'Vui lòng chọn khách hàng hoặc sản phẩm để thanh toán'}
                        </Typography>
                      </React.Fragment>
                    }
                  >
                    <LoadingButton
                      variant="contained"
                      loading={loading}
                      sx={{
                        width: '100%',
                        height: '7%',
                        fontWeight: 700,
                        '&:hover': { cursor: 'not-allowed' }
                      }}
                      onClick={handlePay}
                    >
                      THANH TOÁN
                    </LoadingButton>
                  </Tooltip>
                )}
              </Box>
            </Item>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default NewBill;
