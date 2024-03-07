"use client";

import { onBlock, onUnblock } from "@/actions/block";
import { onFollow, onUnfollow } from "@/actions/follow";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { toast } from "sonner";

interface ActionsProps {
  isBlocked: boolean;
  isFollowing: boolean;
  userId: string;
}

export const Actions = ({ isFollowing, userId, isBlocked }: ActionsProps) => {
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

  const onClick = () => {
    if (isFollowing) {
      handleUnfollow();
    } else {
      handleFollow();
    }
  };

  const handleBlock = () => {
    startTransition(() => {
      onBlock(userId)
        .then((data) => toast.success(`You blocked ${data?.blocked.userName}`))
        .catch(() => toast.error("Something is wrong "));
    });
  };

  const handleUnblock = () => {
    startTransition(() => {
      onUnblock(userId)
        .then((data) =>
          toast.success(`You unblocked ${data?.blocked.userName}`)
        )
        .catch(() => toast.error("Something went wrong"));
    });
  };

  const onBlockOrUnblock = () => {
    if (isBlocked) {
      handleUnblock();
    } else {
      handleBlock();
    }
  };

  return (
    <>
      <Button disabled={isPending} onClick={onClick} variant={"primary"}>
        {isFollowing ? "Unfollow" : "Follow"}
      </Button>
      <Button
        disabled={isPending}
        variant={"destructive"}
        onClick={onBlockOrUnblock}
      >
        {isBlocked ? "Unblock" : "Block"}
      </Button>
    </>
  );
};
