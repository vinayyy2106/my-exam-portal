import React from "react";
import { useNavigate } from "react-router-dom";

export const AvailableExamCard = ({ exam }) => {
  const durationInMinutes = Math.floor((exam.durationInSeconds || 0) / 60);
  const navigate = useNavigate();
  const startExam=()=>{
    navigate(`/exam/${exam.examId}/instructions`, {
    state: {
      exam: {
        examId: exam.examId,
        title: exam.title,
        duration: durationInMinutes,
        questions: exam.numberOfQuestion,
        // marks: exam.totalMarks,
        // passScore: exam.passingScore,
      }
    }
  });
  }
  return (
    <article className="h-full bg-gray-800 rounded-lg p-5 flex flex-col justify-between shadow-md border border-gray-700 hover:border-violet-500 transition">
      <div>
        <h3 className="text-white font-semibold text-lg mb-2 line-clamp-1">
          {exam.title || "Untitled Exam"}
        </h3>
        <p className="text-gray-300 text-sm mb-4 line-clamp-3">
          {exam.description || "No description provided."}
        </p>
        <div className="text-gray-400 text-xs space-y-1">
          <p>
            <strong className="mr-1">Subject:</strong>{" "}
            {exam.subject || "N/A"}
          </p>
          <p>
            <strong className="mr-1">Duration:</strong>{" "}
            {durationInMinutes > 0 ? `${durationInMinutes} min` : "N/A"}
          </p>
          {exam.numberOfQuestion && (
            <p>
              <strong className="mr-1">Questions:</strong>{" "}
              {exam.numberOfQuestion}
            </p>
          )}
        </div>
      </div>

      <div className="flex justify-between mt-4">
        <button className="bg-gray-700 hover:bg-gray-600 rounded px-3 py-1.5 text-xs text-white transition">
          Preview
        </button>
        <button onClick={startExam} className="bg-blue-600 hover:bg-blue-700 rounded px-3 py-1.5 text-xs text-white transition">
          Start
        </button>
      </div>
    </article>
  );
};

