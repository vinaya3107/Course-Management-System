import api from './api';

export const courseService = {
  getAllCourses: async () => {
    const response = await api.get('/courses');
    return response.data;
  },

  getCourseById: async (id) => {
    const response = await api.get(`/courses/${id}`);
    return response.data;
  },

  createCourse: async (courseData) => {
    const response = await api.post('/courses', courseData);
    return response.data;
  },

  updateCourse: async (id, courseData) => {
    const response = await api.put(`/courses/${id}`, courseData);
    return response.data;
  },

  deleteCourse: async (id) => {
    const response = await api.delete(`/courses/${id}`);
    return response.data;
  },

  enrollInCourse: async (courseId) => {
    const response = await api.post(`/enroll/${courseId}`);
    return response.data;
  },

  getMyCourses: async () => {
    const response = await api.get('/my-courses');
    return response.data;
  },

  updateProgress: async (courseId, progress) => {
    const response = await api.put(`/progress/${courseId}`, { progress });
    return response.data;
  },
};