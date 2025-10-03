// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import ClgDashboard from "./Pages/ClgDashboard";
// import StdMg from "./Pages/StdMg";
// import CourseMg from "./Pages/CourseMg";
// import SuccessS  from "./Pages/SuccessS";
// import ProfileMg from "./Pages/ProfileMg";
// import Chat from "./Pages/Chat";
// import Security from "./Pages/Security";
// import Status from "./Pages/Status";

// import Sidebar from "./Components/Sidebar";

// export default function App() {
//   return (
//     <BrowserRouter>
//       <div style={{ display: 'flex' }}>
//         <Sidebar />
//         <Routes>
//           <Route path="/ClgDashboard" element={<ClgDashboard />} />
//           <Route path="/StdMg" element={<StdMg/>} />
//           <Route path="/CourseMg" element={<CourseMg/>} />
//          <Route path="/SuccessS" element={<SuccessS/>} />
//          <Route path="/ProfileMg" element={<ProfileMg/>} />
//          <Route path="/Chat" element={<Chat/>} />
//          <Route path="/Security" element={<Security/>} />
//          <Route path="/Status" element={<Status/>} />


//         </Routes>
//       </div>
//     </BrowserRouter>
//   );
// }
import { BrowserRouter, Routes, Route, } from "react-router-dom";
import ClgDashboard from "./Pages/ClgDashboard";
import StdMg from "./Pages/StdMg";
import CourseMg from "./Pages/CourseMg";
import SuccessS from "./Pages/SuccessS";
import ProfileMg from "./Pages/ProfileMg";
import Chat from "./Pages/Chat";
import Security from "./Pages/Security";
import Status from "./Pages/Status";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Sidebar from "./Components/Sidebar";
import Form from "./Pages/form";
import CourseStatus from "./Pages/CourseStatus";
import Addnewcourse from "./Pages/Addnewcourse";
import Addnewstory from "./Pages/Addnewstory";
import { useSelector } from "react-redux";
import RegForm from "./Pages/RegForm";



export default function App() {

  const user = useSelector((state) => state.home.user);

  return (
    <BrowserRouter>
      {user?.uid ? (
        <div style={{ display: "flex", height: "100vh" }}>
          {/* Sidebar fix */}
          <div style={{ width: "250px"}}>
            <Sidebar />
          </div>

          {/* Main content area */}
          <div style={{ flex: 1, background: "#f5f5f5" }}>
            <Routes>
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

            </Routes>
          </div>
        </div>
      ) : (
        <Routes>
          <Route path="/ClgDashboard" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="*" element={<Login />} />
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
