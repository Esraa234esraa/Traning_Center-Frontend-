import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Pagination, Keyboard } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import course1 from '../assets/images/reading.jpg';
import course2 from '../assets/images/arabic.jpg';
import course3 from '../assets/images/talking.jpg';
import vector from '../assets/images/vector.png';
import lamb from '../assets/images/idea-lamp.png';
const courses = [
    {
        title: "تقوية مهارات القراءة للأطفال",
        desc: "تأسيس قوي للقراءة في وقت قصير مع تعليم القواعد بأساليب مبتكرة ودورات تفاعلية تناسب كل الأعمار.",
        img: course1,
    },
    {
        title: "تأسيس الطلاب في الإعراب",
        desc: "تعليم قواعد الإعراب بخطوات أساسية ومبسطة تساعد الطالب على فهم الأساسيات وتطبيقها بثقة.",
        img: course2,
    },
    {
        title: "علاج اضطرابات النطق واللغة",
        desc: "تأسيس الطالب في الإعراب بأسلوب واضح وطبيعي، يتضمن فهم القواعد مع متابعة مستمرة تعزز ثقة الطفل.",
        img: course3,
    },
    {
        title: "مهارات الكتابة الإبداعية",
        desc: "تنمية مهارات الكتابة والتعبير بأساليب ممتعة وتفاعلية، وتشجيع الطالب على الابتكار.",
        img: course1,
    },
];

const Courses = () => {
    return (
        <section id="courses" className="scroll-mt-24 scroll-smooth relative py-16 bg-white overflow-hidden">
            {/* العنوان */}
            <div className="text-center font-cairo mb-8">
                <h2 className="lg:text-4xl text-headingMobile font-bold font-cairo text-text_color mb-2">الدورات التدريبية</h2>
                <p className="text-gray lg:text-baseMobile-500 text-sm">مجموعة متنوعة من الدورات لتطوير مهاراتك بثقة</p>
            </div>
           {/* الصورة الأولى (vector) */}
<div className="absolute top-[10%] right-[6%] -translate-x-1/2 z-10 animate-fadeIn">
  <img
    src={vector}
    alt="Course Icon"
    className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 rotate-12 object-contain"
  />
</div>

{/* الصورة الثانية (lamb) */}
<div className="absolute top-[10%] left-[10%] -translate-x-1/2 z-10 animate-fadeIn rotate-[15]">
  <img
    src={lamb}
    alt="Course Icon"
    className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 rotate-[15deg] object-contain"
  />
</div>

            {/* السلايدر */}
            <div className="px-6 md:px-20 ">
                <Swiper
                    className="pb-[4rem] cursor-grab"
                    modules={[Pagination, Autoplay, Keyboard]}
                    spaceBetween={20}
                    grabCursor={true}
                    keyboard={{ enabled: true, onlyInViewport: true }} // ← الكيبورد شغال فقط لو السلايدر ظاهر
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 4000, disableOnInteraction: false }}
                    breakpoints={{
                        320: { slidesPerView: 1 },
                        768: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                    }}
                >

                    {courses.map((course, index) => (
                        <SwiperSlide key={index}>
                            <div className="bg-white shadow-md rounded-xl overflow-hidden w-full max-w-xs h-[18rem] mx-auto transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                                <div className="overflow-hidden">
                                    <img
                                        src={course.img}
                                        alt={course.title}
                                        className="w-full lg:h-40  object-cover transition-transform duration-300 hover:scale-110"
                                    />
                                </div>
                                <div className="p-3 text-start">
                                    <h3 className="font-semibold font-cairo text-sm lg:text-[1rem] border-b-[1px] border-dashed pb-1 border-secondary text-text_color mb-2">{course.title}</h3>
                                    <p className="text-xs text-gray-600 mt-4 leading-snug">{course.desc}</p>
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