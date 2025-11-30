
import React from "react";

export const Privacy = () => {
  return (
    <div className="px-2 sm:px-4 md:px-8  mx-auto w-full py-10 dark:bg-darkbg bg-gray-800 h-screen">
      <h1 className="text-3xl font-bold mb-4 text-white">
        Privacy Policy
      </h1>

      <div className=" border border-violet-400 rounded-lg p-5 leading-7 text-white">
        <p>
          This Privacy Policy outlines how ExamPortal collects, uses, and
          protects user data. Your privacy and security are our top priorities.
        </p>

        <h2 className="mt-5 text-xl font-semibold text-violet-600 dark:text-violet-300">
          1. Data Storage
        </h2>
        <p>
          We store only necessary details such as your Name, Email, Avatar, and
          Exam Records. Passwords are encrypted and kept secure.
        </p>

        <h2 className="mt-5 text-xl font-semibold text-violet-600 dark:text-violet-300">
          2. Usage of Data
        </h2>
        <p>
          Your data is used solely for exam allocation, dashboard activity, and
          result processing. We do not share data with third parties.
        </p>

        <h2 className="mt-5 text-xl font-semibold text-violet-600 dark:text-violet-300">
          3. Cookies & Tracking
        </h2>
        <p>
          We use minimal cookies only for authenticating users and improving
          usability. No personal tracking is performed.
        </p>
      </div>
    </div>
  );
};
