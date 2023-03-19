import { Course, PreviewCourse } from '@/types/common/course';

export interface GetCoursesResponse {
  courses: PreviewCourse[];
}

export type GetCourseResponse = Course;
