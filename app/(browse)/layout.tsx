import { Suspense } from "react";
import { Navbar } from "./_components/Navbar";
import { Sidebar, SidebarSkeleton } from "./_components/Sidebar";
import { RecommendedSkeleton } from "./_components/Sidebar/recomonded";
import { Container } from "./_components/container";

const BrowseLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <div className="h-full pt-20 flex-col ">
        <Suspense fallback={<SidebarSkeleton />}>
          <Sidebar />
        </Suspense>
        <Container>{children}</Container>
      </div>
    </>
  );
};

export default BrowseLayout;


