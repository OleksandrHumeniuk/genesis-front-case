import { FC } from 'react';

import styles from './CoursesPage.module.scss';
import { Box, Grid, Pagination, Typography } from '@mui/material';
import { useQuery } from 'react-query';
import CourseService from '@/services/course.service';
import CourseCard from '@/components/pages/courses-page/components/course-card';
import Loader from '@/components/common/loader';
import usePagination from '@/hooks/usePagination';
import { useDispatch } from 'react-redux';
import { showToast } from '@/redux/reducers/toast.reducer';
import { TOAST_STATUS } from '@/types/redux/toast';

const CoursesPage: FC = () => {
  const { data, isLoading } = useQuery(
    'courses',
    () => CourseService.getCourses(),
    { refetchOnWindowFocus: false, retry: false },
  );

  const { currentPage, handlePageChange, currentCourses, count } =
    usePagination(10, data?.courses);

  const dispatch = useDispatch();

  if (isLoading) return <Loader />;

  if (!isLoading && !data) {
    dispatch(
      showToast({
        status: TOAST_STATUS.ERROR,
        message: 'Error! Try again later!',
      }),
    );
    return <></>;
  }

  return (
    <Box className={styles.content}>
      <Typography variant="h2" className={styles.header}>
        Featured Courses
      </Typography>
      <Typography className={styles.description}>
        Empower yourself with our dynamic online courses. Genesis team has
        experienced instructors, like Oleksandr Humeniuk, that will guide you
        through each step of your learning journey, helping you to achieve your
        goals and unleash your full potential.
      </Typography>
      <Pagination
        page={currentPage}
        color="primary"
        count={count}
        onChange={handlePageChange}
      />
      <Grid container spacing={2} className={styles.gridWrapper}>
        {currentCourses &&
          currentCourses.map((course, index) => (
            <Grid
              key={index}
              item
              xs={12}
              sm={6}
              md={4}
              xl={3}
              className={styles.gridItem}
            >
              <CourseCard {...course} />
            </Grid>
          ))}
      </Grid>
      <Pagination
        page={currentPage}
        color="primary"
        count={count}
        onChange={handlePageChange}
      />
    </Box>
  );
};

export default CoursesPage;
