import { useAuth } from "@webbydevs/react-laravel-sanctum-auth";
import LogoutButton from "../common/LogoutButton";
import UserAvatar from "../common/UserAvatar";

export default function SideBarBottom() {
  const { user } = useAuth();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-20 bg-n10">
      <div className="w-full">
        <div className="gradient-border" />
        <div className="flex items-center justify-between sm:justify-center lg:justify-between p-4 mx-16 sm:mx-0">
          <button
            type="button"
            className="flex items-center justify-center"
            aria-label="Open user menu"
          >
            <UserAvatar user={user?.user?.name} />
          </button>
          <span className="text-sm block sm:hidden lg:block">
            {user?.user?.name}
          </span>
          <LogoutButton />
        </div>
      </div>
    </div>
  );
}
