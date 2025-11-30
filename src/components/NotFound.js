
import React from "react";
import { Link } from "react-router-dom";

export const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen px-4 dark:bg-darkbg bg-gray-100">
      <h1 className="text-5xl font-bold text-violet-600 dark:text-violet-300">
        404
      </h1>
      <p className="mt-3 text-gray-600 dark:text-gray-300 text-lg">
        Oops! The page you're looking for does not exist or you might have been accessing a page which is not allowed for your role.
      </p>

      <Link
        to="/home"
        className="mt-6 px-6 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-lg shadow"
      >
        Go Back Home
      </Link>
    </div>
  );
};
