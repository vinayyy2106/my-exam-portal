import React,{useEffect} from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { Home, Login } from '../pages'
import { Layout } from '../components'
import { AdminDashboard } from '../pages/AdminDashboard'
import NewTest from '../pages/NewTest'
import { PrivateRoute } from './PrivateRoute'
const AppRoutes = () => {
  // const navigate=useNavigate();
  // useEffect(() => {
  //   window.onpopstate = () => {
  //     const token = sessionStorage.getItem("jwt");
  //     if (!token) navigate("/", { replace: true });
  //   };
  // }, []);
  return (
    <div className="dark:bg-darkbg">
      <Routes>
        <Route path='/' element={<Login />} />
        <Route
          path="/home"
          element={
            <PrivateRoute allowedRoutes={["USER"]}>
              <Layout>
                <Home />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/admin-dashboard"
          element={
            <PrivateRoute allowedRoutes={["ADMIN"]}>
              <Layout>
                <AdminDashboard />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/upload-exam"
          element={
            <PrivateRoute allowedRoutes={["ADMIN"]}>
              <Layout>
                <NewTest />
              </Layout>
            </PrivateRoute>
          }
        />
      </Routes>
    </div>

  )
}
export default AppRoutes


