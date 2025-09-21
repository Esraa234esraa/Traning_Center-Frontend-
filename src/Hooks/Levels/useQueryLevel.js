import { useQuery } from "@tanstack/react-query";
import { getAllLevels, getAllLevelsOfCourse, getLevelById } from "../../APIs/level/levelApis";

// ✅ Get All Levels
export const useGetAllLevels = () => {
  return useQuery({
    queryKey: ["levels"],
    queryFn: getAllLevels,
  });
};

// ✅ Get All Levels of Course
export const useGetAllLevelsOfCourse = (courseId) => {
  return useQuery({
    queryKey: ["levels", courseId],
    queryFn: () => getAllLevelsOfCourse(courseId),
    enabled: !!courseId,
  });
};

// ✅ Get Level by Id
export const useGetLevelById = (id) => {
  return useQuery({
    queryKey: ["level", id],
    queryFn: () => getLevelById(id),
    enabled: !!id,
  });
};
