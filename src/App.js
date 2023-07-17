import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import Home from "./page/Home";
import HomeAdmin from "./admin/HomeAdmin";
import PrivateLoginRouter from "./utils/PrivateLoginRoute";
import Login from "./page/Login";
import Register from "./page/Register";
import Doctors from "./page/doctor/Doctors";
import DoctorDetail from "./page/doctor/DoctorDetail";
import HistoryOder from "./page/history/HistoryOder";
import PrivateRoutesAdmin from "./utils/PrivateRouteAdmin";
import Err404 from "./page/err/Err";
import Specialty from "./page/specialty/Specialty";
import PrivateRouteDoctor from "./utils/PrivateRouteDoctor";
import DoctorHome from "./doctorManage/DoctorHome";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<Layout />}>
          {/* luồng của admin */}
          <Route element={<PrivateRoutesAdmin />}>
            <Route path="/homeAdmin" element={<HomeAdmin />} />
          </Route>
          {/* luồng khi đăng nhập không được vào login register */}
          <Route element={<PrivateLoginRouter />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
          <Route element={<PrivateRouteDoctor/>}>
            <Route path="/homeDoctor" element={<DoctorHome/>}/>
          </Route>
          {/* các luồng luôn được vào */}
          <Route path="/" element={<Home />} />
          <Route path="/doctor" element={<Doctors />} />
          <Route path="/doctorDetail" element={<DoctorDetail />} />
          <Route path="/historyOder" element={<HistoryOder />} />
          <Route path="/specialty" element={<Specialty/>}/>
          <Route path="/err" element={<Err404/>}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
