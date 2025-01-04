import { countries } from "@/constants";
import React from "react";
import Flag from "./flagitem";
import Link from "next/link";

type CountrySearchProps = {
  country: string; // Country name to display
};

const CountrySearchResult: React.FC<CountrySearchProps> = ({ country }) => {
  return (
    <div className="container mx-auto p-2 py-12 lg:max-w-[900px]">
      {/* SEO Heading */}
      <h2 className="text-center text-xl font-semibold text-main">
        Job Opportunities in {country}
      </h2>

      {/* Description */}
      <p className="mt-2 text-center text-secondary">
        Looking for a job in {country}? Look no further! We have a wide range of
        job opportunities in {country} that are perfect for anyone looking to
        start or advance their career. From entry-level to experienced
        professionals, we have job openings in {country} that cater to all skill
        levels and industries. Whether you&apos;re looking for a job in tech,
        marketing, healthcare, or any other field, we have you covered. Our job
        search feature allows you to search for jobs in {country} by keyword,
        location, and category, making it easy to find the perfect job for you.
        So why wait? Start applying for jobs in {country} today and take the
        first step towards building your dream career!
      </p>
      <div className="mx-auto mt-3 flex max-w-[700px] flex-wrap justify-center gap-2">
        {countries.map((country, index) => (
          <Link
            href={{
              query: { country: country.name, cCd: country.code },
            }}
            key={index}
            className="flex gap-2 rounded-base bg-primary-100 px-2 py-1 text-secondary duration-300 hover:bg-primary hover:text-primary-foreground"
          >
            <Flag code={country.code.toLocaleLowerCase()} name={country.name} />{" "}
            {country.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CountrySearchResult;
