import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination, Keyboard } from "swiper/modules";
import { useGetOnlyVisibleExternalCourses } from "../Hooks/ExternalCourses/useQueryExternalCourse";
import Loading from "../Components/Loading";
import { getImageUrl } from "../Utils/getImageUrl"; // ✅ استيراد الدالة

const Courses = () => {
  const { data, isLoading } = useGetOnlyVisibleExternalCourses();
  console.log(data);

  if (isLoading) return <Loading />;

  return (
    <section className="scroll-mt-24 py-16 bg-white overflow-hidden">
      <div className="text-center font-cairo mb-8">
        <h2 className="lg:text-4xl text-headingMobile font-bold text-text_color mb-2">
          الدورات التدريبية
        </h2>
        <p className="text-gray text-sm lg:text-baseMobile-500">
          مجموعة متنوعة من الدورات لتطوير مهاراتك بثقة
        </p>
      </div>

      <div className="px-6 md:px-20">
        <Swiper
          className="pb-[4rem] cursor-grab"
          modules={[Pagination, Autoplay, Keyboard]}
          spaceBetween={20}
          grabCursor={true}
          keyboard={{ enabled: true, onlyInViewport: true }}
          pagination={{ clickable: true }}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          breakpoints={{
            320: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {data?.data?.data?.map((course, index) => (
            <SwiperSlide key={index}>
              <div className="bg-white shadow-md rounded-xl overflow-hidden w-full max-w-xs h-[18rem] mx-auto transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                <div className="overflow-hidden">
                  {course.filePath && (
                    <img
                      src={getImageUrl(course.filePath)} // ✅ استخدام الدالة هنا
                      alt={course.name}
                      className="w-full lg:h-40 object-cover transition-transform duration-300 hover:scale-110"
                    />
                  )}
                </div>
                <div className="p-3 text-start">
                  <h3 className="font-semibold font-cairo text-sm lg:text-[1rem] border-b-[1px] border-dashed pb-1 border-secondary text-text_color mb-2">
                    {course.name}
                  </h3>
                  <p className="text-xs text-gray-600 mt-4 leading-snug">
                    {course.description}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Courses;
