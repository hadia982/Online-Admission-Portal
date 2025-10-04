
import { BrowserRouter, Routes, Route, } from "react-router-dom";
import ClgDashboard from "./Pages/ClgDashboard";
import StdMg from "./Pages/StdMg";
import CourseMg from "./Pages/CourseMg";
import SuccessS from "./Pages/SuccessS";
import ProfileMg from "./Pages/ProfileMg";
import Chat from "./Pages/Chat";
import Security from "./Pages/Security";
import Status from "./Pages/Status";
import CollegeLogin from "./Pages/Login";
import AdminLogin from "./Pages/AdminLogin";
import Signup from "./Pages/Signup";
import CollegeSignup from "./Pages/CollegeSignup";
import Sidebar from "./Components/Sidebar";
import Form from "./Pages/form";
import CourseStatus from "./Pages/CourseStatus";
import Addnewcourse from "./Pages/Addnewcourse";
import Addnewstory from "./Pages/Addnewstory";
import { useSelector } from "react-redux";
import RegForm from "./Pages/RegForm";
import StudentApplicationForm from "./Pages/StudentApplicationForm";



export default function App() {
  const user = useSelector((state) => state.home.user);

  return (
    <BrowserRouter>
      {user?.uid ? (
        // User is logged in - show appropriate dashboard based on role
        <div style={{ display: "flex", height: "100vh" }}>
          {/* Sidebar fix */}
          <div style={{ width: "250px"}}>
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
              <Route path="/Status" element={<Status />} />
              <Route path="/form" element={<Form />} />
              <Route path="/CourseStatus" element={<CourseStatus />} />
              <Route path="/Addnewcourse" element={<Addnewcourse />} />
              <Route path="/Addnewstory" element={<Addnewstory />} />
              <Route path="/RegForm" element={<RegForm />} />
              <Route path="/student-application" element={<StudentApplicationForm />} />
              
              {/* Admin routes - redirect to college dashboard for now */}
              <Route path="/admin-dashboard" element={<ClgDashboard />} />
            </Routes>
          </div>
        </div>
      ) : (
        // User is not logged in - show login pages
        <Routes>
          {/* Default route - College Login */}
          <Route path="/" element={<CollegeLogin />} />
          
          {/* Admin login */}
          <Route path="/admin" element={<AdminLogin />} />
          
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
