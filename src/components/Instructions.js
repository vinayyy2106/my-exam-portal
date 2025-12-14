import { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import axios from "axios";
import CryptoJS from "crypto-js";
import { toast } from "react-toast";
import { Loader2 } from "lucide-react";
import Loading from "./Loading";

export const Instructions = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const { examId } = useParams();
    const exam = state?.exam;
    const encryptionKey = process.env.REACT_APP_ENCRYPTION_KEY;
    const [loading, setLoading] = useState(false);
    const [registered, setRegistered] = useState(false);
    if (!exam) {
        navigate("/home", { replace: true });
        return null;
    }
    const decryptData = (ciphertext) => {
        const bytes = CryptoJS.AES.decrypt(ciphertext, encryptionKey);
        return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    };

    const token = decryptData(sessionStorage.getItem("jwt"));
    const startExam = async () => {
        try {
            setLoading(true);
            const res = await axios.post(
                "https://onlineproctoring.duckdns.org/member/start-exam",
                { "examId": examId },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            console.log("The exam res", res);
            sessionStorage.setItem("examStarted", examId);
            sessionStorage.setItem("attemptId", res?.data?.data?.attemptId);
            navigate(`/exam/${examId}/start`, {
                state: {
                    exam: {
                        examId: examId,
                        attemptId: res?.data?.data?.attemptId,
                        duration:exam?.duration
                    }
                },
                
            });

        } catch (err) {
            toast.error("Failed to start exam");
        } finally {
            setLoading(false);
        }
    };
    const handleRegister = async () => {
        try {
            setLoading(true);
            await axios.post(
                `https://onlineproctoring.duckdns.org/member/register`,
                {
                    "examId": examId,
                    "paymentAmount": 0,
                    "gstAmount": 0,
                    "paymentAmountInclusiveGst": 0,
                    "coupounId": null
                },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            toast.success("Registered successfully");
            setRegistered(true);
        } catch {
            toast.error("Registration failed");
        } finally {
            setLoading(false);
        }
    };
    return (
        <>
            {loading && <Loading />}
            <div className="min-h-screen bg-grey-900 text-gray-300 px-4 pb-10 pt-4 flex justify-center">
                <div className="w-full max-w-5xl">
                    <h1 className="text-2xl font-semibold text-center text-white mb-4">
                        Exam Instructions
                    </h1>
                    <div className="bg-[#0f172a] border border-gray-700 rounded-xl p-6 mb-6">
                        <h2 className="text-lg font-semibold text-white mb-3">
                            {exam.title}
                        </h2>
                        <p className="text-sm">Duration: {exam.duration}</p>
                        <p className="text-sm">Total Questions: {exam.questions}</p>
                        {/* <p className="text-sm">Total Marks: {exam.marks}</p>
          <p className="text-sm">Passing Score: {exam.passScore}</p> */}
                    </div>
                    <div className="bg-[#0f172a] border border-gray-700 rounded-xl p-6 mb-6">
                        <h3 className="text-white font-semibold mb-3">
                            General Rules & Guidelines
                        </h3>
                        <ul className="list-disc list-inside text-sm space-y-2">
                            <li>Ensure a stable internet connection throughout the exam.</li>
                            <li>Do not close the browser window or tab during the exam.</li>
                            <li>Any attempt to navigate away from the exam window may result in automatic submission or disqualification.</li>
                            <li>Use of external resources, electronic devices, or seeking help from others is strictly prohibited.</li>
                            <li>Maintain academic integrity; any form of malpractice will lead to disqualification.</li>
                            <li>The exam will automatically submit once the time limit is reached.</li>
                        </ul>
                    </div>
                    <div className="bg-[#0f172a] border border-gray-700 rounded-xl p-6 mb-10">
                        <h3 className="text-white font-semibold mb-3">
                            Technical Requirements
                        </h3>
                        <ul className="list-disc list-inside text-sm space-y-2">
                            <li>Compatible with modern web browsers: Chrome (v80+), Firefox (v75+), Edge (v80+).</li>
                            <li>Ensure your device has a working webcam and microphone if proctoring is enabled.</li>
                            <li>Minimum resolution: 1024×768</li>
                        </ul>
                    </div>
                    <div className="flex justify-between items-center">
                        <button
                            onClick={() => navigate("/home")}
                            className="px-5 py-2 rounded-md bg-gray-800 hover:bg-gray-700"
                        >
                            ← Back to Dashboard
                        </button>

                        <div className="flex gap-4">
                            <button
                                onClick={handleRegister}
                                disabled={registered}
                                className={`px-6 py-2 rounded-md transition
                ${registered
                                        ? "bg-gray-700 cursor-not-allowed"
                                        : "bg-violet-600 hover:bg-violet-700"
                                    }`}
                            >
                                {registered ? "Registered" : "Register"}
                            </button>

                            <button
                                onClick={startExam}
                                disabled={!registered}
                                className={`px-6 py-2 rounded-md transition
                ${registered
                                        ? "bg-blue-600 hover:bg-blue-700"
                                        : "bg-gray-700 cursor-not-allowed"
                                    }`}
                            >
                                Start Exam →
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

