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