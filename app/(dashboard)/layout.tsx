import Navbar from "@/components/navigation/navbar";
import { Separator } from "@/components/ui/separator";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex min-h-screen w-full flex-col items-center dark:bg-black/10">
      <Navbar />
      <Separator />
      {children}
    </main>
  );
};

export default DashboardLayout;
