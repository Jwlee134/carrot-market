import Link from "next/link";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  href: string;
}

const FloatingButton = ({ children, href }: Props) => {
  return (
    <Link href={href}>
      <a className="fixed bottom-24 right-5 cursor-pointer rounded-full border-none bg-orange-400 p-3 text-white shadow-xl transition-colors hover:bg-orange-500">
        {children}
      </a>
    </Link>
  );
};

export default FloatingButton;
