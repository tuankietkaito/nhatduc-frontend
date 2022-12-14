import { useState } from 'react';

import AccountCircle from '@mui/icons-material/AccountCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import HomeIcon from '@mui/icons-material/Home';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import Man from '@mui/icons-material/Man';
import Woman from '@mui/icons-material/Woman';
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Modal from '@mui/material/Modal';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import CustomerApi from '../../../../api/customers.api';
import { storeDispatch } from '../../../../redux-toolkit';
import { addCustomer } from '../../../../redux-toolkit/slices/customers';
import { Gender } from '../../../../utils/constants';
import { ICustomer } from '../../../../utils/types';

const NewCustomerModal = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState<string>('');
  const [birthday, setBirthday] = useState<Date | null>(null);
  const [gender, setGender] = useState<Gender>(Gender.MALE);
  const [phone, setPhone] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSave = async () => {
    setLoading(true);
    const inputData: ICustomer = {
      name,
      gender,
      birthday: birthday ? new Date(birthday) : new Date(),
      phone,
      address
    };
    try {
      const newCustomer = await CustomerApi.createNewCustomer(inputData);
      storeDispatch(addCustomer(newCustomer));
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
    handleClose();
  };

  return (
    <div>
      <Tooltip title="Th??m Kh??ch H??ng">
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
              Th??m Kh??ch H??ng M???i
            </Typography>
            {/* ---------------- Name ---------------- */}
            <TextField
              required
              sx={{ m: '8px !important' }}
              error={!name}
              helperText={!name ? '* T??n Kh??ch h??ng kh??ng ???????c tr???ng.' : ' '}
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
              label="H??? & T??n"
              placeholder="Nguy???n V??n A"
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
                <InputLabel>Gi???i T??nh</InputLabel>
                <Select
                  value={gender}
                  renderValue={(value) => (value === Gender.MALE ? 'Nam' : 'N???')}
                  label="Gi???i T??nh"
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
                    N???
                  </MenuItem>
                </Select>
              </FormControl>
              {/* ---------------- Birthday ---------------- */}
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Ng??y Sinh"
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
              label="S??? ??i???n Tho???i"
              placeholder="09xxxxxxxx"
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
              label="?????a Ch???"
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
              1269 Ph???m V??n Thu???n, P.Th???ng Nh???t, Bi??n H??a, ?????ng Nai"
            />
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', m: 1 }}>
            <LoadingButton
              loading={loading}
              variant="contained"
              color="primary"
              sx={{ mx: 1 }}
              onClick={handleSave}
            >
              L??u
            </LoadingButton>
            <Button
              variant="outlined"
              disabled={loading}
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
              Hu???
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default NewCustomerModal;
