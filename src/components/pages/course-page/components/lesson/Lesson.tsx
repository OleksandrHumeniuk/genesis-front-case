import React, { FC, useMemo } from 'react';
import { Lesson as LessonInterface } from '@/types/common/course';
import styles from './Lesson.module.scss';
import {
  Collapse,
  Divider,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import { ExpandMore, Lock } from '@mui/icons-material';
import VideoPlayer from '@/components/common/video-player/VideoPlayer';
import { parseLessonPoster, parseTime } from '@/utils';

interface LessonProps extends LessonInterface {
  value: number;
  currentValue: number;
  setValue: (value: number) => void;
}

const Lesson: FC<LessonProps> = ({
  value,
  currentValue,
  setValue,
  ...lesson
}) => {
  const isOpen = useMemo(() => value === currentValue, [value, currentValue]);
  const isLocked = useMemo(() => lesson.status === 'locked', [lesson.status]);

  const ListIcon = useMemo(() => (isLocked ? Lock : ExpandMore), [isLocked]);
  const handleClick = () => {
    setValue(isOpen ? -1 : value);
  };

  return (
    <ListItem className={styles.wrapper}>
      <ListItemButton
        disabled={isLocked}
        className={styles.header}
        onClick={handleClick}
      >
        <ListItemIcon>
          <ListIcon className={isOpen ? styles.iconRotated : styles.icon} />
        </ListItemIcon>
        <ListItemText className={styles.text}>
          <Typography className={styles.title}>
            {`Lesson ${lesson.order}: ${lesson.title}`}
          </Typography>
          <Typography>{parseTime(lesson.duration)}</Typography>
        </ListItemText>
      </ListItemButton>
      <Divider className={styles.divider} />
      <Collapse
        in={isOpen}
        timeout="auto"
        unmountOnExit
        className={styles.videoWrapper}
      >
        <VideoPlayer
          title={lesson.title}
          poster={parseLessonPoster(lesson)}
          src={lesson.link}
          className={styles.video}
        />
      </Collapse>
    </ListItem>
  );
};

export default Lesson;
