import { Form, Select } from "antd";
import type { ReactNode } from "react";
import {
  Controller,
  type FieldValues,
  type Path,
  type RegisterOptions,
} from "react-hook-form";

type UniversitySelectProps<T extends FieldValues> = {
  name: Path<T>;
  label?: ReactNode;
  options?: { value: string; label: ReactNode; diabled?: boolean }[];
  rules?: RegisterOptions<T>;
  disabled?: boolean;
};

const UniversitySelect = <T extends FieldValues>({
  label,
  name,
  options,
  rules,
  disabled = false,
}: UniversitySelectProps<T>) => {
  return (
    <Form.Item label={label}>
      <Controller
        name={name}
        rules={rules}
        render={({ field, fieldState: { error } }) => (
          <>
            <Select
              {...field}
              style={{ width: "100%" }}
              options={options}
              disabled={disabled}
              size="large"
            />
            {error && (
              <p style={{ color: "red", marginTop: "4px" }}>{error.message}</p>
            )}
          </>
        )}
      />
    </Form.Item>
  );
};

export default UniversitySelect;
