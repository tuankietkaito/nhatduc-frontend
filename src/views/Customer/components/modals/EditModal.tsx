import { useState } from 'react';

import AccountCircle from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import Man from '@mui/icons-material/Man';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
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
import Typography from '@mui/material/Typography';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import CustomerApi from '../../../../api/customers.api';
import { storeDispatch } from '../../../../redux-toolkit';
import { updateCustomer } from '../../../../redux-toolkit/slices/customers';
import { Gender } from '../../../../utils/constants';
import { ICustomer } from '../../../../utils/types';

type Props = {
  customer: ICustomer;
};

const EditModal: React.FC<Props> = ({ customer }) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState<string>(customer.name || '');
  const [birthday, setBirthday] = useState<Date | null>(customer.birthday || new Date());
  const [gender, setGender] = useState<Gender>(customer.gender || Gender.MALE);
  const [phone, setPhone] = useState<string>(customer.phone || '');
  const [address, setAddress] = useState<string>(customer.address || '');
  const [isEditing, setIsEditing] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleEdit = async () => {
    setIsEditing(true);
    try {
      const updatedCustomer = await CustomerApi.updateCustomer(customer._id!, {
        name,
        gender,
        birthday: birthday || new Date(),
        phone,
        address
      });
      storeDispatch(updateCustomer({ id: customer._id!, data: updatedCustomer }));
      setIsEditing(false);
      setOpen(false);
    } catch (err) {
      console.log(err);
    }
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
        S???A
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
                <InputLabel>Gi???i T??nh</InputLabel>
                <Select
                  value={gender}
                  defaultValue={gender}
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
              label="?????a Ch???"
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
              1269 Ph???m V??n Thu???n, P.Th???ng Nh???t, Bi??n H??a, ?????ng Nai"
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
              L??u
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
              Hu???
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
            Xo?? kh??ch h??ng
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            B???n c?? ch???c xo?? kh??ch h??ng n??y kh??ng?
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', m: 1 }}>
            <LoadingButton
              variant="contained"
              color="error"
              sx={{ mx: 1 }}
              onClick={handleEdit}
              loading={isDeleteing}
            >
              XO??
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
              HU???
            </LoadingButton>
          </Box>
        </Box> */}
      </Modal>
    </div>
  );
};
export default EditModal;
