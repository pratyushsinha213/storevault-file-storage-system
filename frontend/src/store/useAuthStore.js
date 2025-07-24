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
            const response = await axiosInstance.post('/users/login', data);
            set({ user: response.data?.data, isAuthenticated: true });
            toast.success(response.data?.message || 'Login successful!');
            return { success: true };
        } catch (error) {
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
            set({ details: response.data?.data });
        } catch (error) {
            toast.error("Failed to fetch profile details");
        } finally {
            set({ isLoading: false });
        }
    }
}));


export default useAuthStore;