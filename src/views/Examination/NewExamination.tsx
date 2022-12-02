import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import CustomerSelect, { CustomerSelectType } from '../../components/CustomerSelect';
import { RootState } from '../../redux-toolkit';
import { data } from '../../utils/fake-data';
import { renderExamTable } from './components/ExamRow';
import InputTable from './components/InputTable';

const NewExamination = () => {
  const currentExam = useSelector((state: RootState) => state.examinations.currentExam);

  const [oldExam, setOldExam] = useState<any>({});

  useEffect(() => {
    if (currentExam?.customer) {
      setTimeout(() => {
        setOldExam(data.exams[Math.floor(Math.random() * 8)]);
      }, 1000);
    }
  }, [currentExam]);

  return (
    <>
      <Grid container spacing={4}>
        <Grid
          item
          xs={7}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}
        >
          <Box sx={{ width: '100%' }}>
            <Typography
              sx={{ verticalAlign: 'middle', my: 2 }}
              variant="h2"
              gutterBottom
              component="div"
            >
              TẠO ĐƠN KHÁM MỚI
            </Typography>
            <CustomerSelect
              type={CustomerSelectType.EXAMINATION}
              defaultUser={currentExam?.customer}
            />
            <InputTable type={1} />
            <InputTable type={2} />
          </Box>
        </Grid>
        <Grid item xs={5}>
          <Box>
            {renderExamTable('Dữ liệu 1', oldExam.eyes ? oldExam.eyes : {})}
            {renderExamTable('Dữ liệu 2', oldExam.eyes ? oldExam.eyes : {})}
            {renderExamTable('Dữ liệu 3', oldExam.eyes ? oldExam.eyes : {})}
            {renderExamTable('Dữ liệu 4', oldExam.eyes ? oldExam.eyes : {})}
            {renderExamTable('Dữ liệu 5', oldExam.eyes ? oldExam.eyes : {})}
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default NewExamination;
