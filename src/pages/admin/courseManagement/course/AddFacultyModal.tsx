import { Button, Modal } from "antd";
import { toast } from "sonner";
import UniversityForm from "../../../../components/form/UniversityForm";
import UniversitySelect from "../../../../components/form/UniversitySelect";
import { useAssignFacultiesToCourseMutation } from "../../../../redux/features/admin/AcademicManagementApi";
import { useGetAllFacultyQuery } from "../../../../redux/features/admin/userManagementApi";
import type { TCourseModelProps } from "./course.type";

const AddFacultyModal = ({ courseId, open, onClose }: TCourseModelProps) => {
  console.log(courseId);
  const { data: facultyData, isFetching } = useGetAllFacultyQuery([
    { name: "limit", value: "5" },
  ]);
  const [assignFacultiesToCourse, { isLoading }] =
    useAssignFacultiesToCourseMutation();
  const facultyOptions =
    facultyData?.data.map((item) => ({
      value: item._id,
      label: [item.name.firstName, item.name.middleName, item.name.lastName]
        .filter(Boolean)
        .join(" "),
    })) || [];
  const onsubmit = async (data: { faculties: string[] }) => {
    console.log(data.faculties);
    if (!courseId) {
      console.error("No courseId provided to AddFacultyModal");
      return;
    }
    try {
      await assignFacultiesToCourse({
        courseId,
        faculties: data.faculties,
      }).unwrap();
      toast.success("Faculty added to course Successfully");
      onClose();
    } catch (error) {
      toast.error("Failed to assign faculty to course");
      console.error("Failed to assign faculty:", error);
    }
  };
  return (
    <>
      <Modal
        title="Add Faculty Modal"
        open={open}
        onCancel={onClose}
        footer={null}
      >
        <UniversityForm onSubmit={onsubmit}>
          <UniversitySelect
            name="faculties"
            label="Faculty Name"
            options={facultyOptions}
            disabled={isLoading}
            multiple
          />
          <Button
            type="primary"
            loading={isFetching || isFetching}
            htmlType="submit"
          >
            Submit
          </Button>
        </UniversityForm>
      </Modal>
    </>
  );
};

export default AddFacultyModal;
