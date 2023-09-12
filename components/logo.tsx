"use client";

import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/dashboard">
      <h1
        className="text-2xl font-bold bg-gradient-to-r 
    from-red-700 via-red-600 to-red-500 bg-clip-text text-transparent"
      >
        CheckIt
      </h1>
    </Link>
  );
};

export default Logo;
