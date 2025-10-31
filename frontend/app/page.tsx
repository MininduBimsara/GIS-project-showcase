import { projects } from "@/data/projects";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, MapPin, Calendar } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "GIS Solutions for Government Sector | Sri Lanka",
  description:
    "Professional Geographic Information System solutions for Sri Lankan government organizations",
};

export default function Home() {
  return (
    <div className="min-h-screen bg-government-gradient">
      {/* Header/Navigation - Centered */}
      <header className="bg-white border-b-4 border-blue-600 shadow-md pb-5">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col items-center justify-center text-center gap-4">
            <Image
              src="/logo.png"
              alt="GIS Logo"
              width={100}
              height={100}
              className="object-contain"
              priority
            />
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-800 tracking-tight">
                GIS Solutions for Government Sector
              </h1>
              <p className=" text-base md:text-lg text-slate-600 mt-2">
                Geographic Information Systems | Sri Lanka Government
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Projects Gallery - Direct display without title */}
      <section className="py-6 container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <article key={project.id} className="project-card flex flex-col">
              {/* Project Image */}
              <div className="relative h-56 bg-slate-100 overflow-hidden">
                <Image
                  src={project.imageUrl}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />
                <Badge
                  className="absolute top-4 right-4 capitalize shadow-md font-semibold"
                  variant={
                    project.status === "completed" ? "default" : "secondary"
                  }
                >
                  {project.status.replace("-", " ")}
                </Badge>
              </div>

              {/* Project Content */}
              <div className="p-6 flex-1 flex flex-col">
                <h4 className="text-xl font-bold text-slate-800 mb-3 leading-tight">
                  {project.title}
                </h4>
                <p className="text-slate-600 mb-4 leading-relaxed flex-1 line-clamp-3">
                  {project.description}
                </p>

                {/* Project Meta Info */}
                <div className="space-y-2 mb-4 pt-4 border-t border-slate-100">
                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <MapPin className="h-4 w-4 text-blue-600" />
                    <span>{project.department}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <Calendar className="h-4 w-4 text-blue-600" />
                    <span>{project.year}</span>
                  </div>
                </div>

                {/* View Project Link */}
                <Link
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full px-4 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-sm hover:shadow-md"
                >
                  Go to Project 
                  <ExternalLink className="h-4 w-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-800 text-slate-300 py-12 border-t-4 border-blue-600 mt-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Image
                  src="/logo.png"
                  alt="GIS Logo"
                  width={50}
                  height={50}
                  className="object-contain"
                />
                <h4 className="text-xl font-bold text-white">GIS Solutions</h4>
              </div>
              <p className="text-sm leading-relaxed">
                Providing cutting-edge Geographic Information System solutions
                for Sri Lankan government organizations.
              </p>
            </div>

            <div>
              <h5 className="text-lg font-bold text-white mb-4">Quick Links</h5>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="#"
                    className="hover:text-blue-400 transition-colors"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-blue-400 transition-colors"
                  >
                    Services
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-blue-400 transition-colors"
                  >
                    Projects
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-blue-400 transition-colors"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h5 className="text-lg font-bold text-white mb-4">
                Contact Information
              </h5>
              <ul className="space-y-2 text-sm">
                <li>Email: info@gis.gov.lk</li>
                <li>Phone: +94 11 123 4567</li>
                <li>Address: Colombo, Sri Lanka</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-700 pt-8 text-center text-sm">
            <p>
              © {new Date().getFullYear()} GIS Solutions - Government of Sri
              Lanka. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
