// src/utils/getImageUrl.js
import { API_BASE } from "../APIs/config";

// src/utils/getImageUrl.js
export const getImageUrl = (path) => {
  if (!path) return "/placeholder.png";
  // نحذف أي wwwroot زيادة من المسار
  const cleanedPath = path.replace(/^\/?wwwroot\/wwwroot/, "");
  return `https://traning-center.runasp.net${cleanedPath}`;
};

