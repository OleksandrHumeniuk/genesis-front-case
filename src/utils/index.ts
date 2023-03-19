import { Lesson } from '@/types/common/course';

export const parseDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return `${date.getDay()}/${date.getMonth() + 1}/${date.getFullYear()}`;
};

export const parseLessonPoster = (lesson: Lesson): string => {
  return `${lesson.previewImageLink}/lesson-${lesson.order}.webp`;
};

export const parseCourseCover = (previewImageLink: string): string => {
  return `${previewImageLink}/cover.webp`;
};

export const parseTime = (time: number): string => {
  return `${Math.floor(time / 60)} minutes ${time % 60} seconds`;
};

export const sortLessons = (lessons: Lesson[]): Lesson[] => {
  return lessons.sort((lesson1, lesson2) => lesson1.order - lesson2.order);
};
