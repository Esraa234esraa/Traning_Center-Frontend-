import { useMutation, useQueryClient } from '@tanstack/react-query';
import {createCourse, updateCourse, deactivateCourse } from '../../APIs/Courses/coursesApis';

export function useCreateCourse() {
  const queryClient = useQueryClient(); 
    return useMutation({
        mutationFn: createCourse,
        onSuccess: () => {
            queryClient.invalidateQueries(['allCourses']);
        }
    });
}
export function useUpdateCourse() {
  const queryClient = useQueryClient();
    return useMutation({
        mutationFn: updateCourse,
        onSuccess: () => {
            queryClient.invalidateQueries(['allCourses']);
        }
    }); 
}

export function useDeactivateCourse() {
  const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deactivateCourse,
        onSuccess: () => {
            queryClient.invalidateQueries(['allCourses']);
        }
    });
}