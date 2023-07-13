import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import Home from "./page/Home";
import HomeAdmin from "./admin/HomeAdmin"
import Login from "./page/Login";
import Register from "./page/Register";
import Doctors from "./page/doctor/Doctors";
import DoctorDetail from "./page/doctor/DoctorDetail";
import HistoryOder from "./page/history/HistoryOder";
import PrivateRoutes from "./utils/PrivateRoute";
function App() {
  return (
    <div className="App">
        <Routes>
          <Route element={<Layout />}>
            <Route element={<PrivateRoutes/>}>
              {/* nếu không có token thì quay về login luồng cho admin vs doctor */}
            <Route path="/homeAdmin" element={<HomeAdmin/>} />
            </Route>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          <Route path="/doctor" element={<Doctors />} />
            <Route path="/doctorDetail" element={<DoctorDetail />} />
            <Route path="/historyOder" element={<HistoryOder />} />
          </Route>
        </Routes>
    </div>
  );
}

export default App;
