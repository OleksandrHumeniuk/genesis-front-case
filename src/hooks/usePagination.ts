import { useMemo, useState } from 'react';
import { PreviewCourse } from '@/types/common/course';

const usePagination = (
  pageSize: number,
  courses: PreviewCourse[] | undefined,
) => {
  const [pagination, setPagination] = useState({
    count: 0,
    from: 0,
    to: pageSize,
  });

  const currentCourses = useMemo(
    () => courses?.slice(pagination.from, pagination.to),
    [courses, pagination],
  );

  const [value, setValue] = useState(1);

  const count = useMemo(
    () => Math.ceil((courses?.length || 0) / pageSize),
    [courses?.length, pageSize],
  );

  const handlePageChange = (event: any, page: any) => {
    const from = (page - 1) * pageSize;
    const to = (page - 1) * pageSize + pageSize;
    setPagination({ ...pagination, from: from, to: to });
    setValue(page);
    window.scrollTo({ top: 0 });
  };

  return {
    currentPage: value,
    handlePageChange,
    currentCourses,
    count,
  };
};

export default usePagination;
