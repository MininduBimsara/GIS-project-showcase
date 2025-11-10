"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Youtube,
  Linkedin,
  Send,
  CheckCircle2,
  X,
} from "lucide-react";
import { useLanguage } from "@/Context/Languagecontext";

function ContactPage() {
  useLanguage();
  const [status, setStatus] = useState<"idle" | "loading">("idle");
  const [showSuccess, setShowSuccess] = useState(false);

  // Check URL for success parameter (FormSubmit redirects back with ?success=true)
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get("success") === "true") {
      setShowSuccess(true);
      // Remove the success parameter from URL
      window.history.replaceState({}, "", window.location.pathname);
    }
  }, []);

  // Handle form submission start
  const handleSubmit = () => {
    setStatus("loading");
  };

  // Close success popup
  const closeSuccessPopup = () => {
    setShowSuccess(false);
  };

  return (
    <main className="container mx-auto px-4 py-5">
      {/* Success Popup */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full relative animate-in fade-in zoom-in duration-300">
            <button
              onClick={closeSuccessPopup}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-2">
                Success!
              </h3>
              <p className="text-slate-600 mb-6">
                Your message has been sent successfully. We&apos;ll get back to
                you soon.
              </p>
              <Button
                onClick={closeSuccessPopup}
                className="bg-[#8b2635] hover:bg-[#6d1f29] text-white px-8"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Page Header */}
      <div className="mb-5 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-gov-maroon-500 mb-4 font-serif">
          Contact Us
        </h2>
        <div className="w-24 h-1 bg-gov-gold-400 mx-auto mb-6"></div>
        <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
          Get in touch with us. We&apos;re here to help and answer any questions
          you might have.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {/* Contact Information Cards */}
        <div className="lg:col-span-1 space-y-6">
          {/* Address Card */}
          <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-slate-100 hover:border-gov-maroon-500/20 transition-all">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gov-maroon-500/10 rounded-lg flex items-center justify-center shrink-0">
                <MapPin className="w-6 h-6 text-gov-maroon-500" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-slate-800 mb-2">
                  Address
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  GIS Solutions (Private) Limited, #370,
                  <br />
                  Galle Road, Colombo 3, Sri Lanka
                </p>
              </div>
            </div>
          </div>

          {/* Phone Card */}
          <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-slate-100 hover:border-gov-maroon-500/20 transition-all">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gov-maroon-500/10 rounded-lg flex items-center justify-center shrink-0">
                <Phone className="w-6 h-6 text-gov-maroon-500" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-slate-800 mb-2">Phone</h3>
                <p className="text-slate-600 text-sm">
                  Hot Line:{" "}
                  <a
                    href="tel:+94777270603"
                    className="hover:text-gov-maroon-500"
                  >
                    +94 77 727 0603
                  </a>
                </p>
                <p className="text-slate-600 text-sm">
                  Tel:{" "}
                  <a
                    href="tel:+94112575299"
                    className="hover:text-gov-maroon-500"
                  >
                    +94 112 575 299
                  </a>
                </p>
                <p className="text-slate-600 text-sm">Fax: +94 11 257 5297</p>
              </div>
            </div>
          </div>

          {/* Email Card */}
          <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-slate-100 hover:border-gov-maroon-500/20 transition-all">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gov-maroon-500/10 rounded-lg flex items-center justify-center shrink-0">
                <Mail className="w-6 h-6 text-gov-maroon-500" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-slate-800 mb-2">Email</h3>
                <a
                  href="mailto:info@gislk.com"
                  className="text-slate-600 text-sm hover:text-gov-maroon-500 transition-colors"
                >
                  info@gislk.com
                </a>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div className="bg-gradient-to-br from-gov-maroon-500 to-[#6d1f29] rounded-xl shadow-lg p-6">
            <h3 className="font-bold text-lg text-white mb-4">
              Connect With Us
            </h3>
            <div className="flex gap-3">
              <a
                href="http://facebook.com/GISSolutions370"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/20 hover:bg-gov-gold-400 rounded-lg flex items-center justify-center transition-all hover:scale-110"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5 text-white" />
              </a>
              <a
                href="https://youtube.com/@gissolutions-sl?si=C-53GQs-hvxsJbba"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/20 hover:bg-gov-gold-400 rounded-lg flex items-center justify-center transition-all hover:scale-110"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5 text-white" />
              </a>
              <a
                href="https://www.linkedin.com/company/gis-solutions-private-limited/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/20 hover:bg-gov-gold-400 rounded-lg flex items-center justify-center transition-all hover:scale-110"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5 text-white" />
              </a>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-lg p-8 border-2 border-slate-100">
            <h3 className="text-2xl font-bold text-slate-800 mb-6 font-serif">
              Send us a Message
            </h3>

            {/* FormSubmit.co Integration */}
            <form
              action="https://formsubmit.co/mininduabeywardena@gmail.com"
              method="POST"
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              {/* Hidden fields for FormSubmit configuration */}
              <input
                type="hidden"
                name="_subject"
                value="New Contact Form Submission - GIS Solutions"
              />
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_template" value="table" />
              {/* Redirect back to the same page with success parameter */}
              <input
                type="hidden"
                name="_next"
                value="https://gis-project-showcase.vercel.app/contact?success=true"
              />

              {/* Name Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-slate-700 mb-2"
                  >
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="firstName"
                    name="First Name"
                    type="text"
                    placeholder="Enter your first name"
                    className="border-2 border-slate-200 focus:border-[#8b2635] rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-slate-700 mb-2"
                  >
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="lastName"
                    name="Last Name"
                    type="text"
                    placeholder="Enter your last name"
                    className="border-2 border-slate-200 focus:border-[#8b2635] rounded-lg"
                    required
                  />
                </div>
              </div>

              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-slate-700 mb-2"
                >
                  Email Address <span className="text-red-500">*</span>
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="your.email@example.com"
                  className="border-2 border-slate-200 focus:border-[#8b2635] rounded-lg"
                  required
                />
              </div>

              {/* Contact Number Field */}
              <div>
                <label
                  htmlFor="contactNo"
                  className="block text-sm font-medium text-slate-700 mb-2"
                >
                  Contact Number
                </label>
                <Input
                  id="contactNo"
                  name="Contact Number"
                  type="tel"
                  placeholder="+94 77 123 4567"
                  className="border-2 border-slate-200 focus:border-[#8b2635] rounded-lg"
                />
              </div>

              {/* Message Field */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-slate-700 mb-2"
                >
                  Message <span className="text-red-500">*</span>
                </label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Tell us how we can help you..."
                  rows={6}
                  className="border-2 border-slate-200 focus:border-[#8b2635] rounded-lg resize-none"
                  required
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={status === "loading"}
                className="w-full bg-[#8b2635] hover:bg-[#6d1f29] text-white py-6 rounded-lg font-semibold text-base transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === "loading" ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <Send className="w-5 h-5 ml-2" />
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="mt-16">
        <div className="bg-white rounded-xl shadow-lg p-4 border-2 border-slate-100 overflow-hidden">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.8613339452813!2d79.84789107499628!3d6.907179893092248!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2595d8254ba5d%3A0xb2cf141bb1db129e!2sGIS%20Solutions%20Private%20Limited!5e0!3m2!1sen!2slk!4v1762751020479!5m2!1sen!2slk" 
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="rounded-lg"
            title="GIS Solutions Location"
          ></iframe>
        </div>
      </div>
    </main>
  );
}

export default ContactPage;
