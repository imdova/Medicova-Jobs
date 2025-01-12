import NotificationDropdown from "@/components/UI/NotificationDropdown";
import UserDropdown from "@/components/UI/UserDropdown";
import { UserState } from "@/types";
import Link from "next/link";

interface UserActionProps {
  user?: UserState;
  pathname?: string;
}

const HeaderAction: React.FC<UserActionProps> = ({ user, pathname }) => {
  if (user && user.id) {
    return (
      <div className="flex items-center gap-3 text-inherit">
        <NotificationDropdown pathname={pathname} />
        <UserDropdown user={user} />
      </div>
    );
  } else {
    return (
      <div className="flex gap-3">
        <Link href="/auth/register" className="btn-primary btn-signup">
          Sign Up
        </Link>
        <Link href="/auth/signin" className="btn-primary btn-login">
          Login
        </Link>
      </div>
    );
  }
};

export default HeaderAction;
