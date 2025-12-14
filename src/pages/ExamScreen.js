import { useState, useEffect, } from "react";
import { QuestionCard } from "../components/QuestionCard";
import { useNavigate, useLocation } from "react-router-dom";
import { fetchExamQuestions } from "../services/examService";
import { Loader2 } from "lucide-react";
import { useRef } from "react";



export const ExamScreen = () => {
    const { state } = useLocation();
    const examId = state?.exam?.examId;
    const attemptId =
        state?.exam?.attemptId || sessionStorage.getItem("attemptId");
    const navigate = useNavigate();
    const questionsLoadedRef = useRef(false);
    const endTimeRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const [marked, setMarked] = useState({});
    const [questions, setQuestions] = useState([]);
    const [timeLeft, setTimeLeft] = useState(0);
    const [pageNumber, setPageNumber] = useState(0);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const currentQuestion = questions.length > 0 ? questions[currentIndex] : null;
    const totalQuestions = questions.length;
    const answeredCount = Object.keys(answers).length;
    const markedCount = Object.keys(marked).filter(
        (key) => marked[key]
    ).length;
    const notAnsweredCount = totalQuestions - answeredCount;
    const currentCount = totalQuestions > 0 ? 1 : 0;//one q at a time

    useEffect(() => {
        const startedExamId = sessionStorage.getItem("examStarted");

        if (!state?.exam || String(startedExamId) !== String(examId)) {
            navigate("/home", { replace: true });
            return;
        }

        const durationInMinutes = Number(state.exam.duration);
        if (!durationInMinutes || isNaN(durationInMinutes)) {
            navigate("/home", { replace: true });
            return;
        }

        const storedEnd = sessionStorage.getItem("examEndTime");

        if (storedEnd) {
            endTimeRef.current = Number(storedEnd);
        } else {
            endTimeRef.current = Date.now() + durationInMinutes * 60 * 1000;
            sessionStorage.setItem("examEndTime", endTimeRef.current);
        }

        setTimeLeft(
            Math.max(
                0,
                Math.floor((endTimeRef.current - Date.now()) / 1000)
            )
        );
        const interval = setInterval(() => {
            const remaining = Math.max(
                0,
                Math.floor((endTimeRef.current - Date.now()) / 1000)
            );

            setTimeLeft(remaining);

            if (remaining === 0) {
                clearInterval(interval);
                handleAutoSubmit();
            }
        }, 1000);

        if (!questionsLoadedRef.current) {
            questionsLoadedRef.current = true;
            loadQuestions(0);
        }

        return () => clearInterval(interval);
    }, []);

    const buildExamSummary = () => {
        return questions.map((q, index) => {
            const selectedOptionId = answers[index];
            const selectedOption = q.answerOptionDTOList.find(
                (opt) => opt.optionId === selectedOptionId
            );
            return {
                questionNo: index + 1,
                questionText: q.questionName,
                selectedOptionId: selectedOptionId ?? null,
                selectedOptionText: selectedOption
                    ? selectedOption.optionDetails
                    : "Not Answered",
                isAnswered: selectedOptionId !== undefined,
                isMarkedForReview: !!marked[index],
            };
        });
    };


    const handleAutoSubmit = () => {
        const summary = buildExamSummary();

        const answered = summary.filter(q => q.isAnswered).length;
        const markedCount = summary.filter(q => q.isMarkedForReview).length;
        const notAnswered = summary.length - answered;

        alert(`
            Exam Summary

            Total Questions: ${summary.length}
            Answered: ${answered}
            Not Answered: ${notAnswered}
            Marked for Review: ${markedCount}

            (Open console for full details)
        `);
        console.clear();
        console.log("📘 EXAM FULL DETAILS");
        console.table(summary);
        // sessionStorage.removeItem("examStarted");
        // sessionStorage.removeItem("examEndTime");
        // navigate("/home", { replace: true });
    };


    const loadQuestions = async (page) => {
        if (loading || !hasMore) return;
        try {
            setLoading(true);
            const newQuestions = await fetchExamQuestions(
                page,
                10,
                attemptId
            );
            if (!newQuestions || newQuestions.length === 0) {
                setHasMore(false);
                return;
            }
            setQuestions((prev) => [...prev, ...newQuestions]);
            console.log("The questions", questions);
            setPageNumber(page);
        } catch (err) {
            console.error("Failed to load questions", err);
        } finally {
            setLoading(false);
        }
    };

    const handleNext = () => {
        if (
            currentIndex === questions.length - 2 &&
            hasMore
        ) {
            loadQuestions(pageNumber + 1);
        }

        if (currentIndex < questions.length - 1) {
            setCurrentIndex((prev) => prev + 1);
        }
    };
    const handlePrevious = () => {
        if (currentIndex > 0) {
            setCurrentIndex((prev) => prev - 1);
        }
    };
    const formatTime = (seconds) => {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;

        return `${h.toString().padStart(2, "0")}:${m
            .toString()
            .padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
    };

    return (
        <div className="min-h-screen bg-gray-800 text-gray-200">
            <div className="flex gap-4 p-4 w-full">
                <div className="w-22 sm:w-24 md:w-28 bg-gray-900 rounded-lg p-2 flex flex-col items-center gap-3">
                    {questions.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrentIndex(i)}
                            className={`w-8 h-8 rounded-full text-xs font-semibold ${currentIndex === i
                                ? "bg-blue-600 text-white"
                                : marked[i]
                                    ? "bg-yellow-500 text-black"
                                    : answers[i] !== undefined
                                        ? "bg-green-600 text-white"
                                        : "bg-gray-700"
                                }`}

                        >
                            {i + 1}
                        </button>

                    ))}
                    <div className="mt-4 text-xs text-gray-300 space-y-2">
                        <div className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-blue-600"></span>
                            <span>Current ({currentCount})</span>
                        </div>

                        <div className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-green-600"></span>
                            <span>Answered ({answeredCount})</span>
                        </div>

                        <div className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                            <span>Marked ({markedCount})</span>
                        </div>

                        <div className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-gray-600"></span>
                            <span>NA ({notAnsweredCount})</span>
                        </div>
                    </div>
                </div>
                <div className="flex-1 flex flex-col gap-4">
                    <div className="bg-gray-900 rounded-lg p-4">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-sm text-gray-400">
                                Time Remaining
                            </span>
                            <span className="text-lg font-bold text-blue-400">
                                {formatTime(timeLeft)}
                            </span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                            <div
                                className="bg-blue-500 h-2 rounded-full"
                                style={{
                                    width: `${questions.length
                                        ? (Object.keys(answers).length / questions.length) * 100
                                        : 0}%`,
                                }}
                            />
                        </div>
                        <div className="text-xs text-gray-400 mt-1">
                            Progress ({Object.keys(answers).length} / {questions.length})
                        </div>
                    </div>
                    {loading && questions.length === 0 ? (
                        <div className="bg-gray-900 p-6 text-center text-gray-400">
                            <Loader2 className="animate-spin mx-auto" />
                        </div>
                    ) : (
                        <QuestionCard
                            question={currentQuestion}
                            questionNumber={currentIndex + 1}
                            selectedAnswer={answers[currentIndex]}
                            onAnswerSelect={(optionId) =>
                                setAnswers((prev) => ({
                                    ...prev,
                                    [currentIndex]: optionId,
                                }))
                            }
                            markedForReview={!!marked[currentIndex]}
                            onToggleReview={() =>
                                setMarked((prev) => ({
                                    ...prev,
                                    [currentIndex]: !prev[currentIndex],
                                }))
                            }
                        />
                    )}
                    <div className="bg-gray-900 rounded-lg p-4 flex justify-between">
                        <button
                            disabled={currentIndex === 0}
                            onClick={handlePrevious}
                            className="px-4 py-2 bg-gray-700 rounded disabled:opacity-50"
                        >
                            ← Previous
                        </button>

                        <button
                            disabled={currentIndex === questions.length - 1}
                            onClick={handleNext}
                            className="px-4 py-2 bg-blue-600 rounded disabled:opacity-50"
                        >
                            Next →
                        </button>
                    </div>
                    <div className="text-right">
                        <button
                            disabled={currentIndex !== questions.length - 1}
                            onClick={handleAutoSubmit}
                            className="px-4 py-2  bg-violet-600 rounded disabled:opacity-50"
                        >
                            Submit Exam
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};
