import { Button, IconButton, TextField } from "@mui/material";
import { Facebook, Twitter, Instagram, LinkedIn } from "@mui/icons-material";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="relative bg-[#185D43] text-white px-4 py-12 z-50">
      <div className="absolute inset-0 bg-[url('/images/background.png')]  bg-cover bg-top opacity-20 z-[-1] "></div>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Column 1 - Logo and Social */}
        <div className="flex flex-col items-center md:items-start space-y-4">
          <Image src="/images/logo.png" alt="Logo" width={150} height={150} />
          <p className="text-[#D6DDEB] text-center sm:text-start">
            Browse Jobs by Career Level Employers and Recruiters, go to our
            RECRUITMENT SERVICES. Great platform for the job seeker that
            passionate about startups. Find your dream job easier.
          </p>
          <div className="flex space-x-4">
            <IconButton className="p-2 bg-white/10 shadow-md text-white cursor-pointer hover:text-blue-500 transition-colors">
              <Facebook />
            </IconButton>
            <IconButton className="p-2 bg-white/10 shadow-md text-white cursor-pointer hover:text-blue-400 transition-colors">
              <Twitter />
            </IconButton>
            <IconButton className="p-2 bg-white/10 shadow-md text-white cursor-pointer hover:text-pink-500 transition-colors">
              <Instagram />
            </IconButton>
            <IconButton className="p-2 bg-white/10 shadow-md text-white cursor-pointer hover:text-blue-600 transition-colors">
              <LinkedIn />
            </IconButton>
          </div>
        </div>

        {/* Column 2 - Quick Links */}
        <div className="flex flex-col space-y-2">
          <h3 className="text-xl font-bold mb-4">About</h3>
          <Link
            href="#"
            className="text-[#D6DDEB] hover:text-white transition-colors"
          >
            Companies
          </Link>
          <Link
            href="#"
            className="text-[#D6DDEB] hover:text-white transition-colors"
          >
            Pricing
          </Link>
          <Link
            href="#"
            className="text-[#D6DDEB] hover:text-white transition-colors"
          >
            Terms
          </Link>
          <Link
            href="#"
            className="text-[#D6DDEB] hover:text-white transition-colors"
          >
            Advice
          </Link>
          <Link
            href="#"
            className="text-[#D6DDEB] hover:text-white transition-colors"
          >
            Privacy Policy
          </Link>
        </div>

        {/* Column 3 - Resources */}
        <div className="flex flex-col space-y-2">
          <h3 className="text-xl font-bold mb-4">Resources</h3>
          <Link
            href="#"
            className="text-[#D6DDEB] hover:text-white transition-colors"
          >
            Help Docs
          </Link>
          <Link
            href="#"
            className="text-[#D6DDEB] hover:text-white transition-colors"
          >
            Guide
          </Link>
          <Link
            href="#"
            className="text-[#D6DDEB] hover:text-white transition-colors"
          >
            Updates
          </Link>
          <Link
            href="#"
            className="text-[#D6DDEB] hover:text-white transition-colors"
          >
            Contact Us
          </Link>
        </div>

        {/* Column 4 - Newsletter */}
        <div className="flex flex-col space-y-4">
          <h3 className="text-xl font-bold mb-4">Get job notifications</h3>
          <p className="text-[#D6DDEB]">
            The latest job news, articles, sent to your inbox weekly.
          </p>
          <TextField
            placeholder="Enter your email"
            size="small"
            className="bg-white"
            fullWidth
          />
          <Button variant="contained" color="primary" className="w-full">
            Subscribe
          </Button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
