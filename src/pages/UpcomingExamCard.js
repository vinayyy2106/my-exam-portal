import React from "react";

export const UpcomingExamCard = ({ exam }) => {
  const formatDateTime = (dateTime) => {
    try {
      const date = new Date(dateTime);
      return date.toLocaleString(undefined, {
        dateStyle: "medium",
        timeStyle: "short",
      });
    } catch {
      return "Invalid date";
    }
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 bg-gray-800 rounded-md gap-2 sm:gap-0 border border-gray-700 hover:border-violet-500 transition">
      <div>
        <div className="font-semibold text-white">
          {exam.title || "Upcoming Exam"}
        </div>
        <div className="text-gray-400 text-xs sm:text-sm">
          {formatDateTime(exam.startDateTime)} - {formatDateTime(exam.endDateTime)}
        </div>
      </div>
      <button className="mt-2 sm:mt-0 text-xs sm:text-sm text-blue-400 hover:text-blue-300 transition">
        View Details
      </button>
    </div>
  );
};
