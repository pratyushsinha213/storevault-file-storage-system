import { create } from "zustand";
import axiosInstance from "@/services/axios";

const useAnalyticsStore = create((set) => ({
    loading: false,
    error: null,

    storageStats: null,
    uploadStats: [],
    topFileStats: [],
    fileTypeStats: [],

    fetchAnalytics: async (range, limit) => {
        set({ loading: true, error: null });
        try {
            const [storageResult, uploadsResult, topResult, filesResult] = await Promise.all([
                axiosInstance.get("/analytics/storage"),
                axiosInstance.get("/analytics/uploads", { params: { range } }),
                axiosInstance.get("/analytics/top-files", { params: { limit } }),
                axiosInstance.get("/analytics/file-types"),
            ]);

            console.log(storageResult.data.data);
            set({
                storageStats: storageResult.data.data,
                uploadStats: uploadsResult.data.data,
                topFileStats: topResult.data.data,
                fileTypeStats: filesResult.data.data,
                loading: false,
            });
        } catch (error) {
            console.error("Analytics error:", error);
            set({ error: error.message, loading: false });
        }
    },
}));

export default useAnalyticsStore;