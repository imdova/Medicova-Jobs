import LogoIcon from "@/components/icons/logo";
import { BaseHeaderProps } from "@/types";
import Link from "next/link";

const MinimalHeader: React.FC<BaseHeaderProps> = ({ user }) => {
  return (
    <header className="fixed left-0 top-0 z-50 w-full transition-colors duration-300">
      <div className="container mx-auto px-6 lg:max-w-[1170px]">
        <div className="flex h-[60px] items-center">
          <Link href="/">
            <LogoIcon className={`h-[30px] w-auto text-primary md:h-[40px]`} />
          </Link>
          <nav className="ml-auto flex space-x-4">
            <Link
              href="/auth/register"
              className="text-sm font-semibold hover:text-primary md:text-base"
            >
              Create Account
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};
export default MinimalHeader;
