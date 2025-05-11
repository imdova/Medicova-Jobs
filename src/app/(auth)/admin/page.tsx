"use client";
import React from "react";
import { Clock10 } from "lucide-react"; // optional: use any icon lib like lucide

const DashboardHome: React.FC = () => {
  return (
    <div className="flex h-[80vh] flex-col items-center justify-center px-4 text-center">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-soft">
        <div className="mb-6 flex animate-pulse justify-center">
          <Clock10 className="h-12 w-12 text-indigo-500" />
        </div>
        <h1 className="mb-2 text-3xl font-bold text-gray-800">
          building...
          <br />
          Dashboard Home
        </h1>
        <p className="mb-4 text-gray-600">
          This page isn’t ready yet... but it’s on its way!
        </p>
        <p className="text-sm text-gray-500">
          We’re building something awesome.
        </p>
      </div>
      <p className="mt-6 text-xs text-gray-400">
        © {new Date().getFullYear()} Medicova
      </p>
    </div>
  );
};

export default DashboardHome;
