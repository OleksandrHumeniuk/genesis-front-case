import React, { FC, useMemo, useState } from 'react';

import { Box, Divider, List, Rating, Typography } from '@mui/material';
import { useQuery } from 'react-query';
import CourseService from '@/services/course.service';
import Loader from '@/components/common/loader';
import { useRouter } from 'next/router';
import {
  AccessTime,
  CalendarToday,
  CastForEducation,
  Check,
} from '@mui/icons-material';
import Lesson from '@/components/pages/course-page/components/lesson/Lesson';
import { parseCourseCover, parseDate, parseTime, sortLessons } from '@/utils';

import styles from './CoursePage.module.scss';
import Tag from '@/components/common/tag';
import IconField from '@/components/pages/course-page/components/icon-field';
import { showToast } from '@/redux/reducers/toast.reducer';
import { TOAST_STATUS } from '@/types/redux/toast';
import { useDispatch } from 'react-redux';

const CoursesPage: FC = () => {
  const { query, push } = useRouter();
  const courseId = query.courseId as string;

  const { data: course, isLoading } = useQuery(
    ['courses', courseId],
    () => CourseService.getCourse(courseId),
    { refetchOnWindowFocus: false, retry: false },
  );

  const lessonText = useMemo(() => {
    const lessonsNum = course?.lessons.length;
    const closedLessonsNum = course?.lessons.filter(
      lesson => lesson.status === 'locked',
    ).length;
    return `${lessonsNum} lessons ${
      closedLessonsNum !== 0 ? `(${closedLessonsNum} locked)` : ''
    }`;
  }, [course]);

  const [openedLesson, setOpenedLesson] = useState(0);
  const dispatch = useDispatch();

  if (isLoading) return <Loader />;

  if (!isLoading && !course) {
    dispatch(
      showToast({
        status: TOAST_STATUS.ERROR,
        message: 'Error! Check validity of courseId and/or try again later!',
      }),
    );
    void push('/');
    return <></>;
  }

  return (
    <div className={styles.wrapper}>
      <Box className={styles.header}>
        <Box className={styles.courseInfo}>
          <Typography variant="h4">{course.title}</Typography>
          <Box className={styles.courseInfoRow}>
            {course.tags.map((tag, index) => (
              <Tag key={index} label={tag} />
            ))}
            <Rating
              readOnly
              defaultValue={course.rating}
              className={styles.rating}
            />
          </Box>
          <Typography className={styles.description}>
            {course.description}
          </Typography>
          <Box className={styles.icons}>
            <IconField
              label={`Launch date: ${parseDate(course.launchDate)}`}
              icon={<CalendarToday color="primary" />}
            />
            <IconField
              label={lessonText}
              icon={<CastForEducation color="primary" />}
            />
            <IconField
              label={parseTime(course.duration)}
              icon={<AccessTime color="primary" />}
            />
          </Box>
        </Box>

        <Box
          className={styles.previewImage}
          component="img"
          alt="course preview"
          src={parseCourseCover(course.previewImageLink)}
        />
      </Box>
      <Divider />

      {course.meta.skills && (
        <Box className={styles.skillsWrapper}>
          <Typography className={styles.skillsHeader}>
            What will you learn:
          </Typography>
          {course.meta.skills.map((skill, index) => (
            <Box key={index} className={styles.skill}>
              <Check color="primary" />
              <Typography>{skill}</Typography>
            </Box>
          ))}
        </Box>
      )}

      <Typography variant="h6" className={styles.lessonsHeader}>
        Lessons
      </Typography>
      <List className={styles.lessonsWrapper}>
        {sortLessons(course.lessons).map((lesson, index) => (
          <Lesson
            key={index}
            value={index}
            currentValue={openedLesson}
            setValue={setOpenedLesson}
            {...lesson}
          />
        ))}
      </List>
    </div>
  );
};

export default CoursesPage;
