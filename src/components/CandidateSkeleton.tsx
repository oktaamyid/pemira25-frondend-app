import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function CandidateSkeleton() {
     return (
          <Card className="overflow-hidden border-none shadow-xl shadow-slate-200/50 bg-surface rounded-2xl h-full flex flex-col">
               <div className="grid grid-cols-2 gap-0.5 bg-neutral-cream">
                    <div className="relative aspect-4/5">
                         <Skeleton className="h-full w-full rounded-none" />
                    </div>
                    <div className="relative aspect-4/5">
                         <Skeleton className="h-full w-full rounded-none" />
                    </div>
               </div>

               <CardHeader className="text-center pb-2 pt-6">
                    <Skeleton className="mx-auto w-12 h-12 rounded-full mb-3" />
                    <Skeleton className="h-6 w-3/4 mx-auto" />
               </CardHeader>

               <CardContent className="space-y-6 px-6 pb-8 grow">
                    <div>
                         <Skeleton className="h-4 w-12 mb-2" />
                         <Skeleton className="h-20 w-full" />
                    </div>
                    <div>
                         <Skeleton className="h-4 w-12 mb-2" />
                         <div className="space-y-2">
                              <Skeleton className="h-4 w-full" />
                              <Skeleton className="h-4 w-full" />
                              <Skeleton className="h-4 w-3/4" />
                         </div>
                    </div>
               </CardContent>
          </Card>
     );
}
