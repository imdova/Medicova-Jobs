"use client";
import { countries } from "@/constants";
import React from "react";
import Flag from "./flagitem";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const CountrySearchResult: React.FC = () => {
  const searchParams = useSearchParams();
  const country = searchParams.get("country");
  // If no country is provided in search params, default to first country in list
  const displayCountry = country || countries[0].name;

  return (
    <div className="container mx-auto p-2 py-12 lg:max-w-[900px]">
      {/* SEO Heading */}
      <h2 className="text-center text-xl font-semibold text-main">
        Job Opportunities in {displayCountry}
      </h2>

      {/* Description */}
      <p className="mt-2 text-center text-secondary">
        Looking for a job in {displayCountry}? Look no further! We have a wide
        range of job opportunities in {displayCountry} that are perfect for
        anyone looking to start or advance their career. From entry-level to
        experienced professionals, we have job openings in {displayCountry} that
        cater to all skill levels and industries. Whether you&apos;re looking
        for a job in tech, marketing, healthcare, or any other field, we have
        you covered. Our job search feature allows you to search for jobs in{" "}
        {displayCountry} by keyword, location, and category, making it easy to
        find the perfect job for you. So why wait? Start applying for jobs in{" "}
        {displayCountry} today and take the first step towards building your
        dream career!
      </p>

      <div className="mx-auto mt-3 flex max-w-[700px] flex-wrap justify-center gap-2">
        {countries.map((countryItem, index) => (
          <Link
            href={{
              query: { country: countryItem.name, cCd: countryItem.code },
            }}
            key={index}
            className="flex gap-2 rounded-base bg-primary-100 px-2 py-1 text-secondary duration-300 hover:bg-primary hover:text-primary-foreground"
          >
            <Flag
              code={countryItem.code.toLocaleLowerCase()}
              name={countryItem.name}
            />{" "}
            {countryItem.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CountrySearchResult;

export const CountryHeading: React.FC = () => {
  const searchParams = useSearchParams();
  const country = searchParams.get("country");
  const cCd = searchParams.get("cCd");

  return (
    <>
      {country && (
        <span className="text-[45px] font-black text-primary-foreground md:text-[60px]">
          {" "}
          in
          <span
            className={`${cCd ? `text-transparent` : "text-primary-foreground"} bg-contain bg-clip-text bg-center text-[45px] font-black md:text-[60px]`}
            style={{
              backgroundImage: cCd
                ? `url('https://flagcdn.com/${cCd.toLowerCase()}.svg')`
                : undefined,
              backgroundSize: "contain",
              backgroundPosition: "center",
            }}
          >
            {" " + country}
          </span>
        </span>
      )}
    </>
  );
};
