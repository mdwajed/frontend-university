import { DatePicker, Form } from "antd";
import {
  Controller,
  useFormContext,
  type FieldValues,
  type Path,
} from "react-hook-form";

type UniversityInputProps<T extends FieldValues> = {
  name: Path<T>;
  label?: string;
};

const UniversityDatePicker = <T extends FieldValues>({
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
            <DatePicker
              {...field}
              id={name}
              size="large"
              style={{ width: "100%" }}
            />
          </Form.Item>
        )}
      />
    </div>
  );
};

export default UniversityDatePicker;
