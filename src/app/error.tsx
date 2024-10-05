"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const CustomError = () => {
  const router = useRouter();

  setTimeout(() => {
    router.push("/");
  }, 5000);

  return (
    <div className="min-h-screen max-w-screen flex flex-col items-center justify-center bg-gray-100 px-32 lg:px-0">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <p className="text-gray-800 mb-12">
          We apologize for the inconvenience.
          <br /> Our server is currently experiencing issues. <br /> Please try
          again later.
        </p>

        <Link href={"/"}>
          <button>Back To Home</button>
        </Link>
      </div>
    </div>
  );
};

export default CustomError;
