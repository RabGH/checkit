import { Suspense } from "react";

import WelcomeMsg from "@/components/dashboard/welcome";
import WelcomeMsgFallback from "@/components/dashboard/welcome-fallback";

export default async function Home() {
  return (
    <>
      <Suspense fallback={<WelcomeMsgFallback />}>
        <WelcomeMsg />
      </Suspense>
    </>
  );
}
