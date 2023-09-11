import { currentUser } from "@clerk/nextjs";

import { wait } from "@/lib/wait";

export default async function WelcomeMsg() {
  const user = await currentUser();
  await wait(1000);

  if (!user) {
    return <div>Error - Unauthenticated or No User</div>;
  }

  return (
    <div className="flex w-full">
      <h2 className="text-4xl font-bold">
        Welcome, <br /> {user.firstName} {user.lastName}
      </h2>
    </div>
  );
}
