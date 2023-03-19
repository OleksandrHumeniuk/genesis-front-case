import { FC } from 'react';
import { AppBar, Box, Link, Toolbar, Typography } from '@mui/material';

import styles from './Header.module.scss';
const Header: FC = () => {
  return (
    <Box>
      <AppBar position="static">
        <Toolbar className={styles.content}>
          <Typography variant="h4">
            <Link underline="none" className={styles.logo} href="/">
              Learnify
            </Link>
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
