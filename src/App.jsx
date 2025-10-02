import { BrowserRouter, Routes, Route} from "react-router-dom";
import Dashboard from "./pages/Dashboard"
import Colleges from "./pages/Colleges";
import Applications from "./pages/Applications";
import Sidebar from "./Components/Sidebar";
import Courses from "./pages/Courses";
import Login from "./pages/Login";
import Signup from "./pages/Signup";


// export default function App() {


//   return (



//     <BrowserRouter>
//       <Sidebar />
//       <Routes>
// <Route path="Dashboard" element={<Dashboard />} />
// <Route path="Colleges" element={<Colleges />} />
// <Route path="Courses" element={<Courses />} />
// <Route path="Applications" element={<Applications />} />
// <Route path="Login" element={<Login />} />
// <Route path="Signup" element={<Signup />} />

//  </Routes>
//     </BrowserRouter>
//   );
// }






// function Layout() {
//   const location = useLocation();
//   const hideSidebar = location.pathname === "/login" || location.pathname === "/signup";

//   return (
//     <div style={{ display: "flex" }}>
//       {!hideSidebar && <Sidebar />}
//       <Routes>
//           <Route path="Dashboard" element={<Dashboard />} />
//         <Route path="Colleges" element={<Colleges />} />
//         <Route path="Courses" element={<Courses />} />
//         <Route path="Applications" element={<Applications />} />
//         <Route path="Login" element={<Login />} />
//         <Route path="Signup" element={<Signup />} />

//       </Routes>
//     </div>
//   );
// }
// export default function App() {
//   return (
//     <BrowserRouter>
//       <Layout />
//     </BrowserRouter>
//   );
// }




// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";


// import Dashboard from "./pages/Dashboard";

// import Login from "./pages/Login";
// import Signup from "./pages/Signup";

export default function App() {
  // get user from redux store
  const user = useSelector((state) => state.home.user);

  return (
    <BrowserRouter>
      {user?.uid ? (
        <>
          <Sidebar />
          <Routes>
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="Colleges" element={<Colleges />} />
            <Route path="Courses" element={<Courses />} />
            <Route path="Applications" element={<Applications />} />
          </Routes>
        </>
      ) : (
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />

          <Route path="Signup" element={<Signup />} />
          <Route path="*" element={<Login />} />
        </Routes>
      )}
    </BrowserRouter>
  );
}