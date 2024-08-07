import { Navigate, useLocation } from "react-router-dom"
import Cookie from 'js-cookie'
import { ReactNode } from "react";

interface ProtectedRouteProps {
    children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const location = useLocation()
    let isAuthenticated = true
    const token = Cookie.get('token')
    if(!token){
        isAuthenticated = false
    }

    if(!isAuthenticated){
        return <Navigate to="/login" state={{from:location}} replace />
    }
    return children
}   

export default ProtectedRoute