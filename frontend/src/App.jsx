import React, { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { SidebarProvider } from './components/ui/sidebar'
import useAuthStore from './store/useAuthStore'

import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import AppSidebar from './components/AppSidebar'
import RegisterPage from './pages/RegisterPage'
import LoadingPageSkeleton from './components/ui/LoadingPageSkeleton'
import Custom404ErrorPage from './pages/Custom404ErrorPage'
import FilesPage from './pages/FilesPage'
import AIChatPage from './pages/AIChatPage'
import AnalyticsPage from './pages/AnalyticsPage'
import DashboardPage from './pages/DashboardPage'
import Header from './components/Header'
import UpgradePlanPage from './pages/UpgradePlanPage'
import PaymentSuccessPage from './pages/PaymentSuccessPage'
import PaymentCancelledPage from './pages/PaymentCancelledPage'


const App = () => {

    const { isCheckingAuth, user, checkAuth } = useAuthStore();

    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    if (isCheckingAuth) {
        return (
            <LoadingPageSkeleton />
        )
    }

    return (
        <SidebarProvider>
            <div className='flex w-screen h-screen bg-black text-secondary'>
                {user && (
                    <AppSidebar />
                )}
                <div className="flex flex-col flex-1 overflow-x-hidden">
                    <Routes>
                        <Route path='/' element={<LandingPage isUserLoggedIn={user ? true : false} />} />
                        <Route
                            path="/login"
                            element={!user ? <LoginPage /> : <Navigate to="/" />}
                        />
                        <Route
                            path="/register"
                            element={!user ? <RegisterPage /> : <Navigate to="/" />}
                        />
                        <Route
                            path='/files'
                            element={user ? <FilesPage /> : <Navigate to="/" />}
                        />
                        <Route
                            path='/ai-assistant'
                            element={<AIChatPage />}
                        />
                        {/* <Route
                            path='/dashboard'
                            element={<DashboardPage />}
                        /> */}
                        <Route path="/upgrade-plan" element={<UpgradePlanPage />} />
                        <Route path="/upgrade-plan/payments/success" element={<PaymentSuccessPage />} />
                        <Route path="/upgrade-plan/payments/cancelled" element={<PaymentCancelledPage />} />
                        {/* <Route
                            path='/analytics'
                            element={user ? <AnalyticsPage /> : <Navigate to="/" />}
                        /> */}
                        <Route
                            path="/*"
                            element={<Custom404ErrorPage />}
                        />
                    </Routes>
                </div>
            </div>
        </SidebarProvider>
    )
}

export default App