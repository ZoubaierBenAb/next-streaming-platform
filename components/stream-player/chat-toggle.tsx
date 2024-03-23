"use client";

import { ArrowLeftFromLine, ArrowRightFromLine } from "lucide-react";

 
import { Button } from "@/components/ui/button";
import { useChatSidebar } from "@/store/use-chat-sidebar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";

export const ChatToggle = () => {
  const {
    collapsed,
    onExpand,
    onCollapse,
  } = useChatSidebar((state) => state);

  const Icon = collapsed ? ArrowLeftFromLine : ArrowRightFromLine;

  const onToggle = () => {
    if (collapsed) {
      onExpand();
    } else {
      onCollapse();
    }
  };

  const label = collapsed ? "Expand" : "Collapse";

  return (
    <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>
        <Button onClick={onToggle} variant="ghost" className="h-auto p-2">
          <Icon className="h-4 w-4" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  </TooltipProvider>
  );
};