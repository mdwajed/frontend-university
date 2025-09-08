import { useEffect } from "react";
import { useFormContext, type FieldValues } from "react-hook-form";
import UniversitySelect from "../../../../components/form/UniversitySelect";
import { monthOptions } from "./academicSemester.constant";

const EndMonthSelect = () => {
  const { setValue, watch, getValues } = useFormContext<FieldValues>();
  const startMonth = watch("startMonth");

  useEffect(() => {
    const start = parseInt(startMonth);

    // const end = parseInt(getValues("endMonth"));
    if (Number.isNaN(start)) return;

    // Always set end month = start + 3 (wrap around if > 12)
    let newEnd = start + 3;
    if (newEnd > 12) {
      newEnd = newEnd % 12; // wrap around
    }

    setValue("endMonth", String(newEnd).padStart(2, "0"));
  }, [startMonth, setValue]);

  return (
    <UniversitySelect<FieldValues>
      label="End Month"
      name="endMonth"
      options={monthOptions}
      rules={{
        required: "End month is required",
        validate: (value) => {
          const start = parseInt(getValues("startMonth"));
          const end = parseInt(value);
          if (Number.isNaN(start) || Number.isNaN(end)) return true;
          if (end <= start) {
            return "End month must be after start month";
          }
          return true;
        },
      }}
      disabled
    />
  );
};

export default EndMonthSelect;
