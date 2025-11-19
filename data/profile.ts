import { LinkedInData } from '@/types';

// Default data - will be overridden by API if available
export const linkedInData: LinkedInData = {
  basics: {
    name: 'Akkapol Kumpapug',
    headline: 'IT Developer | JS, React, Next.js, C#, .NET | SharePoint',
    about:
      'Information Technology Developer with a strong focus on problem-solving and creative solutions. Experienced in SharePoint Administration, Frontend Development (React, Vue, Next.js), and Data Analysis (Power BI, Power Automate). Passionate about learning new technologies and applying them in innovative ways to deliver value.',
    location: 'Nonthaburi, Thailand',
    email: 'akkapol.kumpapug@gmail.com',
    socials: {
      linkedin: 'https://www.linkedin.com/in/akkapol-kumpapug',
    },
    keywords: ['SharePoint', 'JavaScript / React / Next.js', 'C# / .NET', 'Python', 'Power BI', 'SCADA']
  },
  experience: [
    {
      company: 'C.C.S. ADVANCE TECH. CO., LTD.',
      title: 'Information Technology Software Developer',
      startDate: '2023-11',
      endDate: 'Present',
      location: 'Nonthaburi, Thailand',
      highlights: [
        'Developed and maintained internal systems using SharePoint On-Premise.',
        'Enhanced automation workflows using Power Automate and Power BI dashboards.',
        'Collaborated on frontend projects using React and Next.js frameworks.'
      ],
    },
  ],
  skills: [
    { name: 'SharePoint', level: 90 },
    { name: 'JavaScript / React / Next.js', level: 85 },
    { name: 'C# / .NET', level: 80 },
    { name: 'Python', level: 70 },
    { name: 'Power BI', level: 75 },
    { name: 'SCADA', level: 60 }
  ],
  certifications: [
    { 
      name: 'Fullstack JavaScript Web Development', 
      issuer: 'Software Park CodeCamp', 
      year: '2021',
      image: '/cer_fullstack_web.jpg',
      logo: '/logo-software-park.jpg'
    },
    { 
      name: 'Development of SCADA Systems for Production Processes', 
      issuer: 'Rajamangala University of Technology Phra Nakhon', 
      year: '2024',
      pdf: '/SCADA Training _ 7192 Mr. Akkapol Kumpapug.pdf',
      logo: '/logo-rmutp.jpg'
    },
    { 
      name: 'Data Analysis with Power BI', 
      issuer: 'Askme Solutions & Consultants Co., Ltd.', 
      year: '2024',
      pdf: '/04 Apr _ Power BI Analytic Tool.pdf',
      logo: '/logo-askme.jpg'
    }
  ],
  education: [
    {
      institution: 'Chandrakasem Rajabhat University',
      degree: "Bachelor's Degree in Computer Science",
      startDate: '2008',
      endDate: '2014'
    }
  ]
};

