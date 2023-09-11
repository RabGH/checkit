import { Suspense } from "react";

import WelcomeMsg from "@/components/dashboard/welcome";
import WelcomeMsgFallback from "@/components/dashboard/welcome-fallback";
import CollectionList from "@/components/dashboard/collection-list";

import { wait } from "@/lib/wait";
export default async function Home() {
  await wait(3000);

  return (
    <>
      <Suspense fallback={<WelcomeMsgFallback />}>
        <WelcomeMsg />
      </Suspense>
      <Suspense fallback={<div>Loading collections...</div>}>
        <CollectionList />
      </Suspense>
    </>
  );
}
