"use client";
import React, { useEffect } from "react";
import Flag from "./flagitem";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchCountries } from "@/store/slices/locationSlice";
import useGeoInfo from "@/hooks/useGeoInfo";
import { getClosestCountries } from "@/util/location";
import { createUrl } from "@/util";

const CountrySearchResult: React.FC = () => {
  const { data: geoDat } = useGeoInfo();
  const initialCountry = geoDat.country_code2;

  const { countries } = useAppSelector((state) => state.location);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (countries.data.length === 0) {
      dispatch(fetchCountries());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const userLocation = countries.data?.find(
    (x) => x.isoCode === initialCountry,
  );

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const countryParam = searchParams.get("country");
  const countryCode = countryParam || initialCountry;
  const country = countries.data.find((x) => x.isoCode === countryCode);
  const displayCountry = country?.name || countryCode;

  const closestCountries = getClosestCountries(
    Number(userLocation?.latitude),
    Number(userLocation?.longitude),
    countries.data.filter((x) => x.isoCode !== countryParam),
    20,
  );

  function countryChange(countryCode: string) {
    const newParams = new URLSearchParams(searchParams.toString());
    if (countryCode) {
      newParams.set("country", countryCode);
    } else {
      newParams.delete("country");
    }
    router.push(createUrl(pathname, newParams));
  }

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
        {closestCountries.map((country, index) => (
          <button
            onClick={() => countryChange(country.isoCode)}
            key={index}
            className="flex gap-2 rounded-base bg-primary-100 px-2 py-1 text-secondary duration-300 hover:bg-primary hover:text-primary-foreground"
          >
            <Flag
              code={country.isoCode.toLocaleLowerCase()}
              name={country.name}
            />{" "}
            {country.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CountrySearchResult;

export const CountryHeading: React.FC = () => {
  const { countries } = useAppSelector((state) => state.location);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (countries.data.length === 0) {
      dispatch(fetchCountries());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);
  const searchParams = useSearchParams();
  const countryCode = searchParams.get("country");

  const country = countries.data.find((x) => x.isoCode === countryCode);
  return (
    <>
      {country && (
        <span className="text-[45px] font-black text-primary-foreground md:text-[60px]">
          {" "}
          in
          <span
            className={`${country ? `text-transparent` : "text-primary-foreground"} bg-contain bg-clip-text bg-center text-[45px] font-black md:text-[60px]`}
            style={{
              backgroundImage: `url('https://flagcdn.com/${country.isoCode.toLowerCase()}.svg')`,
              backgroundSize: "contain",
              backgroundPosition: "center",
            }}
          >
            {" " + country.name}
          </span>
        </span>
      )}
    </>
  );
};
