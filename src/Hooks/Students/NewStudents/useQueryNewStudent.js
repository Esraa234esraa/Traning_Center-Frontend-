import { useQuery } from "@tanstack/react-query";
import {
  getAllStudents,
  getAllWaitingStudents,
} from "../../../APIs/Students/NewStudents/newStudentApis";

export const useGetAllStudents = () => {
  return useQuery({
    queryKey: ["allNewStudents"],
    queryFn: getAllStudents,
    select: (res) => res.data, // نرجع فقط البيانات
  });
};

export const useGetAllWaitingStudents = () => {
  return useQuery({
    queryKey: ["allWaitingStudents"],
    queryFn: getAllWaitingStudents,
     select: (res) => res.data?.data,
  });
};
