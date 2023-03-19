import React, { FC } from 'react';
import { Box, Typography } from '@mui/material';

import styles from './Tag.module.scss';
interface TagProps {
  label: string;
}

const Tag: FC<TagProps> = ({ label }) => {
  return (
    <Box className={styles.tagWrapper}>
      <Typography variant="body1" className={styles.tag}>
        {label}
      </Typography>
    </Box>
  );
};

export default Tag;
