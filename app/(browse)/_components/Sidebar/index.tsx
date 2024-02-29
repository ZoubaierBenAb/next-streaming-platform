import { RecommendedSkeleton, Recomonded } from "./recomonded";
import { Toggle, ToggleSkeleton } from "./toggle";
import { Wrapper } from "./wrapper";
import { getRecomonded } from "@/lib/recomonded-service";

export const Sidebar = async () => {
  const recomonded = await getRecomonded();
  return (
    <Wrapper>
      <Toggle />
      <div className="space-y-4 pt-4 lg:pt-0 ">
        <Recomonded data={recomonded} />
      </div> 
    </Wrapper>
  );
};
export const SidebarSkeleton = () => {
  return (
    <aside className="fixed left-0 flex flex-col w-[70px] lg:w-60 h-full bg-bachground border-r border-[#2D2E35] z-50">
      <ToggleSkeleton />
      <RecommendedSkeleton />
    </aside>
  );
};
