import React,{useEffect} from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { Home, Login } from '../pages'
import { Layout } from '../components'
import { AdminDashboard } from '../pages/AdminDashboard'
import NewTest from '../pages/NewTest'
import { PrivateRoute } from './PrivateRoute'
import { Terms } from '../components/Terms'
import { Privacy } from '../components/Privacy'
import { NotFound } from '../components/NotFound'
import { Instructions } from '../components/Instructions'
import { ExamScreen } from '../pages/ExamScreen'
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
              <Layout val={true}>
                <Home />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/exam/:examId/instructions"
          element={
            <PrivateRoute allowedRoutes={["USER"]}>  
              <Layout val={true}>
                <Instructions />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/exam/:examId/start"
          element={
            <PrivateRoute allowedRoutes={["USER"]}>  
              <Layout val={false}>
                <ExamScreen />
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
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path={"*" || "/not-found"} element={<NotFound />} />
      </Routes>
    </div>

  )
}
export default AppRoutes


