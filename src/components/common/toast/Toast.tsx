import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { Alert, Snackbar } from '@mui/material';

import useAppSelector from '@/hooks/useAppSelector';
import { hideToast } from '@/redux/reducers/toast.reducer';
import styles from './Toast.module.scss';
const Toast: FC = () => {
  const { open, message, status } = useAppSelector(state => state.toast);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(hideToast());
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={10000}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
    >
      <Alert
        severity={status}
        onClose={handleClose}
        variant="filled"
        className={styles.alert}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Toast;
