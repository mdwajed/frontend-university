import { Input } from "antd";
import { useFormContext } from "react-hook-form";

const ProfileImageInput = () => {
  const { setValue } = useFormContext();
  return (
    <Input
      type="file"
      id="profileImage"
      accept="image/*"
      onChange={(e) => {
        if (e.target.files && e.target.files.length > 0) {
          const file = e.target.files[0];
          setValue("student.profileImage", file);
        }
      }}
      name="student.profileImage"
    />
  );
};

export default ProfileImageInput;
