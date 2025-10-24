import React, { useState } from 'react'

export const Question = ({ onAddQuestion }) => {
  const [questionData, setQuestionData] = useState({
    questionType: "MCQ_SINGLE",
    questionText: "",
    defaultMarks: 0,
    defaultNegativeMarks: 0,
    difficulty: "",
    subject: "",
    explanation: "",
    answerOptionDTOList: [
      { optionDetails: "", correct: false, displayOrder: 0 },
      { optionDetails: "", correct: false, displayOrder: 1 },
      { optionDetails: "", correct: false, displayOrder: 2 },
      { optionDetails: "", correct: false, displayOrder: 3 },
    ],
  })
  const handleSeelectionType = (e) => {
    setQuestionData({
      ...questionData,
      answerOptionDTOList: questionData.answerOptionDTOList.map((opt) => ({
        ...opt,
        optionDetails: "",
        correct: false,
      })),
    });
    handleEachChange(e)
  }
  const handleEachChange = (e) => {
    const { name, value, checked, type } = e.target;
    setQuestionData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  const handleAddQuestion = () => {
    if (!questionData.questionText.trim()) {
      alert("Please enter a question text!");
      return;
    }
    onAddQuestion(questionData);
    setQuestionData({
      ...questionData,
      questionText: "",
      subject: "",
      explanation: "",
      answerOptionDTOList: questionData.answerOptionDTOList.map((opt) => ({
        ...opt,
        optionDetails: "",
        correct: false,
      })),
    });
  };
  const handleOptionChange = (index, field, value) => {
    setQuestionData((prev) => {
      let updatedOptions;

      if (field === "correct" && value === true && prev.questionType === "MCQ_SINGLE") {
        updatedOptions = prev.answerOptionDTOList.map((opt, i) => ({
          ...opt,
          correct: i === index, // only one true
        }));
      } else {
        updatedOptions = prev.answerOptionDTOList.map((opt, i) =>
          i === index ? { ...opt, [field]: value } : opt
        );
      }

      return { ...prev, answerOptionDTOList: updatedOptions };
    });
  }
  return (
    <div className="bg-[#0f1724] p-3 sm:p-4 rounded-xl mb-4 border border-[#2e3748]">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm sm:text-base text-gray-300 font-semibold">
          Question Type
        </h2>
        <select
          name="questionType"
          value={questionData.questionType}
          onChange={handleSeelectionType}
          className="bg-[#1b2430] border border-[#2e3748] text-gray-300 rounded-md p-2 text-sm sm:text-base focus:outline-none focus:border-blue-500"
        >
          <option value="MCQ_SINGLE">Single Correct</option>
          <option value="MCQ_MULTI">Multiple Correct</option>
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 mb-4">
        <input
          type="text"
          name="questionText"
          value={questionData.questionText}
          onChange={handleEachChange}
          placeholder="Question Text"
          className="p-2.5 sm:p-3 rounded-md bg-[#1b2430] border border-[#2e3748] focus:outline-none focus:border-blue-500 text-sm sm:text-base"
        />
        <input
          type="text"
          name="subject"
          value={questionData.subject}
          onChange={handleEachChange}
          placeholder="Subject"
          className="p-2.5 sm:p-3 rounded-md bg-[#1b2430] border border-[#2e3748] focus:outline-none focus:border-blue-500 text-sm sm:text-base"
        />
        <input
          type="number"
          name="defaultMarks"
          value={questionData.defaultMarks}
          onChange={handleEachChange}
          placeholder="Marks"
          className="p-2.5 sm:p-3 rounded-md bg-[#1b2430] border border-[#2e3748] focus:outline-none focus:border-blue-500 text-sm sm:text-base"
        />
        <input
          type="number"
          placeholder="Negative Marks"
          name="defaultNegativeMarks"
          value={questionData.defaultNegativeMarks}
          onChange={handleEachChange}
          className="p-2.5 sm:p-3 rounded-md bg-[#1b2430] border border-[#2e3748] focus:outline-none focus:border-blue-500 text-sm sm:text-base"
        />
      </div>
      <div className="mb-4">
        <label className="block text-xs sm:text-sm text-gray-400 mb-1">
          Difficulty
        </label>
        <select
          name="difficulty"
          value={questionData.difficulty}
          onChange={handleEachChange}
          className="w-full bg-[#1b2430] border border-[#2e3748] text-gray-300 rounded-md p-2 text-sm sm:text-base focus:outline-none focus:border-blue-500"
        >
          <option value="">Select Difficulty</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
      </div>

      <textarea
        name="explanation"
        value={questionData.explanation}
        onChange={handleEachChange}
        placeholder="Explanation..."
        rows="2"
        className="w-full p-2.5 sm:p-3 rounded-md bg-[#1b2430] border border-[#2e3748] focus:outline-none focus:border-blue-500 mb-4 text-sm sm:text-base"
      ></textarea>

      <h3 className="text-xs sm:text-sm text-gray-400 mb-2">Answer Options</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
        {questionData.answerOptionDTOList.map((opt, index) => (
          <div
            key={index}
            className="flex items-center bg-[#1b2430] rounded-md border border-[#2e3748] p-2"
          >
            <input
              type="text"
              value={opt.optionDetails}
              placeholder={`Option ${index + 1}`}
              onChange={(e) => (handleOptionChange(index, "optionDetails", e.target.value))}
              className="flex-1 bg-transparent outline-none p-2 text-gray-300 text-sm sm:text-base"
            />
            <label className="flex items-center gap-1 text-xs sm:text-sm text-gray-400">
              <input
                checked={opt.correct}
                onChange={(e) => (handleOptionChange(index, "correct", e.target.checked))}
                type="checkbox" className="accent-blue-500" /> Correct
            </label>
          </div>
        ))}
      </div>

      <div className="flex justify-end mt-4">
        <button className="px-3 sm:px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md font-medium text-sm sm:text-base" onClick={handleAddQuestion}>
          Add Question
        </button>
      </div>
    </div>
  )
}

export default Question
