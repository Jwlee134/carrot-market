import { LabelHTMLAttributes } from "react";

interface Props extends LabelHTMLAttributes<HTMLLabelElement> {
  label: string;
  name: string;
}

const Label = ({ label, name, ...rest }: Props) => {
  return (
    <label
      className="block text-sm font-medium text-gray-700"
      htmlFor={name}
      {...rest}
    >
      {label}
    </label>
  );
};

export default Label;
