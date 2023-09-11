import Navbar from "@/components/navigation/navbar";
import { Separator } from "@/components/ui/separator";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen w-full flex-col items-center dark:bg-black">
      <Navbar />
      <Separator />
      <main className="flex flex-grow w-full h-full justify-center items-center dark:bg-neutral-950">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
