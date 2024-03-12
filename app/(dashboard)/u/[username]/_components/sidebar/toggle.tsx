"use client";

import { ArrowLeftFromLine, ArrowRightFromLine } from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { useCreatorSidebar } from "@/store/useCreator-sidebar";


export const Toggle = () => {
  const { collapsed, onExpand, onCollapse } = useCreatorSidebar((state) => state);

  const label = collapsed ? "Expand" : "Collapse";

  return (
    <>
      {collapsed && (
        <div className="hidden lg:flex w-full items-center justify-center pt-4 mb-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Button
                  onClick={onExpand}
                  variant="ghost"
                  className="h-auto p-2"
                >
                  <ArrowRightFromLine className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>{label}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      )}
      {!collapsed && (
        <div className="p-3 pl-6 mb-2 flex items-center justify-between w-full">
          <p className="font-semibold text-primary">For you</p>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Button
                  onClick={onCollapse}
                  className="h-auto p-2 ml-auto"
                  variant="ghost"
                >
                  <ArrowLeftFromLine className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>{label}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      )}
    </>
  );
};
