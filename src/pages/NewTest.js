import React, { useState, useRef } from 'react';
import { useLocation } from "react-router-dom";
import Question from './Question';
import Loading from '../components/Loading';
import axios from 'axios';
import CryptoJS from 'crypto-js';
import { toast } from 'react-toast';
import { Upload } from 'lucide-react';

export const NewTest = () => {
  const location = useLocation();
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadError, setUploadError] = useState("");
  const params = new URLSearchParams(location.search);
  const mode = params.get("mode");
  const encryptionKey = process.env.REACT_APP_ENCRYPTION_KEY;
  const [isLoading, setLoading] = useState(false);

  const [testData, setTestData] = useState({
    title: "",
    description: "",
    durationInSeconds: "",
    status: "Active",
    shuffleQuestions: false,
    negativeMarkingAllowed: false,
    subject: "",
    numberOfQuestion: "",
    startDateTime: "",
    endDateTime: "",
    questionsList: [],
  });
  const handleUploadClick = () => {
    console.log("📂 Upload click triggered manually");
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const allowedExtensions = ["xlsx", "xls", "numbers"];
    const ext = file.name.split(".").pop().toLowerCase();

    if (!allowedExtensions.includes(ext)) {
      setUploadError("Invalid file type! Please upload .xlsx, .xls, or .numbers only.");
      setSelectedFile(null);
      toast.error("Invalid file format!");
      return;
    }

    setUploadError("");
    setSelectedFile(file);
    toast.success(`File selected: ${file.name}`);
  };

  const handleSaveTest = async () => {
    if (!testData.title.trim()) {
      toast.error("Please enter a test title!");
      return;
    }

    if (!testData.startDateTime || !testData.endDateTime) {
      toast.error("Please select both start and end dates!");
      return;
    }

    if (new Date(testData.startDateTime) >= new Date(testData.endDateTime)) {
      toast.error("End date must be after start date!");
      return;
    }

    try {
      setLoading(true);
      const token = decryptData(sessionStorage.getItem("jwt"));

      if (mode === "excel") {
        if (!selectedFile) {
          toast.error("Please upload a file first!");
          return;
        }

        const formData = new FormData();
        Object.entries(testData).forEach(([key, value]) => {
          if (key !== "questionsList") formData.append(key, value);
        });
        formData.append("questionAnswerAttachment", selectedFile);

        const response = await axios.post(
          "https://onlineproctoring.duckdns.org/exam/create-exam",
          formData,
          {
            headers: {
              "Authorization": "Bearer " + token,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        toast.success("Exam uploaded successfully!");
        console.log("Excel Upload Response:", response.data);
      } else {
        const response = await axios.post(
          "https://onlineproctoring.duckdns.org/exam/create-exam",
          testData,
          {
            headers: {
              "Authorization": "Bearer " + token,
              "Content-Type": "application/json",
            },
          }
        );

        toast.success("Exam created successfully!");
        console.log("Manual Creation Response:", response.data);
        setTestData({
          title: "",
          description: "",
          durationInSeconds: "",
          status: "Active",
          shuffleQuestions: false,
          negativeMarkingAllowed: false,
          subject: "",
          numberOfQuestion: "",
          startDateTime: "",
          endDateTime: "",
          questionsList: [],
        })
      }
    } catch (ex) {
      console.error("Error while saving exam data:", ex);
      toast.error("Your submission wasn’t successful!");
    } finally {
      setLoading(false);
    }
  };

  const decryptData = (ciphertext) => {
    const bytes = CryptoJS.AES.decrypt(ciphertext, encryptionKey);
    const originalText = bytes.toString(CryptoJS.enc.Utf8);
    return JSON.parse(originalText);
  };

  const handleAddQuestion = (newQuestion) => {
    setTestData((prev) => ({
      ...prev,
      questionsList: [...prev.questionsList, newQuestion],
      numberOfQuestion: prev.questionsList.length + 1,
    }));
  };

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setTestData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <>
      {isLoading && <Loading />}

      <div className="min-h-screen bg-gray-900 text-white px-4 sm:px-6 md:px-8 py-6 md:py-10 border rounded-2xl border-[#2e3748]">
        <h1 className="text-lg sm:text-2xl md:text-3xl font-semibold mb-6 text-center sm:text-left">
          Upload New Test
        </h1>
        <div className="bg-[#1b2430] p-4 sm:p-6 rounded-2xl shadow-md border border-[#2e3748] mb-6">
          <h2 className="text-base sm:text-lg md:text-xl font-medium mb-4 border-b border-gray-700 pb-2">
            Test Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <label className="block text-xs sm:text-sm text-gray-400 mb-1">Title</label>
              <input
                type="text"
                name="title"
                value={testData.title}
                onChange={handleChange}
                placeholder="Enter test title"
                className="w-full p-2.5 sm:p-3 rounded-md bg-[#0f1724] border border-[#2e3748] text-sm sm:text-base focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs sm:text-sm text-gray-400 mb-1">Subject</label>
              <input
                type="text"
                name="subject"
                value={testData.subject}
                onChange={handleChange}
                placeholder="Enter subject"
                className="w-full p-2.5 sm:p-3 rounded-md bg-[#0f1724] border border-[#2e3748] text-sm sm:text-base focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs sm:text-sm text-gray-400 mb-1">Duration (seconds)</label>
              <input
                type="number"
                name="durationInSeconds"
                value={testData.durationInSeconds}
                onChange={handleChange}
                placeholder="300"
                className="w-full p-2.5 sm:p-3 rounded-md bg-[#0f1724] border border-[#2e3748] text-sm sm:text-base focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs sm:text-sm text-gray-400 mb-1">Number of Questions</label>
              <input
                type="number"
                name="numberOfQuestion"
                value={testData.numberOfQuestion}
                onChange={handleChange}
                placeholder="65"
                className="w-full p-2.5 sm:p-3 rounded-md bg-[#0f1724] border border-[#2e3748] text-sm sm:text-base focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs sm:text-sm text-gray-400 mb-1">Start Date</label>
              <input
                type="datetime-local"
                name="startDateTime"
                value={testData.startDateTime}
                onChange={handleChange}
                className="custom-date-input w-full p-2.5 sm:p-3 rounded-md bg-[#0f1724] border border-[#2e3748] text-white text-sm sm:text-base focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs sm:text-sm text-gray-400 mb-1">End Date</label>
              <input
                type="datetime-local"
                name="endDateTime"
                value={testData.endDateTime}
                onChange={handleChange}
                className="custom-date-input w-full p-2.5 sm:p-3 rounded-md bg-[#0f1724] border border-[#2e3748] text-white text-sm sm:text-base focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-xs sm:text-sm text-gray-400 mb-1">Description</label>
            <textarea
              name="description"
              value={testData.description}
              onChange={handleChange}
              rows="3"
              placeholder="Enter test description..."
              className="w-full p-2.5 sm:p-3 rounded-md bg-[#0f1724] border border-[#2e3748] text-sm sm:text-base focus:outline-none focus:border-blue-500"
            ></textarea>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-6 gap-3 mt-5">
            <label className="flex items-center gap-2 text-gray-300 text-sm sm:text-base">
              <input
                type="checkbox"
                name="shuffleQuestions"
                checked={testData.shuffleQuestions}
                onChange={handleChange}
                className="accent-blue-500"
              />
              Shuffle Questions
            </label>

            <label className="flex items-center gap-2 text-gray-300 text-sm sm:text-base">
              <input
                type="checkbox"
                name="negativeMarkingAllowed"
                checked={testData.negativeMarkingAllowed}
                onChange={handleChange}
                className="accent-blue-500"
              />
              Negative Marking
            </label>

            <div className="sm:ml-auto">
              <select
                name="status"
                value={testData.status}
                onChange={handleChange}
                className="bg-[#0f1724] border border-[#2e3748] text-gray-300 rounded-md p-2 text-sm sm:text-base focus:outline-none focus:border-blue-500"
              >
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </div>
          </div>
        </div>
        {mode === "manual" ? (
          <Question onAddQuestion={handleAddQuestion} />
        ) : (
          <div className="bg-[#1b2430] p-6 rounded-2xl border border-[#2e3748] mt-6">
            <h2 className="text-lg font-semibold mb-4">Upload Question Excel File</h2>

            <div
              onClick={handleUploadClick}
              className="flex flex-col items-center justify-center bg-[#0f1724] hover:bg-[#101b2c] border border-[#2e3748] rounded-lg p-6 cursor-pointer transition"
            >
              <Upload className="w-8 h-8 mb-2 text-violet-400" />
              <span className="text-gray-300 text-sm">Click to select .xlsx / .xls / .numbers file</span>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept=".xlsx,.xls,.numbers"
              className="hidden"
              onChange={handleFileUpload}
            />

            {selectedFile && (
              <p className="text-sm text-green-400 mt-3">✅ Uploaded: {selectedFile.name}</p>
            )}

            {uploadError && (
              <p className="text-sm text-red-400 mt-2">{uploadError}</p>
            )}
          </div>
        )}

        <div className="flex justify-end pt-3">
          <button
            onClick={handleSaveTest}
            className="px-4 sm:px-6 py-2.5 sm:py-3 bg-green-600 hover:bg-green-700 rounded-lg font-semibold text-white text-sm sm:text-base "
          >
            Save Test
          </button>
        </div>
      </div>
    </>
  );
};

export default NewTest;
