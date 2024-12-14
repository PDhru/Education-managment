import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const userRole = localStorage.getItem('role'); // Get the user's role from localStorage

  // Define menu items for each role
  const menuItems = [
    { path: '/', label: 'Home', roles: ['Admin'] },
    { path: '/add-courses', label: 'Add Courses', roles: ['Admin'] },
    { path: '/view-courses', label: 'View Courses', roles: ['Admin','Student','Teacher'] },
    { path: '/my-courses', label: 'My Enrollments', roles: ['Student'] },
    { path: '/enroll-students', label: 'Enroll Student', roles: ['Admin'] },
    { path: '/create-quiz', label: 'Create Quiz', roles: ['Admin'] },
    { path: '/view-grades', label: 'View Grades', roles: ['Student'] },
    { path: '/grade-students/:courseId', label: 'Give Grades', roles: ['Teacher'] },
    { path: '/teacher-dashboard', label: 'Teacher Dashboard', roles: ['Teacher'] },
    { path: '/create-quiz', label: 'Student Quiz', roles: ['Teacher'] },
  ];

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  };
  return (
    <>
      <nav className="pc-sidebar">
        <div className="navbar-wrapper">
          <div className="m-header flex items-center py-4 px-6 h-header-height">
            <a href="/" className="b-brand flex items-center gap-3">
              <img src="../assets/images/logo-dark.svg" className="img-fluid logo-lg" alt="logo" />
              <span className="badge bg-success-500/10 text-success-500 rounded-full theme-version">v1.0.0</span>
            </a>
          </div>
          <div className="navbar-content h-[calc(100vh_-_74px)] py-2.5">
            <div className="card pc-user-card mx-[15px] mb-[15px] bg-theme-sidebaruserbg dark:bg-themedark-sidebaruserbg">
              <div className="card-body !p-5">
                <div className="flex items-center">
                  <img className="shrink-0 w-[45px] h-[45px] rounded-full" src="../assets/images/user/avatar-1.jpg" alt="user-image" />
                  <div className="ml-4 mr-2 grow">
                    <h6 className="mb-0">John Smith</h6>
                    <small>Administrator</small>
                  </div>
                  <a className="shrink-0 btn btn-icon inline-flex btn-link-secondary" data-pc-toggle="collapse" href="#pc_sidebar_userlink">
                    <svg className="pc-icon w-[22px] h-[22px]">
                      <use xlinkHref="#custom-sort-outline" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* MAIN SIDEBAR */}
            <ul className="pc-navbar">
              <li className="pc-item pc-caption"><label>Navigation</label></li>
                {menuItems
                .filter((item) => item.roles.includes(userRole)) 
                .map((item, index) => (
                  <li key={index} className="pc-item">
                    <a onClick={() => navigate(item.path)} className="pc-link">
                      <span className="pc-mtext">{item.label}</span>
                    </a>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </nav>
      <header className="pc-header">
        <div className="header-wrapper flex max-sm:px-[15px] px-[25px] grow">
          <div className="me-auto pc-mob-drp">
            <ul className="inline-flex *:min-h-header-height *:inline-flex *:items-center">
              <li className="pc-h-item pc-sidebar-collapse max-lg:hidden lg:inline-flex">
                <a href="#" className="pc-head-link ltr:!ml-0 rtl:!mr-0" id="sidebar-hide">
                  <i className="ti ti-menu-2" />
                </a>
              </li>
              <li className="pc-h-item pc-sidebar-popup lg:hidden">
                <a href="#" className="pc-head-link ltr:!ml-0 rtl:!mr-0" id="mobile-collapse">
                  <i className="ti ti-menu-2 text-2xl leading-none" />
                </a>
              </li>
            </ul>
          </div>

          <div className="ms-auto">
            <ul className="inline-flex *:min-h-header-height *:inline-flex *:items-center">
              {/* Logout Button */}
              <li>
                <div className="grid">
                  <button className="btn btn-primary flex items-center justify-center" onClick={handleLogout}>
                    <svg className="pc-icon me-2 w-[22px] h-[22px]">
                      <use xlinkHref="#custom-logout-1-outline" />
                    </svg>
                    Logout
                  </button>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
