import { Form } from "antd";
import type { ReactNode } from "react";
import {
  FormProvider,
  useForm,
  type DefaultValues,
  type FieldValues,
  type SubmitHandler,
  type UseFormReturn,
} from "react-hook-form";

type UniversityFormProps<T extends FieldValues> = {
  onSubmit: SubmitHandler<T>;
  children: ReactNode;
  defaultValues?: DefaultValues<T>;
};

const UniversityForm = <T extends FieldValues>({
  onSubmit,
  children,
  defaultValues,
}: UniversityFormProps<T>) => {
  const methods: UseFormReturn<T> = useForm<T>({ defaultValues });

  const submit: SubmitHandler<T> = (data) => {
    onSubmit(data);
    methods.reset();
  };

  return (
    <FormProvider {...methods}>
      <Form layout="vertical" onFinish={methods.handleSubmit(submit)}>
        {children}
      </Form>
    </FormProvider>
  );
};

export default UniversityForm;
