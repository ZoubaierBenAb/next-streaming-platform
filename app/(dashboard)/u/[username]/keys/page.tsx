import { Button } from "@/components/ui/button";
import { getSelf } from "@/lib/auth-service";
import { getStramByUserId } from "@/lib/stream-service";
import { UrlCard } from "./_components/url-card";
import { KeyCard } from "./_components/key-card";
import { ConnectModal } from "./_components/connect-modal";

const KeysPage = async () => {
  const self = await getSelf();

  const stream = await getStramByUserId(self.id);

  if (!stream) {
    throw new Error("stream not found");
  }

  return (
    <div className="p-6">
      <div className="flex-col items-center w-full justify-between">
        <div className="flex justify-between w-full">
          <h1 className="font-bold text-2xl">Keys & URLs</h1>
          <ConnectModal />
        </div>
        <div className="space-y-4 mt-5">
          <UrlCard value={stream.serverUrl} />
          <KeyCard value={stream.streamKey} />
        </div>
      </div>
    </div>
  );
};

export default KeysPage;
