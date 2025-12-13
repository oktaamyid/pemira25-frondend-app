/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from "@/lib/api";
import CandidatesView from "@/components/CandidatesView";

export const revalidate = 60; // ISR: Cache for 60 seconds

export default async function CandidatesPage() {
     // Fetch data on the server
     let candidatesData = [];
     try {
          const data = await api.getCandidates({ next: { revalidate: 60 } });
          candidatesData = data.map((c: any) => ({
               id: c.orderNumber,
               uuid: c.id,
               president: {
                    name: c.name.split('&')[0]?.trim() || c.name,
                    photo: c.photoUrl || 'https://placehold.co/192x288',
                    major: '-',
                    batch: '-'
               },
               vicePresident: {
                    name: c.name.split('&')[1]?.trim() || '',
                    photo: c.photoUrl || 'https://placehold.co/192x288',
                    major: '-',
                    batch: '-'
               },
               vision: c.vision,
               mission: c.mission.split('\n')
          })).sort((a: any, b: any) => a.id - b.id);
     } catch (err) {
          console.error("Failed to fetch candidates:", err);
          // Handle error gracefully, maybe show empty state or error message handled in View if needed
     }

     return <CandidatesView candidatesData={candidatesData} />;
}

