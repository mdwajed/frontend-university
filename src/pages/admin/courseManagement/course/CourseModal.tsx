import { Button, Modal } from "antd";
import type { ICourse } from "./course.type";

type TCourseModelProps = {
  open: boolean;
  onClose: () => void;
  course?: ICourse;
};

const CourseIntroModal = ({ course, open, onClose }: TCourseModelProps) => {
  return (
    <Modal
      title="Student Modal"
      open={open}
      onCancel={onClose}
      footer={[
        <Button key="close" onClick={onClose}>
          Cancel
        </Button>,
      ]}
    >
      {course ? (
        <div>
          <p>
            <strong>Name:</strong> {course.title || "N/A"}
          </p>
          <p>
            <strong>Department:</strong> {course.code || "N/A"}
          </p>

          <p>
            <strong>Gender:</strong> {course.prefix || "N/A"}
          </p>
          <p>
            <strong>Contact No:</strong> {course.credits || "N/A"}
          </p>
          <p>
            <strong>PreRequisite Courses : </strong>
            {course.preRequisiteCourses.length > 0
              ? course.preRequisiteCourses
                  .map((item) =>
                    typeof item.course === "string"
                      ? item.course
                      : item.course.title
                  )
                  .join(" , ")
              : "N/A"}
          </p>
        </div>
      ) : (
        <p>No course selected</p>
      )}
    </Modal>
  );
};

export default CourseIntroModal;
