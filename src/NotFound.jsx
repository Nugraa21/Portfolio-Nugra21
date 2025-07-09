import { memo, useEffect } from "react";
import { Helmet } from "react-helmet";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";
import { AlertTriangle, ArrowLeft } from "lucide-react";

const NotFound = () => {
  useEffect(() => {
    AOS.init({
      once: false,
      duration: window.innerWidth < 640 ? 600 : 800,
      easing: "ease-in-out",
    });
    let resizeTimer;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => AOS.refresh(), 250);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimer);
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>404 - Halaman Tidak Ditemukan | Nugra.my.id</title>
        <meta name="description" content="Oops! Halaman yang Anda cari tidak ada." />
        <meta name="keywords" content="404, Tidak Ditemukan, Nugra.my.id, Halaman Error" />
        <meta property="og:title" content="404 - Halaman Tidak Ditemukan | Nugra.my.id" />
        <meta property="og:description" content="Oops! Halaman yang Anda cari tidak ada." />
        <meta property="og:url" content="https://nugra.my.id/404" />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://nugra.my.id/404" />
        <link href="https://fonts.googleapis.com/css2?family=Patrick+Hand&display=swap" rel="stylesheet" />
      </Helmet>

      <section className="min-h-screen flex items-center justify-center bg-white px-6 font-[Patrick_Hand]">
        <div className="max-w-xl w-full text-center">
          <div
            className="flex justify-center mb-8"
            data-aos="zoom-in"
          >
            <div className="bg-orange-100 p-6 rounded-full shadow-md animate-pulse">
              <AlertTriangle className="w-20 h-20 text-orange-500 drop-shadow-lg" />
            </div>
          </div>
          <h1
            className="text-4xl sm:text-5xl text-gray-900 font-bold mb-4"
            data-aos="fade-up"
          >
            404 - Halaman Tidak Ditemukan
          </h1>
          <p
            className="text-lg sm:text-xl text-gray-600 mb-6"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            Wah! Kami tidak dapat menemukan halaman yang kamu cari. Mungkin sudah dipindahkan atau salah alamat.
          </p>
          <p
            className="text-sm text-gray-500 italic mb-10"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            Jika ini kesalahan, silakan hubungi <span className="font-semibold text-orange-600">Ludang Prasetyo Nugroho</span> melalui <a href="https://nugra.my.id" className="underline hover:text-orange-500 transition">nugra.my.id</a>.
          </p>
          <div data-aos="fade-up" data-aos-delay="300">
            <Link to="/">
              <button className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg shadow-md transition-transform hover:scale-105">
                <ArrowLeft className="w-5 h-5" />
                Kembali ke Beranda
              </button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default memo(NotFound);
