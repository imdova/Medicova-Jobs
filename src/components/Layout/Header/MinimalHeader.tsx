import LogoIcon from "@/components/icons/logo";
import { BaseHeaderProps } from "@/types";
import Link from "next/link";

const MinimalHeader: React.FC<BaseHeaderProps> = ({ user }) => {
  return (
    <header className="w-full bg-white shadow-md">
      <div className="mx-auto max-w-5xl px-4">
        <div className="flex h-[60px] items-center">
          <Link href="/">
            <LogoIcon className={`h-[30px] w-auto text-primary md:h-[40px]`} />
          </Link>
          <nav className="ml-auto flex space-x-4">
            <Link
              href="/auth/register"
              className="text-sm font-semibold hover:text-primary md:text-base"
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
