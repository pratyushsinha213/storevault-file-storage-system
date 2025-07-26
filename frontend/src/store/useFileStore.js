/* eslint-disable no-unused-vars */
import axiosInstance from "@/services/axios";
import { toast } from "sonner";
import { create } from "zustand";

const useFileStore = create((set) => ({
    files: [],
    file: null,
    isLoading: false,

    uploadFile: async (formData, onProgress, onComplete) => {
        try {
            const response = await axiosInstance.post('/files/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                onUploadProgress: (progressEvent) => {
                    const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    onProgress(percent);
                },
            });

            set((state) => ({
                files: [response.data.data, ...state.files]
            }));

            if (onComplete) onComplete(); // Signal completion

            toast.success("File uploaded successfully"); // fallback toast
            return response.data?.data;
        } catch (error) {
            toast.error(error.response?.data?.message || 'Upload failed');
            throw error;
        }
    },

    getAllFiles: async () => {
        set({ isLoading: true });
        try {
            const response = await axiosInstance.get("/files");
            set({ files: response.data.data });
        } catch (error) {
            toast.error("Failed to fetch files");
        } finally {
            set({ isLoading: false });
        }
    },

    getFileById: async (fileId) => {
        set({ isLoading: true });
        try {
            const response = await axiosInstance.get(`/files/${fileId}`);
            set({ file: response.data.data });
        } catch (error) {
            toast.error("Failed to fetch file details");
        } finally {
            set({ isLoading: false });
        }
    },

    deleteFile: async (fileId) => {
        set({ isLoading: true });
        try {
            await axiosInstance.delete(`/files/${fileId}`);
            toast.success("File deleted successfully");
            set((state) => ({
                files: state.files.filter(file => file._id !== fileId)
            }));
        } catch (error) {
            toast.error("Failed to delete file");
        } finally {
            set({ isLoading: false });
        }
    },
    // updateFile: async (fileId, updateData) => {
    //     // Placeholder — implement this when backend is ready
    //     toast.info("File update not implemented yet.");
    // }
}));

export default useFileStore;