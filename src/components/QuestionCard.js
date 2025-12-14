import React from "react";

export const QuestionCard = ({
  question,
  questionNumber,
  selectedAnswer,
  onAnswerSelect,
  markedForReview,
  onToggleReview,
}) => {
  if (!question) return null;

  return (
    <div className="bg-gray-900 rounded-lg p-6">
      <h2 className="text-lg font-semibold mb-3">
        Question {questionNumber}
      </h2>
      <p className="mb-5 text-gray-300">
        {question.questionName}
      </p>
      <div className="space-y-3">
        {question.answerOptionDTOList.map((option) => (
          <label
            key={option.optionId}
            className={`flex items-center gap-3 p-3 rounded cursor-pointer
              ${
                selectedAnswer === option.optionId
                  ? "bg-blue-600/20 border border-blue-500"
                  : "bg-gray-800 hover:bg-gray-700"
              }`}
          >
            <input
              type="radio"
              name={`question-${question.questionId}`}
              className="accent-blue-500"
              checked={selectedAnswer === option.optionId}
              onChange={() => onAnswerSelect(option.optionId)}
            />
            <span>{option.optionDetails}</span>
          </label>
        ))}
      </div>
      <div className="mt-5">
        <label className="flex items-center gap-2 text-sm text-gray-400">
          <input
            type="checkbox"
            checked={markedForReview}
            onChange={onToggleReview}
          />
          Mark for review
        </label>
      </div>
    </div>
  );
};
