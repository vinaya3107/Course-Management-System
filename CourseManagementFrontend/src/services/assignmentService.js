import api from './api';

export const assignmentService = {
  getAssignmentsByCourse: async (courseId) => {
    const response = await api.get(`/assignments/${courseId}`);
    return response.data;
  },

  createAssignment: async (assignmentData) => {
    const response = await api.post('/assignments', assignmentData);
    return response.data;
  },
};