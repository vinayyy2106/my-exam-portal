import React from "react";
import { UpcomingExamCard } from "./UpcomingExamCard";
import { Loader2 } from "lucide-react";

export const UpcomingExams = ({ exams, onLoadMore, isLoading, hasMore }) => {
  return (
    <section className="mt-8 mb-8 bg-gray-900 border border-gray-900 rounded-lg p-3 sm:p-5 relative">
      <h2 className="text-white text-base sm:text-lg mb-3 sm:mb-4 font-bold">
        Upcoming Exams
      </h2>

      {exams.length === 0 && !isLoading && (
        <p className="text-gray-400 text-sm text-center py-6">
          No upcoming exams available.
        </p>
      )}

      <div className="flex flex-col gap-3">
        {exams.map((exam) => (
          <UpcomingExamCard key={exam.examId} exam={exam} />
        ))}
      </div>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900/80 rounded-lg">
          <Loader2 className="w-8 h-8 text-violet-400 animate-spin" />
        </div>
      )}

      {!isLoading && hasMore && exams.length > 0 && (
        <div className="flex justify-center mt-5">
          <button
            onClick={onLoadMore}
            className="px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white text-sm font-medium rounded-lg transition"
          >
            Load More
          </button>
        </div>
      )}

      {!hasMore && exams.length > 0 && (
        <p className="text-gray-500 text-xs mt-2 text-center">
          All upcoming exams loaded
        </p>
      )}
    </section>
  );
};
