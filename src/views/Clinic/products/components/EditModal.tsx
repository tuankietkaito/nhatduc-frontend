import { useState } from 'react';

import AbcIcon from '@mui/icons-material/Abc';
import AutoAwesomeMotionIcon from '@mui/icons-material/AutoAwesomeMotion';
import Grid3x3Icon from '@mui/icons-material/Grid3x3';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import PaidIcon from '@mui/icons-material/Paid';
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import ProductApi from '../../../../api/products.api';
import { storeDispatch } from '../../../../redux-toolkit';
import { updateProduct } from '../../../../redux-toolkit/slices/products';
import { IProduct } from '../../../../utils/types';

type Props = {
  product: IProduct;
};

const EditModal: React.FC<Props> = ({ product }) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState<string>(product.name || '');
  const [code, setCode] = useState<string>(product.code || '');
  const [unit, setUnit] = useState<string>(product.unit || '');
  const [price, setPrice] = useState<string>(product.price.toString());
  const [isEditing, setIsEditing] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleEdit = async () => {
    setIsEditing(true);
    try {
      const updatedProduct = await ProductApi.updateProduct(product._id!, {
        name,
        code,
        unit,
        price: Number(price)
      });
      storeDispatch(updateProduct({ id: product._id!, data: updatedProduct }));
      setIsEditing(false);
      setOpen(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Button
        size="small"
        variant="contained"
        color="primary"
        sx={{ mx: 1 }}
        onClick={handleOpen}
        startIcon={<ModeEditIcon />}
      >
        SỬA
      </Button>
      <Modal open={open} onClose={undefined}>
        <Box
          sx={{
            position: 'absolute' as 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 700,
            bgcolor: 'background.paper',
            borderRadius: 4,
            boxShadow: 24,
            p: 4
          }}
        >
          <Box
            component="form"
            sx={{ '& .MuiTextField-root': { m: 1, width: 'calc(100% - 16px)' } }}
            noValidate
            autoComplete="off"
          >
            <Typography
              sx={{ width: 'calc(100% - 16px)', m: 1, textAlign: 'center' }}
              variant="h2"
              gutterBottom
              component="div"
            >
              Chỉnh sửa thông tin sản phẩm
            </Typography>
            {/* ---------------- Name ---------------- */}
            <TextField
              required
              sx={{ m: '8px !important' }}
              onChange={(e) => {
                setName(e.target.value);
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AbcIcon />
                  </InputAdornment>
                )
              }}
              label="Tên Sản phẩm"
              defaultValue={name}
            />
            <Grid container spacing={2}>
              {/* ---------------- Code ---------------- */}
              <Grid item xs={4}>
                <TextField
                  label="Mã SP"
                  defaultValue={code}
                  onChange={(e) => {
                    setCode(e.target.value);
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Grid3x3Icon />
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
              {/* ---------------- Unit ---------------- */}
              <Grid item xs={4}>
                <TextField
                  label="Đơn vị tính"
                  defaultValue={unit}
                  onChange={(e) => {
                    setUnit(e.target.value);
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AutoAwesomeMotionIcon />
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
              {/* ---------------- Price ---------------- */}
              <Grid item xs={4}>
                <TextField
                  label="Đơn giá"
                  defaultValue={price}
                  value={price}
                  onChange={(e) => {
                    setPrice(e.target.value);
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PaidIcon />
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
            </Grid>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', m: 1 }}>
            <LoadingButton
              loading={isEditing}
              variant="contained"
              color="primary"
              sx={{ mx: 1 }}
              onClick={handleEdit}
            >
              Lưu
            </LoadingButton>
            <LoadingButton
              variant="outlined"
              loading={isEditing}
              sx={{
                borderColor: '#9e9e9e',
                color: '#9e9e9e',
                '&:hover': {
                  borderColor: '#858282',
                  color: '#858282'
                }
              }}
              onClick={handleClose}
            >
              Huỷ
            </LoadingButton>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};
export default EditModal;
