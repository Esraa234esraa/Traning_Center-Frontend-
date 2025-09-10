import React from 'react';
import kidImage from '../assets/images/home_img.png';
import { NavLink } from "react-router-dom";
import { FaWhatsapp, FaInstagram, FaTiktok } from "react-icons/fa"; // 👈 هنا استدعيت الأيقونات

const Hero = () => {
  return (
    <section id="home" className="bg-white scroll-smooth">
      <div className="flex bg-hero-pattern pt-[5rem] flex-col md:flex-row items-center justify-between px-6 md:pr-20 md:pl-5 gap-4 py-10">
        
        {/* النص على اليمين */}
        <div className="md:text-start lg:items-start flex flex-col items-center font-cairo mt-10 md:mt-0 md:w-2/3">
          <h1 className="lg:text-4xl text-center md:text-start text-headingMobile font-extrabold lg:pl-[5rem] w-[100%] text-text_color">
            مركز <span className="text-secondary">اللغة المثالية</span> للتدريب
          </h1>
          <p className="mt-4 md:text-start text-center pl-[1.2rem] lg:text-lg text-baseMobile lg:w-[70%] lg:items-start font-cairo text-text_color leading-loose">
            نطور مهاراتك اللغوية بأساليب حديثة ومبتكرة. تعلم اللغة بطرق حديثة في مركز اللغة المثالية وحقق تقدم حقيقي.
          </p>

          <div className="flex flex-col md:items-start items-center justify-center md:justify-start pl-[1.3rem] w-[100%] gap-4">   
            <NavLink
              to="/booking"
              className="mt-6 lg:px-16 lg:py-3 py-buttonMobileY px-buttonMobileX rounded-full bg-background text-white text-buttonMobile lg:text-sm font-bold inline-block text-center"
            >
              حجز موعد الآن
            </NavLink>

            {/* أيقونات التواصل مع روابط */}
            <div className="flex justify-center md:justify-start gap-4 mt-6 text-gray-500 text-xl">
              
              <a
                href="https://wa.me/966536071891"
                target="_blank"
                rel="noopener noreferrer"
                className="lg:w-10 lg:h-10 w-8 h-8 flex items-center justify-center rounded-full bg-[#8BD6E3] text-text_color hover:text-white transition-colors"
              >
                <FaWhatsapp />
              </a>

              <a
                href="https://www.instagram.com/arabic_languag4?igsh=M3lua3BtYmZrb2Vt"
                target="_blank"
                rel="noopener noreferrer"
                className="lg:w-10 lg:h-10 w-8 h-8 flex items-center justify-center rounded-full bg-blue_Light text-text_color hover:text-white transition-colors"
              >
                <FaInstagram />
              </a>

              <a
                href="https://www.tiktok.com/@arabic_languag6?_t=ZS-8xfq1G6TG8V&_r=1"
                target="_blank"
                rel="noopener noreferrer"
                className="lg:w-10 lg:h-10 w-8 h-8 flex items-center justify-center rounded-full bg-blue_Light text-text_color hover:text-white transition-colors"
              >
                <FaTiktok />
              </a>

            </div>
          </div>
        </div>

        {/* الصورة */}
        <div>
          <img src={kidImage} alt="طفل" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
