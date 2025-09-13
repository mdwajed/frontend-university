import { Input } from "antd";
import { useFormContext } from "react-hook-form";

const ProfileImageInput = () => {
  const { setValue } = useFormContext();
  return (
    <Input
      type="file"
      id="profileImage"
      size="large"
      accept="image/*"
      onChange={(e) => {
        if (e.target.files && e.target.files.length > 0) {
          const file = e.target.files[0];
          setValue("faculty.profileImage", file);
        }
      }}
      name="faculty.profileImage"
    />
  );
};

export default ProfileImageInput;
