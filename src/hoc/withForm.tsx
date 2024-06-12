import { useForm } from "react-hook-form";

export const withForm = (WrappedComponent) => {
  return (props) => {
    const { control, getValues } = useForm();

    return (
      <WrappedComponent {...props} control={control} handleSubmit={getValues} />
    );
  };
};
