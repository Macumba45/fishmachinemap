'use client'
import {
    BrowserRouter,
    Navigate,
    Route,
    Routes,
    useLocation,
} from 'react-router-dom'

import { GoogleMap } from '@react-google-maps/api'
import HeaderComp from '@/components/Header'
import { getAuthenticatedToken } from '@/app/lib/storage/storage'
import Login from '@/app/auth/login/page'
import SignUp from '@/app/auth/signup/page'
import { FC, useEffect } from 'react'

const Router: FC = () => {
    const token = getAuthenticatedToken()
    const location = useLocation()

    const ProtectedRoutes = ({ children }: { children: JSX.Element }) => {
        if (!token) {
            // El usuario no está autenticado, redirigir a la página de inicio de sesión
            return <Navigate to="/" replace />
        }

        return children
    }

    const PublicRoute = ({ children }: { children: JSX.Element }) => {
        if (token) {
            // El usuario está autenticado, redirigir a la página de mapas
            return <Navigate to="/maps" replace />
        }

        return children
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={
                        <PublicRoute>
                            <HeaderComp />
                        </PublicRoute>
                    }
                />
                <Route
                    path="/auth/login"
                    element={
                        <PublicRoute>
                            <Login />
                        </PublicRoute>
                    }
                />
                <Route
                    path="/auth/signup"
                    element={
                        <PublicRoute>
                            <SignUp />
                        </PublicRoute>
                    }
                />
                <Route
                    path="/maps"
                    element={
                        <ProtectedRoutes>
                            <GoogleMap />
                        </ProtectedRoutes>
                    }
                />
            </Routes>
        </BrowserRouter>
    )
}

export default Router
