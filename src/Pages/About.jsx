import React, { useEffect, memo, useMemo, useState } from "react";
import { FileText, Code2, BadgeCheck, Clock, Edit3, Layout, Cpu } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Helmet } from "react-helmet";
import { experienceData } from "../data/data";
import { db, collection, onSnapshot, query } from "../firebase";

// --- Komponen Header ---
const Header = memo(() => (
  <div className="text-center mb-6 sm:mb-10 px-4 sm:px-8">
    <div className="inline-block relative group">
      <h2
        className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 tracking-tight"
        data-aos="fade-down"
        data-aos-duration="600"
      >
        About Me
      </h2>
      <div className="w-16 h-1 bg-orange-500 mx-auto mt-2 transition-all duration-300 group-hover:w-24" />
    </div>
  </div>
));

// --- Loading Skeleton (untuk ProfileImage) ---
const LoadingSkeleton = () => (
  <div className="animate-pulse bg-white/80 backdrop-blur-sm rounded-2xl w-full max-w-md h-[380px] shadow-lg border border-gray-100 mx-auto">
    <div className="w-full h-56 bg-gray-100 rounded-t-2xl relative overflow-hidden">
      <div className="absolute inset-0 shimmer" />
    </div>
    <div className="flex flex-col items-center p-6 space-y-4">
      <div className="h-6 bg-gray-200 rounded w-3/4"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      <div className="h-4 bg-gray-200 rounded w-5/6"></div>
    </div>
  </div>
);

// --- Komponen ProfileImage ---
const ProfileImage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const img1 = new Image();
    img1.src = "p1.jpg";
    const img2 = new Image();
    img2.src = "p2.jpg";

    let loadedCount = 0;
    const checkLoaded = () => {
      loadedCount++;
      if (loadedCount === 2) setLoading(false);
    };

    img1.onload = checkLoaded;
    img2.onload = checkLoaded;
    img1.onerror = checkLoaded;
    img2.onerror = checkLoaded;

    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <LoadingSkeleton />;

  return (
    <div
      className="relative w-full max-w-md bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden transition-all duration-500 hover:shadow-xl hover:scale-[1.02] cursor-pointer mx-auto group z-10"
      data-aos="zoom-in"
      data-aos-duration="800"
      aria-label="Profile Card of Ludang Prasetyo Nugroho"
    >
      <div className="w-full h-56 overflow-hidden relative">
        <img
          src="p1.jpg"
          alt="Ludang Prasetyo Nugroho"
          className="object-cover w-full h-full transition-transform duration-500 ease-out group-hover:scale-105"
          loading="lazy"
          onError={(e) => (e.currentTarget.src = '/fallback.png')}
        />
        <img
          src="p2.jpg"
          alt="Ludang Prasetyo Nugroho Hover"
          className="object-cover w-full h-full absolute top-0 left-0 transition-opacity duration-500 ease-in-out opacity-0 group-hover:opacity-100"
          loading="lazy"
          onError={(e) => (e.currentTarget.src = '/fallback.png')}
        />
        <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-gray-900/20 to-transparent" />
      </div>
      <div className="p-6 text-center space-y-2">
        <h3 className="text-xl sm:text-2xl font-bold text-gray-800 group-hover:text-orange-600 transition-colors duration-300">
          Ludang Prasetyo Nugroho
        </h3>
        <p className="text-sm text-gray-600 font-medium">Computer Engineering - UTDI</p>
        <p className="text-xs text-gray-500 italic">"Innovating with code & creativity."</p>
        <div className="text-xs text-gray-600 font-medium space-y-1">
          <p>NIM: 225510017</p>
          <p>Yogyakarta, Indonesia</p>
        </div>
      </div>
    </div>
  );
};

// --- Komponen SkillBar ---
const SkillBar = ({ name, percent }) => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => setWidth(percent), 300);
    return () => clearTimeout(timeout);
  }, [percent]);

  return (
    <div className="mb-4" data-aos="fade-right" data-aos-duration="600">
      <div className="flex justify-between text-sm font-medium text-gray-700 mb-2">
        <span>{name}</span>
        <span>{percent}%</span>
      </div>
      <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
        <div
          className="bg-orange-500 h-full rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  );
};

