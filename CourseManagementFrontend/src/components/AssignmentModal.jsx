import { useState, useEffect } from 'react';
import { assignmentsAPI, submissionsAPI } from '../services/api';

const AssignmentModal = ({ course, user, isOpen, onClose, isInstructor }) => {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newAssignment, setNewAssignment] = useState({ title: '', description: '', dueDate: '' });
  const [submissionData, setSubmissionData] = useState({});

  useEffect(() => {
    if (isOpen && course) {
      fetchAssignments();
    }
  }, [isOpen, course]);

  const fetchAssignments = async () => {
    setLoading(true);
    try {
      const response = await assignmentsAPI.getByCourse(course.id);
      setAssignments(response.data);
      console.log('Fetched assignments:', response.data);
    } catch (err) {
      const msg = err.response?.data?.message || err.message;
      setError(`Failed to fetch assignments: ${msg} (${err.response?.status || 'Network Error'})`);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAssignment = async (e) => {
    e.preventDefault();
    setError('');
    try {
      // Ensure date is in precise ISO format that @JsonFormat expects
      const isoDate = new Date(newAssignment.dueDate).toISOString(); 
      
      const payload = {
        ...newAssignment,
        course: { id: course.id },
        dueDate: isoDate
      };
      
      console.log('Creating assignment with payload:', payload);
      await assignmentsAPI.create(payload);
      
      setNewAssignment({ title: '', description: '', dueDate: '' });
      setShowCreateForm(false);
      await fetchAssignments(); // Refresh the list
    } catch (err) {
      const msg = err.response?.data?.message || err.message;
      setError(`Failed to create assignment: ${msg} (${err.response?.status || 'Error'})`);
      console.error('Creation error:', err.response || err);
    }
  };

  const handleSubmitWork = async (assignmentId) => {
    const fileUrl = submissionData[assignmentId];
    if (!fileUrl) return;

    try {
      await submissionsAPI.submit(assignmentId, { fileUrl });
      alert('Assignment submitted successfully!');
      setSubmissionData({ ...submissionData, [assignmentId]: '' });
    } catch (err) {
      setError('Failed to submit assignment');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-slate-800 border border-slate-700 rounded-3xl w-full max-w-2xl max-h-[80vh] overflow-hidden flex flex-col shadow-2xl">
        <div className="p-6 border-b border-slate-700 flex justify-between items-center bg-slate-800/50">
          <div className="flex items-center gap-4">
            <div>
              <h2 className="text-2xl font-bold text-white">Assignments</h2>
              <p className="text-slate-400 text-sm">{course.title}</p>
            </div>
            <button 
              onClick={fetchAssignments}
              className="p-2 text-slate-400 hover:text-cyan-400 hover:bg-slate-700 rounded-lg transition"
              title="Refresh List"
            >
              <svg className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {error && (
            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
              {error}
            </div>
          )}

          {isInstructor && (
            <div className="mb-4">
              <button
                onClick={() => setShowCreateForm(!showCreateForm)}
                className="w-full py-3 px-4 rounded-xl border-2 border-dashed border-slate-600 text-slate-400 hover:border-cyan-500 hover:text-cyan-400 transition-all flex items-center justify-center gap-2"
              >
                {showCreateForm ? 'Cancel Creation' : 'Create New Assignment'}
              </button>

              {showCreateForm && (
                <form onSubmit={handleCreateAssignment} className="mt-4 p-4 bg-slate-900/50 rounded-2xl border border-slate-700 space-y-4">
                  <input
                    type="text"
                    placeholder="Assignment Title"
                    required
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-white"
                    value={newAssignment.title}
                    onChange={(e) => setNewAssignment({ ...newAssignment, title: e.target.value })}
                  />
                  <textarea
                    placeholder="Description / Instructions"
                    required
                    rows={3}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-white"
                    value={newAssignment.description}
                    onChange={(e) => setNewAssignment({ ...newAssignment, description: e.target.value })}
                  />
                  <div>
                    <label className="block text-xs text-slate-500 mb-1 ml-1">Due Date</label>
                    <input
                      type="datetime-local"
                      required
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-white"
                      value={newAssignment.dueDate}
                      onChange={(e) => setNewAssignment({ ...newAssignment, dueDate: e.target.value })}
                    />
                  </div>
                  <button type="submit" className="w-full py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-xl transition">
                    Create Assignment
                  </button>
                </form>
              )}
            </div>
          )}

          {loading ? (
            <div className="flex justify-center p-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-500"></div>
            </div>
          ) : assignments.length === 0 ? (
            <div className="text-center py-12 text-slate-500 italic">
              No assignments posted yet.
            </div>
          ) : (
            <div className="space-y-4">
              {assignments.map((assignment) => (
                <div key={assignment.id} className="p-4 bg-slate-700/30 border border-slate-700 rounded-2xl">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-white text-lg">{assignment.title}</h3>
                    <span className="text-xs bg-slate-800 px-2 py-1 rounded text-cyan-400">
                      Due: {new Date(assignment.dueDate).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-slate-400 text-sm mb-4">{assignment.description}</p>
                  
                  {!isInstructor && (
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Submission URL (GitHub/Link)"
                        className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-white text-sm"
                        value={submissionData[assignment.id] || ''}
                        onChange={(e) => setSubmissionData({ ...submissionData, [assignment.id]: e.target.value })}
                      />
                      <button
                        onClick={() => handleSubmitWork(assignment.id)}
                        className="px-4 py-2 bg-violet-600 hover:bg-violet-500 text-white text-sm font-bold rounded-xl transition"
                      >
                        Submit
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AssignmentModal;
