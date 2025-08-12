import React, { useEffect } from "react";
import { Briefcase, School, Activity } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";
import { experienceData } from "../data/data";

const iconMap = {
  School: School,
  Activity: Activity,
  Briefcase: Briefcase,
};

const ExperienceRow = ({ icon, title, place, time, description, delay }) => {
  const Icon = iconMap[icon];
  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-6 py-8 border-b border-orange-200"
      data-aos="fade-up"
      data-aos-delay={delay}
    >
      <div className="flex flex-col items-start sm:items-end text-left sm:text-right">
        <div className="flex items-center gap-2 mb-2">
          <div className="bg-gradient-to-tr from-orange-500 to-yellow-400 p-2 rounded-full shadow-md">
            <Icon className="w-4 h-4 text-white" />
          </div>
          <h4 className="text-lg font-bold text-orange-700">{title}</h4>
        </div>
        <p className="text-sm font-semibold text-gray-600">{place}</p>
        <p className="text-xs text-gray-500 italic">{time}</p>
      </div>
      <div>
        <p className="text-sm text-gray-800 leading-relaxed mb-1">{description}</p>
      </div>
    </div>
  );
};

const Pengalaman = () => {
  useEffect(() => {
    AOS.init({ once: false });
  }, []);

  return (
    <section
      id="Experience"
      className="px-[5%] sm:px-[8%] lg:px-[10%] py-16 bg-transparent"
    >
      <div className="max-w-5xl mx-auto">
        <h2
          className="text-4xl sm:text-5xl font-extrabold text-orange-600 mb-6"
          data-aos="fade-down"
        >
          Experience
        </h2>
        <p className="text-gray-600 mb-12" data-aos="fade-down" data-aos-delay="150">
          List of my experiences and the story I grew with them.
        </p>

        <div className="divide-y divide-orange-100">
          {experienceData.map((item, index) => (
            <ExperienceRow key={index} {...item} delay={index * 150} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pengalaman;
// ====== Edit 1 