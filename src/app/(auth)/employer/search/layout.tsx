import Filter from "@/components/Layout/filter/filter";
import { searchFilters } from "@/constants";
import { Suspense } from "react";

const layout: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <div className="container mx-auto my-8 flex min-h-screen w-full flex-row gap-5 p-2 lg:max-w-[1170px]">
      {/* Left Column: Filter Section */}
      <Suspense
        fallback={
          <div className="hidden w-1/5 rounded-[10px] border border-gray-100 bg-white p-[20px] shadow-xl lg:block">
            Loading...
          </div>
        }
      >
        <Filter
          sections={searchFilters}
          searchKeys={["Residency (Location)", "nationality"]}
        />
      </Suspense>

      {children}
    </div>
  );
};

export default layout;
