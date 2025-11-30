

export const Terms = () => {
  return (
    <div className="px-2 sm:px-4 md:px-8 
     mx-auto w-full h-screen py-10 dark:bg-darkbg bg-gray-800">
      <h1 className="text-3xl font-bold mb-4 text-white-900 text-white">
        Terms & Conditions
      </h1>

      <div className=" dark:bg-gray-900 border border-violet-400 rounded-lg p-5 leading-7 bg-gray-800 text-white">
        <p>
          Welcome to the ExamPortal. By accessing our platform, you agree to all
          the terms mentioned below. This portal is intended only for registered
          users and administrators for conducting online exams.
        </p>

        <h2 className="mt-5 text-xl font-semibold text-violet-600 dark:text-violet-300">
          1. User Responsibility
        </h2>
        <p>
          Students must ensure they maintain exam integrity and not engage in
          cheating. Any suspicious activity may lead to suspension.
        </p>

        <h2 className="mt-5 text-xl font-semibold text-violet-600 dark:text-violet-300">
          2. Admin Responsibility
        </h2>
        <p>
          Admins are responsible for uploading exams in the correct format,
          providing proper exam timing, and monitoring results appropriately.
        </p>

        <h2 className="mt-5 text-xl font-semibold text-violet-600 dark:text-violet-300">
          3. Modification Rights
        </h2>
        <p>
          ExamPortal reserves the right to update or modify the terms at any
          time without prior notice.
        </p>
      </div>
    </div>
  );
};
