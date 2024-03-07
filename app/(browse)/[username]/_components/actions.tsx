"use client";

import { onFollow, onUnfollow } from "@/actions/follow";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { toast } from "sonner";

interface ActionsProps {
  isFollowing: boolean;
  userId: string;
}

export const Actions = ({ isFollowing, userId }: ActionsProps) => {
  const [isPending, startTransition] = useTransition();
  const handleFollow = () => {
    startTransition(() => {
      onFollow(userId)
        .then((data) =>
          toast.success(`you are now following ${data.following.userName} `)
        )
        .catch(() => toast.error("somthing went wrong"));
    });
  };

  const handleUnfollow = () => {
    startTransition(() => {
      onUnfollow(userId)
        .then(() => toast.success(`you unfollowed the user`))
        .catch(() => toast.error("somthing went wrong"));
    });
  };

  const onClick=()=>{
    if (isFollowing){
      handleUnfollow()
    }
    else {
      handleFollow()
    }
  }
  return (
    <Button disabled={isPending} onClick={onClick} variant={"primary"}>
      {isFollowing ? "Unfollow" : "Follow"}
    </Button>
  );
};
