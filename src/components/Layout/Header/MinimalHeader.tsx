import LogoIcon from "@/components/icons/logo";
import { BaseHeaderProps } from "@/types";
import Link from "next/link";

const MinimalHeader: React.FC<BaseHeaderProps> = ({ user }) => {
  return (
    <header className="w-full bg-white shadow-md">
      <div className="mx-auto max-w-5xl px-4">
        <div className="flex h-[60px] items-center">
          <Link href="/">
            <LogoIcon className={`h-[40px] w-auto text-primary`} />
          </Link>
          <nav className="ml-auto flex space-x-4">
            <Link
              href="/auth/register"
              className="font-semibold hover:text-primary"
            >
              Sign Up
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};
export default MinimalHeader;
