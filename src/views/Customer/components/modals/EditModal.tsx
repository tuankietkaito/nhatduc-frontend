import { useState } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import Man from '@mui/icons-material/Man';
import Woman from '@mui/icons-material/Woman';
import HomeIcon from '@mui/icons-material/Home';

import { Gender } from '../../../../utils/constants';
import { ICustomer } from '../../../../utils/types';

type Props = {
  customer: ICustomer;
};

const EditModal: React.FC<Props> = ({ customer }) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState<string>(customer.name || '');
  const [birthday, setBirthday] = useState<Date | null>(customer.birthday || null);
  const [gender, setGender] = useState<Gender>(customer.gender || Gender.MALE);
  const [phone, setPhone] = useState<string>(customer.phone || '');
  const [address, setAddress] = useState<string>(customer.address || '');
  const [isEditing, setIsEditing] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleEdit = async () => {
    setIsEditing(true);
    setTimeout(() => {
      console.log(name, gender, birthday, phone, address);
      setIsEditing(false);
      setOpen(false);
    }, 2000);
  };

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        sx={{ mx: 1 }}
        startIcon={<ModeEditIcon />}
        onClick={handleOpen}
      >
        SỬA
      </Button>
      <Modal open={open} onClose={handleClose}>
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
              Thêm Khách Hàng Mới
            </Typography>
            {/* ---------------- Name ---------------- */}
            <TextField
              required
              sx={{ m: '8px !important' }}
              error={!name}
              helperText={!name ? '* Tên Khách hàng không được trống.' : ' '}
              onChange={(e) => {
                setName(e.target.value);
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                )
              }}
              label="Họ & Tên"
              defaultValue={name}
            />
            <Box
              sx={{
                m: 1,
                width: 'calc(100% - 16px)',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between'
              }}
            >
              {/* ---------------- Gender ---------------- */}
              <FormControl sx={{ flex: 1 }}>
                <InputLabel>Giới Tính</InputLabel>
                <Select
                  value={gender}
                  defaultValue={gender}
                  renderValue={(value) => (value === Gender.MALE ? 'Nam' : 'Nữ')}
                  label="Giới Tính"
                  onChange={(event: SelectChangeEvent) => {
                    setGender(event.target.value as Gender);
                  }}
                >
                  <MenuItem value={Gender.MALE}>
                    <Man sx={{ mr: 1 }} />
                    NAM
                  </MenuItem>
                  <MenuItem value={Gender.FEMALE}>
                    <Woman sx={{ mr: 1 }} />
                    NỮ
                  </MenuItem>
                </Select>
              </FormControl>
              {/* ---------------- Birthday ---------------- */}
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Ngày Sinh"
                  value={birthday}
                  inputFormat="dd/MM/yyyy"
                  onChange={(newValue) => {
                    setBirthday(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField sx={{ flex: 1, m: '0 0 0 8px !important' }} {...params} />
                  )}
                />
              </LocalizationProvider>
            </Box>
            {/* ---------------- Phone ---------------- */}
            <TextField
              label="Số Điện Thoại"
              defaultValue={phone}
              onChange={(e) => {
                setPhone(e.target.value);
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LocalPhoneIcon />
                  </InputAdornment>
                )
              }}
            />
            {/* ---------------- Address ---------------- */}
            <TextField
              label="Địa Chỉ"
              defaultValue={address}
              onChange={(e) => {
                setAddress(e.target.value);
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <HomeIcon />
                  </InputAdornment>
                )
              }}
              placeholder="
              1269 Phạm Văn Thuận, P.Thống Nhất, Biên Hòa, Đồng Nai"
            />
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
              sx={{
                borderColor: '#9e9e9e',
                color: '#9e9e9e',
                '&:hover': {
                  borderColor: '#858282',
                  color: '#858282'
                }
              }}
              loading={isEditing}
              onClick={handleClose}
            >
              Huỷ
            </LoadingButton>
          </Box>
        </Box>
        {/* <Box
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
          <Typography
            sx={{ width: 'calc(100% - 16px)', m: 1, textAlign: 'center' }}
            variant="h2"
            gutterBottom
            component="div"
          >
            Xoá khách hàng
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Bạn có chắc xoá khách hàng này không?
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', m: 1 }}>
            <LoadingButton
              variant="contained"
              color="error"
              sx={{ mx: 1 }}
              onClick={handleEdit}
              loading={isDeleteing}
            >
              XOÁ
            </LoadingButton>
            <LoadingButton
              variant="outlined"
              sx={{
                borderColor: '#9e9e9e',
                color: '#9e9e9e',
                '&:hover': {
                  borderColor: '#858282',
                  color: '#858282'
                }
              }}
              loading={isDeleteing}
              onClick={handleClose}
            >
              HUỶ
            </LoadingButton>
          </Box>
        </Box> */}
      </Modal>
    </div>
  );
};
export default EditModal;