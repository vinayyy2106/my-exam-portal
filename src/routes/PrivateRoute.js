import React from 'react'
import { Navigate } from 'react-router-dom'

export const PrivateRoute=({children,allowedRoutes=[]})=> {
  const token = sessionStorage.getItem("jwt");
  const role = sessionStorage.getItem("role");
  if(!token){
    return <Navigate to="/" replace/>
  }
  if(allowedRoutes.length>0 && !allowedRoutes.includes(role)){
    return <Navigate to="/" replace />;
  }
  return children;
}