// --- Komponen StatsCard ---
const StatsCard = ({ icon: Icon, value, label, description, delay }) => (
  <div
    className="flex items-center p-4 bg-white/80 backdrop-blur-sm rounded-xl shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg"
    data-aos="fade-up"
    data-aos-delay={delay}
    role="group"
    tabIndex={0}
    aria-label={`${label}: ${value}`}
  >
    <div className="bg-orange-500 text-white p-3 rounded-full mr-4 transition-transform duration-300 hover:scale-110">
      <Icon className="w-6 h-6" aria-hidden="true" />
    </div>
    <div className="flex flex-col">
      <div className="text-sm font-medium text-gray-800">{label}</div>
      <div className="text-xs text-gray-600">{description}</div>
    </div>
    <div className="text-orange-600 font-bold text-xl ml-auto">{value}</div>
  </div>
);

// --- Komponen Chip (untuk SkillCard tools) ---
const Chip = ({ text }) => (
  <span className="inline-block bg-orange-100 text-orange-600 text-xs font-medium px-3 py-1 rounded-full mr-2 mb-2 transition-colors duration-200 hover:bg-orange-200">
    {text}
  </span>
);

// --- Komponen SkillCard ---
const SkillCard = ({ icon: Icon, title, description, tools = [], delay }) => (
  <div
    className="bg-white/80 backdrop-blur-sm rounded-xl p-5 flex flex-col items-center text-center shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg"
    data-aos="fade-up"
    data-aos-delay={delay}
    role="group"
    tabIndex={0}
    aria-label={`${title} skill`}
  >
    <div className="bg-orange-500 text-white p-4 rounded-full mb-4 transition-transform duration-300 hover:scale-110">
      <Icon className="w-8 h-8" aria-hidden="true" />
    </div>
    <h3 className="text-lg font-bold text-gray-800 mb-2">{title}</h3>
    <p className="text-sm text-gray-600 mb-4">{description}</p>
    <div className="flex flex-wrap justify-center">
      {tools.map((tool) => (
        <Chip key={tool} text={tool} />
      ))}
    </div>
  </div>
);

