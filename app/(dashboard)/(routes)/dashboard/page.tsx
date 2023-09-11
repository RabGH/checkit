import { UserButton } from "@clerk/nextjs";

const CheckItPage = () => {
  return <UserButton afterSignOutUrl="/" />;
};

export default CheckItPage;
