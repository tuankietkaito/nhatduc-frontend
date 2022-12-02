import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';

import PersonIcon from '@mui/icons-material/Person';
import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import ListSubheader from '@mui/material/ListSubheader';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';

import { RootState, storeDispatch } from '../redux-toolkit';
import { updateCurrentBillCustomer } from '../redux-toolkit/slices/bills';
import { setCurrentExamCustomer } from '../redux-toolkit/slices/examinations';
import { convertPhoneNumber, removeAccents } from '../utils/converter';
import { ICustomer } from '../utils/types';

export enum CustomerSelectType {
  BILL = 'BILL',
  EXAMINATION = 'EXAMINATION'
}

const CustomerSelect = (props: { type: CustomerSelectType; defaultUser?: ICustomer }) => {
  const { type, defaultUser } = props;
  const allCustomers = useSelector((state: RootState) => state.customers.customers);
  const [chosenCustomerId, setChosenCustomerId] = useState<string | undefined>(
    defaultUser ? defaultUser._id : undefined
  );
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const idx = allCustomers.findIndex((customer) => customer._id === chosenCustomerId);
    switch (type) {
      case CustomerSelectType.BILL: {
        storeDispatch(updateCurrentBillCustomer(allCustomers[idx]));
        break;
      }
      case CustomerSelectType.EXAMINATION: {
        storeDispatch(setCurrentExamCustomer(allCustomers[idx]));
        break;
      }
      default: {
        break;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chosenCustomerId]);

  const containsText = (text: ICustomer, searchText: string) => {
    const rowFilter = removeAccents(text.name.toLowerCase()) + text.phone;
    return rowFilter.includes(removeAccents(searchText.toLowerCase()));
  };

  const displayedOptions = useMemo(
    () => allCustomers.filter((option) => containsText(option, searchText)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [searchText, allCustomers]
  );

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel>Chọn Khách hàng</InputLabel>
        <Select
          MenuProps={{ autoFocus: false }}
          value={chosenCustomerId}
          label="Chọn Khách hàng"
          onChange={(e) => setChosenCustomerId(e.target.value)}
          onClose={() => setSearchText('')}
          defaultValue={defaultUser ? defaultUser._id : undefined}
          error={!chosenCustomerId}
          renderValue={() => {
            const idx = allCustomers.findIndex((i) => i._id === chosenCustomerId);
            return (
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <PersonIcon sx={{ mr: 2 }} />
                {`${allCustomers[idx].name} - ${convertPhoneNumber(allCustomers[idx].phone!)}`}
              </div>
            );
          }}
        >
          <ListSubheader>
            <TextField
              size="medium"
              variant="standard"
              autoFocus
              placeholder="Nhập Tên hoặc SĐT"
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                )
              }}
              onChange={(e) => setSearchText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key !== 'Escape') {
                  e.stopPropagation();
                }
              }}
            />
          </ListSubheader>
          {displayedOptions.map((option, i) => (
            <MenuItem key={i} value={option._id}>
              <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                <PersonIcon sx={{ mr: 2 }} />
                <div
                  style={{
                    display: 'flex',
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <span>{option.name}</span>
                  <span>{convertPhoneNumber(option.phone!)}</span>
                </div>
              </div>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default CustomerSelect;
