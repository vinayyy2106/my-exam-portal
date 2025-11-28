
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import { Upload, FileText } from "lucide-react";

export const ExamChoiceModal = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate();
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={() => setIsOpen(false)}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" />
        </Transition.Child>
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-[#1b2430] border border-[#2e3748] p-6 text-white shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg sm:text-xl font-semibold text-gray-100 mb-4"
                >
                  Create New Exam
                </Dialog.Title>
                <p className="text-gray-400 text-sm mb-6">
                  Choose how you’d like to add your exam questions:
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      navigate("/admin/upload-exam?mode=excel");
                    }}
                    className="flex-1 bg-[#0f1724] hover:bg-[#101b2c] border border-[#2e3748] rounded-lg px-4 py-3 flex flex-col items-center justify-center cursor-pointer transition"
                  >
                    <Upload className="w-6 h-6 mb-2 text-violet-400" />
                    <span className="font-medium text-sm text-gray-200">
                      Upload Excel File
                    </span>
                  </button>

                  <button
                    onClick={() => {
                      setIsOpen(false);
                      navigate("/admin/upload-exam?mode=manual");

                    }}
                    className="flex-1 bg-violet-600 hover:bg-violet-700 text-white font-medium text-sm rounded-lg px-4 py-3 flex flex-col items-center justify-center transition"
                  >
                    <FileText className="w-6 h-6 mb-2" />
                    Create Manually
                  </button>
                </div>
                <div className="mt-6 text-right">
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-gray-400 hover:text-gray-200 text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}


