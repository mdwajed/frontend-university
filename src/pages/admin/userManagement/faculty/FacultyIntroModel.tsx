import { Button, Modal } from "antd";
import type { TFacultyRow } from "./faculty.type";

type TFacultyModelProps = {
  open: boolean;
  onClose: () => void;
  faculty?: TFacultyRow;
};

const FacultyIntroModal = ({ faculty, open, onClose }: TFacultyModelProps) => {
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
      {faculty ? (
        <div>
          <img
            src={faculty.profileImage}
            alt={faculty.name}
            width={100}
            style={{ borderRadius: "8px", marginBottom: "10px" }}
          />
          <p>
            <strong>Roll Number:</strong> {faculty.id || "N/A"}
          </p>
          <p>
            <strong>Name:</strong> {faculty.name || "N/A"}
          </p>
          <p>
            <strong>Department:</strong> {faculty.academicDepartment || "N/A"}
          </p>

          <p>
            <strong>Gender:</strong> {faculty.gender || "N/A"}
          </p>
          <p>
            <strong>Contact No:</strong> {faculty.contactNo || "N/A"}
          </p>
          <p>
            <strong>Emergency Contact No:</strong>{" "}
            {faculty.emergencyContactNo || "N/A"}
          </p>
          <p>
            <strong>Email:</strong> {faculty.email || "N/A"}
          </p>
          <p>
            <strong>Blood Group:</strong> {faculty.bloodGroup || "N/A"}
          </p>

          <p>
            <strong>Permanent Address:</strong>{" "}
            {faculty.permanentAddress || "N/A"}
          </p>
          <p>
            <strong>Present Address:</strong> {faculty.presentAddress || "N/A"}
          </p>
        </div>
      ) : (
        <p>No faculty selected</p>
      )}
    </Modal>
  );
};

export default FacultyIntroModal;
