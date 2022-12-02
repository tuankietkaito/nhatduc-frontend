import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useReactToPrint } from 'react-to-print';

import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

import BillApi from '../../api/bills.api';
import CustomerSelect, { CustomerSelectType } from '../../components/CustomerSelect';
import { RootState, storeDispatch } from '../../redux-toolkit';
import { addBill } from '../../redux-toolkit/slices/bills';
import { IBill } from '../../utils/types';
import ChosenList from './components/ChosenList';
import ProductsTable from './components/ProductsTable';
import ComponentToPrint from './ComponentToPrint';

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

  const handlePay = async () => {
    if (!bill.customer || bill.products.length === 0) return;
    setLoading(true);

    const inputData: IBill = {
      customer: bill.customer,
      products: bill.products,
      total: bill.products
        .map((item) => (item.quantity || 1) * item.product.price)
        .reduce((prev, curr) => prev + curr, 0)
    };

    setBillToPrint(inputData);
    try {
      const newBill = await BillApi.createNewBill(inputData);
      storeDispatch(addBill(newBill));
      handlePrint();
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
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
                <CustomerSelect type={CustomerSelectType.BILL} defaultUser={bill.customer} />
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
