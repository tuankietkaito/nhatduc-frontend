import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import Box from "@mui/material/Box";
import { InputBaseComponentProps } from "@mui/material/InputBase";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import { RootState } from "../../../redux-toolkit";
import { storeDispatch } from "../../../redux-toolkit/index";
import { setCurrentExam } from "../../../redux-toolkit/slices/examinations";
import { ExamProperties } from "../../../utils/types";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.body}`]: {
    border: 'none'
  }
}));

const InputTable = (props: { type: number }) => {
  const { type } = props;
  const inputProps: InputBaseComponentProps = {
    min: 0,
    style: { textAlign: 'center', padding: '8px' }
  };
  const currentExam = useSelector((state: RootState) => state.examinations.currentExam);

  const [eyesInput, setEyesInput] = useState<ExamProperties>(currentExam?.eyes || {});
  const [glassesInput, setGlassesInput] = useState<ExamProperties>(currentExam?.glasses || {});

  useEffect(() => {
    storeDispatch(setCurrentExam({ glasses: glassesInput }));
  }, [glassesInput]);

  useEffect(() => {
    storeDispatch(setCurrentExam({ eyes: eyesInput }));
  }, [eyesInput]);

  return (
    <Box sx={{ maxWidth: '100%', mt: '10px', mb: '40px' }}>
      <Typography sx={{ my: 1, fontSize: '18px', fontWeight: 700 }}>
        {type === 1 ? 'Tật khúc xạ' : 'Kính điều chỉnh'}
      </Typography>

      <TableContainer component={Paper}>
        <Table
          size="small"
          sx={{
            maxWidth: '100%',
            [`& .${tableCellClasses.body}`]: {
              borderColor: '#e0e0e0',
              borderBottomWidth: '0.5px',
              padding: '5px'
            },
            [`& .${tableCellClasses.head}`]: {
              borderColor: '#e0e0e0',
              borderBottomWidth: '0.5px',
              fontWeight: 700,
              padding: '8px',
              lineHeight: '16px'
            }
          }}
        >
          <TableHead sx={{ bgcolor: '#e3e1e1' }}>
            <TableRow>
              <TableCell />
              <TableCell sx={{ width: '12%' }} align="center">
                CẦU <div style={{ fontWeight: 400 }}>(SPH)</div>
              </TableCell>
              <TableCell sx={{ width: '12%' }} align="center">
                TRỤ <div style={{ fontWeight: 400 }}>(CYL)</div>
              </TableCell>
              <TableCell sx={{ width: '12%' }} align="center">
                TRỤC <div style={{ fontWeight: 400 }}>(AX)</div>
              </TableCell>
              <TableCell sx={{ width: '12%' }} align="center">
                TLCK
              </TableCell>
              <TableCell sx={{ width: '12%' }} align="center">
                TLKK
              </TableCell>
              <TableCell sx={{ width: '12%' }} align="center">
                KCĐT <div style={{ fontWeight: 400 }}>(PD)</div>
              </TableCell>
              <TableCell sx={{ width: '12%' }} align="center">
                ADD
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <StyledTableCell component="th" scope="row" align="center">
                MẮT PHẢI
              </StyledTableCell>
              <StyledTableCell align="center">
                <TextField
                  inputProps={inputProps}
                  defaultValue={eyesInput.sphere?.right}
                  onChange={(e) => {
                    if (type === 1)
                      setEyesInput((curr: ExamProperties) => ({
                        ...curr,
                        sphere: { ...curr.sphere, right: Number(e.currentTarget.value) }
                      }));
                    else
                      setGlassesInput((curr: ExamProperties) => ({
                        ...curr,
                        sphere: { ...curr.sphere, right: Number(e.currentTarget.value) }
                      }));
                  }}
                />
              </StyledTableCell>
              <StyledTableCell align="center">
                <TextField
                  inputProps={inputProps}
                  defaultValue={eyesInput.cylinder?.right}
                  onChange={(e) => {
                    if (type === 1)
                      setEyesInput((curr: ExamProperties) => ({
                        ...curr,
                        cylinder: { ...curr.cylinder, right: Number(e.currentTarget.value) }
                      }));
                    else
                      setGlassesInput((curr: ExamProperties) => ({
                        ...curr,
                        cylinder: { ...curr.cylinder, right: Number(e.currentTarget.value) }
                      }));
                  }}
                />
              </StyledTableCell>
              <StyledTableCell align="center">
                <TextField
                  inputProps={inputProps}
                  defaultValue={eyesInput.axis?.right}
                  onChange={(e) => {
                    if (type === 1)
                      setEyesInput((curr: ExamProperties) => ({
                        ...curr,
                        axis: { ...curr.axis, right: Number(e.currentTarget.value) }
                      }));
                    else
                      setGlassesInput((curr: ExamProperties) => ({
                        ...curr,
                        axis: { ...curr.axis, right: Number(e.currentTarget.value) }
                      }));
                  }}
                />
              </StyledTableCell>
              <StyledTableCell align="center">
                <TextField
                  inputProps={inputProps}
                  defaultValue={eyesInput.visualAcuityGlasses?.right}
                  onChange={(e) => {
                    if (type === 1)
                      setEyesInput((curr: ExamProperties) => ({
                        ...curr,
                        visualAcuityGlasses: {
                          ...curr.visualAcuityGlasses,
                          right: Number(e.currentTarget.value)
                        }
                      }));
                    else
                      setGlassesInput((curr: ExamProperties) => ({
                        ...curr,
                        visualAcuityGlasses: {
                          ...curr.visualAcuityGlasses,
                          right: Number(e.currentTarget.value)
                        }
                      }));
                  }}
                />
              </StyledTableCell>
              <StyledTableCell align="center">
                <TextField
                  inputProps={inputProps}
                  defaultValue={eyesInput.visualAcuity?.right}
                  onChange={(e) => {
                    if (type === 1)
                      setEyesInput((curr: ExamProperties) => ({
                        ...curr,
                        visualAcuity: {
                          ...curr.visualAcuity,
                          right: Number(e.currentTarget.value)
                        }
                      }));
                    else
                      setGlassesInput((curr: ExamProperties) => ({
                        ...curr,
                        visualAcuity: {
                          ...curr.visualAcuity,
                          right: Number(e.currentTarget.value)
                        }
                      }));
                  }}
                />
              </StyledTableCell>
              <StyledTableCell align="center">
                <TextField
                  inputProps={inputProps}
                  defaultValue={eyesInput.pupillaryDistance?.right}
                  onChange={(e) => {
                    if (type === 1)
                      setEyesInput((curr: ExamProperties) => ({
                        ...curr,
                        pupillaryDistance: {
                          ...curr.pupillaryDistance,
                          right: Number(e.currentTarget.value)
                        }
                      }));
                    else
                      setGlassesInput((curr: ExamProperties) => ({
                        ...curr,
                        pupillaryDistance: {
                          ...curr.pupillaryDistance,
                          right: Number(e.currentTarget.value)
                        }
                      }));
                  }}
                />
              </StyledTableCell>
              <StyledTableCell align="center" rowSpan={2}>
                <TextField
                  inputProps={inputProps}
                  defaultValue={eyesInput.addition}
                  onChange={(e) => {
                    if (type === 1)
                      setEyesInput((curr: ExamProperties) => ({
                        ...curr,
                        addition: Number(e.currentTarget.value)
                      }));
                    else
                      setGlassesInput((curr: ExamProperties) => ({
                        ...curr,
                        addition: Number(e.currentTarget.value)
                      }));
                  }}
                />
              </StyledTableCell>
            </TableRow>

            <TableRow>
              <StyledTableCell component="th" scope="row" align="center">
                MẮT TRÁI
              </StyledTableCell>
              <StyledTableCell align="center">
                <TextField
                  inputProps={inputProps}
                  defaultValue={eyesInput.sphere?.left}
                  onChange={(e) => {
                    if (type === 1)
                      setEyesInput((curr: ExamProperties) => ({
                        ...curr,
                        sphere: { ...curr.sphere, left: Number(e.currentTarget.value) }
                      }));
                    else
                      setGlassesInput((curr: ExamProperties) => ({
                        ...curr,
                        sphere: { ...curr.sphere, left: Number(e.currentTarget.value) }
                      }));
                  }}
                />
              </StyledTableCell>
              <StyledTableCell align="center">
                <TextField
                  inputProps={inputProps}
                  defaultValue={eyesInput.cylinder?.left}
                  onChange={(e) => {
                    if (type === 1)
                      setEyesInput((curr: ExamProperties) => ({
                        ...curr,
                        cylinder: { ...curr.cylinder, left: Number(e.currentTarget.value) }
                      }));
                    else
                      setGlassesInput((curr: ExamProperties) => ({
                        ...curr,
                        cylinder: { ...curr.cylinder, left: Number(e.currentTarget.value) }
                      }));
                  }}
                />
              </StyledTableCell>
              <StyledTableCell align="center">
                <TextField
                  inputProps={inputProps}
                  defaultValue={eyesInput.axis?.left}
                  onChange={(e) => {
                    if (type === 1)
                      setEyesInput((curr: ExamProperties) => ({
                        ...curr,
                        axis: { ...curr.axis, left: Number(e.currentTarget.value) }
                      }));
                    else
                      setGlassesInput((curr: ExamProperties) => ({
                        ...curr,
                        axis: { ...curr.axis, left: Number(e.currentTarget.value) }
                      }));
                  }}
                />
              </StyledTableCell>
              <StyledTableCell align="center">
                <TextField
                  inputProps={inputProps}
                  defaultValue={eyesInput.visualAcuityGlasses?.left}
                  onChange={(e) => {
                    if (type === 1)
                      setEyesInput((curr: ExamProperties) => ({
                        ...curr,
                        visualAcuityGlasses: {
                          ...curr.visualAcuityGlasses,
                          left: Number(e.currentTarget.value)
                        }
                      }));
                    else
                      setGlassesInput((curr: ExamProperties) => ({
                        ...curr,
                        visualAcuityGlasses: {
                          ...curr.visualAcuityGlasses,
                          left: Number(e.currentTarget.value)
                        }
                      }));
                  }}
                />
              </StyledTableCell>
              <StyledTableCell align="center">
                <TextField
                  inputProps={inputProps}
                  defaultValue={eyesInput.visualAcuity?.left}
                  onChange={(e) => {
                    if (type === 1)
                      setEyesInput((curr: ExamProperties) => ({
                        ...curr,
                        visualAcuity: {
                          ...curr.visualAcuity,
                          left: Number(e.currentTarget.value)
                        }
                      }));
                    else
                      setGlassesInput((curr: ExamProperties) => ({
                        ...curr,
                        visualAcuity: {
                          ...curr.visualAcuity,
                          left: Number(e.currentTarget.value)
                        }
                      }));
                  }}
                />
              </StyledTableCell>
              <StyledTableCell align="center">
                <TextField
                  inputProps={inputProps}
                  defaultValue={eyesInput.pupillaryDistance?.left}
                  onChange={(e) => {
                    if (type === 1)
                      setEyesInput((curr: ExamProperties) => ({
                        ...curr,
                        pupillaryDistance: {
                          ...curr.pupillaryDistance,
                          left: Number(e.currentTarget.value)
                        }
                      }));
                    else
                      setGlassesInput((curr: ExamProperties) => ({
                        ...curr,
                        pupillaryDistance: {
                          ...curr.pupillaryDistance,
                          left: Number(e.currentTarget.value)
                        }
                      }));
                  }}
                />
              </StyledTableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      {/* <Box>
        {(type === 1 ? eyesInput?.otherProperties || [] : glassesInput.otherProperties || []).map(
          (prop) => (
            <div>{prop.key}</div>
          )
        )}
        <IconButton onClick={}>
          <AddCircleIcon />
        </IconButton>
      </Box> */}
    </Box>
  );
};

export default InputTable;
