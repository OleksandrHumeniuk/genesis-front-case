import instance from '@/services/instance';
import { GetCourseResponse, GetCoursesResponse } from '@/types/services/course';
import getAuthorizationHeader from '@/services/utils';

class Course {
  getCourses = async (): Promise<GetCoursesResponse> => {
    const res = await instance.get(
      `/core/preview-courses`,
      getAuthorizationHeader(),
    );
    return res.data;
  };

  getCourse = async (courseId: string): Promise<GetCourseResponse> => {
    const res = await instance.get(
      `/core/preview-courses/${courseId}`,
      getAuthorizationHeader(),
    );
    return res.data;
  };
}

const CourseService = new Course();

export default CourseService;
