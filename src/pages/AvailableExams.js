import React, { useRef } from "react";
import { AvailableExamCard } from "./AvailableExamCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Loader2 } from "lucide-react";
import "swiper/css";

export const AvailableExams = ({ exams, onLoadMore, isLoading, hasMore }) => {
  const isFetching = useRef(false);

  const handleReachEnd = () => {
    if (isFetching.current || isLoading || !hasMore) return;

    isFetching.current = true;
    console.log("Fetching more available exams...");
    if (onLoadMore) onLoadMore();

    setTimeout(() => {
      isFetching.current = false;
    }, 1200); // debounce to avoid rapid calls
  };
  const isInitialLoad = isLoading && exams.length === 0;

  return (
    <section className="mb-8 bg-gray-900 border border-gray-900 rounded-lg p-4 sm:p-5 relative">
      <h2 className="text-white text-lg sm:text-xl font-bold mb-4 sm:mb-6">
        Available Exams
      </h2>

      {!isLoading && exams.length === 0 && (
        <p className="text-gray-400 text-sm text-center py-6">
          No available exams found.
        </p>
      )}

      {exams.length > 0 && (
        <Swiper
          spaceBetween={16}
          slidesPerView={"auto"}
          grabCursor={true}
          onReachEnd={handleReachEnd}
          className="pb-2"
        >
          {exams.map((exam) => (
            <SwiperSlide
              key={exam.examId}
              className="!w-[300px] flex justify-center items-stretch"
            >
              <div className="h-[260px] w-full">
                <AvailableExamCard exam={exam} />
              </div>
            </SwiperSlide>
          ))}
          {isLoading && exams.length > 0 && (
            <SwiperSlide className="!w-[300px] flex items-center justify-center">
              <Loader2 className="w-6 h-6 text-violet-400 animate-spin" />
            </SwiperSlide>
          )}
        </Swiper>
      )}
      {isInitialLoad && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900/80 rounded-lg">
          <Loader2 className="w-8 h-8 text-violet-400 animate-spin" />
        </div>
      )}
    </section>
  );
};
