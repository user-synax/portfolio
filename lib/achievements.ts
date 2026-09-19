/**
 * Configuration for the Achievements section and dedicated viewer pages.
 * Add new achievements by adding an object to the ACHIEVEMENTS_CONFIG array.
 */
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
    description:
      "Successfully completed a 3-month intensive internship program.",
    longDescription:
      "During this internship at FCIT, I mentored students and built practical full-stack projects. I gained hands-on experience with modern web technologies and improved my communication and leadership skills by guiding junior developers through complex coding challenges.",
    image: "/achievements/internship-certificate.jpeg",
    tags: ["Full-Stack Teacher", "Mentorship", "Certificate"],
  },
  {
    id: "diploma",
    title: "Diploma in Information Technology",
    issuer: "Arth Siksha Foundation",
    date: "2026",
    description:
      "Successfully got the Diploma from arth siksha foundation in Information Technology. while building real world web apps.",
    longDescription: `Successfully completed and received my Diploma in Information Technology from Arth Siksha Foundation, marking another important milestone in my journey as a self-taught full-stack web developer.
      Alongside my formal learning, I have been focused on building real-world web applications, turning concepts into practical products and gaining hands-on experience with modern web technologies. Working on real projects has helped me understand much more than just programming syntax — from designing user experiences and building scalable backend systems to working with databases, authentication, APIs, deployment, security, and real-time features.`,
    image: "/achievements/arth diploma.png",
    tags: ["Diploma", "Full Stack Developer", "A Grade"],
  },
];
