import { Form, Input } from "antd";
import {
  Controller,
  useFormContext,
  type FieldValues,
  type Path,
} from "react-hook-form";

type UniversityInputProps<T extends FieldValues> = {
  name: Path<T>;
  type?: string;
  label?: string;
};

const UniversityInput = <T extends FieldValues>({
  type,
  name,
  label,
}: UniversityInputProps<T>) => {
  const { control } = useFormContext<T>();
  return (
    <div style={{ marginBottom: "20px" }}>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <Form.Item label={label}>
            <Input {...field} type={type} id={name} size="large" />
          </Form.Item>
        )}
      />
    </div>
  );
};

export default UniversityInput;
