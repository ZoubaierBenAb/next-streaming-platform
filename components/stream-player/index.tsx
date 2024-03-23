"use client";

import { useViewerToken } from "@/hooks/viewer-token-hook";
import { LiveKitRoom } from "@livekit/components-react";

import { Video } from "./video";

import { useChatSidebar } from "@/store/use-chat-sidebar";
import { cn } from "@/lib/utils";
import { Chat } from "./chat";
import { ChatToggle } from "./chat-toggle";

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
  id: string;
  userName: string;
  bio: string | null;
  stream: CustomStream | null;
  imageUrl: string;
};

interface StreamPlayerProps {
  user: CustomUser;
  stream: CustomStream;
  isFollowing: boolean;
}

export const StreamPlayer = ({
  user,
  stream,
  isFollowing,
}: StreamPlayerProps) => {
  const { name, identity, token } = useViewerToken(user.id);
  const { collapsed } = useChatSidebar((state) => state);
  if (!token || !identity || !name) {
    return <div>Connot watch the stream</div>;
  }
  return (
    <>
      {collapsed && (
        <div className="hidden lg:block fixed top-[100px] right-2 z-50">
          <ChatToggle />
        </div>
      )}
      <LiveKitRoom
        token={token}
        serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_WS_URL}
        className={cn(
          "grid grid-cols-1 lg:gap-y-0 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-6 h-full",
          collapsed && "lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2"
        )}
      >
        <div className="space-y-4 col-span-1 lg:col-span-2 xl:col-span-2 2xl:col-span-5 lg:overflow-y-auto hidden-scrollbar pb-10">
          <Video hostIdentity={user.id} hostName={user.userName} />
        </div>
        <div className={cn("col-span-1", collapsed && "hidded")}>
          <Chat
            viewerName={name}
            hostName={user.userName}
            hostIdentity={user.id}
            isFollowing={isFollowing}
            isChatEnabled={stream.isChatEnabled}
            isChatDelayed={stream.isChatDelayed}
            isChatFollowersOnly={stream.isChatFollowersOnly}
          />
        </div>
      </LiveKitRoom>
    </>
  );
};
