/* eslint-disable no-unused-vars */
import axiosInstance from "@/services/axios";
import { toast } from "sonner";
import { create } from "zustand";

const useAuthStore = create((set) => ({
    user: null,
    details: null,
    isAuthenticated: false,
    isLoading: false,
    isCheckingAuth: false,
    loginUser: async (data) => {
        set({ isLoading: true, user: null });
        try {
            console.log('Frontend: Attempting login with:', { email: data.email });
            const response = await axiosInstance.post('/users/login', data);
            console.log('Frontend: Login response:', response.data);
            console.log('Frontend: Cookies received:', document.cookie);
            set({ user: response.data?.data, isAuthenticated: true });
            toast.success(response.data?.message || 'Login successful!');
            return { success: true };
        } catch (error) {
            console.error('Frontend: Login error:', error);
            console.error('Frontend: Error response:', error.response?.data);
            const message = error.response?.data?.message || "Login failed.";
            set({ user: null });
            toast.error(message);
            return { success: false, message };
        } finally {
            set({ isLoading: false });
        }
    },
    registerUser: async (data) => {
        set({ isLoading: true });
        try {
            const response = await axiosInstance.post('/users/register', data);
            toast.success(response.data?.message || "Registration successful!");
            set({ user: response.data?.data, isAuthenticated: true });
            return { success: true };
        } catch (error) {
            const message = error.response?.data?.message || "Registration failed.";
            toast.error(message);
            return { success: false, message };
        } finally {
            set({ isLoading: false });
        }
    },
    checkAuth: async () => {
        set({ isCheckingAuth: true });
        try {
            const response = await axiosInstance.get('/users/profile');
            set({ user: response.data?.data, isAuthenticated: true });
        } catch (error) {
            // Don't show error toast for 401 - user just isn't logged in
            if (error.response?.status !== 401) {
                console.error('Auth check error:', error);
            }
            set({ user: null, isAuthenticated: false });
        } finally {
            set({ isCheckingAuth: false });
        }
    },
    logoutUser: async () => {
        set({ isLoading: true });
        try {
            await axiosInstance.post('/users/logout');
            set({ user: null, isAuthenticated: false });
            toast.success("Logout successful!");
            return { success: true };
        } catch (error) {
            toast.error("Logout failed.");
            return { success: false };
        } finally {
            set({ isLoading: false });
        }
    },
    getProfileDetails: async () => {
        set({ isLoading: true });
        try {
            const response = await axiosInstance.get('/users/get-profile-details');
            console.log(response.data.data)
            set({ details: response.data?.data });
        } catch (error) {
            toast.error("Failed to fetch profile details");
        } finally {
            set({ isLoading: false });
        }
    },
    upgradePlanCheck: async (tier) => {
        try {
            const response = await axiosInstance.post(`/users/upgrade-plan-check`, { newTier: tier });
            return response.data?.message;
        } catch (error) {
            toast.error(error.response?.data?.message || 'Upgrade plan failed');
            throw error;
        }
    },
    // New: initiate checkout session
    initiateCheckout: async (plan) => {
        set({ isLoading: true });
        try {
            const response = await axiosInstance.post("/payments/checkout", { plan });
            // Stripe returns a redirect URL
            if (response.status === 200 && response.data.url) {
                // Redirect to Stripe Checkout
                window.location.href = response.data.url;
            } else if (response.status === 200) {
                // Your current backend uses res.redirect, which sends 200 + url in 'Location' header 
                // but not in JSON body. So might want to handle differently or backend should send JSON with url.
                // For now, fallback:
                toast.success("Redirecting to payment...");
            } else {
                toast.error("Failed to initiate payment.");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Payment initiation failed.");
        } finally {
            set({ isLoading: false });
        }
    },

    // New: verify payment success from backend
    verifyPaymentSuccess: async (sessionId) => {
        set({ isLoading: true });
        try {
            const response = await axiosInstance.post("/payments/success", null, {
                params: { session_id: sessionId },
            });

            if (response.status === 200 && response.data.success !== false) {
                set({ user: response.data.user || null });
                toast.success(response.data.message || "Payment successful!");
                return { success: true };
            } else {
                toast.error(response.data.message || "Payment verification failed.");
                return { success: false };
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Payment verification failed.");
            return { success: false };
        } finally {
            set({ isLoading: false });
        }
    },

    // New: handle payment cancellation
    handlePaymentCancelled: async (sessionId) => {
        set({ isLoading: true });
        try {
            const response = await axiosInstance.post("/payments/cancelled", null, {
                params: { session_id: sessionId },
            });
            toast.info(response.data.message || "Payment cancelled.");
            return { success: true };
        } catch (error) {
            toast.error(error.response?.data?.message || "Payment cancellation failed.");
            return { success: false };
        } finally {
            set({ isLoading: false });
        }
    },
}));


export default useAuthStore;