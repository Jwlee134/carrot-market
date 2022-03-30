import { InputHTMLAttributes } from "react";
import Label from "./Label";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  kind: "text" | "phone" | "price";
}

const Input = ({ label, name, kind, ...rest }: Props) => {
  return (
    <div className="space-y-1">
      <Label label={label} name={name} />
      {kind === "text" && (
        <input
          id={name}
          className="w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500"
          type="text"
          {...rest}
        />
      )}
      {kind === "phone" && (
        <div className="flex rounded-sm shadow-sm">
          <span className="flex select-none items-center justify-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-sm text-gray-500">
            +82
          </span>
          <input
            id={name}
            className="w-full appearance-none rounded-md rounded-l-none border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500"
            type="number"
            {...rest}
          />
        </div>
      )}
      {kind === "price" && (
        <div className="relative flex items-center rounded-md shadow-sm">
          <div className="absolute left-0 flex select-none items-center justify-center pl-3">
            <span className="text-sm text-gray-500">$</span>
          </div>
          <input
            className="w-full appearance-none rounded-md border border-gray-300 px-3 py-2 pl-7 placeholder-gray-400 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500"
            id="price"
            type="text"
            placeholder="0.00"
          />
          <div className="absolute right-0 flex select-none items-center justify-center pr-3">
            <span className="text-sm text-gray-500">USD</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Input;
