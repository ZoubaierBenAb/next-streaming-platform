"use client";

import { useSidebar } from "@/store/use-sidebar";
import { Stream, User } from "@prisma/client";
import { UserItem, UserItemSkeleton } from "./userItem";
import { cn } from "@/lib/utils";


interface RecomondedProps {
  data: (User & {
    stream : {
      isLive : boolean
    } 
  })[]
}

export const Recomonded = ({ data }: RecomondedProps) => {
  const { collapsed } = useSidebar((state) => state);

  const showLabel = !collapsed && data.length > 0;

  return (
    <div>
      {showLabel && (
        <div className="pl-6 mb-4">
          <p className="text-sm text-muted-foreground">Recommended</p>
        </div>
      )}
      <ul className={cn('px-2 space-y-2' ,collapsed && 'px-0')}>
      {data.map((user) => (
          <UserItem
            key={user.id}
            username={user.userName}
            imageUrl={user.imageUrl}
            isLive={user.stream?.isLive}
          />
        ))}
      </ul>
    </div>
  );
};

export const RecommendedSkeleton = () => {
  return (
    <ul className="px-2">
      {[...Array(3).map((_, i) => <UserItemSkeleton key={i} />)]}
    </ul>
  );
};
