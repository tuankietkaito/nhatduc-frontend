import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { login } from '../../api/auth.api';

const Login = () => {
  const navigate = useNavigate();

  const usernameRef = useRef<HTMLInputElement>();
  const passwordRef = useRef<HTMLInputElement>();

  const handleLogin = async (e: React.MouseEvent) => {
    e.preventDefault();
    const username = usernameRef.current!.value;
    const password = passwordRef.current!.value;
    const res = await login({ username, password });
    if (res.statusCode === 201 && res.payload.accessToken) navigate('/dashboard');
  };

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        minWidth: 600,
        overflow: 'auto',
        backgroundColor: '#e3f2fd'
      }}
    >
      <Box
        sx={{
          width: '35%',
          minWidth: 400,
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: '#FFF',
          boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
          borderRadius: '10px',
          padding: '35px',
          textAlign: 'center'
        }}
      >
        <Typography sx={{ fontWeight: 500, fontSize: 20, margin: '15px' }}>ĐĂNG NHẬP</Typography>
        <TextField
          fullWidth
          required
          label="Username"
          placeholder="Tên đăng nhập"
          margin="normal"
          inputRef={usernameRef}
        />
        <TextField
          fullWidth
          label="Password"
          placeholder="Mật khẩu"
          type="password"
          margin="normal"
          sx={{ marginBottom: '40px' }}
          inputRef={passwordRef}
        />
        <Button variant="contained" onClick={handleLogin}>
          ĐĂNG NHẬP
        </Button>
      </Box>
    </div>
  );
};

export default Login;
