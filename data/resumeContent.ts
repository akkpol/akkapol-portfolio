export type ResumeExperience = {
  role: string;
  company: string;
  location: string;
  period: string;
  techStack?: string[];
  bullets: string[];
};

export type ResumeSkillGroup = {
  title: string;
  items: string[];
};

export type ResumeCertification = {
  name: string;
  issuer: string;
  year: string;
  notes?: string;
};

export type ResumeEducation = {
  program: string;
  institution: string;
  location: string;
  year: string;
  summary: string;
};

export const resumeContent = {
  basics: {
    name: "Akkapol “Ek” Kumpapug",
    headline: "IT Developer · SharePoint & Power Platform · Frontend (React)",
    location: "Nonthaburi, Thailand",
    phone: "096-119-5161",
    email: "akkapol.kumpapug@gmail.com",
    linkedin: "https://www.linkedin.com/in/akkapol-kumpapug",
    github: "https://github.com/akkpol",
    portfolio: "https://akkapol-portfolio.vercel.app/",
    line: "Akemaster",
    about:
      "IT Developer specializing in SharePoint 2019 customization, Power Platform automation, and front-end development with React/Next.js. I create efficient internal tools that simplify workflows for large-scale operations. Most of my skills were built through self-driven practice, with AI-assisted tooling to accelerate delivery and decision-making.",
    tags: [
      "SharePoint 2019 On-Prem",
      "Power Automate",
      "React / Next.js",
      "AI-assisted Dev",
      "Workflow Automation",
    ],
  },
  experience: [
    {
      role: "Information Technology Programmer / SharePoint & Power Platform Developer",
      company: "C.C.S. Advance Tech Co., Ltd.",
      location: "Nonthaburi, Thailand",
      period: "Nov 2022 – Present",
      techStack: [
        "SharePoint 2019 On-Prem",
        "Power Automate",
        "JavaScript",
        "jQuery",
        "HTML/CSS",
        "REST API",
      ],
      bullets: [
        "Develop and maintain enterprise systems on SharePoint 2019 with custom JS forms.",
        "Automate HR and production workflows with Power Automate, reducing manual steps by 40–60%.",
        "Integrate SharePoint lists, legacy data, and user requirements into scalable tools.",
        "Partner with cross-functional teams to prioritize feature delivery and enhancements.",
      ],
    },
    {
      role: "Front-End Developer",
      company: "Absolute Solution Co., Ltd.",
      location: "Bangkok, Thailand",
      period: "Nov 2021 – Jul 2022",
      techStack: ["React", "Next.js", "Ant Design", "Material UI", "REST APIs"],
      bullets: [
        "Built responsive UI components with React/Next.js, Ant Design, and Material UI.",
        "Integrated REST APIs for real-time data operations and state synchronization.",
        "Worked in Agile squads with designers and backend engineers to ship features quickly.",
      ],
    },
    {
      role: "Operations Manager",
      company: "Frozen Restaurant",
      location: "Kalasin, Thailand",
      period: "Oct 2018 – Dec 2020",
      techStack: ["POS Systems", "Google Sheets", "Inventory Tracking"],
      bullets: [
        "Managed daily operations, staffing, and supply planning for a high-volume restaurant.",
        "Digitized inventory tracking and scheduling, improving team performance and accuracy.",
      ],
    },
    {
      role: "Junior .NET Developer",
      company: "Auction Trade Co., Ltd.",
      location: "Bangkok, Thailand",
      period: "Oct 2015 – Feb 2018",
      techStack: ["C#", ".NET Framework", "ASP.NET MVC", "SQL Server", "Crystal Reports", "Telerik Kendo UI"],
      bullets: [
        "Developed and maintained internal ASP.NET MVC applications and SQL Server databases.",
        "Resolved bugs, optimized legacy code, and supported reporting with Crystal Reports.",
      ],
    },
    {
      role: "Graphic Designer",
      company: "Manta Performing Arts",
      location: "Thailand",
      period: "Dec 2013 – Dec 2014",
      techStack: ["Adobe Photoshop", "Illustrator", "InDesign", "Premiere Pro"],
      bullets: [
        "Created branding assets, stage graphics, and promotional materials for performances.",
        "Developed strong visual communication and storytelling through design.",
      ],
    },
  ] as ResumeExperience[],
  skills: [
    {
      title: "Frontend",
      items: ["React.js", "Next.js", "JavaScript (ES6+)", "jQuery", "HTML5", "CSS3", "Bootstrap 5"],
    },
    {
      title: "SharePoint & Power Platform",
      items: ["SharePoint 2019 On-Premise", "REST/OData APIs", "JavaScript Customization", "Power Automate"],
    },
    {
      title: "Automation & Operations",
      items: ["Workflow Automation", "Process Optimization", "AI-assisted Project Planning"],
    },
    {
      title: "Backend & Databases",
      items: ["Node.js (Basic)", "MySQL", "SQL Server"],
    },
    {
      title: "Tools",
      items: [
        "Visual Studio Code",
        "Git",
        "Figma (Basic)",
        "Cursor AI",
        "Google Cloud Tools",
        "Google Cloud Auth",
      ],
    },
    {
      title: "Other Strengths",
      items: [
        "API Integration",
        "Debugging & Troubleshooting",
        "System Optimization",
        "AI-driven Productivity",
        "Requirement Analysis",
      ],
    },
  ] as ResumeSkillGroup[],
  certifications: [
    {
      name: "Full-Stack JavaScript Web Development Certificate",
      issuer: "Software Park Thailand CodeCamp #9",
      year: "2021",
      notes: "Intensive program covering React, UX/UI, Node.js, and MySQL.",
    },
    {
      name: "Development of SCADA Systems for Production Processes",
      issuer: "Rajamangala University of Technology Phra Nakhon",
      year: "2024",
    },
    {
      name: "Data Analysis with Power BI",
      issuer: "Askme Solutions & Consultants Co., Ltd.",
      year: "2024",
    },
  ] as ResumeCertification[],
  education: [
    {
      program: "Full-Stack JavaScript Web Development",
      institution: "Software Park Thailand CodeCamp #9",
      location: "Bangkok, Thailand",
      year: "2021",
      summary:
        "6-month immersive bootcamp covering modern frontend/backend JavaScript, UX/UI, Agile workflows, and deployment.",
    },
    {
      program: "Undergraduate (Not Graduated) · Computer Science",
      institution: "Chandrakasem Rajabhat University",
      location: "Bangkok, Thailand",
      year: "2013",
      summary:
        "Studied programming, databases, and algorithms; continued skill-building through self-directed projects beyond the classroom.",
    },
    {
      program: "Vocational Certificate in Electrical & Electronics",
      institution: "TAK Technical College",
      location: "Tak, Thailand",
      year: "2010",
      summary: "Focused on electronic circuits, electrical systems, and digital/analog fundamentals.",
    },
  ] as ResumeEducation[],
};

