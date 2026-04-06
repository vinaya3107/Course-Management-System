import React, { useState, useEffect, useCallback } from 'react';
import { assignmentService } from '../services/assignmentService';
import { courseService } from '../services/courseService';
import { useAuth } from '../context/AuthContextProvider';

const Assignments = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [assignments, setAssignments] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ title: '', dueDate: '' });
  const { user } = useAuth();

  const fetchCourses = useCallback(async () => {
    try {
      const data = await courseService.getAllCourses();
      setCourses(data.filter(course => course.instructorId === user.id));
    } catch (error) {
      console.error('Failed to fetch courses', error);
    }
  }, [user.id]);

  const fetchAssignments = useCallback(async (courseId) => {
    try {
      const data = await assignmentService.getAssignmentsByCourse(courseId);
      setAssignments(data);
    } catch (error) {
      console.error('Failed to fetch assignments', error);
    }
  }, []);

  useEffect(() => {
    fetchCourses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (selectedCourse) {
      fetchAssignments(selectedCourse);
    }
  }, [selectedCourse, fetchAssignments]);

  const handleCreateAssignment = async (e) => {
    e.preventDefault();
    try {
      await assignmentService.createAssignment({
        ...formData,
        courseId: selectedCourse
      });
      setFormData({ title: '', dueDate: '' });
      setShowForm(false);
      fetchAssignments(selectedCourse);
    } catch {
      alert('Failed to create assignment');
    }
  };

  return (
    <div className="assignments">
      <div className="page-header">
        <h2>📝 Assignment Management</h2>
        <p>Create and manage assignments for your courses</p>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', marginBottom: '10px', fontWeight: '600' }}>
          Select Course:
        </label>
        <select
          value={selectedCourse}
          onChange={(e) => setSelectedCourse(e.target.value)}
          style={{
            padding: '12px 20px',
            borderRadius: '12px',
            border: '2px solid #ecf0f1',
            fontSize: '16px',
            backgroundColor: '#f8f9fa',
            minWidth: '300px'
          }}
        >
          <option value="">Choose a course</option>
          {courses.map(course => (
            <option key={course.id} value={course.id}>{course.title}</option>
          ))}
        </select>
      </div>

      {selectedCourse && (
        <>
          <button
            className="action-btn"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? '❌ Cancel' : '➕ Add Assignment'}
          </button>

          {showForm && (
            <form onSubmit={handleCreateAssignment} className="create-assignment-form">
              <div>
                <label>Assignment Title:</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                  placeholder="Enter assignment title"
                />
              </div>
              <div>
                <label>Due Date:</label>
                <input
                  type="date"
                  value={formData.dueDate}
                  onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                  required
                />
              </div>
              <button type="submit">📋 Create Assignment</button>
            </form>
          )}

          <div className="assignments-list">
            <h3 style={{ color: '#2c3e50', marginBottom: '20px' }}>
              📚 Assignments for {courses.find(c => c.id == selectedCourse)?.title}
            </h3>
            {assignments.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px', color: '#7f8c8d' }}>
                <h4>No assignments yet</h4>
                <p>Create your first assignment above!</p>
              </div>
            ) : (
              assignments.map(assignment => (
                <div key={assignment.id} className="assignment-item">
                  <h4>{assignment.title}</h4>
                  <p>📅 Due: {new Date(assignment.dueDate).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}</p>
                </div>
              ))
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Assignments;