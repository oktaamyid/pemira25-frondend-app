// Use local IP for network access
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const api = {
     login: async (nim: string, password: string) => {
          const res = await fetch(`${API_URL}/auth/login`, {
               method: 'POST',
               headers: { 'Content-Type': 'application/json' },
               body: JSON.stringify({ nim, password }),
          });
          if (!res.ok) throw new Error('Login failed');
          return res.json();
     },

     getCandidates: async () => {
          const res = await fetch(`${API_URL}/candidates`);
          if (!res.ok) throw new Error('Failed to fetch candidates');
          return res.json(); // Returns array
     },

     vote: async (candidateId: string, token: string) => {
          const res = await fetch(`${API_URL}/votes`, {
               method: 'POST',
               headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
               },
               body: JSON.stringify({ candidateId }),
          });
          if (!res.ok) {
               const err = await res.json();
               throw new Error(err.message || 'Vote failed');
          }
          return res.json();
     },

     getVoteStatus: async (token: string) => {
          const res = await fetch(`${API_URL}/votes/status`, {
               headers: {
                    'Authorization': `Bearer ${token}`
               }
          });
          if (!res.ok) return { hasVoted: false };
          return res.json();
     },

     getStats: async () => {
          const res = await fetch(`${API_URL}/votes/stats`);
          if (!res.ok) throw new Error('Failed to fetch stats');
          return res.json();
     },

     getResults: async () => {
          const res = await fetch(`${API_URL}/votes/results`);
          if (!res.ok) throw new Error('Failed to fetch results');
          return res.json();
     }
};
