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


export const businessFeed = create((set) => ({
    articles: [],
    setArticles: (articles) => set({ articles }),
    fetchArticles: async () => {
        const res = await fetch(`http://localhost:5000/api/articles/business`);
        const data = await res.json();
        set({ articles: data.data });
    },
}));

export const entertainmentFeed = create((set) => ({
    articles: [],
    setArticles: (articles) => set({ articles }),
    fetchArticles: async () => {
        const res = await fetch(`http://localhost:5000/api/articles/entertainment`);
        const data = await res.json();
        set({ articles: data.data });
    },
}));

export const healthFeed = create((set) => ({
    articles: [],
    setArticles: (articles) => set({ articles }),
    fetchArticles: async () => {
        const res = await fetch(`http://localhost:5000/api/articles/health`);
        const data = await res.json();
        set({ articles: data.data });
    },
}));

export const politicsFeed = create((set) => ({
    articles: [],
    setArticles: (articles) => set({ articles }),
    fetchArticles: async () => {
        const res = await fetch(`http://localhost:5000/api/articles/politics`);
        const data = await res.json();
        set({ articles: data.data });
    },
}));

export const scienceFeed = create((set) => ({
    articles: [],
    setArticles: (articles) => set({ articles }),
    fetchArticles: async () => {
        const res = await fetch(`http://localhost:5000/api/articles/science`);
        const data = await res.json();
        set({ articles: data.data });
    },
}));

export const sportsFeed = create((set) => ({
    articles: [],
    setArticles: (articles) => set({ articles }),
    fetchArticles: async () => {
        const res = await fetch(`http://localhost:5000/api/articles/sports`);
        const data = await res.json();
        set({ articles: data.data });
    },
}));

export const technologyFeed = create((set) => ({
    articles: [],
    setArticles: (articles) => set({ articles }),
    fetchArticles: async () => {
        const res = await fetch(`http://localhost:5000/api/articles/technology`);
        const data = await res.json();
        set({ articles: data.data });
    },
}));

export const worldNewsFeed = create((set) => ({
    articles: [],
    setArticles: (articles) => set({ articles }),
    fetchArticles: async () => {
        const res = await fetch(`http://localhost:5000/api/articles/world-news`);
        const data = await res.json();
        set({ articles: data.data });
    },
}));