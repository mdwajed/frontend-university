import { Form, Select } from "antd";
import type { ReactNode } from "react";
import {
  Controller,
  useFormContext,
  type FieldValues,
  type Path,
  type RegisterOptions,
} from "react-hook-form";

type UniversitySelectProps<T extends FieldValues> = {
  name: Path<T>;
  label?: ReactNode;
  options?: { value: string; label: ReactNode; disabled?: boolean }[];
  rules?: RegisterOptions<T>;
  disabled?: boolean;
  multiple?: boolean;
};

const UniversitySelect = <T extends FieldValues>({
  label,
  name,
  options,
  rules,
  disabled = false,
  multiple = false,
}: UniversitySelectProps<T>) => {
  const { control } = useFormContext<T>();
  return (
    <Form.Item label={label}>
      <Controller
        name={name}
        rules={rules}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <>
            <Select
              value={field.value}
              onChange={(val) => field.onChange(val)}
              onBlur={field.onBlur}
              ref={field.ref}
              style={{ width: "100%" }}
              options={options ?? []}
              disabled={disabled}
              mode={multiple ? "multiple" : undefined}
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
