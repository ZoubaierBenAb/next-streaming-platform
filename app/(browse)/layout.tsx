import { Navbar } from "./_components/Navbar";
import { Sidebar } from "./_components/Sidebar";
import { Container } from "./_components/container";

const BrowseLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <div className="h-full pt-20 flex-col ">
        <Sidebar />
        <Container>
        {children}
        </Container>
      </div>
    </>
  );
};

export default BrowseLayout;
