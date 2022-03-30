import { TextareaHTMLAttributes } from "react";
import Label from "./Label";

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  name?: string;
}

const Textarea = ({ label, name, ...rest }: Props) => {
  return (
    <div>
      {label && name && <Label label={label} name={name} />}
      <textarea
        id={name || undefined}
        className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
        rows={4}
        {...rest}
      />
    </div>
  );
};

export default Textarea;
