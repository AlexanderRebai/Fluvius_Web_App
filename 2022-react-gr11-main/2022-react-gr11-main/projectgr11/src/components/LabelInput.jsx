import { useFormContext } from "react-hook-form";

const LabelInput = ({ label, type, defaultValue, validation, ...rest }) => {
  //Standaard input element die gebruikt zal worden bij de formulieren

  const { register, errors } = useFormContext();
  //const { errors } = useFormContext();
  return (
    <div className="col-span-6 sm:col-span-3">
      <label htmlFor={label}>
        {label.charAt(0).toUpperCase() + label.slice(1)}
      </label>
      <input
        {...register(label, validation)}
        defaultValue={defaultValue}
        placeholder={label}
        type={type}
        id={label}
        name={label}
        {...rest}
      />
      {errors[label] && (
        <p className="text-red-600 text-2xl">{errors[label].message}</p>
      )}
    </div>
  );
};

export default LabelInput;
