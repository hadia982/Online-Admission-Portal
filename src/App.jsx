import { BrowserRouter, Routes, Route, } from "react-router-dom";
import ClgDashboard from "./Pages/ClgDashboard";
import StdMg from "./Pages/StdMg";
import CourseMg from "./Pages/CourseMg";
import SuccessS from "./Pages/SuccessS";
import ProfileMg from "./Pages/ProfileMg";
import Chat from "./Pages/Chat";
import Security from "./Pages/Security";
// import Status from "./Pages/Status";
import CollegeLogin from "./Pages/Login";
import AdminLogin from "./Pages/AdminLogin";
import AdminSignup from "./Pages/AdminSignup";
import AdminDashboard from "./Pages/AdminDashboard";
import AdminColleges from "./Pages/AdminColleges";
import AdminCourses from "./Pages/AdminCourses";
import TestDataSetup from "./Pages/TestDataSetup";
import Signup from "./Pages/Signup";
import CollegeSignup from "./Pages/CollegeSignup";
import Sidebar from "./Components/Sidebar";
import AdminSidebar from "./Components/AdminSidebar";
import Form from "./Pages/form";
import CourseStatus from "./Pages/CourseStatus";
import Addnewcourse from "./Pages/Addnewcourse";
import Addnewstory from "./Pages/Addnewstory";
import { useSelector } from "react-redux";
import RegForm from "./Pages/RegForm";
import StudentApplicationForm from "./Pages/StudentApplicationForm";
import SuccessStories from "./Pages/SuccessStories";
import AdminSuccessStories from "./Pages/AdminSuccessStories";
import AdminApplications from "./Pages/adminApplications";
import ForgotPassword from "./Pages/ForgotPassword";
import ResetPassword from "./Pages/ResetPassword";



export default function App() {
  const user = useSelector((state) => state.home.user);

  return (
    <BrowserRouter>
      {user?.uid ? (
        // User is logged in - show appropriate dashboard based on role
        user?.role === 'admin' ? (
          // Admin Dashboard
          <div style={{ display: "flex", height: "100vh" }}>
            {/* Admin Sidebar */}
            <AdminSidebar />

            {/* Main content area */}
            <div style={{
              flex: 1,
              minWidth: 0,
              width: 'calc(100vw - 250px)',
              marginLeft: "250px",
              background: "#f5f5f5",
              overflow: 'auto',
              height: '100vh'
            }}>
              <Routes>
                {/* Admin routes */}
                <Route path="/admin-dashboard" element={<AdminDashboard />} />
                <Route path="/admin-colleges" element={<AdminColleges />} />
                <Route path="/admin-courses" element={<AdminCourses />} />
                <Route path="/admin-success-stories" element={<AdminSuccessStories />} />
                <Route path="/admin-applications" element={<AdminApplications />} />

                {/* <Route path="/admin-users" element={<div>Admin Users - Coming Soon</div>} />
                <Route path="/admin-admissions" element={<div>Admin Admissions - Coming Soon</div>} /> */}

                {/* Redirect admin to dashboard */}
                <Route path="*" element={<AdminDashboard />} />

              </Routes>
            </div>
          </div>
        ) : (
          // College Dashboard
          <div style={{ display: "flex", height: "100vh" }}>
            {/* Sidebar fix */}
            <div style={{ width: "250px" }}>
              <Sidebar />
            </div>

            {/* Main content area */}
            <div style={{
              flex: 1,
              minWidth: 0,
              width: 'calc(100vw - 250px)',
              background: "#f5f5f5",
              overflow: 'auto',
              height: '100vh'
            }}>
              <Routes>
                {/* College routes */}
                <Route path="/ClgDashboard" element={<ClgDashboard />} />
                <Route path="/StdMg" element={<StdMg />} />
                <Route path="/CourseMg" element={<CourseMg />} />
                <Route path="/SuccessS" element={<SuccessS />} />
                <Route path="/ProfileMg" element={<ProfileMg />} />
                <Route path="/Chat" element={<Chat />} />
                <Route path="/Security" element={<Security />} />
                {/* <Route path="/Status" element={<Status />} /> */}
                <Route path="/form" element={<Form />} />
                <Route path="/CourseStatus" element={<CourseStatus />} />
                <Route path="/Addnewcourse" element={<Addnewcourse />} />
                <Route path="/Addnewstory" element={<Addnewstory />} />
                <Route path="/RegForm" element={<RegForm />} />
                <Route path="/student-application" element={<StudentApplicationForm />} />
                <Route path="/SuccessStories" element={<SuccessStories />} />

                {/* Redirect to college dashboard */}
                <Route path="*" element={<ClgDashboard />} />
              </Routes>
            </div>
          </div>
        )
      ) : (
        // User is not logged in - show login pages
        <Routes>
          {/* Default route - College Login */}
          <Route path="/" element={<CollegeLogin />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          {/* Admin login */}
          <Route path="/admin" element={<AdminLogin />} />

          {/* Admin signup */}
          <Route path="/admin-signup" element={<AdminSignup />} />

          {/* Test data setup */}
          <Route path="/test-setup" element={<TestDataSetup />} />

          {/* Signup */}
          <Route path="/Signup" element={<CollegeSignup />} />

          {/* Redirect all other routes to college login */}
          <Route path="*" element={<CollegeLogin />} />
        </Routes>
      )}
    </BrowserRouter>
  );
}

// export default function App() {
//   return (
//     <BrowserRouter>
//       <Layout />
//     </BrowserRouter>
//   );
// }
