import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  addExternalCourse,
  updateExternalCourse,
  deleteExternalCourse,
   hideExternalCourse,
  visibleExternalCourse,
} from "../../APIs/ExternalCourses/ExternalCoursesApi";
import { toast } from "react-toastify";

//  إضافة دورة
export const useAddExternalCourse = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addExternalCourse,
    onSuccess: (res) => {
      toast.success(res?.data?.message || "تمت الإضافة بنجاح");
      queryClient.invalidateQueries({ queryKey: ["allExternalCourses"] });
    },
    onError: () => {
      toast.error("حدث خطأ أثناء الإضافة");
    },
  });
};

// ✏️ تعديل دورة
export const useUpdateExternalCourse = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, formData }) => updateExternalCourse(id, formData),
    onSuccess: (res) => {
      toast.success(res?.data?.message || "تم التعديل بنجاح");
      queryClient.invalidateQueries({ queryKey: ["allExternalCourses"] });
    },
    onError: () => toast.error("حدث خطأ أثناء التعديل"),
  });
};

// 🗑️ حذف دورة
export const useDeleteExternalCourse = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteExternalCourse,
    onSuccess: (res) => {
      toast.success(res?.data?.message || "تم الحذف بنجاح");
      queryClient.invalidateQueries({ queryKey: ["allExternalCourses"] });
    },
    onError: () => toast.error("حدث خطأ أثناء الحذف"),
  });
};

// اظهار الدوره

export const useVisibleExternalCourse = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, formData }) => visibleExternalCourse(id, formData),
    onSuccess: (res) => {
      if(res?.data?.success){
      toast.success(res?.data?.message || "تم إظهار بنجاح");
      queryClient.invalidateQueries({ queryKey: ["allExternalCourses"] });
    }
    else{
    toast.error(res?.data?.message|| "حدث خطأ اثناء اظهار الدورة")
    }
    },
    onError: () => toast.error("حدث خطأ أثناء الاظهار"),
  });
};

// إخفاء الدورة


export const useHideExternalCourse = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, formData }) => hideExternalCourse(id, formData),
    onSuccess: (res) => {
      if(res?.data?.success){
      toast.success(res?.data?.message || "تم إخفاء بنجاح");
      queryClient.invalidateQueries({ queryKey: ["allExternalCourses"] });
    }
    else{
    toast.error(res?.data?.message|| "حدث خطأ اثناء إخفاء الدورة")
    }
    },
    onError: () => toast.error("حدث خطأ أثناء الاخفاء"),
  });
};


