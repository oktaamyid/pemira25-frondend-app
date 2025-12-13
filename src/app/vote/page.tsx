import { api } from "@/lib/api";
import VoteView from "@/components/VoteView";

export const revalidate = 60; // ISR

export default async function VotePage() {
     let candidates = [];
     try {
          // Pre-fetch candidates so when user logs in, data is ready
          candidates = await api.getCandidates({ next: { revalidate: 60 } });
     } catch (err) {
          console.error("Failed to fetch candidates for vote page:", err);
     }

     return <VoteView initialCandidates={candidates} />;
}
