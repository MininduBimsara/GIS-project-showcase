"use client";

// Split Design Footer
import { Mail, Phone, Facebook, Linkedin, Youtube } from "lucide-react";
import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-24">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Left Side - Dark */}
        <div className="bg-slate-900 text-white p-12 lg:p-16">
          <h2 className="text-4xl font-bold mb-6">GIS Solutions</h2>
          <p className="text-slate-300 mb-8">
            Professional Geographic Information System solutions for Sri Lankan
            government organizations and departments.
          </p>
          <div className="mb-6">
            <h3 className="font-bold text-lg mb-3">Contact Us</h3>
            <ul className="space-y-2 text-sm text-slate-300">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#fbbf24]" />
                <a
                  href="tel:+94777270603"
                  className="hover:text-[#fbbf24] transition-colors"
                >
                  +94 77 727 0603
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#fbbf24]" />
                <a
                  href="mailto:info@gislk.com"
                  className="hover:text-[#fbbf24] transition-colors"
                >
                  info@gislk.com
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-3">Follow Us</h3>
            <div className="flex gap-3">
              <a
                href="http://facebook.com/GISSolutions370"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 hover:bg-[#8b2635] rounded-full flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://youtube.com/@gissolutions-sl?si=C-53GQs-hvxsJbba"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 hover:bg-[#8b2635] rounded-full flex items-center justify-center transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/company/gis-solutions-private-limited/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 hover:bg-[#8b2635] rounded-full flex items-center justify-center transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Right Side - Light */}
        <div className="bg-slate-100 p-12 lg:p-16">
          <div className="grid grid-cols-2 gap-8 mb-12">
            <div>
              <h3 className="font-bold text-lg mb-4">Company</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link
                    href="/"
                    className="hover:text-brand-red transition-colors"
                  >
                    Home
                  </Link>
                </li>
                
                <li>
                  <Link
                    href="/contact"
                    className="hover:text-brand-red transition-colors"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Contact</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-brand-red" />
                  +94 77 727 0603
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-brand-red" />
                  info@gislk.com
                </li>
              </ul>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            © {currentYear} GIS Solutions (Pvt) Ltd. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
