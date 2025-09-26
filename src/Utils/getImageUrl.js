import api from "../APIs/axios";

export const getImageUrl = (path) => {
  if (!path) return "/placeholder.png";

  const cleanedPath = path.replace(/^\/?wwwroot\//, "");
  
  // استخدام baseURL من axios بدل القيمة الثابتة
  const baseURL = api.defaults.baseURL.replace(/\/$/, ""); // نتأكد من عدم وجود / في النهاية
  return `${baseURL}/${cleanedPath}`;
};
