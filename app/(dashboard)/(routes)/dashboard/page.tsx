import { currentUser } from "@clerk/nextjs";

const CheckItPage = async () => {
  const user = await currentUser();

  if (!user) {
    return <div>Error</div>;
  }

  return (
    <div>
      Welcome, <br /> {user.firstName} {user.lastName}
    </div>
  );
};

export default CheckItPage;
