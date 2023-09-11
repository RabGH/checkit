import { Skeleton } from "@/components/ui/skeleton";

export default function WelcomeMsgFallback() {
  return (
    <div className="flex w-full mb-12">
      <h2 className="text-4xl font-bold space-y-1 ml-1 mt-1">
        <Skeleton className="w-[150px] h-[36px]" />
        <Skeleton className="w-[150px] h-[36px]" />
      </h2>
    </div>
  );
}
