/* eslint-disable comma-dangle */
/* eslint-disable no-trailing-spaces */
/* eslint-disable no-console */
/* eslint-disable semi */

//~ Licensed by: TrungQuanDev: https://youtube.com/@trungquandev

import { Card as MuiCard } from '@mui/material';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Zoom from '@mui/material/Zoom';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import AxiosInstance from '~/utils/axiosInstance';
import { API_ROOT } from '~/utils/constants';
import TrungQuanDevIcon from '../assets/trungquandev-logo.png';

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const submitLogIn = async (data) => {
    const res = await AxiosInstance.post(`${API_ROOT}/v1/users/login`, data);

    //todo: Get userInfo from response
    const userInfo = {
      id: res.data.id,
      email: res.data.email,
    };

    //todo: Save to LocalStorage
    localStorage.setItem('accessToken', res.data.accessToken);
    localStorage.setItem('refreshToken', res.data.refreshToken);
    localStorage.setItem('userInfo', JSON.stringify(userInfo));

    //todo: Move to Dashboard page
    navigate('/dashboard');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        alignItems: 'center',
        justifyContent: 'flex-start',
        background: 'url("src/assets/trungquandev-bg-img.jpeg")',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        boxShadow: 'inset 0 0 0 2000px rgba(0, 0, 0, 0.4)',
      }}>
      <form onSubmit={handleSubmit(submitLogIn)}>
        <Zoom
          in={true}
          style={{ transitionDelay: '200ms' }}>
          <MuiCard
            sx={{
              minWidth: 380,
              maxWidth: 380,
              marginTop: '6em',
              p: '0.5em 0',
              borderRadius: 2,
            }}>
            <Box sx={{ width: '70px', bgcolor: 'white', margin: '0 auto' }}>
              <img
                src={TrungQuanDevIcon}
                alt='trungquandev'
                width='100%'
              />
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                color: (theme) => theme.palette.grey[500],
              }}>
              <Box>
                <Typography>Hint: luuuydanh123c@gmail.com</Typography>
                <Typography>Pass: Derenluu583221@</Typography>
              </Box>
            </Box>
            <Box sx={{ padding: '0 1em 1em 1em' }}>
              <Box sx={{ marginTop: '1.2em' }}>
                <TextField
                  autoFocus
                  fullWidth
                  label='Enter Email...'
                  type='text'
                  variant='outlined'
                  error={!!errors.email}
                  {...register('email', {
                    required: 'This field is required.',
                  })}
                />
                {errors.email && (
                  <Alert
                    severity='error'
                    sx={{
                      mt: '0.7em',
                      '.MuiAlert-message': { overflow: 'hidden' },
                    }}>
                    {errors.email.message}
                  </Alert>
                )}
              </Box>

              <Box sx={{ marginTop: '1em' }}>
                <TextField
                  fullWidth
                  label='Enter Password...'
                  type='password'
                  variant='outlined'
                  error={!!errors.password}
                  {...register('password', {
                    required: 'This field is required.',
                  })}
                />
                {errors.password && (
                  <Alert
                    severity='error'
                    sx={{
                      mt: '0.7em',
                      '.MuiAlert-message': { overflow: 'hidden' },
                    }}>
                    {errors.password.message}
                  </Alert>
                )}
              </Box>
            </Box>
            <CardActions sx={{ padding: '0.5em 1em 1em 1em' }}>
              <Button
                type='submit'
                variant='contained'
                color='primary'
                size='large'
                fullWidth>
                Login
              </Button>
            </CardActions>
          </MuiCard>
        </Zoom>
      </form>
    </Box>
  );
}

export default Login;