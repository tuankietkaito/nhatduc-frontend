import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Tooltip from '@mui/material/Tooltip';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AbcIcon from '@mui/icons-material/Abc';
import Grid3x3Icon from '@mui/icons-material/Grid3x3';
import AutoAwesomeMotionIcon from '@mui/icons-material/AutoAwesomeMotion';
import PaidIcon from '@mui/icons-material/Paid';

const NewProductModal = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState<string>('');
  const [code, setCode] = useState<string>('');
  const [unit, setUnit] = useState<string>('');
  const [price, setPrice] = useState<string>('');

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleSave = () => {
    console.log(name, code, unit, Number(price));
  };

  return (
    <div>
      <Tooltip title="Thêm Sản Phẩm">
        <Button
          sx={{ height: 50, borderRadius: 3 }}
          onClick={handleOpen}
          variant="contained"
          children={<AddCircleIcon />}
        />
      </Tooltip>
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
              Thêm Sản Phẩm Mới
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
              placeholder="Mắt kính A"
            />
            <Grid container spacing={2}>
              {/* ---------------- Code ---------------- */}
              <Grid item xs={4}>
                <TextField
                  label="Mã SP"
                  placeholder="ABC123"
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
                  defaultValue="chiếc"
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
            <Button variant="contained" color="primary" sx={{ mx: 1 }} onClick={handleSave}>
              Lưu
            </Button>
            <Button
              variant="outlined"
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
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default NewProductModal;
