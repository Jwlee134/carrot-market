import { ButtonHTMLAttributes } from "react";
import { cls } from "../libs/client/utils";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  large?: boolean;
}

const Button = ({ text, large, ...rest }: Props) => {
  return (
    <button
      {...rest}
      className={cls(
        "w-full rounded-md border-transparent bg-orange-500 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2",
        large ? "py-3 text-base" : "py-2 text-sm"
      )}
    >
      {text}
    </button>
  );
};

export default Button;
