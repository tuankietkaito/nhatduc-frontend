import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import DeleteIcon from '@mui/icons-material/Delete';

const DeleteModal = () => {
  const [open, setOpen] = useState(false);
  const [isDeleteing, setIsDeleteing] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleDelete = async () => {
    setIsDeleteing(true);
    setTimeout(() => {
      setIsDeleteing(false);
      setOpen(false);
    }, 2000);
  };

  return (
    <div>
      <Button
        size="small"
        variant="outlined"
        sx={{
          borderColor: '#FF6363',
          color: '#FF6363',
          '&:hover': {
            borderColor: '#FF3131',
            color: '#FF3131'
          }
        }}
        onClick={handleOpen}
        startIcon={<DeleteIcon />}
      >
        XOÁ
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
          <Typography
            sx={{ width: 'calc(100% - 16px)', m: 1, textAlign: 'center' }}
            variant="h2"
            gutterBottom
            component="div"
          >
            Xoá sản phẩm
          </Typography>
          <Typography sx={{ mt: 2, fontSize: '20px', textAlign: 'center' }}>
            Bạn có chắc chắn xoá sản phẩm này?
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', m: 1 }}>
            <LoadingButton
              variant="contained"
              color="error"
              sx={{ mx: 1 }}
              onClick={handleDelete}
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
        </Box>
      </Modal>
    </div>
  );
};
export default DeleteModal;
