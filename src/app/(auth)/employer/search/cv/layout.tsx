import { searchFilters } from "@/constants";
import FilterSideBar from "@/components/Layout/filter/silter-sidebar";

const layout: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <div className="container mx-auto my-8 flex min-h-screen w-full flex-row gap-5 p-2 lg:max-w-[1170px]">
      {/* Left Column: Filter Section */}
      <FilterSideBar
        sections={searchFilters}
        searchKeys={["Residency (Location)", "nationality"]}
      />

      {children}
    </div>
  );
};

export default layout;
