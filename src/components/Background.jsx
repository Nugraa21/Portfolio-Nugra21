import React from "react";

const AnimatedBackground = ({ theme }) => {
  const getThemeColors = () => {
    switch (theme) {
      case "/":
        return {
          glowMain: "from-orange-200 via-yellow-100 to-white",
          glowSecondary: "from-yellow-100 via-orange-50 to-white",
        };
      case "/login":
        return {
          glowMain: "from-blue-200 via-indigo-100 to-white",
          glowSecondary: "from-indigo-100 via-blue-50 to-white",
        };
      case "/register":
        return {
          glowMain: "from-green-200 via-lime-100 to-white",
          glowSecondary: "from-lime-100 via-green-50 to-white",
        };
      default:
        return {
          glowMain: "from-gray-200 via-gray-100 to-white",
          glowSecondary: "from-gray-100 via-gray-50 to-white",
        };
    }
  };

  const colors = getThemeColors();

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden bg-white">
      {/* Glow utama */}
      <div
        className={`absolute top-[15%] left-[20%] w-[400px] h-[400px] rounded-full bg-gradient-to-r ${colors.glowMain} opacity-50 blur-[100px]`}
      ></div>

      {/* Glow sekunder */}
      <div
        className={`absolute bottom-[15%] right-[20%] w-[300px] h-[300px] rounded-full bg-gradient-to-r ${colors.glowSecondary} opacity-40 blur-[90px]`}
      ></div>

      {/* Glow kecil tambahan */}
      <div
        className={`absolute bottom-[40%] left-[50%] w-[150px] h-[150px] rounded-full bg-gradient-to-r ${colors.glowMain} opacity-30 blur-[60px]`}
      ></div>
    </div>
  );
};

export default AnimatedBackground;
