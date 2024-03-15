'use client'


import { Button } from "@/components/ui/button";
import { CheckCheck, Copy } from "lucide-react";
import { useState } from "react";

interface CopyButtonProps {
  value?: string | null;
}

export const CopyButton = ({ value }: CopyButtonProps) => {
  const [isCoppied, setIsCoppied] = useState(false);

  const onCopy = () => {
    if (!value) {
      return;
    }
    setIsCoppied(true);
    navigator.clipboard.writeText(value);
    setTimeout(() => {
      setIsCoppied(false);
    }, 1000);
  };
  const Icon = isCoppied ? CheckCheck : Copy;
  return (
    <div className="flex items-center">
      <Button
        variant={"ghost"}
        disabled={!value || isCoppied}
        onClick={onCopy}
      >
        <Icon className="h-5 w-5"/>
      </Button>
    </div>
  );
};
