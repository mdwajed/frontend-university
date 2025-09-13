import { Button, Modal } from "antd";
import type { TStudentRow } from "./student.type";

type TStudentModalProps = {
  open: boolean;
  onClose: () => void;
  student?: TStudentRow;
};

const StudentIntroModal = ({ student, open, onClose }: TStudentModalProps) => {
  // const { data: studentData } = useGetAllStudentQuery([]);
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
      {student ? (
        <div>
          <img
            src={student.profileImage}
            alt={student.name}
            width={100}
            style={{ borderRadius: "8px", marginBottom: "10px" }}
          />
          <p>
            <strong>Roll Number:</strong> {student.id || "N/A"}
          </p>
          <p>
            <strong>Name:</strong> {student.name || "N/A"}
          </p>
          <p>
            <strong>Department:</strong> {student.academicDepartment || "N/A"}
          </p>
          <p>
            <strong>Faculty:</strong> {student.academicFaculty || "N/A"}
          </p>
          <p>
            <strong>Semester:</strong> {student.admissionSemester || "N/A"}
          </p>
          <p>
            <strong>Gender:</strong> {student.gender || "N/A"}
          </p>
          <p>
            <strong>Contact No:</strong> {student.contactNo || "N/A"}
          </p>
          <p>
            <strong>Emergency Contact No:</strong>{" "}
            {student.emergencyContactNo || "N/A"}
          </p>
          <p>
            <strong>Email:</strong> {student.email || "N/A"}
          </p>
          <p>
            <strong>Blood Group:</strong> {student.bloodGroup || "N/A"}
          </p>
          <p>
            <strong>Guardian:</strong> {student.guardian || "N/A"}
          </p>
          <p>
            <strong>Local Guardian:</strong> {student.localGuardian || "N/A"}
          </p>
          <p>
            <strong>Permanent Address:</strong>{" "}
            {student.permanentAddress || "N/A"}
          </p>
          <p>
            <strong>Present Address:</strong> {student.presentAddress || "N/A"}
          </p>
        </div>
      ) : (
        <p>No student selected</p>
      )}
    </Modal>
  );
};

export default StudentIntroModal;
