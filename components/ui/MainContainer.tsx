import { ReactNode } from "react";

export default function MainContainer({ children, className = "" }: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`site-container ${className}`}>{children}</div>;
}
