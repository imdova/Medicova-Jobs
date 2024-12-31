import React, { Suspense } from "react";
import Header from "./(public)/search/header";
import Image from "next/image";
import Link from "next/link";
import SearchForm from "@/components/UI/search-form";
import Flag from "@/components/UI/flagitem";
import Carousel, { CompanyCard, SpecialtyCard } from "@/components/UI/Carousel";
import { companies, jobs, specialists } from "@/constants";
import BasicTabs from "@/components/UI/tabs";
import Testimonials from "@/components/UI/testimonials";
import MinJobCard from "@/components/UI/job-card-min";

const countries = [
  { name: "Saudi Arabia", code: "SA" },
  { name: "UAE", code: "AE" },
  { name: "Egypt", code: "EG" },
  { name: "Qatar", code: "QA" },
  { name: "Oman", code: "OM" },
  { name: "Bahrain", code: "BH" },
  { name: "Australia", code: "AU" },
  { name: "Canada", code: "CA" },
  { name: "Germany", code: "DE" },
  { name: "United Kingdom", code: "GB" },
];

const HomePage = () => {
  return (
    <div>
      <div className="bg-[url('/images/search-background.jpg')] bg-cover bg-center">
        <div className="bg-gradient-to-b from-light-primary-transparent to-primary-transparent p-4 shadow-md">
          <Header />
          <div className="container mx-auto flex flex-col-reverse items-center gap-6 p-4 md:flex-row lg:max-w-[1170px]">
            <div className="col-span-4 md:col-span-3">
              <h2 className="mb-6 text-[45px] font-black leading-none text-primary-foreground md:text-[60px]">
                <span className="text-[45px] font-black text-main md:text-[60px]">
                  Discover
                </span>{" "}
                More <br />
                Than 5000
                <span className="text-[45px] font-black text-main md:text-[60px]">
                  {" "}
                  + Jobs
                </span>{" "}
              </h2>
              <Suspense>
                <SearchForm pathname="/search" />
              </Suspense>
              <p className="mt-4 text-gray-100">
                {" "}
                <span className="font-bold text-primary-foreground">
                  Popular
                </span>{" "}
                : Medical Claims Officer,Dental Designer, Healthcare- Presales
                specialist, Medical Ambassador
              </p>
              <div className="mt-4 flex flex-wrap gap-4 text-nowrap">
                <Link
                  href="/search?q=Pediatric Consultant"
                  className="rounded-full border border-white px-4 py-2 text-sm text-primary-foreground transition-colors duration-300 hover:bg-white hover:text-primary focus:ring-2 focus:ring-white"
                >
                  Pediatric Consultant
                </Link>
                <Link
                  href="/search?q=ICU Nurse"
                  className="rounded-full border border-white px-4 py-2 text-sm text-primary-foreground transition-colors duration-300 hover:bg-white hover:text-primary focus:ring-2 focus:ring-white"
                >
                  ICU Nurse
                </Link>
                <Link
                  href="/search?q=Obsteric Consultant Saudi Arabia"
                  className="rounded-full border border-white px-4 py-2 text-sm text-primary-foreground transition-colors duration-300 hover:bg-white hover:text-primary focus:ring-2 focus:ring-white"
                >
                  Obsteric Consultant Saudi Arabia
                </Link>
                <Link
                  href="/search?q=Internal Medicine Registrar Oman"
                  className="rounded-full border border-white px-4 py-2 text-sm text-primary-foreground transition-colors duration-300 hover:bg-white hover:text-primary focus:ring-2 focus:ring-white"
                >
                  Internal Medicine Registrar Oman
                </Link>
              </div>
            </div>
            <Image
              src="/images/hero.png"
              alt="search background"
              width={400}
              height={400}
              className="col-span-1 w-[300px] object-contain md:w-[200px] lg:w-[400px]"
            />
          </div>
        </div>
      </div>
      <main>
        {/* explore jobs by specialist */}
        <div className="bg-opacity-10 bg-[url('/images/specialty-bg.png')] bg-cover bg-center">
          <div className="bg-neutral-100/60">
            <div className="container mx-auto min-h-screen p-2 pt-16 lg:max-w-[1170px]">
              <div className="flex justify-center p-4">
                <div className="rounded-full bg-primary px-6 py-2 text-primary-foreground">
                  Job Categories
                </div>
              </div>
              <h2 className="mb-6 text-center text-[45px] font-bold leading-none text-light-primary md:text-[60px]">
                <span className="text-[45px] font-bold text-main md:text-[60px]">
                  Explore Jobs
                </span>{" "}
                By Specialist
              </h2>
              <p className="mx-auto mb-16 max-w-[700px] text-center text-2xl text-secondary">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry&apos;s standard
                dummy
              </p>

              <div className="mb-6 grid grid-cols-1 grid-rows-1">
                <div className="z-[1] col-start-1 row-start-1 w-full rounded-full bg-gray-50 p-4">
                  <div className="flex items-center">
                    <Carousel
                      items={specialists}
                      CustomCard={SpecialtyCard}
                      responsive={[
                        { breakpoint: 640, itemsToShow: 1 }, // Extra small screens
                        { breakpoint: 1024, itemsToShow: 3 }, // Small screens
                        { breakpoint: Infinity, itemsToShow: 6 }, // Medium screens
                      ]}
                    />
                  </div>
                </div>
                <div className="z-0 col-start-1 row-start-1 h-full w-full translate-y-2 rounded-full bg-primary"></div>
              </div>
            </div>
          </div>
        </div>

        {/* popular country  */}
        <div className="container mx-auto min-h-screen p-2 pt-16 lg:max-w-[1170px]">
          <h2 className="my-6 text-center text-[45px] font-bold leading-none text-light-primary md:text-[60px]">
            <span className="text-[45px] font-bold text-main md:text-[60px]">
              Popular
            </span>{" "}
            Country
          </h2>
          <p className="mx-auto mb-16 max-w-[700px] text-center text-2xl text-secondary">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </p>
          <div className="grid grid-cols-2 justify-center gap-5 p-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {countries.map((country, i) => (
              <div
                key={i}
                className="my-4 flex items-center gap-2 rounded-[10px] border border-gray-200 bg-white shadow-xl duration-300 hover:scale-105 hover:border-light-primary hover:shadow-2xl"
              >
                <Flag
                  code={country.code.toLocaleLowerCase()}
                  name={country.name}
                  className="my-4 ml-4 mr-2 h-[35px] w-[50px] rounded-lg object-cover"
                />
                <h6 className="font-semibold md:text-xl">{country.name}</h6>
              </div>
            ))}
          </div>
        </div>

        {/* Discover who is hiring on Medicova */}
        <div className="bg-opacity-10 bg-[url('/images/hiring-bg.jpg')] bg-cover bg-center">
          <div className="bg-neutral-100/60">
            <div className="container mx-auto min-h-screen p-2 py-16 lg:max-w-[1170px]">
              <h2 className="my-6 text-center text-[45px] font-bold leading-none text-light-primary md:text-[60px]">
                <span className="text-[45px] font-bold text-main md:text-[60px]">
                  Discover who is hiring on
                </span>{" "}
                Medicova
              </h2>
              <p className="mx-auto mb-8 max-w-[700px] text-center text-2xl text-secondary">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry&apos;s standard
                dummy
              </p>

              <Carousel
                items={companies}
                CustomCard={CompanyCard}
                responsive={[
                  { breakpoint: 640, itemsToShow: 1 }, // Extra small screens
                  { breakpoint: 1024, itemsToShow: 2 }, // Small screens
                  { breakpoint: Infinity, itemsToShow: 3 }, // Medium screens
                ]}
              />
            </div>
          </div>
        </div>

        {/* 50% Discount  */}
        <div className="bg-gradient-to-tr from-primary to-light-primary">
          <div className="bg-opacity-10 bg-[url('/images/honey.svg')] bg-contain bg-center">
            <div className="container mx-auto px-2 pt-16 lg:max-w-[1170px]">
              <div className="grid grid-cols-1 grid-rows-2 md:grid-cols-3 md:grid-rows-1">
                <div className="md:my-6">
                  <h2 className="mb-4 text-[45px] font-bold leading-none text-primary-foreground md:text-[60px]">
                    Discover more
                    <span className="text-[45px] font-bold text-main md:text-[60px]">
                      {" "}
                      is <br /> our{" "}
                    </span>{" "}
                    Priority
                  </h2>
                  <p className="max-w-80 text-4xl font-bold text-primary-foreground">
                    “We provide the perfect healthcare service”
                  </p>
                </div>
                <div className="z-[1] flex items-end justify-center py-6">
                  <div className="flex h-[200px] w-[200px] flex-col items-center justify-center rounded-full bg-white text-center shadow-2xl">
                    <h6 className="text-[60px] font-black text-light-primary">
                      50%
                    </h6>
                    <p className="text-[24px] font-black text-main">Discount</p>
                  </div>
                </div>
                <div className="relative z-0 hidden md:block">
                  <Image
                    src="/images/doc-woman.png"
                    alt="doc"
                    width={500}
                    height={600}
                    className="absolute bottom-0 right-40 h-[420px] w-[450px] object-cover"
                  />
                  <Image
                    src="/images/doc.png"
                    alt="doc"
                    width={500}
                    height={500}
                    className="absolute bottom-0 right-0 h-[500px] w-[500px] object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* TODO: take it into company profile  */}
        {/* Latest jobs open    */}
        <div className="bg-[url('/images/jobs-background.jpg')] bg-cover bg-center">
          <div className="bg-white/80 shadow-md">
            <div className="container mx-auto p-4 lg:max-w-[1170px]">
              <h2 className="my-6 text-center text-[45px] font-bold leading-none text-light-primary md:text-[60px]">
                <span className="text-[45px] font-bold text-main md:text-[60px]">
                  Latest jobs
                </span>{" "}
                open
              </h2>
              <p className="mx-auto mb-8 max-w-[700px] text-center text-2xl text-secondary">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry&apos;s standard
                dummy
              </p>

              <div className="mt-4 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                {/* card  */}
                {jobs.map((job, i) => (
                  <MinJobCard key={i} job={job} />
                ))}
              </div>
              <div className="mt-8 flex justify-center">
                <Link
                  href="#"
                  className="rounded-[8px] bg-primary px-6 py-3 font-semibold uppercase text-primary-foreground transition-colors duration-300 hover:bg-primary-foreground hover:text-primary focus:ring-2 focus:ring-white"
                >
                  Explore All
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Jobseeker Testimonials */}
        <div className="bg-gradient-to-tr from-primary to-light-primary">
          <div className="container mx-auto p-2 py-6 lg:max-w-[1170px]">
            <h2 className="my-6 text-center text-[45px] font-bold leading-none text-main md:text-[60px]">
              Jobseeker{" "}
              <span className="text-[45px] font-bold text-primary-foreground md:text-[60px]">
                Testimonials
              </span>
            </h2>
            <p className="mx-auto mb-8 max-w-[700px] text-center text-2xl text-primary-foreground">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry&apos;s standard dummy
            </p>
            <Testimonials />
            <div className="mt-8 flex justify-center">
              <Link
                href="#"
                className="rounded-[8px] bg-primary-foreground px-6 py-3 font-semibold uppercase text-primary transition-colors duration-300 hover:bg-transparent hover:text-primary-foreground focus:ring-2 focus:ring-white"
              >
                Explore All
              </Link>
            </div>
          </div>
        </div>

        <div className="bg-[url('/images/jobs-background.jpg')] bg-cover bg-center">
          <div className="bg-white/80 shadow-md">
            <div className="container mx-auto min-h-screen p-4 lg:max-w-[1170px]">
              <h2 className="my-6 text-center text-[45px] font-bold leading-none text-main md:text-[60px]">
                Find Job Vacancies
                <span className="text-[45px] font-bold text-light-primary md:text-[60px]">
                  {" "}
                  BY
                </span>
              </h2>
              <p className="mx-auto mb-8 max-w-[700px] text-center text-2xl text-secondary">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry&apos;s standard
                dummy
              </p>

              <div className="rounded-[10px] bg-white p-4 py-16 shadow-xl">
                <BasicTabs />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
