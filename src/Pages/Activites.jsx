import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import {Pagination, Autoplay, Keyboard } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import img1 from '../assets/images/Act1.png';
import img2 from '../assets/images/Act2.png';
import img3 from '../assets/images/Act3.png';
import img4 from '../assets/images/Act4.png';
import points from '../assets/images/points.png';

const activities = [
  {
    title: 'بدء كورس تحسين اضطرابات النطق واللغة',
    date: '8 يوليو 2025',
    description:
      'انطلقت اليوم فعاليات كورس تحسين اضطرابات النطق واللغة الذي يهدف إلى مساعدة الأطفال على تطوير مهارات التواصل والنطق بطريقة علمية وتفاعلية. يشمل الكورس مجموعة من التدريبات العملية والأنشطة المخصصة لتحسين مخارج الحروف وتعزيز الثقة في التحدث. نتمنى لأطفالنا رحلة ممتعة ومليئة بالتقدم.',
    images: [img1, img2,points],
  },
  {
    title: 'انطلاق كورس تأسيس القراءة للأطفال – الحصة الأولى',
    date: '8 يوليو 2025',
    description:
      'وسط أجواء من الحماس والتفاعل، انطلقت اليوم الحصة الأولى من كورس تأسيس القراءة للأطفال في مركزنا. الكورس يهدف إلى تنمية مهارات القراءة والكتابة بطريقة ممتعة وتفاعلية تناسب الأطفال في المراحل المبكرة. نتمنى التوفيق لجميع المشاركين في رحلتهم مع الحروف والكلمات.',
    images: [img3, img4,points],
  },
];

const ActivitiesSwiper = () => {
  return (
    <section id="activities" className="py-12 px-6 scroll-mt-20 scroll-smooth md:px-20 font-cairo ">
      <h2 className="lg:text-4xl text-headingMobile font-bold font-cairo text-text_color text-center mb-10">
        نشاطات المركز
      </h2>

      <Swiper
        modules={[Pagination, Autoplay, Keyboard]}
        spaceBetween={20}
        grabCursor={true}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        keyboard={{ enabled: true, onlyInViewport: true }} // ← الكيبورد ش
        pagination={{ clickable: true }}
        breakpoints={{
          320: { slidesPerView: 1 },
          768: { slidesPerView: 1 },
          1024: { slidesPerView: 1 },
        }}
        className="pb-12 custom-swiper"
      >
        {activities.map((activity, index) => (
       <SwiperSlide key={index}>
  <div className="rounded-xl min-h-[26rem] border-[.045rem] border-text_color bg-[#f9f9f9] shadow-md p-4 sm:p-6 flex flex-col lg:flex-row items-start gap-6 max-w-6xl mx-auto h-auto">
    
    {/* النص */}
    <div className="w-full lg:w-1/2 mt-2 lg:mt-10">
      <h3 className="text-lg sm:text-xl border-b-[1px] border-secondary border-dashed pb-3 font-bold text-text_color mb-1">
        {activity.title}
      </h3>
      <p className="text-sm text-gray-500 mt-2 mb-4">{activity.date}</p>
      <p className="text-text_color text-sm leading-loose">
        {activity.description}
      </p>
    </div>

    
    {/* الصور المتداخلة */}
<div className="relative w-full md:w-1/2 h-auto flex flex-col items-center gap-4 mt-4 md:mt-0">
  <img
    src={activity.images[0]}
    alt="نشاط"
    className="rounded-lg w-[70%] h-52 object-cover left-2 md:absolute md:w-80 md:h-48 md:top-[10%] md:left-0 z-10 shadow-md"
  />
  <img
    src={activity.images[1]}
    alt="نشاط"
    className="rounded-lg w-[70%] h-52 object-cover md:absolute md:w-80 md:h-48 md:top-[8rem] md:left-[6.4rem] z-0 opacity-90 shadow-sm"
  />
</div>

  </div>
</SwiperSlide>

        ))}
      </Swiper>
    </section>
  );
};

export default ActivitiesSwiper;