// --- Komponen Utama AboutPage ---
const AboutPage = () => {
  const [totalProjects, setTotalProjects] = useState(0);
  const [totalCertificates, setTotalCertificates] = useState(0);
  const YearExperience = useMemo(() => experienceData.length || 0, []);

  useEffect(() => {
    AOS.init({
      once: false,
      duration: window.innerWidth < 640 ? 600 : 800,
      easing: "ease-out",
    });
    let resizeTimer;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => AOS.refresh(), 250);
    };
    window.addEventListener("resize", handleResize);

    const projectsQuery = query(collection(db, "projects"));
    const unsubscribeProjects = onSnapshot(projectsQuery, (snapshot) => {
      setTotalProjects(snapshot.docs.length || 1);
    }, (error) => {
      console.error("Error fetching projects:", error.message);
      setTotalProjects(1);
    });

    const certificatesQuery = query(collection(db, "certificates"));
    const unsubscribeCertificates = onSnapshot(certificatesQuery, (snapshot) => {
      setTotalCertificates(snapshot.docs.length || 0);
    }, (error) => {
      console.error("Error fetching certificates:", error.message);
      setTotalCertificates(0);
    });

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimer);
      unsubscribeProjects();
      unsubscribeCertificates();
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>About – Nugra.my.id</title>
        <meta name="description" content="Tentang Ludang Prasetyo dan perjalanan profesionalnya." />
        <meta name="keywords" content="Ludang Prasetyo, Nugra21, Portfolio, Web Developer, Tentang Saya" />
        <meta property="og:title" content="About – Nugra.my.id" />
        <meta property="og:description" content="Tentang Ludang Prasetyo dan perjalanan profesionalnya." />
        <meta property="og:url" content="https://nugra.my.id/about" />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://nugra.my.id/about" />
      </Helmet>

      <section
        className="min-h-screen text-gray-900 px-4 sm:px-8 md:px-12 lg:px-16 pt-16 pb-12"
        id="About"
      >
        <div className="max-w-6xl w-full mx-auto">
          <Header />

          <div className="pt-10 sm:pt-14">
            <div className="flex flex-col lg:grid lg:grid-cols-2 gap-10 sm:gap-14 items-center">
              <div className="space-y-6 text-center lg:text-left">
                <h2
                  className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 tracking-tight"
                  data-aos="fade-right"
                  data-aos-duration="800"
                >
                  <span className="text-orange-500">Hello, I'm</span>
                  <span className="block mt-2 text-gray-900">Ludang Prasetyo Nugroho</span>
                </h2>
                <p
                  className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-lg mx-auto lg:max-w-none"
                  data-aos="fade-right"
                  data-aos-duration="1000"
                >
                  Computer Engineering student at Universitas Teknologi Digital Indonesia (UTDI), passionate about programming, web design, video & photo editing, and robotics. I aim to create innovative tech solutions that make a real impact.
                </p>
                <div
                  className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center lg:justify-start"
                  data-aos="fade-up"
                  data-aos-duration="800"
                >
                  <a href="CV/Ludang prasetyo nugorho-resume_compressed.pdf" target="_blank" rel="noreferrer noopener">
                    <button
                      className="px-6 py-3 rounded-full bg-orange-500 text-white font-medium transition-all duration-300 hover:bg-orange-600 hover:shadow-lg flex items-center gap-2"
                    >
                      <FileText className="w-5 h-5" />
                      Download CV
                    </button>
                  </a>
                  <a href="#Portofolio">
                    <button
                      className="px-6 py-3 rounded-full border-2 border-orange-500 text-orange-500 font-medium transition-all duration-300 hover:bg-orange-50 hover:text-orange-600 flex items-center gap-2"
                    >
                      <Code2 className="w-5 h-5" />
                      View Projects
                    </button>
                  </a>
                </div>
              </div>

              <ProfileImage />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12 sm:mt-16">
              <SkillBar name="Programming" percent={70} />
              <SkillBar name="Web Design" percent={80} />
              <SkillBar name="Video Editing" percent={80} />
              <SkillBar name="IoT" percent={50} />
              <SkillBar name="UI/UX Design" percent={75} />
              <SkillBar name="Photography" percent={65} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12 sm:mt-16">
              <StatsCard
                icon={Code2}
                value={totalProjects}
                label="Total Projects"
                description="Projects I have completed"
                delay={100}
              />
              <StatsCard
                icon={BadgeCheck}
                value={totalCertificates}
                label="Certificates"
                description="Verified skill certificates"
                delay={300}
              />
              <StatsCard
                icon={Clock}
                value={YearExperience}
                label="Years of Experience"
                description="In software development"
                delay={500}
              />
            </div>

            <div id="Skils" className="mt-12 sm:mt-16">
              <h3
                className="text-3xl sm:text-4xl font-bold text-gray-800 mb-8 text-center"
                data-aos="fade-up"
                data-aos-duration="600"
              >
                My Skills
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                <SkillCard
                  icon={Code2}
                  title="Programming"
                  description="Expertise in multiple programming languages and algorithms."
                  tools={["JavaScript", "Python", "C++", "Dart", "HTML", "CSS"]}
                  delay={100}
                />
                <SkillCard
                  icon={Edit3}
                  title="Video & Photo Editing"
                  description="Skilled in video and photo editing tools to create compelling visuals."
                  tools={["Adobe Premiere", "Photoshop", "Alight Motion", "Adobe Illustrator"]}
                  delay={300}
                />
                <SkillCard
                  icon={Layout}
                  title="UI/UX Design"
                  description="Designing intuitive and modern user interfaces and experiences."
                  tools={["Figma", "Sketch", "TailwindCSS"]}
                  delay={500}
                />
                <SkillCard
                  icon={Cpu}
                  title="IoT & Robotics"
                  description="Experience building and programming IoT devices and robots."
                  tools={["ESP32", "Arduino", "MQTT"]}
                  delay={700}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .shimmer {
          background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite;
        }
      `}</style>
    </>
  );
};

export default memo(AboutPage);