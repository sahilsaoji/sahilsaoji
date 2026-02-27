export interface SoftwareProject {
  name: string;
  image: string;
  description: string;
  link: string | null;
}

export const softwareProjects: SoftwareProject[] = [
  {
    name: "Eagle Task",
    image: "Software/Eagle Task.jpeg",
    description: "A Canvas-integrated AI assistant designed to help students manage their academic tasks and schedules efficiently. Built with React, FastAPI, and OpenAI, EagleTask provides features like AI-generated weekly task lists, grade summaries, and a scheduling assistant.",
    link: "https://sahilsaoji.github.io/eagletask/"
  },
  {
    name: "Eagle Apps Waitlist",
    image: "Software/Eagle Apps Waitlist.jpeg",
    description: "Built a web app for BC's IT department and deployed it in production for 8000+ students, enabling them to track class registration openings in real time. Used Django, Python, HTML, and real student data with BC's REST APIs.",
    link: null
  },
  {
    name: "Founta",
    image: "Software/FountaLogo.png",
    description: "A platform designed to simplify corporate event planning for managers, employees, and vendors. Using AI for filtration and discovery. Selected for Boston College's startup accelerator with $1500 equity-free funding.",
    link: "https://www.founta.ai/"
  },
  {
    name: "Hack the Heights",
    image: "Software/Hack the Heights.png",
    description: "Ran Boston College's Hackathon as President of Boston College Computer Science Society.",
    link: "https://hacktheheights.org/"
  },
  {
    name: "MomsRDope",
    image: "Software/MomsRDope.png",
    description: "Built and scaled a T-shirt brand to $3,000 in profit (donated to the Equal Justice Initiative) and grew social media presence to 10,000 followers.",
    link: "http://momsrdope.com/"
  }
];
