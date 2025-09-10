import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const reviews = [
    {
        name: 'تجربة طالب',
        rating: 5,
        text: 'الدورة ساعدتني أفهم الإعراب بسهولة وأبدأ أطبق القواعد بدون تردد.',
    },
    {
        name: 'ولي أمر',
        rating: 5,
        text: 'شرح مبسط وطرق تعليم ممتعة خلت طفلي يحب اللغة العربية أكثر.',
    },
    {
        name: 'ولي أمر',
        rating: 5,
        text: ' مبسط وطرق تعليم ممتعة خلت طفلي يحب اللغة العربية أكثر.',
    },
];

const ReviewSection = () => {
    const [showModal, setShowModal] = useState(false);
    const [rating, setRating] = useState(0); // لتخزين التقييم
    const [submitted, setSubmitted] = useState(false); // هل تم الإرسال
    const [expandedReview, setExpandedReview] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (rating === 0) {
            alert("من فضلك اختر التقييم بالنجوم");
            return;
        }
        setSubmitted(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setRating(0);
        setSubmitted(false);
    };

    return (
        <section className="scroll-mt-20 scroll-smooth py-12 px-6 md:px-20 bg-blue-50 font-cairo relative" id="reviews">
            {/* عنوان القسم */}
            <h2 className="lg:text-4xl text-headingMobile font-bold text-text_color text-center mb-[4rem]">
                آراء المشاركين
            </h2>

            {/* السلايدر */}
            <Swiper
                modules={[Pagination, Autoplay]}
                spaceBetween={20}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                pagination={{ clickable: true }}
                breakpoints={{
                    320: { slidesPerView: 1 },
                    768: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                }}
                className="pb-14"
            >
                {reviews.map((review, idx) => (
                    <SwiperSlide key={idx}>
                        <div
                            className={`bg-white rounded-tl-[70px] rounded-br-[60px] shadow-md mx-auto max-w-sm text-start overflow-hidden transition-all duration-500 ease-in-out ${expandedReview === idx ? 'p-6' : 'p-6'
                                }`}
                            style={{
                                maxHeight: expandedReview === idx ? '500px' : '250px', // توسّع الكارد مع حركة
                            }}
                        >
                            <h3 className="text-text_color font-bold mb-1 pr-2">{review.name}:</h3>

                            <div className="text-yellow-500 mb-2 pr-2">{"★".repeat(review.rating)}</div>

                            <p className="text-text_color text-sm leading-relaxed pr-2">
                                {expandedReview === idx
                                    ? review.text
                                    : review.text.length > 100
                                        ? `${review.text.slice(0, 100)}...`
                                        : review.text}
                            </p>

                            {/* زر عرض المزيد / أقل */}
                            {review.text.length > 100 && (
                                <button
                                    className="text-sm text-blue-600 underline mt-2 pr-2"
                                    onClick={() =>
                                        setExpandedReview(expandedReview === idx ? null : idx)
                                    }
                                >
                                    {expandedReview === idx ? "عرض أقل" : "عرض المزيد"}
                                </button>
                            )}
                        </div>
                    </SwiperSlide>


                ))}
            </Swiper>

            {/* زرار شارك تقييمك */}
            <div className="flex justify-center">
                <button
                    className="bg-secondary hover:bg-yellow-600 text-white font-bold px-6 py-2 rounded-full shadow-md transition-all"
                    onClick={() => setShowModal(true)}
                >
                    شارك تقييمك
                </button>
            </div>

            {/* المودال */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-[1000]">
                    <div className="bg-white rounded-xl w-[90%] max-w-md p-6 shadow-lg relative">
                        <button
                            className="absolute top-3 left-3 text-gray-500 hover:text-red-600 text-xl font-bold"
                            onClick={handleCloseModal}
                        >
                            &times;
                        </button>

                        {/* محتوى المودال */}
                        {submitted ? (
                            <div className="text-center py-6">
                                <p className="text-lg text-green-600 font-semibold mb-4">
                                    شكرًا لمشاركة رأيك!
                                </p>
                                <button
                                    className="bg-secondary hover:bg-yellow-600 text-white font-bold px-5 py-2 rounded-full shadow-md transition-all"
                                    onClick={handleCloseModal}
                                >
                                    إغلاق
                                </button>
                            </div>
                        ) : (
                            <>
                                <h3 className="text-xl font-bold text-text_color mb-4 text-center">
                                    شارك تقييمك
                                </h3>
                                <form className="space-y-4" onSubmit={handleSubmit}>
                                    <input
                                        type="text"
                                        placeholder="الاسم"
                                        className="w-full border rounded-lg px-3 py-2 text-sm"
                                        required
                                    />
                                    <select className="w-full border rounded-lg px-3 py-2 text-sm" required>
                                        <option value="">اختر النوع</option>
                                        <option>طالب</option>
                                        <option>ولي أمر</option>
                                    </select>
                                    <textarea
                                        placeholder="اكتب رأيك هنا..."
                                        rows="3"
                                        className="w-full border rounded-lg px-3 py-2 text-sm"
                                        required
                                    ></textarea>

                                    {/* نجوم تفاعلية */}
                                    <div className="flex gap-1 justify-center text-yellow-500 text-2xl cursor-pointer">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <span
                                                key={star}
                                                onClick={() => setRating(star)}
                                                className={star <= rating ? 'text-yellow-500' : 'text-gray-300'}
                                            >
                                                ★
                                            </span>
                                        ))}
                                    </div>

                                    <button
                                        type="submit"
                                        className="bg-background hover:bg-blue-700 text-white font-bold px-6 py-2 rounded-full w-full transition-all"
                                    >
                                        إرسال التقييم
                                    </button>
                                </form>
                            </>
                        )}
                    </div>
                </div>
            )}
        </section>
    );
};

export default ReviewSection;
