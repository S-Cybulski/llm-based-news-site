import { create } from "zustand";

export const newsFeed = create((set) => ({
    articles: [],
    setArticles: (articles) => set({ articles }),
    fetchArticles: async () => {
        const res = await fetch("http://localhost:5000/api/articles");
        const data = await res.json();
        set({ articles: data.data });
    },
}));
