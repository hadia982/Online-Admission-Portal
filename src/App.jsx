import { BrowserRouter, Routes, Route} from "react-router-dom";
import Dashboard from "./pages/Dashboard"
import Colleges from "./pages/Colleges";
import Applications from "./pages/Applications";
import Sidebar from "./Components/Sidebar";
import Courses from "./pages/Courses";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { useSelector } from "react-redux";
import Clgsignup from "./pages/Clgsignup";


export default function App() {
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
            <Route path="Clgsignup" element={<Clgsignup />} />
          </Routes>
        </>
      ) : (
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />

          <Route path="Signup" element={<Signup />} />
          <Route path="Clgsignup" element={<Clgsignup />} />
          <Route path="*" element={<Login />} />
        </Routes>
      )}
    </BrowserRouter>
  );
}