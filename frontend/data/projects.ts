// data/projects.ts
// Version with placeholder images - ready to use immediately!

export interface Project {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  link: string;
  status: "completed" | "in-progress" | "planned";
  department?: string;
  year?: string;
  location?: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "National Land Registry Digitization",
    description:
      "Comprehensive GIS-based land registry system for digitizing and managing land ownership records across Sri Lanka. Includes cadastral mapping, property boundaries, and ownership verification systems.",
    imageUrl:
      "https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&h=600&fit=crop&q=80",
    link: "/projects/land-registry",
    status: "completed",
    department: "Department of Land Registry",
    year: "2024",
    location: "Nationwide",
  },
  {
    id: 2,
    title: "Urban Planning & Development System",
    description:
      "Advanced spatial planning tool for urban development authorities to manage zoning, infrastructure planning, and sustainable city development. Integrates population density, transportation networks, and utility services.",
    imageUrl:
      "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800&h=600&fit=crop&q=80",
    link: "/projects/urban-planning",
    status: "completed",
    department: "Urban Development Authority",
    year: "2024",
    location: "Colombo, Kandy, Galle",
  },
  {
    id: 3,
    title: "Agricultural Monitoring System",
    description:
      "Real-time crop monitoring and agricultural land management system utilizing satellite imagery and IoT sensors. Helps farmers optimize yields and supports government agricultural policies.",
    imageUrl:
      "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&h=600&fit=crop&q=80",
    link: "/projects/agriculture",
    status: "in-progress",
    department: "Department of Agriculture",
    year: "2024",
    location: "All Districts",
  },
  {
    id: 4,
    title: "Disaster Management & Early Warning",
    description:
      "Integrated GIS platform for disaster risk assessment, early warning systems, and emergency response coordination. Monitors floods, landslides, and weather patterns for proactive disaster management.",
    imageUrl:
      "https://images.unsplash.com/photo-1547683905-f686c993aae5?w=800&h=600&fit=crop&q=80",
    link: "/projects/disaster-management",
    status: "completed",
    department: "Disaster Management Centre",
    year: "2023",
    location: "High-Risk Areas",
  },
  {
    id: 5,
    title: "Forest Conservation & Wildlife Tracking",
    description:
      "Environmental monitoring system for tracking forest coverage, wildlife populations, and biodiversity conservation efforts. Supports anti-deforestation initiatives and wildlife protection programs.",
    imageUrl:
      "https://images.unsplash.com/photo-1511497584788-876760111969?w=800&h=600&fit=crop&q=80",
    link: "/projects/forest-conservation",
    status: "in-progress",
    department: "Forest Department",
    year: "2024",
    location: "Protected Areas",
  },
  {
    id: 6,
    title: "Water Resources Management",
    description:
      "Comprehensive water resource mapping and management system covering reservoirs, rivers, groundwater, and irrigation networks. Optimizes water distribution and supports drought management.",
    imageUrl:
      "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&h=600&fit=crop&q=80",
    link: "/projects/water-resources",
    status: "completed",
    department: "Water Resources Board",
    year: "2023",
    location: "All Provinces",
  },
  {
    id: 7,
    title: "Transportation & Road Network",
    description:
      "Digital mapping of national road network, traffic management, and transportation infrastructure planning. Includes real-time traffic monitoring and route optimization systems.",
    imageUrl:
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop&q=80",
    link: "/projects/transportation",
    status: "in-progress",
    department: "Road Development Authority",
    year: "2024",
    location: "Major Cities",
  },
  {
    id: 8,
    title: "Census & Demographics Analysis",
    description:
      "Spatial demographic analysis system for population census data, migration patterns, and socio-economic indicators. Supports evidence-based policy making and resource allocation.",
    imageUrl:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop&q=80",
    link: "/projects/census",
    status: "completed",
    department: "Department of Census & Statistics",
    year: "2023",
    location: "Nationwide",
  },
  {
    id: 9,
    title: "Coastal Zone Management",
    description:
      "Integrated coastal resource management system monitoring erosion, marine ecosystems, fishing zones, and port activities. Supports sustainable coastal development and conservation.",
    imageUrl:
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop&q=80",
    link: "/projects/coastal-zone",
    status: "in-progress",
    department: "Coast Conservation Department",
    year: "2024",
    location: "Coastal Districts",
  },
  {
    id: 10,
    title: "Healthcare Facility Mapping",
    description:
      "Comprehensive mapping of healthcare facilities, emergency services, and medical resource distribution. Optimizes healthcare accessibility and emergency response coordination.",
    imageUrl:
      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&h=600&fit=crop&q=80",
    link: "/projects/healthcare",
    status: "completed",
    department: "Ministry of Health",
    year: "2024",
    location: "All Districts",
  },
  {
    id: 11,
    title: "Archaeological Site Documentation",
    description:
      "Digital preservation and mapping of archaeological sites, historical monuments, and cultural heritage locations. Supports conservation efforts and tourism development.",
    imageUrl:
      "https://images.unsplash.com/photo-1548013146-72479768bada?w=800&h=600&fit=crop&q=80",
    link: "/projects/archaeology",
    status: "in-progress",
    department: "Department of Archaeology",
    year: "2024",
    location: "Heritage Sites",
  },
  {
    id: 12,
    title: "Mining & Geological Survey",
    description:
      "Geological mapping and mineral resource management system for sustainable mining operations. Includes environmental impact assessments and resource optimization.",
    imageUrl:
      "https://images.unsplash.com/photo-1569163139394-de4798aa62b6?w=800&h=600&fit=crop&q=80",
    link: "/projects/mining",
    status: "planned",
    department: "Geological Survey Department",
    year: "2025",
    location: "Mining Districts",
  },
];

// Helper functions
export const getCompletedProjects = () =>
  projects.filter((project) => project.status === "completed");

export const getInProgressProjects = () =>
  projects.filter((project) => project.status === "in-progress");

export const getPlannedProjects = () =>
  projects.filter((project) => project.status === "planned");

export const getProjectsByDepartment = (department: string) =>
  projects.filter((project) => project.department === department);

export const getProjectById = (id: number) =>
  projects.find((project) => project.id === id);

export const getProjectStats = () => ({
  total: projects.length,
  completed: getCompletedProjects().length,
  inProgress: getInProgressProjects().length,
  planned: getPlannedProjects().length,
});


