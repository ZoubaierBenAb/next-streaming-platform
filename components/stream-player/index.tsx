'use client'


type CustomStream = {
    id: string;
    isChatEnabled: boolean;
    isChatDelayed: boolean;
    isChatFollowersOnly: boolean;
    isLive: boolean;
    thumbnailUrl: string | null;
    name: string;
  };
  

type CustomUser = {
    id : string
    userName: string;
    bio: string | null;
    stream: CustomStream | null;
    imageUrl: string;
}


interface StreamPlayerProps {
    user: CustomUser;
    stream: CustomStream;
    isFollowing: boolean;
  }
  
export const StreamPlayer = ({user,stream,isFollowing}: StreamPlayerProps)=>{
    return (
        <div>
            stream player
        </div>
    )
}