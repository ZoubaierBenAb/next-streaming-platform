import { getSelf } from "@/lib/auth-service";
import { ToggleCard } from "./_components/toggle-card";
import { getStramByUserId } from "@/lib/stream-service";

const Chat = async() => {

const self = await getSelf()

const stream = await getStramByUserId(self.id)

if (!stream){
  throw new Error('Stream not found')
}

  
  return (
    <div className="p-6">
      <div className="mb-4 text-xl font-bold">Chat Settings</div>
      <div className="space-y-4">
        <ToggleCard label="Disable chat" field="isChatEnabled" value={stream.isChatEnabled} />
        <ToggleCard label="Delay chat" field="isChatDelayed" value = {stream.isChatDelayed}/>
        <ToggleCard label = "Enable only followers to chat " field="isChatFollowersOnly" value={stream.isChatFollowersOnly}/>
      </div>
    </div>
  );
};

export default Chat;
