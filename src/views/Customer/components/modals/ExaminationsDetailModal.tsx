import { useState } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';

import Customers from '../../Customers';

type Props = {
  customerId: string;
};

const ExaminationsDetailModal: React.FC<Props> = ({ customerId }) => {
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
        variant="text"
        onClick={handleOpen}
        sx={{ color: '#9c9c9c', '&:hover': { opacity: 0.8 } }}
      >
        Xem chi tiết
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: 'absolute' as 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 900,
            bgcolor: 'background.paper',
            borderRadius: 4,
            boxShadow: 24,
            p: 4
          }}
        >
          <div
            style={{
              maxHeight: '80vh',
              overflow: 'auto',
              padding: '5px'
            }}
          >
            <Customers />
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default ExaminationsDetailModal;
