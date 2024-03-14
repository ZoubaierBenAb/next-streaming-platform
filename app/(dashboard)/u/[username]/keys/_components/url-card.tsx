"use client";

import { Input } from "@/components/ui/input";
import { CopyButton } from "./copy-button";

interface UrlCardProps {
  value?: string | null;
}

export const UrlCard = ({ value }: UrlCardProps) => {
  return (
    <div className="bg-muted p-6 rounded-xl my-4">
      <div className="flex items-center gap-x-10">
        <p className="font-semibold shrink-0">Server Url</p>
        <Input size={2} value={value ? value : ""} disabled placeholder="Server Url" />
        <CopyButton value = {value ? value : ''}/>
      </div>
    
    </div>
  );
};
