// Import necessary modules
import React from "react";

import { Button } from "@/components/ui/button";
import { Github, Instagram, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";
// Importing Link component from Shadcn

const Footers: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-10 px-5">
      {/* Main footer container */}
      <div className="container mx-auto flex flex-wrap justify-between">
        {/* Section 1: Logo/Brand */}
        <div className="w-full md:w-1/3 mb-6 md:mb-0">
          <h3 className="text-2xl font-semibold mb-2">Codecor</h3>
          <p className="text-gray-400 grid grid-cols-2">
            Streamline your development workflow with resources you need all in
            one place.
          </p>
        </div>

        {/* Section 2: Links */}
        <div className="w-full md:w-1/3 mb-6 md:mb-0">
          <h4 className="text-lg font-semibold mb-4">Useful Links</h4>
          <ul className="space-y-2">
            <li>
              <Link href="/about" className="text-gray-400 hover:text-white">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-gray-400 hover:text-white">
                Contact Us
              </Link>
            </li>
            <li>
              <Link href="/faq" className="text-gray-400 hover:text-white">
                FAQ
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="text-gray-400 hover:text-white">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>

        {/* Section 3: Social Media */}
        <div className="w-full md:w-1/3">
          <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
          <div className="flex space-x-4">
            {/* Social Media Icons */}
            <Button variant="link" asChild>
              <a
                href="https://github.com/mihirDP"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="w-6 h-6 text-gray-400 hover:text-white" />
              </a>
            </Button>
            <Button variant="link" asChild>
              <a
                href="https://x.com/mihirpatil__"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twitter className="w-6 h-6 text-gray-400 hover:text-white" />
              </a>
            </Button>
            <Button variant="link" asChild>
              <a
                href="https://instagram.com/mihirpatil_"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram className="w-6 h-6 text-gray-400 hover:text-white" />
              </a>
            </Button>
            <Button variant="link" asChild>
              <a
                href="https://linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="w-6 h-6 text-gray-400 hover:text-white" />
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Section 4: Bottom Bar */}
      <div className="border-t border-gray-700 mt-8 pt-4">
        <p className="text-center text-gray-400 text-sm">
          © {new Date().getFullYear()} Codecor. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footers;
