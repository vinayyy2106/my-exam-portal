import React, { useState } from 'react'
import { ExamChoiceModal } from '../components/ExamChoiceModal';

export const AdminDashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <div className="px-4 md:px-8 max-w-screen-xl mx-auto w-full text-white">
        <h1 className="text-3xl font-bold mb-6">
          Welcome back, Admin!
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { title: "Total Exams", value: 12 },
            { title: "Active Exams", value: 8 },
            { title: "Total Students", value: 120 },
            { title: "Exams Today", value: 45 },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-gray-900 border border-violet-400 rounded-lg p-5 text-center shadow"
            >
              <div className="text-2xl font-bold text-violet-400">{item.value}</div>
              <div className="text-gray-400 text-sm mt-1">{item.title}</div>
            </div>
          ))}
        </div>
        <div className="bg-gray-900 border border-violet-500 rounded-lg p-5 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Manage Exams</h2>
            <button onClick={() => setIsOpen(true)} className="bg-violet-600 hover:bg-violet-700 px-4 py-2 rounded-md font-medium">
              + Add New Exam
            </button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                title: "AWS Certified Solutions Architect",
                duration: 300,
                questions: 65,
                status: "Active",
              },
              {
                title: "React Fundamentals",
                duration: 180,
                questions: 30,
                status: "Inactive",
              },
            ].map((exam, idx) => (
              <div
                key={idx}
                className="bg-[#1b2430] p-4 rounded-lg border border-[#2e3748]"
              >
                <h3 className="text-lg font-semibold text-white">
                  {exam.title}
                </h3>
                <p className="text-sm text-gray-400 mt-1">
                  Duration: {exam.duration}s | Questions: {exam.questions}
                </p>
                <div className="flex justify-between mt-3">
                  <span
                    className={`text-sm font-semibold ${exam.status === "Active"
                        ? "text-green-400"
                        : "text-red-400"
                      }`}
                  >
                    {exam.status}
                  </span>
                  <div className="space-x-2">
                    <button className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-sm">
                      Edit
                    </button>
                    <button className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-gray-900 border border-violet-500 rounded-lg p-5">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <ul className="text-gray-400 space-y-2">
            <li>✅ AWS Exam Added - 2 hours ago</li>
            <li>✏️ React Exam Updated - 1 day ago</li>
            <li>👤 New Student Registered - 2 days ago</li>
          </ul>
        </div>
      </div>
      <ExamChoiceModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  )
}
