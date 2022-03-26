import { ReactNode } from "react";
import { cls } from "../libs/utils";

interface Props {
  children: ReactNode;
  title?: string;
  canGoBack?: boolean;
  hasTabBar?: boolean;
}

const Layout = ({ children, title, canGoBack, hasTabBar }: Props) => {
  return (
    <>
      <header className="fixed top-0 flex w-full max-w-lg items-center justify-center border-b bg-white py-3 text-lg font-medium text-gray-700">
        {title && <span>{title}</span>}
      </header>
      <div className={cls("pt-16", hasTabBar ? "pb-16" : "")}>{children}</div>
      {hasTabBar && (
        <nav className="fixed bottom-0 flex w-full max-w-lg items-center justify-between border-t bg-white pb-10 pt-3 text-gray-800"></nav>
      )}
    </>
  );
};

export default Layout;
