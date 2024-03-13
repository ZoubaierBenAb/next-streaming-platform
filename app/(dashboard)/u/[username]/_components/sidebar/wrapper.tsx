"use client";

import { cn } from "@/lib/utils";
import { useCreatorSidebar } from "@/store/useCreator-sidebar";
import { useEffect, useState } from "react";
import { NavItemsSkeleton } from "./nav-items";

interface WrapperProps {
  children: React.ReactNode;
}

export const Wrapper = ({ children }: WrapperProps) => {
  const { collapsed } = useCreatorSidebar((state) => state);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <ul className="gap-y-4">
        {[...Array(4).map((_, i) => <NavItemsSkeleton key={i} />)]}
      </ul>
    );
  }

  return (
    <aside
      className={cn(
        "fixed left-0 flex flex-col w-[70px] lg:w-60 h-full bg-background border-r border-[#2D2E35] z-50",
        collapsed && "lg:w-[70px]"
      )}
    >
      {children}
    </aside>
  );
};
