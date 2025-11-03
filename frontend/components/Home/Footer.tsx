"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Linkedin,
  Youtube,
} from "lucide-react";
import { useLanguage } from "@/Context/Languagecontext";

export function Footer() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white mt-24 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#8b2635] rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#fbbf24] rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 py-16 relative">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* About Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
             
                <Image
                  src="/logo.png"
                  alt="GIS Logo"
                  width={40}
                  height={40}
                  className="object-contain"
                />
            
              <div>
                <h3 className="text-2xl font-bold font-serif">
                  {t.footer.companyName}
                </h3>
                <p className="text-sm text-slate-400">
                  {t.footer.companySubtitle}
                </p>
              </div>
            </div>
            <p className="text-slate-300 leading-relaxed mb-6 max-w-md">
              {t.footer.description}
            </p>
            {/* Social Media */}
            <div className="flex gap-3">
              <a
                href="#"
                className="w-10 h-10 bg-white/10 hover:bg-[#8b2635] rounded-lg flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/10 hover:bg-[#8b2635] rounded-lg flex items-center justify-center transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/10 hover:bg-[#8b2635] rounded-lg flex items-center justify-center transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/10 hover:bg-[#8b2635] rounded-lg flex items-center justify-center transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-6 text-[#fbbf24] flex items-center gap-2">
              <span className="w-1 h-6 bg-[#fbbf24] rounded-full"></span>
              {t.footer.services.title}
            </h3>
            <ul className="space-y-3 text-sm text-slate-300">
              {t.footer.services.links.map((link, index) => (
                <li key={index}>
                  <Link
                    href="/"
                    className="hover:text-[#fbbf24] transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 bg-slate-500 rounded-full group-hover:bg-[#fbbf24] transition-colors"></span>
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-lg mb-6 text-[#fbbf24] flex items-center gap-2">
              <span className="w-1 h-6 bg-[#fbbf24] rounded-full"></span>
              {t.footer.contact.title}
            </h3>
            <ul className="space-y-4 text-sm text-slate-300">
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4 text-[#fbbf24]" />
                </div>
                <div>
                  <p className="font-medium text-white mb-1">
                    {t.footer.contact.address.label}
                  </p>
                  <p className="text-slate-400">
                    {t.footer.contact.address.line1}
                    <br />
                    {t.footer.contact.address.line2}
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone className="w-4 h-4 text-[#fbbf24]" />
                </div>
                <div>
                  <p className="font-medium text-white mb-1">
                    {t.footer.contact.phone.label}
                  </p>
                  <a
                    href={`tel:${t.footer.contact.phone.number}`}
                    className="text-slate-400 hover:text-[#fbbf24] transition-colors"
                  >
                    {t.footer.contact.phone.number}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="w-4 h-4 text-[#fbbf24]" />
                </div>
                <div>
                  <p className="font-medium text-white mb-1">
                    {t.footer.contact.email.label}
                  </p>
                  <a
                    href={`mailto:${t.footer.contact.email.address}`}
                    className="text-slate-400 hover:text-[#fbbf24] transition-colors"
                  >
                    {t.footer.contact.email.address}
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-700/50 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
            <p className="text-slate-400">
              © {currentYear} {t.footer.copyright}
            </p>
            <div className="flex flex-wrap gap-6 justify-center">
              {t.footer.legal.map((item, index) => (
                <Link
                  key={index}
                  href="/"
                  className="text-slate-400 hover:text-[#fbbf24] transition-colors"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
