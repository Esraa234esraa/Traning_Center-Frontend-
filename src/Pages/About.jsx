import React from 'react';
import AboutUs_img from '../assets/images/AboutUs_img.jpg';

const AboutUs = () => {
  return (
    <section id='about' className="scroll-mt-20 relative">
      <div className="bg-background2 lg:py-14 lg:px-4 p-10 relative">

        {/* Decorative Icons */}
        <div className="icons absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none z-0">
          {[
            { icon: "fa-globe", top: "top-2", right: "right-[50%]", color: "text-purple-400", size: "text-xl sm:text-2xl lg:text-3xl", visible: "block" },
            { icon: "fa-pen", top: "top-10", left: "left-5", color: "text-yellow-500", size: "text-sm sm:text-xl", visible: "hidden sm:block" },
            { icon: "fa-book", top: "top-5", right: "right-[70%]", color: "text-blue-400", size: "text-lg md:text-2xl", visible: "hidden md:block" },
            { icon: "fa-lightbulb", top: "top-4", left: "left-[80%]", color: "text-orange-400", size: "text-lg lg:text-2xl", visible: "hidden lg:block" },
            { icon: "fa-pen", top: "top-[30%]", right: "right-5", color: "text-yellow-500", size: "text-sm sm:text-xl", visible: "hidden sm:block" },
            { icon: "fa-book", top: "top-10", right: "right-5", color: "text-blue-400", size: "text-xl lg:text-3xl", visible: "hidden lg:block" },
            { icon: "fa-lightbulb", top: "top-[70%]", right: "right-5", color: "text-orange-400", size: "text-lg md:text-2xl", visible: "hidden md:block" },
            { icon: "fa-book", top: "top-[75%]", left: "left-2", color: "text-blue-400", size: "text-sm sm:text-xl", visible: "hidden sm:block" },
            { icon: "fa-globe", top: "top-[40%]", left: "left-2", color: "text-purple-400", size: "text-base sm:text-xl lg:text-3xl", visible: "block" },
            { icon: "fa-pen", top: "top-[93%]", left: "left-[50%]", color: "text-yellow-500", size: "text-sm md:text-xl", visible: "hidden md:block" },
            { icon: "fa-globe", top: "top-[93%]", right: "right-[20%]", color: "text-purple-400", size: "text-xl xl:text-3xl", visible: "hidden xl:block" },
          ].map((item, index) => (
            <i
              key={index}
              className={`fas ${item.icon} absolute ${item.top} ${item.right || ""} ${item.left || ""} ${item.color} ${item.size} opacity-30 ${item.visible}`}
            />
          ))}
        </div>

        {/* Main Content */}
        <div className="relative z-10 lg:max-w-6xl max-w-4xl mx-auto gap-4 bg-white rounded-lg shadow-md flex flex-col md:flex-row items-center px-6 py-10 lg:px-10 lg:py-15">
          {/* Image Section */}
          <div className="lg:w-1/2 w-full">
            <img
              src={AboutUs_img}
              alt="طلاب يرفعون أيديهم"
              className="w-[85%] m-auto rounded-[1rem] shadow-lg object-cover"
            />
          </div>

          {/* Text Section */}
          <div className="lg:w-1/2 w-full text-center lg:text-right mb-6 lg:mb-0">
            <h2 className="lg:text-4xl text-headingMobile font-bold font-cairo text-text_color my-3">
              من نحن
            </h2>

            <div className="flex flex-col items-center lg:items-start mb-2 gap-1">
              <div className="h-[.16rem] w-20 bg-yellow-400 rounded-full"></div>
              <div className="h-[.16rem] w-10 bg-yellow-300 rounded-full"></div>
            </div>

            <p className="text-text_color text-baseMobile lg:text-xl font-cairo leading-loose">
              مركز اللغة المثالية للتدريب هو مؤسسة تعليمية متخصصة في تقديم دورات لغوية متنوعة تهدف إلى تعزيز مهارات اللغة لدى المتعلمين.
              يعتمد المركز على أساليب حديثة ومبتكرة في التدريس، مما يساعد الطلاب على تحقيق تقدم ملحوظ في تعلم اللغة.
            </p>
          </div>

        </div>

      </div>
    </section >

  );
};

export default AboutUs;
