import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ViewCourses = () => {
  const [courses, setCourses] = useState([]);
  const [role, setRole] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        // Get the JWT token from localStorage
        const token = localStorage.getItem('token');
  
        if (!token) {
          throw new Error('No token found, please log in again');
        }
  
        // Fetch the current user's role
        const userResponse = await axios.get('https://education-managment.onrender.com/api/auth/me', {
          headers: { Authorization: `Bearer ${token}` } 
        });
        setRole(userResponse.data.role);
  
        // Fetch courses
        const response = await axios.get('https://education-managment.onrender.com/api/courses/view', {
          headers: { Authorization: `Bearer ${token}` } // Attach the token here
        });
        setCourses(response.data.courses);
        console.log(response.data.courses)
      } catch (error) {
        setError('Failed to load courses. Please try again.');
      }
    };
  
    fetchCourses();
  }, []);

  const handleDelete = async (courseId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`https://education-managment.onrender.com/api/courses/${courseId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCourses(courses.filter(course => course._id !== courseId));
    } catch (error) {
      setError('Failed to delete course.');
    }
  };

  return (
    <div className="pc-container">
      <div className="pc-content">
        <div className="page-header">
          <div className="page-block">
            <ul className="breadcrumb">
              <li className="breadcrumb-item"><a href="/">Home</a></li>
              <li className="breadcrumb-item" aria-current="page">View Courses</li>
            </ul>
            <div className="page-header-title">
              <h2 className="mb-0">View All Courses</h2>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-x-6">
          <div className="col-span-12">
            <div className="card table-card">
              <div className="card-header flex items-center justify-between py-3">
                <h5 className="mb-0">Courses</h5>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>Course Title</th>
                        <th>Assigned Teacher</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Description</th>
                        <th className="text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {courses.map(course => (
                        <tr key={course._id}>
                          <td>{course.title}</td>
                          <td>{course.assignedTeacher.name}</td>
                          <td>{new Date(course.startDate).toLocaleDateString()}</td>
                          <td>{new Date(course.endDate).toLocaleDateString()}</td>
                          <td>{course.description}</td>
                          <td className="text-right">
                            <a href={`/edit-course/${course._id}`} className="btn btn-link-secondary">
                              <i className="ti ti-edit text-xl leading-none" />
                            </a>
                            {role === 'Admin' && (
                              <button onClick={() => handleDelete(course._id)} className="btn btn-link-secondary">
                                <i className="ti ti-trash text-xl leading-none" />
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
      </div>
    </div>
  );
};

export default ViewCourses;
