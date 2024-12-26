import React, { Suspense } from "react";
import Header from "./(public)/search/header";
import Image from "next/image";
import Link from "next/link";
import SearchForm from "@/components/UI/search-form";

const HomePage = () => {
  return (
    <div>
      <div className="bg-[url('/images/search-background.jpg')] bg-cover bg-center">
        <div className="bg-gradient-to-b from-[#82C341E5] to-[#2BA149E5] p-4 shadow-md">
          <Header />
          <div className="container mx-auto flex flex-col-reverse items-center gap-6 p-4 md:flex-row lg:max-w-[1170px]">
            <div className="col-span-4 md:col-span-3">
              <h2 className="mb-6 text-[45px] font-black leading-none text-white md:text-[60px]">
                <span className="text-[45px] font-black text-[#101828] md:text-[60px]">
                  Discover
                </span>{" "}
                More <br />
                Than 5000
                <span className="text-[45px] font-black text-[#101828] md:text-[60px]">
                  {" "}
                  + Jobs
                </span>{" "}
              </h2>
              <Suspense>
                <SearchForm pathname="/search" />
              </Suspense>
              <p className="mt-4 text-gray-100">
                {" "}
                <span className="font-bold text-white">Popular</span> : Medical
                Claims Officer,Dental Designer, Healthcare- Presales specialist,
                Medical Ambassador
              </p>
              <div className="mt-4 flex flex-wrap gap-4 text-nowrap">
                <Link
                  href="/search?q=Pediatric Consultant"
                  className="rounded-full border border-white px-4 py-2 text-sm text-white transition-colors duration-300 hover:bg-white hover:text-[#2BA149] focus:ring-2 focus:ring-white"
                >
                  Pediatric Consultant
                </Link>
                <Link
                  href="/search?q=ICU Nurse"
                  className="rounded-full border border-white px-4 py-2 text-sm text-white transition-colors duration-300 hover:bg-white hover:text-[#2BA149] focus:ring-2 focus:ring-white"
                >
                  ICU Nurse
                </Link>
                <Link
                  href="/search?q=Obsteric Consultant Saudi Arabia"
                  className="rounded-full border border-white px-4 py-2 text-sm text-white transition-colors duration-300 hover:bg-white hover:text-[#2BA149] focus:ring-2 focus:ring-white"
                >
                  Obsteric Consultant Saudi Arabia
                </Link>
                <Link
                  href="/search?q=Internal Medicine Registrar Oman"
                  className="rounded-full border border-white px-4 py-2 text-sm text-white transition-colors duration-300 hover:bg-white hover:text-[#2BA149] focus:ring-2 focus:ring-white"
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
        <div className="container mx-auto min-h-screen lg:max-w-[1170px]">
          <div className="mt-8 flex justify-center p-4">
            <div className="rounded-full bg-[#2BA149] px-6 py-2 text-white">
              Job Categories
            </div>
          </div>
          <h2 className="mb-6 text-center text-[45px] font-bold leading-none text-[#82C341] md:text-[60px]">
            <span className="text-[45px] font-bold text-[#101828] md:text-[60px]">
              Explore Jobs
            </span>{" "}
            By Specialist
          </h2>
          <p className="mx-auto max-w-[700px] text-center text-2xl text-gray-500">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry&apos;s standard dummy
          </p>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
