import { Actions } from "./actions";
import { Logo } from "./logo"


export const Navbar = () => {
  return (
    <div className="w-full z-[49] h-20 top-0 bg-[#252731] fixed px-2 lg:px-4 flex justify-between items-center shadow-sm">
      <Logo />
  
      <Actions />
    </div>
  );
};
