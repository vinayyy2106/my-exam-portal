import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { Initialavatars } from "../components/Initialavatars";
import Man from "../assets/man.png";
import Female from "../assets/female.png";
import { AvailableExams } from "./AvailableExams";
import { UpcomingExams } from "./UpcomingExams";
import axios from "axios";
import CryptoJS from "crypto-js";
import { toast } from "react-toast";

export const Dashboard = () => {
  const { userData } = useContext(UserContext);
  const [currentExams, setCurrentExams] = useState([]);
  const [currentExamsPage, setCurrentExamsPage] = useState(0);
  const [loadingCurrent, setLoadingCurrent] = useState(false);
  const [hasMoreCurrent, setHasMoreCurrent] = useState(true);
  const [totalCurrentRecords, setTotalCurrentRecords] = useState(0);

  const [upcomingExams, setUpcomingExams] = useState([]);
  const [upcomingExamsPage, setUpcomingExamsPage] = useState(0);
  const [loadingUpcoming, setLoadingUpcoming] = useState(false);
  const [hasMoreUpcoming, setHasMoreUpcoming] = useState(true);
  const [totalUpcomingRecords, setTotalUpcomingRecords] = useState(0);

  const PAGE_SIZE = 5;
  const encryptionKey = process.env.REACT_APP_ENCRYPTION_KEY;

  useEffect(() => {
    getCurrentExamsData(0);
    getUpcomingExamsData(0);
  }, []);

  useEffect(() => {
    if (currentExamsPage > 0) {
      getCurrentExamsData(currentExamsPage);
    }
  }, [currentExamsPage]);

  useEffect(() => {
    if (upcomingExamsPage > 0) {
      getUpcomingExamsData(upcomingExamsPage);
    }
  }, [upcomingExamsPage]);

  const getCurrentExamsData = async (page) => {
    if (loadingCurrent || !hasMoreCurrent) return;

    try {
      setLoadingCurrent(true);
      const token = decryptData(sessionStorage.getItem("jwt"));
      const response = await axios.post(
        `https://onlineproctoring.duckdns.org/exam/fetch-ongoing-exams?pageNumber=${page}&pageSize=${PAGE_SIZE}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const resData = response?.data?.data || [];
      const total = resData[0]?.totalRecords || 0;
      setTotalCurrentRecords(total);
      setCurrentExams((prev) => (page === 0 ? resData : [...prev, ...resData]));

      if ((page + 1) * PAGE_SIZE >= total) setHasMoreCurrent(false);
    } catch (err) {
      console.error("Error fetching current exams:", err);
      toast.error("Error fetching current exams");
    } finally {
      setLoadingCurrent(false);
    }
  };

  const getUpcomingExamsData = async (page) => {
    if (loadingUpcoming || !hasMoreUpcoming) return;

    try {
      setLoadingUpcoming(true);
      const token = decryptData(sessionStorage.getItem("jwt"));

      const response = await axios.post(
        `https://onlineproctoring.duckdns.org/exam/fetch-upcoming-exams?pageNumber=${page}&pageSize=${PAGE_SIZE}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const resData = response?.data?.data || [];
      const total = resData[0]?.totalRecords || 0;
      setTotalUpcomingRecords(total);

      setUpcomingExams((prev) => (page === 0 ? resData : [...prev, ...resData]));

      if ((page + 1) * PAGE_SIZE >= total) setHasMoreUpcoming(false);
    } catch (err) {
      console.error("Error fetching upcoming exams:", err);
      toast.error("Error fetching upcoming exams");
    } finally {
      setLoadingUpcoming(false);
    }
  };

  const decryptData = (ciphertext) => {
    const bytes = CryptoJS.AES.decrypt(ciphertext, encryptionKey);
    const originalText = bytes.toString(CryptoJS.enc.Utf8);
    return JSON.parse(originalText);
  };

  return (
    <div className="px-2 sm:px-4 md:px-8 max-w-screen-xl mx-auto w-full">
      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 text-gray-900 dark:text-white">
        Welcome to ExamPortal, {userData?.fullName || "Loading.."}!
      </h1>
      <div className="bg-gray-100 dark:bg-gray-900 border border-violet-400 rounded-lg p-4 sm:p-5 mb-8">
        <div className="font-semibold text-gray-600 dark:text-gray-300 mb-3">
          Your Profile
        </div>
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 sm:gap-4">
          <Initialavatars
            name={userData?.fullName || "Loading.."}
            imageUrl={userData?.avatarUrl ==null ? Man : userData.avatarUrl}
            size={70}
          />
          <div>
            <div className="text-base sm:text-lg font-bold text-gray-900 dark:text-white">
              {userData?.userName || "Loading.."}
            </div>
            <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
              Student ID: EXM-2026-{userData?.userId}
            </div>
          </div>
          
        </div>
        <div className="flex flex-col md:flex-row mt-6 gap-4 md:space-x-6"> <div className="flex-1 bg-white dark:bg-gray-800 rounded-lg text-center py-3 shadow"> <div className="text-lg sm:text-xl font-bold text-violet-700 dark:text-violet-300">12</div> <div className="text-gray-600 dark:text-gray-400 text-xs tracking-wide">Exams Completed</div> </div> <div className="flex-1 bg-white dark:bg-gray-800 rounded-lg text-center py-3 shadow"> <div className="text-lg sm:text-xl font-bold text-violet-700 dark:text-violet-300">88.5%</div> <div className="text-gray-600 dark:text-gray-400 text-xs tracking-wide">Average Score</div> </div> </div>
      </div>
      <AvailableExams
        exams={currentExams}
        onLoadMore={() => setCurrentExamsPage((prev) => prev + 1)}
        isLoading={loadingCurrent}
        hasMore={hasMoreCurrent}
      />
      <UpcomingExams
        exams={upcomingExams}
        onLoadMore={() => setUpcomingExamsPage((prev) => prev + 1)}
        isLoading={loadingUpcoming}
        hasMore={hasMoreUpcoming}
      />
    </div>
  );
};
