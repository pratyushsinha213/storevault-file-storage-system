/* eslint-disable no-unused-vars */
// store/useAIStore.js
import axiosInstance from "@/services/axios";
import { create } from "zustand";
import { toast } from "sonner";

const useAIStore = create((set) => ({
    chat: [],

    getResponseFromAi: async (userPrompt) => {
        if (!userPrompt.trim()) return;

        // Optimistically update UI with user's message
        set((state) => ({
            chat: [...state.chat, { sender: "user", text: userPrompt }]
        }));

        try {
            const res = await axiosInstance.post("/ai-assistant/response-from-ai", { prompt: userPrompt });
            const aiReply = res?.data?.data;

            set((state) => ({
                chat: [...state.chat, { sender: "ai", text: aiReply }]
            }));

            return aiReply; // ✅ return the reply here
        } catch (error) {
            toast.error("AI failed to respond");

            const fallback = "⚠️ Sorry, something went wrong.";
            set((state) => ({
                chat: [...state.chat, { sender: "ai", text: fallback }]
            }));

            return fallback; // ✅ return fallback response
        }
    },
}));

export default useAIStore;