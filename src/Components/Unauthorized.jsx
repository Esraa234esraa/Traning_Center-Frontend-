function Unauthorized() {
  return (
    <div className="p-10 text-center">
      <h1 className="text-3xl font-bold text-red-500">🚫 غير مصرح لك بالدخول</h1>
      <p className="mt-4">ليس لديك صلاحية للوصول إلى هذه الصفحة.</p>
    </div>
  );
}

export default Unauthorized;
