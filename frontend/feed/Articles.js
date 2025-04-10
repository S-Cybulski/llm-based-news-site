import { create } from "zustand";

export const newsFeed = create((set) => ({
    articles: [],
    setArticles: (articles) => set({ articles }),
    fetchArticles: async () => {
        const res = await fetch(`http://localhost:5000/api/articles`);
        const data = await res.json();
        set({ articles: data.data });
    },
}));

export const articleSummary = create((set) => ({
    summary: "",
    fetchSummary: async (url) => {
        try {
            const res = await fetch(`http://localhost:5000/api/articles/summarise`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ url }),

            });
            
            if (!res.ok) {
                throw new Error("Failed to fetch summary");
            }
            
            const data = await res.json();
            set({ summary: data.summary });

            return data.summary;
            
        } catch (error) {
            console.error("Error in summarising article:", error);
        }

    }
}));