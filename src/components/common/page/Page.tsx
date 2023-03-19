import React, { FC, ReactNode } from 'react';
import { Box } from '@mui/material';
import styles from './Page.module.scss';
import Header from '@/components/common/header';
interface PageProps {
  children?: ReactNode;
}
const Page: FC<PageProps> = ({ children }) => {
  return (
    <Box className={styles.wrapper}>
      <Header />
      <Box className={styles.content}>{children}</Box>
    </Box>
  );
};

export default Page;
