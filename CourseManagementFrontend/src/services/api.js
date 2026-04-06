import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      // window.location.href = '/login'; (Removed to prevent Home page redirect loops)
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  getMe: () => api.get('/auth/me'),
};

// Courses API
export const coursesAPI = {
  getAll: () => api.get('/courses'),
  getById: (id) => api.get(`/courses/${id}`),
  create: (courseData) => api.post('/courses', courseData),
  update: (id, courseData) => api.put(`/courses/${id}`, courseData),
  delete: (id) => api.delete(`/courses/${id}`),
};

// Enrollment API
export const enrollmentAPI = {
  enroll: (courseId) => api.post(`/enroll/${courseId}`),
  getMyEnrollments: () => api.get('/enroll/my'),
  updateProgress: (courseId, progress) => api.put(`/enroll/progress/${courseId}?progress=${progress}`),
};

export const assignmentsAPI = {
  create: (data) => api.post('/assignments', data),
  getByCourse: (courseId) => api.get(`/assignments/${courseId}`),
};

export const submissionsAPI = {
  submit: (assignmentId, data) => api.post(`/submissions/${assignmentId}`, data),
  getByAssignment: (assignmentId) => api.get(`/submissions/${assignmentId}`),
};