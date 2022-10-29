import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import CustomerSelect, { CustomerSelectType } from '../../components/CustomerSelect';
import { renderExamTable } from './components/ExamRow';
import { RootState } from '../../redux-toolkit';
import { data } from './../../utils/fake-data';

const NewExamination = () => {
  const [oldExam, setOldExam] = useState<any>({});
  const currentCustomer = useSelector((state: RootState) => state.examinations.currentExamCustomer);

  useEffect(() => {
    if (currentCustomer) {
      setTimeout(() => {
        setOldExam(data.exams[Math.floor(Math.random() * 8)]);
      }, 1000);
    }
  }, [currentCustomer]);

  return (
    <>
      <Box>
        <Grid container spacing={2}>
          <Grid
            item
            xs={5}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <Typography
              sx={{ verticalAlign: 'middle', my: 1 }}
              variant="h2"
              gutterBottom
              component="div"
            >
              TẠO ĐƠN KHÁM MỚI
            </Typography>
            <Typography sx={{ verticalAlign: 'middle', mt: 3 }} gutterBottom component="div">
              Vui lòng chọn khách hàng bên dưới
            </Typography>
            <CustomerSelect type={CustomerSelectType.EXAMINATION} />
          </Grid>
          <Grid item xs={7}>
            {renderExamTable('Dữ liệu kính cũ', oldExam.eyes ? oldExam.eyes : {})}
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default NewExamination;
