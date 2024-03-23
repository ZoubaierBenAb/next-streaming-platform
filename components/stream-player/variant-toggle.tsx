"use client";

import { Button } from "@/components/ui/button";
import { ChatVariant, useChatSidebar } from "@/store/use-chat-sidebar";
import { MessageSquare, Users } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

export const VariantToggle = () => {
  const { variant, onChangeVariant } = useChatSidebar((state) => state);

  const isChat = variant === ChatVariant.chat;

  const Icon = isChat ? Users : MessageSquare;

  const onToggle = () => {
    const newVariant = isChat ? ChatVariant.community : ChatVariant.chat;
    onChangeVariant(newVariant);
  };

  const label = isChat ? "Community" : "Go back to chat";

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
