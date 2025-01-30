import SearchForm from "@/components/UI/search-form";
import { Suspense } from "react";
import JobFilter from "./filter";
import { searchJopFilters } from "@/constants";
import CountrySearchResult, {
  CountryHeading,
} from "@/components/UI/CountrySearchResult";

const layout: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <div>
      <div className="bg-[url('/images/search-background.jpg')] bg-cover bg-center">
        <div className="bg-gradient-to-b from-light-primary-transparent to-primary-transparent p-4 shadow-md">
          <div className="container mx-auto mt-[70px] p-4 lg:max-w-[1170px]">
            <h2 className="mb-6 text-[45px] font-black leading-none text-main md:text-[60px]">
              Find your{" "}
              <span className="text-[45px] font-black text-primary-foreground md:text-[60px]">
                dream job
              </span>
              <Suspense>
                <CountryHeading />
              </Suspense>
            </h2>
            <Suspense>
              <SearchForm />
            </Suspense>
            <p className="mt-4 text-primary-foreground">
              {" "}
              <span className="font-bold text-primary-foreground">
                Popular
              </span>{" "}
              : Medical Claims Officer,Dental Designer, Healthcare- Presales
              specialist, Medical Ambassador
            </p>
          </div>
        </div>
      </div>
      {/* Main Layout */}
      <main className="container mx-auto my-8 flex min-h-screen w-full flex-row p-2 lg:max-w-[1170px]">
        {/* FilterSection */}
        <Suspense
          fallback={
            <div className="hidden w-1/5 rounded-[10px] border border-gray-100 bg-white p-[20px] shadow-xl lg:block">
              Loading...
            </div>
          }
        >
          <JobFilter sections={searchJopFilters} />
        </Suspense>
        {/* Jobs result Section */}
        <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
      </main>
      <Suspense>
        <CountrySearchResult />
      </Suspense>
    </div>
  );
};

export default layout;
