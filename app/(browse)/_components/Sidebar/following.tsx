'use client'

import { useSidebar } from "@/store/use-sidebar";
import { Follow, Stream, User } from "@prisma/client"
import { UserItem, UserItemSkeleton } from "./userItem";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";


interface FollowingProps {
    data : 
    (Follow & 
        {following : User & {
           stream : Stream | null
    }})[] | undefined;
}


export const Following = ({data}:FollowingProps)=>{

    const {collapsed}=useSidebar((state)=>state)


    if (!data?.length){
        return null;
    }
return (
<div>
    {!collapsed && (
        <div className="pl-6 mb-4">
            <p className="text-sm text-muted-foreground">
                Following
            </p>
        </div>
    )}
    <ul className={cn('px-2 space-y-2', collapsed && 'px-0')}>
        {data?.map((follow)=>(
            <UserItem
            key={follow.following.id}
            username={follow.following.userName}
            imageUrl={follow.following.imageUrl}
            isLive={follow.following.stream?.isLive}
            />
        ))}
    </ul>
</div>
)
}

export const FollowingSkeleton = ()=>{
    return (
       <ul className="px-2 pt-2 lg:pt-0">
        {[...Array(3)].map((_,index)=>(
            <UserItemSkeleton key={index}/>
        ))}

       </ul>
    )
}