/* eslint-disable no-console */
/* eslint-disable semi */

//~ Licensed by: TrungQuanDev: https://youtube.com/@trungquandev

import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import AxiosInstance from '~/utils/axiosInstance';
import { API_ROOT } from '~/utils/constants';

function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await AxiosInstance.get(`${API_ROOT}/v1/dashboards/access`);

        const userInfoFromLocalStorage = localStorage.getItem('userInfo');
        console.log('Data from API: ' + JSON.stringify(res.data));
        console.log(
          'Data from LocalStorage: ' + JSON.parse(userInfoFromLocalStorage)
        );
        setUser(res.data);
      } catch (error) {
        toast.error(error.response?.data?.message || error?.message);
      }
    };
    fetchData();
  }, []);

  if (!user) {
    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 2,
          width: '100vw',
          height: '100vh',
        }}>
        <CircularProgress />
        <Typography>Loading dashboard user...</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        maxWidth: '1120px',
        marginTop: '1em',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        padding: '0 1em',
      }}>
      <Alert
        severity='info'
        sx={{ '.MuiAlert-message': { overflow: 'hidden' } }}>
        Đây là trang Dashboard sau khi user:&nbsp;
        <Typography
          variant='span'
          sx={{ fontWeight: 'bold', '&:hover': { color: '#fdba26' } }}>
          {user?.email}
        </Typography>
        &nbsp; đăng nhập thành công thì mới cho truy cập vào.
      </Alert>

      <Divider sx={{ my: 2 }} />
    </Box>
  );
}

export default Dashboard;
