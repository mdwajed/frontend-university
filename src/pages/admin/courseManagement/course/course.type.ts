export interface ICourse {
  _id: string;
  data?: ICourse;
  title: string;
  prefix: string;
  code: number;
  credits: number;
  preRequisiteCourses: PreRequisiteCourse[];
}

export interface PreRequisiteCourse {
  course: string | ICourse;
  isDeleted: boolean;
}

export interface IPagination<T> {
  meta: {
    page: number;
    limit: number;
    total: number;
  };
  data: T[];
}

export interface TCourseModelProps {
  open: boolean;
  onClose: () => void;
  course?: ICourse;
  courseId?: string | null;
  faculty?: string | null;
}
