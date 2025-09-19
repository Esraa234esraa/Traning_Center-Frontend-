import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { useGetAllEvaluations } from "../Hooks/Evaluation/useQueryEvaluation";
import { useAddEvaluation } from "../Hooks/Evaluation/useMutationEvaluation";
import Loading from "../Components/Loading";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ReviewSection = () => {
  const { data: reviews = [], isLoading } = useGetAllEvaluations();
  const addEvaluation = useAddEvaluation();

  const [showModal, setShowModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [expandedReview, setExpandedReview] = useState(null);

  const handleCloseModal = () => {
    setShowModal(false);
    setRating(0);
    formik.resetForm();
  };

  const formik = useFormik({
    initialValues: {
      evaluationOwner: "",
      evaluationOwnerType: "",
      opnion: "",
    },
    validationSchema: Yup.object({
      evaluationOwner: Yup.string()
        .required("الاسم مطلوب")
        .min(2, "الاسم قصير جدًا"),
      evaluationOwnerType: Yup.string().required("اختر النوع"),
      opnion: Yup.string()
        .required("الرأي مطلوب")
        .min(10, "الرأي يجب أن يكون أطول من 10 أحرف"),
    }),
    onSubmit: (values, { resetForm }) => {
      if (rating === 0) {
        toast.error("من فضلك اختر التقييم بالنجوم");
        return;
      }

      const payload = {
        evaluationOwner: values.evaluationOwner,
        opnion: values.opnion,
        rating,
        evaluationOwnerType: values.evaluationOwnerType === "طالب" ? 0 : 1,

      };

      addEvaluation.mutate(payload, {
        onSuccess: () => {
          toast.success("تم إرسال التقييم بنجاح!");
          handleCloseModal();
        },
        onError: (err) => {
          toast.error(err?.message || "حدث خطأ أثناء إرسال التقييم");
        },
      });
    },
  });

  if (isLoading) return <Loading />;

  return (
    <section
      className="scroll-mt-20 scroll-smooth py-12 px-6 md:px-20 bg-blue-50 font-cairo relative"
      id="reviews"
    >
      <h2 className="lg:text-4xl text-headingMobile font-bold text-text_color text-center mb-[4rem]">
        آراء المشاركين
      </h2>

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
        {reviews && reviews.length > 0 ? (
          reviews.map((review, idx) => (
            <SwiperSlide key={idx}>
              <div
                className="bg-white rounded-tl-[70px] rounded-br-[60px] shadow-md mx-auto max-w-sm text-start overflow-hidden transition-all duration-500 ease-in-out p-6"
                style={{
                  maxHeight: expandedReview === idx ? "500px" : "250px",
                }}
              >
                <h3 className="text-text_color font-bold mb-1 pr-2">
                  {review.evaluationOwner}:
                </h3>

                <div className="text-yellow-500 mb-2 pr-2">
                  {"★".repeat(review.rating)}
                </div>

                <p className="text-text_color text-sm leading-relaxed pr-2">
                  {expandedReview === idx
                    ? review.opnion
                    : review.opnion.length > 100
                    ? `${review.opnion.slice(0, 100)}...`
                    : review.opnion}
                </p>

                {review.opnion.length > 100 && (
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
          ))
        ) : (
          <p className="text-center text-gray-500">لا توجد تقييمات</p>
        )}
      </Swiper>

      <div className="flex justify-center mt-6">
        <button
          className="bg-secondary hover:bg-yellow-600 text-white font-bold px-6 py-2 rounded-full shadow-md transition-all"
          onClick={() => setShowModal(true)}
        >
          شارك تقييمك
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-[1000]">
          <div className="bg-white rounded-xl w-[90%] max-w-md p-6 shadow-lg relative">
            <button
              className="absolute top-3 left-3 text-gray-500 hover:text-red-600 text-xl font-bold"
              onClick={handleCloseModal}
            >
              &times;
            </button>

            <h3 className="text-xl font-bold text-text_color mb-4 text-center">
              شارك تقييمك
            </h3>

            <form className="space-y-4" onSubmit={formik.handleSubmit}>
              <input
                type="text"
                name="evaluationOwner"
                placeholder="الاسم"
                className="w-full border rounded-lg px-3 py-2 text-sm"
                value={formik.values.evaluationOwner}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.evaluationOwner &&
                formik.errors.evaluationOwner && (
                  <p className="text-red-500 text-xs">
                    {formik.errors.evaluationOwner}
                  </p>
                )}

              <select
                name="evaluationOwnerType"
                className="w-full border rounded-lg px-3 py-2 text-sm"
                value={formik.values.evaluationOwnerType}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <option value="">اختر النوع</option>
                <option value="طالب">طالب</option>
                <option value="ولي أمر">ولي أمر</option>
              </select>
              {formik.touched.evaluationOwnerType &&
                formik.errors.evaluationOwnerType && (
                  <p className="text-red-500 text-xs">
                    {formik.errors.evaluationOwnerType}
                  </p>
                )}

              <textarea
                name="opnion"
                placeholder="اكتب رأيك هنا..."
                rows="3"
                className="w-full border rounded-lg px-3 py-2 text-sm"
                value={formik.values.opnion}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.opnion && formik.errors.opnion && (
                <p className="text-red-500 text-xs">{formik.errors.opnion}</p>
              )}

              <div className="flex gap-1 justify-center text-yellow-500 text-2xl cursor-pointer">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    onClick={() => setRating(star)}
                    className={`cursor-pointer transition-colors ${
                      star <= rating ? "text-yellow-500" : "text-gray-300"
                    }`}
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
          </div>
        </div>
      )}
    </section>
  );
};

export default ReviewSection;
