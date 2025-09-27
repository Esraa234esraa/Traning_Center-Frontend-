import api from "../APIs/axios";

export const getImageUrl = (path) => {
  if (!path) return "/placeholder.png";

  const cleanedPath = path.replace(/^\/?wwwroot\//, "");

  // نشيل /api من الرابط الأساسي
  const baseURL = api.defaults.baseURL.replace(/\/api$/, "").replace(/\/$/, "");

  return `${baseURL}/${cleanedPath}`;
};
