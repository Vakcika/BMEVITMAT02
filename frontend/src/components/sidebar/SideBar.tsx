import { useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Menu,
  Users,
  ShoppingBag,
  Anvil,
  Logs,
  ReceiptText,
  Settings,
} from "lucide-react";
import SideBarBottom from "./SideBarBottom";
import SideBarBrand from "./SideBarBrand";
import SideBarItem from "./SideBarItem";

export default function SideBar() {
  const [openNav, setOpenNav] = useState(false);
  const location = useLocation();

  return (
    <div className="relative flex">
      <button
        type="button"
        className="fixed top-0 right-0 z-50 inline-flex items-center p-2 mt-4 mr-4 text-sm text-n50 rounded-lg sm:hidden hover:bg-a300 hover:text-p300"
        onClick={() => setOpenNav(!openNav)}
      >
        <span className="sr-only">Toggle sidebar</span>
        <Menu className="h-6 w-6 sm:h-5 sm:w-5 lg:h-6 lg:w-6" />
      </button>
      <aside
        className={`fixed top-0 left-0 z-40 w-full sm:w-32 lg:w-64 h-screen transition-transform transform ${
          openNav ? "translate-x-0" : "-translate-x-full"
        } sm:translate-x-0 bg-n10 text-n900 dark:text-n50 font-normal text-md font-paragraph border-2 border-n30 dark:border-n400 shadow-md`}
      >
        <div className="h-full px-3 py-4 overflow-y-scroll pb-28">
          <SideBarBrand />
          <div className="gradient-border"></div>
          <SideBarItem
            href={"/app/orders"}
            sideBarIcon={
              <ShoppingBag className="h-6 w-6 sm:h-5 sm:w-5 lg:h-6 lg:w-6" />
            }
            sideBarName="Orders"
            active={location.pathname === "/app/orders"}
          />
          <SideBarItem
            href={"/app/casts"}
            sideBarIcon={
              <Anvil className="h-6 w-6 sm:h-5 sm:w-5 lg:h-6 lg:w-6" />
            }
            sideBarName="Casts"
            active={location.pathname === "/app/casts"}
          />
          <SideBarItem
            href={"/app/partners"}
            sideBarIcon={
              <Users className="h-6 w-6 sm:h-5 sm:w-5 lg:h-6 lg:w-6" />
            }
            sideBarName="Partners"
            active={location.pathname === "/app/partners"}
          />
          <SideBarItem
            href={"/app/inventory"}
            sideBarIcon={
              <Logs className="h-6 w-6 sm:h-5 sm:w-5 lg:h-6 lg:w-6" />
            }
            sideBarName="Inventory"
            active={location.pathname === "/app/inventory"}
          />
          <SideBarItem
            href={"/app/statements"}
            sideBarIcon={
              <ReceiptText className="h-6 w-6 sm:h-5 sm:w-5 lg:h-6 lg:w-6" />
            }
            sideBarName="Statements"
            active={location.pathname === "/app/statements"}
          />
          <SideBarItem
            href={"/app/settings"}
            sideBarIcon={
              <Settings className="h-6 w-6 sm:h-5 sm:w-5 lg:h-6 lg:w-6" />
            }
            sideBarName="Settings"
            active={location.pathname === "/app/settings"}
          />
        </div>
        <SideBarBottom />
      </aside>
    </div>
  );
}
