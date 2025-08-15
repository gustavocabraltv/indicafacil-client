// src/components/Wrapper/index.tsx
import { ReactNode } from "react";

interface WrapperProps {
  children: ReactNode;
  className?: string;
}

export default function Wrapper({ children, className = "" }: WrapperProps) {
  return (
    <div className={`mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 ${className} py-8`}>
      {children}
    </div>
  );
}
