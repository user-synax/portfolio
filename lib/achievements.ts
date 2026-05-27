export interface Achievement {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description: string;
  longDescription: string;
  image: string;
  tags: string[];
  link?: string;
}

export const ACHIEVEMENTS_CONFIG: Achievement[] = [
  {
    id: "internship-certificate",
    title: "Full-Stack Teacher Internship",
    issuer: "FCIT Institute",
    date: "2026",
    description: "Successfully completed a 3-month intensive internship program.",
    longDescription: "During this internship at FCIT, I mentored students and built practical full-stack projects. I gained hands-on experience with modern web technologies and improved my communication and leadership skills by guiding junior developers through complex coding challenges.",
    image: "/achievements/internship-certificate.jpeg",
    tags: ["Full-Stack Teacher", "Mentorship", "Certificate"],
  },
  // {
  //   id: "hackathon-winner",
  //   title: "Regional Hackathon Winner",
  //   issuer: "Tech Innovators",
  //   date: "2025",
  //   description: "First place in the annual regional innovation hackathon.",
  //   longDescription: "Led a team of four to develop an AI-powered solution for urban traffic management. Our project was recognized for its innovative use of real-time data and scalable architecture, ultimately winning first place among 50 competing teams.",
  //   image: "/achievements/hackathon-winner.svg",
  //   tags: ["AI", "Innovation", "First Place"],
  // }
];
