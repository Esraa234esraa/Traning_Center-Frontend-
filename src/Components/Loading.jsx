// src/pages/Loading.jsx
function Loading() {
  return (
    <div className="absolute  flex-col  inset-0 bg-gray-100 bg-opacity-5 md:right-[25%] flex justify-center items-center">
      <div className="loader"></div>
      <p className="mr-3 text-lg font-semibold">جاري التحميل...</p>
    </div>


  );
}

export default Loading;
