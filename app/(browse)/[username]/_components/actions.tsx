"use client";

import { onFollow } from "@/actions/follow";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { toast } from "sonner";

interface ActionsProps {
  isFollowing: boolean;
  userId: string;
}

export const Actions = ({ isFollowing, userId }: ActionsProps) => {
  const [isPending, startTransition] = useTransition();
  const onClick = () => {
    startTransition(() => {
      onFollow(userId)
        .then((data) =>
          toast.success(`you are now following ${data.following.userName} `)
        )
        .catch(() => toast.error("somthing went wrong"));
    });
  };
  return (
    <Button
      disabled={isFollowing || isPending}
      onClick={onClick}
      variant={"primary"}
    >
      Follow
    </Button>
  );
};
